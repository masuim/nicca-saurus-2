'use server';

import { signUpSchema, type SignUpFormValues } from '@/lib/schema/auth';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { MESSAGES } from '@/constants/messages';

export const signUp = async (formData: SignUpFormValues) => {
  const validatedFields = signUpSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: MESSAGES.OTHER.INVALID_FIELDS };
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
    return { success: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return { error: MESSAGES.FLASH_MESSAGES.EMAIL_ALREADY_REGISTERED };
      }
    }
    return { error: MESSAGES.FLASH_MESSAGES.SIGN_UP_ERROR };
  }
};
