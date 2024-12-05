import Link from "next/link"
import React from "react"
import { buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HomeIcon, LogInIcon, LogOutIcon, UserPenIcon } from "lucide-react"
import { createClient } from "@/utils/supabase/server"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function LoginButton() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user)
    return (
      <Link href="/auth" className={buttonVariants({ className: "ml-auto" })}>
        Masuk
        <LogInIcon />
      </Link>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="ml-auto flex items-center gap-2 focus-visible:outline-none">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {(user.user_metadata.full_name as string)
                .split(" ")
                .map((c) => c[0].toUpperCase())
                .join("")}
            </AvatarFallback>
          </Avatar>

          <p className="font-medium">{(user.user_metadata.full_name as string).split(" ")[0]}</p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <HomeIcon />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <UserPenIcon />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form action="/signout" method="post">
            <button className="flex items-center gap-2 text-sm [&>svg]:size-4 [&>svg]:shrink-0">
              <LogOutIcon />
              Keluar
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
