import React from "react"
import LoginButton from "./login-button"
import Logo from "./logo"

export default function Navtop() {
  return (
    <nav className="w-full border-b py-6">
      <div className="container mx-auto flex items-center gap-6">
        <Logo />

        {/* Login Button */}
        <React.Suspense>
          <LoginButton />
        </React.Suspense>
      </div>
    </nav>
  )
}
