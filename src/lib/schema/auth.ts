import { z } from 'zod';

export const emailSchema = z.string().email({
  message: '有効なメールアドレスを入力してください。',
});

export const passwordSchema = z.string().min(8, {
  message: 'パスワードは8文字以上で入力してください。',
});

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = signInSchema
  .extend({
    name: z.string().min(2, {
      message: '名前は2文字以上で入力してください。',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません。',
    path: ['confirmPassword'],
  });

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
