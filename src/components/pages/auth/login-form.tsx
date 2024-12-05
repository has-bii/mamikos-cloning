"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { EyeClosedIcon, EyeIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email tidak valid!",
    })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Minimal 8 karakter!" })
    .max(64, { message: "Maksimal 64 karakter" })
    .trim(),
  remember: z.boolean().default(false).optional(),
})

export function LoginForm() {
  const [show, setShow] = React.useState(false)
  const supabase = createClient()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  async function onSubmit(payload: z.infer<typeof FormSchema>) {
    const toast_id = toast.loading("Mengirim permintaan...", { duration: Infinity })
    try {
      const { email, password } = payload

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      router.refresh()
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
    toast.dismiss(toast_id)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan Email aktif"
                  className="h-12 rounded-lg border-none bg-[#F2F7FA] shadow-[0px_4px_4px_0px_rgba(103,103,103,0.10)]"
                  {...field}
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
              <FormLabel className="text-xl font-bold">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Minimal 8 karakter"
                    className="h-12 rounded-lg border-none bg-[#F2F7FA] shadow-[0px_4px_4px_0px_rgba(103,103,103,0.10)]"
                    {...field}
                    type={show ? "text" : "password"}
                  />
                  {show ? (
                    <EyeIcon
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      role="button"
                      onClick={() => setShow(false)}
                      size={20}
                    />
                  ) : (
                    <EyeClosedIcon
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      role="button"
                      onClick={() => setShow(true)}
                      size={20}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="py- flex w-full items-center justify-between">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Ingat saya</FormLabel>
              </FormItem>
            )}
          />

          <Link href="/auth/forgot" className={buttonVariants({ variant: "link" })}>
            Lupa Password
          </Link>
        </div>

        <Button className="h-12 w-full text-lg font-bold" type="submit">
          Masuk
        </Button>

        <p className="text-center text-sm">
          Belum memiliki akun?&nbsp;
          <Link
            href="/auth/register"
            className={buttonVariants({ variant: "link", className: "px-0", size: "no_padding" })}
          >
            Daftar
          </Link>
        </p>
      </form>
    </Form>
  )
}
