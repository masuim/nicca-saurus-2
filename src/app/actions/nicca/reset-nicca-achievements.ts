'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ApiResult } from '@/types/api-result';
import { NiccaWithRelations } from '@/types/nicca';
import { MESSAGES } from '@/constants/messages';
import { calculateStartDate, calculateEndDate } from '@/utils/date-utils';

export const resetNiccaAchievements = async (
  niccaId: string,
): Promise<ApiResult<NiccaWithRelations | null>> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: MESSAGES.OTHER.USER_NOT_AUTHENTICATED, status: 401 };
  }

  try {
    await prisma.achievementDate.deleteMany({
      where: { niccaId: niccaId },
    });

    await prisma.achievementDate.create({
      data: {
        niccaId: niccaId,
        achievedDate: null,
      },
    });

    const nicca = await prisma.nicca.findUnique({
      where: { id: niccaId },
      include: { achievements: true },
    });

    if (nicca) {
      const weekData = {
        monday: nicca.monday,
        tuesday: nicca.tuesday,
        wednesday: nicca.wednesday,
        thursday: nicca.thursday,
        friday: nicca.friday,
        saturday: nicca.saturday,
        sunday: nicca.sunday,
      };

      const newStartDate = calculateStartDate(weekData);
      const newEndDate = calculateEndDate(newStartDate);

      const updatedNicca = await prisma.nicca.update({
        where: { id: niccaId },
        data: {
          startDate: newStartDate.toISOString(),
          endDate: newEndDate.toISOString(),
        },
        include: { achievements: true },
      });

      return { success: true, data: updatedNicca, status: 200 };
    }

    return { success: false, error: MESSAGES.RESET_NICCA.ERROR, status: 500 };
  } catch (error) {
    console.error('Nicca reset error:', error);
    return { success: false, error: MESSAGES.RESET_NICCA.ERROR, status: 500 };
  }
};
