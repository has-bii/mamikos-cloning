import Sidebar from "@/components/sidebar/sidebar"
import React from "react"

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="w-full bg-[#EAEFF3]">
      <div className="container mx-auto grid h-screen grid-cols-4 gap-8 overflow-hidden py-8">
        <Sidebar />
        <main className="col-span-3">{children}</main>
      </div>
    </div>
  )
}
