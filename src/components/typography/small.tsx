import React from "react"

type Props = {
  children: React.ReactNode
}

export default function Small({ children }: Props) {
  return <small className="text-sm font-medium leading-none">{children}</small>
}
