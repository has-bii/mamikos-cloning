"use client"

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
import React from "react"
import { EyeClosedIcon, EyeIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"

const FormSchema = z
  .object({
    full_name: z.string().min(6, "Minimal 6 karakter!").max(100, "Maksimal 100 karakter").trim(),
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
    confirmPassword: z.string().trim(),
    information: z.boolean().default(false).optional(),
  })
  .superRefine((v, ctx) => {
    if (v.password !== v.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Password tidak sama!",
      })
    }
  })

export function RegisterForm() {
  const [show, setShow] = React.useState(false)
  const [show2, setShow2] = React.useState(false)
  const supabase = createClient()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      information: false,
    },
  })

  async function onSubmit(payload: z.infer<typeof FormSchema>) {
    const toast_id = toast.loading("Mendaftarkan...", { duration: Infinity })
    try {
      const { full_name, email, password, information } = payload

      console.log(payload)

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            get_info: information,
          },
        },
      })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("Akun anda berhasil didaftarkan. Cek email untuk verifikasi akun.")
        form.reset()
      }
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
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">Nama Lengkap</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan nama lengkap sesuai identitas"
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">Ulang Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Masukkan kembali password"
                    className="h-12 rounded-lg border-none bg-[#F2F7FA] shadow-[0px_4px_4px_0px_rgba(103,103,103,0.10)]"
                    {...field}
                    type={show2 ? "text" : "password"}
                  />
                  {show2 ? (
                    <EyeIcon
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      role="button"
                      onClick={() => setShow2(false)}
                      size={20}
                    />
                  ) : (
                    <EyeClosedIcon
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      role="button"
                      onClick={() => setShow2(true)}
                      size={20}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="information"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0 py-3">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Saya bersedia menerima update informasi dari Basefind</FormLabel>
            </FormItem>
          )}
        />

        <Button className="h-12 w-full text-lg font-bold" type="submit">
          Daftar
        </Button>

        <p className="text-center text-sm">
          Dengan membuat akun, saya setuju dengan&nbsp;
          <Link href="/" className={buttonVariants({ variant: "link", size: "no_padding" })}>
            Syarat dan Ketentuan
          </Link>
          , dan&nbsp;
          <Link href="/" className={buttonVariants({ variant: "link", size: "no_padding" })}>
            Ketentuan Privasi
          </Link>
          &nbsp; Basefind
        </p>

        <p className="text-center text-sm">
          Sudah memiliki akun?&nbsp;
          <Link href="/auth" className={buttonVariants({ variant: "link", size: "no_padding" })}>
            Masuk
          </Link>
        </p>
      </form>
    </Form>
  )
}
