import { cn } from "@/lib/utils"
import React from "react"

type Props = {
  children: React.ReactNode
  className?: string
}

export default function H1({ children, className }: Props) {
  return (
    <h1 className={cn(className, "scroll-m-20 text-5xl font-extrabold tracking-tight")}>
      {children}
    </h1>
  )
}
