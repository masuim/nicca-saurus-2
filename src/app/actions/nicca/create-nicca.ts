'use server';

import { prisma } from '@/lib/prisma';
import { NiccaSchema, type NiccaFormValues } from '@/lib/schema/nicca';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ApiResult } from '@/types/api-result';
import { Nicca } from '@/types/nicca';
import { MESSAGES } from '@/constants/messages';
import { calculateStartDate, calculateEndDate } from '@/utils/date-utils';
import { getRandomSaurusType } from '@/utils/saurus-utils';

export const createNicca = async (formData: NiccaFormValues): Promise<ApiResult<Nicca | null>> => {
  const validatedFields = NiccaSchema.safeParse(formData);
  if (!validatedFields.success) {
    return { success: false, error: MESSAGES.OTHER.INVALID_FIELDS, status: 400 };
  }

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: MESSAGES.OTHER.USER_NOT_AUTHENTICATED, status: 401 };
  }
  const { title, ...weekData } = validatedFields.data;

  const startDate = calculateStartDate(weekData);
  const endDate = calculateEndDate(startDate);

  try {
    const nicca = await prisma.nicca.create({
      data: {
        userId: session.user.id,
        title,
        saurusType: getRandomSaurusType(),
        isActive: true,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        monday: weekData.monday,
        tuesday: weekData.tuesday,
        wednesday: weekData.wednesday,
        thursday: weekData.thursday,
        friday: weekData.friday,
        saturday: weekData.saturday,
        sunday: weekData.sunday,
      },
    });

    await prisma.achievementDate.create({
      data: {
        niccaId: nicca.id,
        achievedDate: null,
      },
    });

    const niccaWithAchievements = await prisma.nicca.findUnique({
      where: { id: nicca.id },
      include: { achievements: true },
    });

    return { success: true, data: niccaWithAchievements, status: 201 };
  } catch (error) {
    console.error('Nicca creation error:', error);
    return { success: false, error: MESSAGES.FLASH_MESSAGES.NICCA_CREATION_ERROR, status: 500 };
  }
};
