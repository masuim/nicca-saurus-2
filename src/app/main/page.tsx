import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { MainContent } from '@/components/main/MainContent';
import { Suspense } from 'react';
import { Loading } from '@/components/ui/Loading';

export default async function MainPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <Suspense fallback={<Loading />}>
      <MainContent />
    </Suspense>
  );
}
