'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ApiResult } from '@/types/api-result';
import { MESSAGES } from '@/constants/messages';

export const updateNiccaDates = async (
  niccaId: string,
  startDate: Date,
  endDate: Date,
): Promise<ApiResult<void>> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: MESSAGES.OTHER.USER_NOT_AUTHENTICATED, status: 401 };
  }

  try {
    await prisma.nicca.update({
      where: { id: niccaId },
      data: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });

    return { success: true, data: undefined, status: 200 };
  } catch (error) {
    console.error('Nicca update error:', error);
    return { success: false, error: MESSAGES.FLASH_MESSAGES.NICCA_DAYS_UPDATE_ERROR, status: 500 };
  }
};
