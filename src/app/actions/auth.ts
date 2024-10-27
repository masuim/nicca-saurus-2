'use server';

import { signUpSchema, type SignUpFormValues } from '@/lib/schema/auth';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { MESSAGES } from '@/constants/messages';
import { ApiResult } from '@/types/api-result';

export const signUp = async (
  formData: SignUpFormValues,
): Promise<ApiResult<{ success: true } | null>> => {
  const validatedFields = signUpSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { success: false, error: MESSAGES.OTHER.INVALID_FIELDS, status: 400 };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return { success: true, data: { success: true }, status: 201 };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: MESSAGES.FLASH_MESSAGES.EMAIL_ALREADY_REGISTERED,
          status: 409,
        };
      }
    }
    return { success: false, error: MESSAGES.FLASH_MESSAGES.SIGN_UP_ERROR, status: 500 };
  }
};
