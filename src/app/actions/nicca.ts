'use server';

import { prisma } from '@/lib/prisma';
import { NiccaSchema, type NiccaFormValues } from '@/lib/validations/nicca';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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
