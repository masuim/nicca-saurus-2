'use server';

import { prisma } from '@/lib/prisma';
import { NiccaSchema, type NiccaFormValues } from '@/lib/schema/nicca';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiResult } from '@/types/api-result';
import { Nicca, NiccaWithRelations } from '@/types/nicca';
import { SAURUS_TYPES } from '@/lib/schema/saurus-type';
import { MESSAGES } from '@/constants/messages';
import { WEEK_DAYS } from '@/constants/dates';

const getRandomSaurusType = () => {
  const saurusTypes = SAURUS_TYPES.options;
  return saurusTypes[Math.floor(Math.random() * saurusTypes.length)];
};

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

  // startDateを計算
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilStart = WEEK_DAYS.findIndex(
    (day, index) => weekData[day as keyof typeof weekData],
  );
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + ((daysUntilStart + 7 - dayOfWeek) % 7));

  // endDateを計算（startDateから5週間後）
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 35);

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
      if ((error as PrismaClientKnownRequestError).code === 'P2025') {
        return { success: false, error: MESSAGES.FLASH_MESSAGES.NICCA_NOT_FOUND, status: 404 };
      }
    }
    return { success: false, error: MESSAGES.FLASH_MESSAGES.NICCA_DELETION_ERROR, status: 500 };
  }
};

export const addAchievement = async (niccaId: string, date: Date): Promise<ApiResult<void>> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, error: MESSAGES.OTHER.USER_NOT_AUTHENTICATED, status: 401 };
  }

  try {
    await prisma.nicca.update({
      where: { id: niccaId, userId: session.user.id },
      data: {
        achievements: {
          create: {
            achievedDate: date,
          },
        },
      },
    });

    return { success: true, data: undefined, status: 200 };
  } catch (error) {
    console.error('Achievement addition error:', error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: MESSAGES.FLASH_MESSAGES.ACHIEVEMENT_ALREADY_EXISTS,
          status: 400,
        };
      }
    }
    return {
      success: false,
      error: MESSAGES.FLASH_MESSAGES.ACHIEVEMENT_ADDITION_ERROR,
      status: 500,
    };
  }
};
