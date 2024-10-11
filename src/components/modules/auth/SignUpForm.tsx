'use client'
import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

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

export const SignUpForm = () => {
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

return (
<Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>サインアップ</CardTitle>
                <CardDescription>新しいアカウントを作成します。</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>名前</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                    <Input type="email" {...field} />
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
                                    <Input type="password" {...field} />
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
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full">サインアップ</Button>
                <p className="text-sm text-center">
                    すでにアカウントをお持ちの方は、<br />
                    <a href="/signin" className="text-primary hover:underline">
                        サインイン
                    </a>
                    へ
                </p>
            </CardFooter>
        </Card>
    </form>
</Form>
);

}
