'use client';

import { useState } from 'react';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { SignInForm } from '@/components/auth/SignInForm';
import Image from 'next/image';

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-mainColor flex flex-col justify-center items-center relative">
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/logos/bg-removed-logo.png"
            alt="Nicca Saurus Logo"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center text-white w-full px-4">
          <h2 className="text-2xl font-bold mb-2">恐竜マスターになろう！</h2>
          <p className="text-lg whitespace-pre-wrap">
            日課を続けるとあなたも恐竜も一緒に成長します。<br />
            サボると最初からやり直し！<br />
            恐竜が大人になるまで頑張って続けよう！
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-mainColor/30 pointer-events-none"></div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        {isSignUp ? (
          <SignUpForm setIsSignUp={setIsSignUp} />
        ) : (
          <SignInForm setIsSignUp={setIsSignUp} />
        )}
      </div>
    </div>
  );
}
