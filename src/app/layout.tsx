import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const helvetica = localFont({
  src: [
    {
      path: "./fonts/Helvetica.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Helvetica-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
})

export const metadata: Metadata = {
  title: "Basefind - Cari & Sewa Kost Impianmu Secara Online",
  description:
    "Basefind adalah platform untuk menemukan kos ideal sesuai kebutuhan. Cari kos berdasarkan lokasi, harga, dan fasilitas dengan mudah. Pemilik kos juga dapat mengiklankan propertinya untuk menjangkau lebih banyak penyewa. Temukan atau iklankan kos Anda hanya di Basefind!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${helvetica.className} antialiased`}>
        {children}
        <Toaster richColors theme="light" />
      </body>
    </html>
  )
}
