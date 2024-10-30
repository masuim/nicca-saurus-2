'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiResult } from '@/types/api-result';
import { MESSAGES } from '@/constants/messages';

export const deleteNicca = async (id: string): Promise<ApiResult<void>> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: MESSAGES.OTHER.USER_NOT_AUTHENTICATED, status: 401 };
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
      if (error.code === 'P2025') {
        return { success: false, error: MESSAGES.FLASH_MESSAGES.NICCA_NOT_FOUND, status: 404 };
      }
    }
    return { success: false, error: MESSAGES.FLASH_MESSAGES.NICCA_DELETION_ERROR, status: 500 };
  }
};
