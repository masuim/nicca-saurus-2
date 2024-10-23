'use server';

import { prisma } from '@/lib/prisma';
import { NiccaSchema, type NiccaFormValues } from '@/lib/schema/nicca';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiResult } from '@/types/api-result';
import { Nicca, NiccaWithRelations } from '@/types/nicca';

export const createNicca = async (formData: NiccaFormValues): Promise<ApiResult<Nicca>> => {
  const validatedFields = NiccaSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { success: false, error: '無効なフィールドがあります。', status: 400 };
  }

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: 'ユーザーが認証されていません。', status: 401 };
  }

  const { title, ...weekData } = validatedFields.data;
  try {
    const nicca = await prisma.nicca.create({
      data: {
        userId: session.user.id,
        title,
        saurusType: 'brachiosaurus', // TODO:仮の値として設定
        isActive: true,
        ...weekData,
      },
      include: {
        achievements: true,
      },
    });
    console.log('created nicca', nicca);
    return { success: true, data: nicca, status: 201 };
  } catch (error) {
    console.error('Nicca creation error:', error);
    return { success: false, error: '日課の作成に失敗しました。', status: 500 };
  }
};

export const getNicca = async (): Promise<ApiResult<NiccaWithRelations | null>> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { success: false, error: 'ユーザーが認証されていません。', status: 401 };
  }

  try {
    const nicca = await prisma.nicca.findFirst({
      where: {
        userId: session.user.id,
        isActive: true,
      },
      include: {
        achievements: true,
      },
    });
    // console.log('get nicca', nicca);
    if (!nicca) {
      console.error('Active Nicca not found for user:', session.user.id);
    }

    // console.log('get nicca', nicca);
    return { success: true, data: nicca, status: 200 };
  } catch (error) {
    console.error('Nicca fetch error:', error);
    return { success: false, error: '日課の取得に失敗しました。', status: 500 };
  }
};

export const getUserNiccas = async (): Promise<ApiResult<Nicca[]>> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: 'ユーザーが認証されていません。', status: 401 };
  }

  try {
    const niccas = await prisma.nicca.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        achievements: true,
      },
    });

    return { success: true, data: niccas, status: 200 };
  } catch (error) {
    console.error('Niccas fetch error:', error);
    return { success: false, error: '日課の取得に失敗しました。', status: 500 };
  }
};

export const deleteNicca = async (id: string): Promise<ApiResult<void>> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: 'ユーザーが認証されていません。', status: 401 };
  }

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.achievementDate.deleteMany({
        where: { niccaId: id },
      });

      await prisma.nicca.delete({
        where: {
          id: id,
          userId: session.user.id,
        },
      });
    });

    return { success: true, data: undefined, status: 200 };
  } catch (error) {
    console.error('Nicca deletion error:', error);
    if (error instanceof PrismaClientKnownRequestError) {
      if ((error as PrismaClientKnownRequestError).code === 'P2025') {
        return { success: false, error: '指定された日課が見つかりません。', status: 404 };
      }
    }
    return { success: false, error: '日課の削除に失敗しました。', status: 500 };
  }
};
