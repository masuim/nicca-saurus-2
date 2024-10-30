'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ApiResult } from '@/types/api-result';
import { Nicca } from '@/types/nicca';
import { MESSAGES } from '@/constants/messages';

export const getUserNiccas = async (): Promise<ApiResult<Nicca[]>> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: MESSAGES.OTHER.USER_NOT_AUTHENTICATED, status: 401 };
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
    return { success: false, error: MESSAGES.FLASH_MESSAGES.NICCA_FETCH_ERROR, status: 500 };
  }
};
