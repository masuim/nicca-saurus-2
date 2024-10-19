'use server';

import { prisma } from '@/lib/prisma';
import { NiccaSchema, type NiccaFormValues } from '@/lib/validations/nicca';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const createNicca = async (formData: NiccaFormValues) => {
  const validatedFields = NiccaSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: '無効なフィールドがあります。' };
  }

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'ユーザーが認証されていません。' };
  }

  const { title, week } = validatedFields.data;

  try {
    await prisma.nicca.create({
      data: {
        userId: session.user.id,
        title,
        saurusType: 'brachiosaurus', // TODO:仮の値として設定
        isActive: true,
        week: {
          create: week,
        },
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Nicca creation error:', error);
    return { error: '日課の作成に失敗しました。' };
  }
};

export const getNicca = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'ユーザーが認証されていません。' };
  }

  try {
    const nicca = await prisma.nicca.findFirst({
      where: {
        userId: session.user.id,
        isActive: true,
      },
      select: {
        title: true,
        week: true,
      },
    });

    return { nicca };
  } catch (error) {
    console.error('Nicca fetch error:', error);
    return { error: '日課の取得に失敗しました。' };
  }
};

export const getUserNiccas = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'ユーザーが認証されていません。' };
  }

  try {
    const niccas = await prisma.nicca.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        week: true,
        achievements: true,
      },
    });

    return { niccas };
  } catch (error) {
    console.error('Niccas fetch error:', error);
    return { error: '日課の取得に失敗しました。' };
  }
};

export const deleteNicca = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'ユーザーが認証されていません。' };
  }

  try {
    await prisma.$transaction(async (prisma) => {
      // 関連する Week データを削除
      await prisma.week.deleteMany({
        where: { niccaId: id },
      });

      // 関連する AchievementDate データを削除
      await prisma.achievementDate.deleteMany({
        where: { niccaId: id },
      });

      // Nicca を削除
      await prisma.nicca.delete({
        where: {
          id: id,
          userId: session.user.id,
        },
      });
    });

    return { success: true };
  } catch (error) {
    console.error('Nicca deletion error:', error);
    if (error instanceof PrismaClientKnownRequestError) {
      if ((error as PrismaClientKnownRequestError).code === 'P2025') {
        return { error: '指定された日課が見つかりません。' as const };
      }
    }
    return { error: '日課の削除に失敗しました。' };
  }
};
