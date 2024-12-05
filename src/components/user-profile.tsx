"use client"

import React, { useCallback, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { Skeleton } from "./ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HomeIcon, LogOutIcon, UserPenIcon } from "lucide-react"
import Link from "next/link"

export default function UserProfile() {
  const supabase = createClient()
  const [user, setUser] = React.useState<User | null>(null)

  const fetchUser = useCallback(async () => {
    const { data } = await supabase.auth.getUser()

    setUser(data.user)
  }, [supabase])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className="inline-flex w-full items-center gap-3 rounded-lg p-2 hover:bg-blue-400/10"
            role="button"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {(user?.user_metadata?.full_name as string)
                  ?.split(" ")
                  .map((v) => v[0].toUpperCase())
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p
                className="text-deep-blue max-w-[460px] overflow-hidden truncate font-bold"
                title={user?.user_metadata?.full_name}
              >
                {user?.user_metadata?.full_name}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
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

  return <Skeleton className="h-[60px] w-full" />
}
