"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { CommunityView } from "@/components/community/community-view"
import { Users } from "lucide-react"

export default function CommunityPage() {
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
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Bürgerbeteiligung
          </div>
          <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl font-bold">Community & Diskussionen</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Beteiligen Sie sich an Umfragen, Diskussionen und stellen Sie Fragen an die Gemeinde
          </p>
        </div>
        <CommunityView />
      </div>
    </DashboardLayout>
  )
}
