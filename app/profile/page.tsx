"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProfileView } from "@/components/profile/profile-view"

export default function ProfilePage() {
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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in-down">
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Mein Profil</h1>
          <p className="mt-2 text-pretty text-muted-foreground">Verwalte deine Einstellungen und Präferenzen</p>
        </div>
        <div className="animate-fade-in-up animation-delay-100">
          <ProfileView />
        </div>
      </div>
    </DashboardLayout>
  )
}
