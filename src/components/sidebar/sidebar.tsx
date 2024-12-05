import React from "react"
import Logo from "@/components/logo"
import { Separator } from "@/components/ui/separator"
import UserProfile from "@/components/user-profile"
import SideMenu from "./side-menu"

export default function Sidebar() {
  return (
    <aside className="bg-whitee col-span-1 flex h-full w-full flex-col gap-6 rounded-3xl p-6 shadow-xl">
      <Logo href="/dashboard" />

      <SideMenu />

      <Separator orientation="horizontal" className="mt-auto" />

      <UserProfile />
    </aside>
  )
}
