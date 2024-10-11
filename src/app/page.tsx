'use client';

import { useState } from 'react';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { SignInForm } from '@/components/auth/SignInForm';
import Image from 'next/image';

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-mainColor flex-col justify-center items-center relative p-12">
        <div className="w-full max-w-md">
          <Image
            src="/images/logos/bg-removed-logo.png"
            alt="Nicca Saurus Logo"
            width={400}
            height={400}
            className="object-contain mx-auto w-3/4 xl:w-full"
          />
        </div>
        <div className="text-center text-white w-full max-w-md px-4">
          <h2 className="text-responsive-title font-bold mb-4">恐竜マスターになろう！</h2>
          <p className="text-responsive-xs xxs:text-[10px] xs:text-xs whitespace-nowrap">
            日課を続けるとあなたも恐竜も一緒に成長します。
          </p>
          <p className="text-responsive-xs xxs:text-[10px] xs:text-xs whitespace-pre-wrap mt-2">
            サボると最初からやり直し！<br />
            恐竜が大人になるまで頑張って続けよう！
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md flex flex-col justify-center items-center">
          <div className="mb-8 md:hidden">
            <Image
              src="/images/app-name/app-name.png"
              alt="Nicca Saurus Logo"
              width={300}
              height={100}
              className="object-contain mx-auto"
            />
          </div>
          {isSignUp ? (
            <SignUpForm setIsSignUp={setIsSignUp} />
          ) : (
            <SignInForm setIsSignUp={setIsSignUp} />
          )}
          <div className="mt-8 text-center md:hidden">
            <h2 className="text-xl font-bold mb-4">恐竜マスターになろう！</h2>
            <p className="text-[11px] xs:text-[13px]">
              日課を続けるとあなたも恐竜も一緒に成長します。<br />
              サボると最初からやり直し！<br />
              恐竜が大人になるまで頑張って続けよう！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
