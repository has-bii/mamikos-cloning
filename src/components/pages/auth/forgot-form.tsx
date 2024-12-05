"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"

const FormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email tidak valid!",
    })
    .trim(),
})

export function ForgotForm() {
  const supabase = createClient()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit({ email }: z.infer<typeof FormSchema>) {
    const toast_id = toast.loading("Meminta...", { duration: Infinity })
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success("Email pemulihan akun telah dikirim ke email Anda.")
      form.reset()
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
    toast.dismiss(toast_id)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2 px-6">
        <div className="flex w-full flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Masukkan Email"
                    className="h-12 w-full rounded-lg border-none bg-[#F2F7FA] shadow-[0px_4px_4px_0px_rgba(103,103,103,0.10)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="h-12 w-full bg-[#121B60] text-lg font-bold" type="submit">
            Reset password
          </Button>
        </div>

        <Link href="/auth" className={buttonVariants({ variant: "link", className: "px-0" })}>
          <ArrowLeftIcon />
          Masuk
        </Link>
      </form>
    </Form>
  )
}
