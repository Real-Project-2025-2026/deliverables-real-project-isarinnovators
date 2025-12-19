"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Home,
  Newspaper,
  Calendar,
  MessageSquare,
  User,
  Menu,
  X,
  Search,
  Languages,
  MapPin,
} from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { RatsRadarLogo } from "@/components/logo"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { language, setLanguage, t } = useI18n()

  const NAV_ITEMS = [
    {
      id: "dashboard",
      label: language === "de" ? "Startseite" : "Home",
      mobileLabel: language === "de" ? "Start" : "Home",
      icon: Home,
      href: "/dashboard",
    },
    {
      id: "gemeinde",
      label: language === "de" ? "Meine Gemeinde" : "My Town",
      mobileLabel: language === "de" ? "Gemeinde" : "Town",
      icon: Building2,
      href: "/gemeinde",
    },
    { id: "news", label: "News", mobileLabel: "News", icon: Newspaper, href: "/news" },
    {
      id: "calendar",
      label: language === "de" ? "Kalender" : "Calendar",
      mobileLabel: language === "de" ? "Kalender" : "Calendar",
      icon: Calendar,
      href: "/calendar",
    },
    { id: "community", label: "Community", mobileLabel: "Community", icon: MessageSquare, href: "/community" },
    {
      id: "profile",
      label: language === "de" ? "Profil" : "Profile",
      mobileLabel: language === "de" ? "Profil" : "Profile",
      icon: User,
      href: "/profile",
    },
  ]

  const BOTTOM_NAV_ITEMS = NAV_ITEMS.filter((item) => item.id !== "profile")

  const toggleLanguage = () => {
    setLanguage(language === "de" ? "en" : "de")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <RatsRadarLogo className="w-10 h-10" />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold leading-tight">RatsRadar</h1>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" style={{ color: "#3177E6" }} />
                  <span>Unterhaching</span>
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    onClick={() => router.push(item.href)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                )
              })}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                title={language === "de" ? "Switch to English" : "Auf Deutsch wechseln"}
              >
                <Languages className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => router.push("/search")}>
                <Search className="h-5 w-5" />
              </Button>
            </nav>

            {/* Mobile Menu Button & Profile */}
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                title={language === "de" ? "Switch to English" : "Auf Deutsch wechseln"}
              >
                <Languages className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/profile")}
                className={pathname === "/profile" ? "text-primary" : ""}
              >
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => router.push("/search")}>
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="border-t bg-background pb-4 md:hidden">
              <nav className="flex flex-col gap-1 pt-4">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "secondary" : "ghost"}
                      onClick={() => {
                        router.push(item.href)
                        setMobileMenuOpen(false)
                      }}
                      className="justify-start gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  )
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="pb-20 md:pb-8">{children}</main>

      {/* Bottom Navigation (Mobile) - Only 5 items */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background pb-safe md:hidden">
        <div className="grid grid-cols-5">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.href)}
                className={`flex flex-col items-center gap-1 py-4 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.mobileLabel}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
