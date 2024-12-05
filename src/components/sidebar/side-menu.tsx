"use client"

import React from "react"
import { HomeIcon, HotelIcon, UserPen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const menus = [
  {
    href: "/dashboard",
    icon: HomeIcon,
    label: "Dashboard",
  },
  {
    href: "/kos",
    icon: HotelIcon,
    label: "Kos",
  },
  {
    href: "/profile",
    icon: UserPen,
    label: "Profile",
  },
]

export default function SideMenu() {
  const pathname = usePathname()

  return (
    <ul className="mt-4 w-full space-y-3">
      {menus.map((menu) => (
        <li key={menu.href}>
          <Link
            href={menu.href}
            className={cn(
              "inline-flex w-full items-center gap-2 rounded-xl p-3",
              pathname === menu.href ? "bg-deep-blue text-white" : "text-deep-blue"
            )}
          >
            <menu.icon />

            {menu.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
