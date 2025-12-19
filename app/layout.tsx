import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { I18nProvider } from "@/lib/i18n/context"
import { CookieBanner } from "@/components/cookie-banner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RatsRadar",
  description: "Bleiben Sie informiert über lokale politische Entscheidungen in Ihrer Gemeinde",
  icons: {
    icon: [
      {
        url: "/ratsradar-logo.png",
        type: "image/png",
      },
    ],
    apple: "/ratsradar-logo.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <I18nProvider>
          {children}
          <CookieBanner />
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
