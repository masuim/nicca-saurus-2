'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ApiResult } from '@/types/api-result';
import { NiccaWithRelations } from '@/types/nicca';
import { MESSAGES } from '@/constants/messages';

export const getNicca = async (): Promise<ApiResult<NiccaWithRelations | null>> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { success: false, error: MESSAGES.OTHER.USER_NOT_AUTHENTICATED, status: 401 };
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
    if (!nicca) {
      console.error('Active Nicca not found for user:', session.user.id);
    }

    return { success: true, data: nicca, status: 200 };
  } catch (error) {
    console.error('Nicca fetch error:', error);
    return { success: false, error: MESSAGES.FLASH_MESSAGES.NICCA_FETCH_ERROR, status: 500 };
  }
};
