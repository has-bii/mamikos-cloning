import React from "react"
import logo_img from "@/assets/logo.svg"
import Image from "next/image"
import Link from "next/link"

type Props = {
  href?: string
}

export default function Logo({ href = "/" }: Props) {
  return (
    <Link href={href}>
      <Image alt="logo" src={logo_img} quality={100} priority />
    </Link>
  )
}
