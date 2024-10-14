'use client';

import { useState } from 'react';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { SignInForm } from '@/components/auth/SignInForm';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const InfoText = ({ className }: { className?: string }) => (
  <>
    <p className={cn('text-responsive-xs whitespace-nowrap', className)}>
      日課を続けるとあなたも恐竜も一緒に成長します。
    </p>
    <p className={cn('text-responsive-xs mt-2 whitespace-pre-wrap', className)}>
      サボると最初からやり直し！
      <br />
      恐竜が大人になるまで頑張って続けよう！
    </p>
  </>
);

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="relative hidden flex-col items-center justify-center bg-mainColor p-12 md:flex md:w-1/2">
        <div className="w-full max-w-md">
          <Image
            src="/images/logos/bg-removed-logo.png"
            alt="Nicca Saurus Logo"
            width={400}
            height={400}
            className="mx-auto w-3/4 object-contain xl:w-full"
          />
        </div>
        <div className="w-full max-w-md px-4 text-center text-white">
          <h2 className="text-responsive-title mb-4 font-bold">恐竜マスターになろう！</h2>
          <InfoText className="mt-2" />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
        <div className="flex w-full max-w-md flex-col items-center justify-center">
          <div className="mb-8 pr-2 md:hidden">
            <Image
              src="/images/app-name/app-name.png"
              alt="Nicca Saurus Logo"
              width={300}
              height={100}
              className="mx-auto object-contain"
            />
          </div>
          {isSignUp ? (
            <SignUpForm setIsSignUp={setIsSignUp} />
          ) : (
            <SignInForm setIsSignUp={setIsSignUp} />
          )}
          <div className="mt-8 text-center md:hidden">
            <h2 className="mb-4 text-xl font-bold">恐竜マスターになろう！</h2>
            <InfoText className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
