import React from "react"

type Props = {
  children: React.ReactNode
}

export function ListContainer({ children }: Props) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
}

export function List({ children }: Props) {
  return <li>{children}</li>
}
