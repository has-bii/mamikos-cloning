import Image from "next/image"
import React from "react"
import bg_image from "@/assets/auth/bg-auth.jpg"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <main className="relative flex min-h-screen w-screen items-center justify-center overflow-hidden overflow-x-hidden py-20">
      <Image
        alt="background_image"
        src={bg_image}
        fill
        className="-z-10 object-cover opacity-20"
        quality={100}
        sizes="100vw"
      />
      {children}
    </main>
  )
}
