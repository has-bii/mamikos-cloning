import Navtop from "@/components/navtop"
import React from "react"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="w-screen overflow-x-hidden">
      <Navtop />
      <main className="container mx-auto">{children}</main>
    </div>
  )
}
