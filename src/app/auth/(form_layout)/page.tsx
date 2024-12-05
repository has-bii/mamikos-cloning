import Logo from "@/components/logo"
import { LoginForm } from "@/components/pages/auth/login-form"
import img_sign from "@/assets/auth/image-signin.png"
import Image from "next/image"
import React from "react"
import H2 from "@/components/typography/h2"
import Muted from "@/components/typography/muted"

export default function Page() {
  return (
    <div className="container mx-auto flex h-full items-start justify-center gap-32 px-20">
      <aside className="flex h-full w-[600px] flex-col rounded-2xl bg-[#F2F7FA] p-6 shadow-[4px_4px_4px_0px_rgba(116,113,113,0.12)]">
        <Logo />

        <h1 className="text-10 mt-10 text-5xl font-bold leading-tight">
          Halo, Selamat datang kembali di Basefind
        </h1>

        <figure className="mx-auto mt-20">
          <Image alt="" src={img_sign} quality={100} sizes="50vw" />
        </figure>
      </aside>
      <div className="mt-20 flex w-fit flex-col gap-6">
        <header>
          <H2 className="text-left">Masuk ke Basefind</H2>
          <Muted>Silahkan masukkan informasi akun anda</Muted>
        </header>
        <LoginForm />
      </div>
    </div>
  )
}
