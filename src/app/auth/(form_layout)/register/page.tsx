import Logo from "@/components/logo"
import image_reg from "@/assets/auth/image-reg.png"
import Image from "next/image"
import React from "react"
import H2 from "@/components/typography/h2"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { RegisterForm } from "@/components/pages/auth/register-form"

export default function Page() {
  return (
    <div className="container mx-auto flex h-full items-start justify-center gap-32 px-20">
      <aside className="flex h-full w-[600px] flex-col rounded-2xl bg-[#F2F7FA] p-6 shadow-[4px_4px_4px_0px_rgba(116,113,113,0.12)]">
        <Logo />

        <h1 className="text-10 mt-10 text-5xl font-bold leading-tight">
          Ayo bergabung dengan Basefind!
        </h1>

        <figure className="mx-auto mt-20">
          <Image alt="" src={image_reg} quality={100} sizes="50vw" />
        </figure>
      </aside>
      <div className="mt-20 flex w-fit flex-col gap-6">
        <header>
          <div className="flex items-center gap-2">
            <Link href="/auth">
              <ArrowLeftIcon />
            </Link>
            <H2 className="pb-0 text-left">Daftar Akun Pemilik Kos</H2>
          </div>
        </header>
        <RegisterForm />
      </div>
    </div>
  )
}
