'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useFlashMessage } from '@/providers/FlashMessageProvider';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignInFormValues, signInSchema } from '@/lib/schema/auth';

type Props = {
  setIsSignUp: (isSignUp: boolean) => void;
};

export const SignInForm = ({ setIsSignUp }: Props) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();
  const { showFlashMessage } = useFlashMessage();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        showFlashMessage(result.error, 'error');
        return;
      }
      showFlashMessage('サインインに成功しました', 'success');
      router.push('/main');
    } catch (error) {
      showFlashMessage('サインイン中に予期せぬエラーが発生しました', 'error');
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-responsive-xs w-full max-w-sm space-y-6 rounded-lg bg-gray-50 p-6 shadow-md sm:px-6 md:px-8"
      >
        <h2 className="text-responsive-title text-center font-bold">サインイン</h2>
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit" className="text-responsive-sm mt-[8px] w-full py-5 text-white">
            サインイン
          </Button>
          <p className="text-responsive-xs mt-2 text-center text-muted-foreground">
            <span className="text-[0.7em]">アカウントをお持ちでない方は、</span>
            <button
              onClick={() => setIsSignUp(true)}
              className="text-[0.8em] text-primary hover:underline"
            >
              サインアップ
            </button>
            <span className="text-[0.7em]">へ</span>
          </p>
        </div>
      </form>
    </Form>
  );
};
