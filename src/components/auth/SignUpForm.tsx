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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { signUp } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: '名前は2文字以上で入力してください。',
    }),
    email: z.string().email({
      message: '有効なメールアドレスを入力してください。',
    }),
    password: z.string().min(8, {
      message: 'パスワードは8文字以上で入力してください。',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません。',
    path: ['confirmPassword'],
  });

type Props = {
  setIsSignUp: (isSignUp: boolean) => void;
};

export const SignUpForm = ({ setIsSignUp }: Props) => {
  const [focusedField, setFocusedField] = useState<string | null>('name');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await signUp(values);
    if (result.error) {
      setError(result.error);
    } else {
      console.log('サインアップ成功');
      router.push('/main');
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
        <h2 className="text-responsive-title text-center font-bold">サインアップ</h2>
        {error && <p className="text-red-500">{error}</p>}
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit" className="text-responsive-sm mt-[8px] w-full py-5 text-white">
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
