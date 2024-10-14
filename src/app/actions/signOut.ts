'use server';

import { signOut } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

export async function serverSignOut() {
  const session = await getServerSession(authOptions);
  if (session) {
    await signOut({ redirect: false, callbackUrl: '/' });
    return { success: true };
  }
  return { success: false, error: 'サインアウトに失敗しました' };
}
