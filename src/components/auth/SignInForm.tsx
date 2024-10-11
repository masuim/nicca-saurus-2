'use client'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react'

const formSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください。",
  }),
  password: z.string().min(8, {
    message: "パスワードは8文字以上で入力してください。",
  }),
})

type Props = {
  setIsSignUp: (isSignUp: boolean) => void;
};

export const SignInForm = ({ setIsSignUp }: Props) => {
  const [focusedField, setFocusedField] = useState<string | null>('email')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
        <h2 className="text-responsive-title font-bold text-center">サインイン</h2>
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
          <Button type="submit" className="w-full text-responsive-sm text-white py-5 mt-[8px]">サインイン</Button>
          <p className="text-responsive-xs text-center text-muted-foreground mt-2">
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
}
