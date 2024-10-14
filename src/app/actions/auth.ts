'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signUp(formData: z.infer<typeof signUpSchema>) {
  const validatedFields = signUpSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
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
    // TODO: as使わない実装にする。
    if ((error as { code?: string }).code === 'P2002') {
      return { error: 'このメールアドレスは既に登録されています。' };
    }
    return { error: 'ユーザーの作成に失敗しました。' };
  }
}
