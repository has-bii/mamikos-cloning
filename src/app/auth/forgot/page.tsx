import Logo from "@/components/logo"
import { ForgotForm } from "@/components/pages/auth/forgot-form"
import H2 from "@/components/typography/h2"
import Muted from "@/components/typography/muted"
import React from "react"

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col gap-10 py-20">
      <Logo />
      <main className="flex items-center justify-center">
        <div className="flex max-w-[30rem] flex-col items-center gap-6 rounded-xl bg-[#EAEFF3] px-6 py-10 text-center">
          <div className="">
            <H2>Lupa Password</H2>
            <Muted>
              Silahkan masukkan alamat email kamu pada form dibawah. Jika email terdaftar, maka kami
              akan mengirimkan email untuk mereset password kamu.
            </Muted>
          </div>

          <ForgotForm />
        </div>
      </main>
    </div>
  )
}
