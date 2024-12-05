import React from "react"

type Props = {
  children: React.ReactNode
}

export default function Muted({ children }: Props) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}
