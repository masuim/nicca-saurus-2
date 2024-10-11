'use client';

import { useState } from 'react';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { SignInForm } from '@/components/auth/SignInForm';
import Image from 'next/image';

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-mainColor flex-col justify-center items-center relative p-8">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
          <Image
            src="/images/logos/bg-removed-logo.png"
            alt="Nicca Saurus Logo"
            width={400}
            height={400}
            className="object-contain mx-auto"
          />
        </div>
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center text-white w-full max-w-md px-4">
          <h2 className="text-2xl font-bold mb-4">恐竜マスターになろう！</h2>
          <p className="text-lg whitespace-pre-wrap">
            日課を続けるとあなたも恐竜も一緒に成長します。
            サボると最初からやり直し！
            恐竜が大人になるまで頑張って続けよう！
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
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
            <p className="text-sm">
              日課を続けるとあなたも恐竜も一緒に成長します。
              サボると最初からやり直し！
              恐竜が大人になるまで頑張って続けよう！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
