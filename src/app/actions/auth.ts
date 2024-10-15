'use server';

import { signUpSchema, type SignUpFormValues } from '@/lib/validations/auth';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function signUp(formData: SignUpFormValues) {
  const validatedFields = signUpSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: '無効なフィールドがあります。' };
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
        return { error: 'このメールアドレスは既に登録されています。' };
      }
    }
    return { error: 'ユーザーの作成に失敗しました。' };
  }
}
