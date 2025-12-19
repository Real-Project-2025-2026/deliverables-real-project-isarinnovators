"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { CalendarView } from "@/components/calendar/calendar-view"
import { CalendarIcon } from "lucide-react"

export default function CalendarPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary">
            <CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Termine & Veranstaltungen
          </div>
          <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl font-bold">Veranstaltungen & Termine</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Bleiben Sie informiert über Gemeinderatssitzungen und Bürgerbeteiligungen
          </p>
        </div>
        <div className="animate-fade-in-up animation-delay-100">
          <CalendarView />
        </div>
      </div>
    </DashboardLayout>
  )
}
