'use client'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "名前は2文字以上で入力してください。",
  }),
  email: z.string().email({
    message: "有効なメールアドレスを入力してください。",
  }),
  password: z.string().min(8, {
    message: "パスワードは8文字以上で入力してください。",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません。",
  path: ["confirmPassword"],
})

type Props = {
  setIsSignUp: (isSignUp: boolean) => void;
};

export const SignUpForm = ({ setIsSignUp }: Props) => {
  const [focusedField, setFocusedField] = useState<string | null>('name')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6 sm:px-6 md:px-8 bg-gray-50 p-6 rounded-lg shadow-md text-responsive-xs">
        <h2 className="text-responsive-title font-bold text-center ">サインアップ</h2>
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
        <Button type="submit" className="w-full text-responsive-sm text-white py-5 mt-[8px]">サインアップ</Button>
        <p className="text-responsive-xs text-center text-muted-foreground mt-2">
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
}
