'use client';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/app/actions/auth';
import { signIn } from 'next-auth/react';
import { SignUpFormValues, signUpSchema } from '@/lib/schema/auth';
import { useFlashMessage } from '@/providers/FlashMessageProvider';

type Props = {
  setIsSignUp: (isSignUp: boolean) => void;
};

export const SignUpForm = ({ setIsSignUp }: Props) => {
  const [focusedField, setFocusedField] = useState<string | null>('name');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { showFlashMessage } = useFlashMessage();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const result = await signUp(values);
      if (!result.success) {
        setError(result.error);
        showFlashMessage(result.error, 'error');
      } else {
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: values.email,
          password: values.password,
        });
        if (signInResult?.error) {
          setError('サインアップ後のサインインに失敗しました。');
          showFlashMessage('サインアップ後のサインインに失敗しました。', 'error');
        } else {
          showFlashMessage('サインアップに成功しました', 'success');
          router.push('/main');
        }
      }
    } catch (error) {
      setError('サインアップに失敗しました。もう一度お試しください。');
      showFlashMessage('サインアップに失敗しました。もう一度お試しください。', 'error');
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setTimeout(() => {
      const activeElement = document.activeElement;
      if (activeElement?.tagName !== 'INPUT') {
        setFocusedField(null);
      }
    }, 0);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-responsive-xs w-full max-w-sm space-y-6 rounded-lg bg-gray-50 p-6 shadow-md sm:px-6 md:px-8"
      >
        <h2 className="text-responsive-title text-center font-bold">サインアップ</h2>
        {error && <p className="text-error">{error}</p>}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  isFocused={focusedField === 'name'}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  isFocused={focusedField === 'email'}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  isFocused={focusedField === 'password'}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード（確認）</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  isFocused={focusedField === 'confirmPassword'}
                  onFocus={() => handleFocus('confirmPassword')}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            className="text-responsive-sm mt-[8px] w-full transform py-5 text-white transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
            onClick={form.handleSubmit(onSubmit)}
          >
            サインアップ
          </Button>
          <p className="text-responsive-xs mt-2 text-center text-muted-foreground">
            <span className="text-[0.7em]">すでにアカウントをお持ちの方は、</span>
            <button
              onClick={() => setIsSignUp(false)}
              className="text-[0.8em] text-primary hover:underline"
            >
              サインイン
            </button>
            <span className="text-[0.7em]">へ</span>
          </p>
        </div>
      </form>
    </Form>
  );
};
