'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ApiResult } from '@/types/api-result';
import { MESSAGES } from '@/constants/messages';

export const addAchievement = async (niccaId: string, date: Date): Promise<ApiResult<void>> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: MESSAGES.OTHER.USER_NOT_AUTHENTICATED, status: 401 };
  }

  try {
    const existingAchievement = await prisma.achievementDate.findFirst({
      where: {
        niccaId,
        achievedDate: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
    });

    if (existingAchievement) {
      return {
        success: false,
        error: MESSAGES.FLASH_MESSAGES.ACHIEVEMENT_ALREADY_EXISTS,
        status: 400,
      };
    }

    await prisma.achievementDate.create({
      data: {
        niccaId,
        achievedDate: date,
      },
    });

    return { success: true, data: undefined, status: 200 };
  } catch (error) {
    console.error('Achievement addition error:', error);
    return {
      success: false,
      error: MESSAGES.FLASH_MESSAGES.ACHIEVEMENT_ADDITION_ERROR,
      status: 500,
    };
  }
};
