import React from "react"

type Props = {
  children: React.ReactNode
}

export default function H4({ children }: Props) {
  return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{children}</h4>
}
