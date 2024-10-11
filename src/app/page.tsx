'use client';

import { useState } from 'react';
import { SignUpForm } from '@/components/modules/auth/SignUpForm';
import { SignInForm } from '@/components/modules/auth/SignInForm';

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="flex justify-center items-center h-screen">
      {isSignUp ? (
        <SignUpForm setIsSignUp={setIsSignUp} />
      ) : (
        <SignInForm setIsSignUp={setIsSignUp} />
      )}
    </div>
  );
}
