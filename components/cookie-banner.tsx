"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent")
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-3 sm:p-4 md:p-6 z-50 mb-16 md:mb-0 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col gap-3 sm:gap-4">
        <div className="flex-1">
          <h3 className="font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Cookie-Einstellungen</h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Wir verwenden Cookies, um die Website funktionsfähig zu halten. Erfahren Sie mehr in unserer{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Datenschutzerklärung
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="default"
            onClick={handleReject}
            className="w-full sm:w-auto bg-transparent text-sm sm:text-base h-10 sm:h-9"
          >
            Ablehnen
          </Button>
          <Button size="default" onClick={handleAccept} className="w-full sm:w-auto text-sm sm:text-base h-10 sm:h-9">
            Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  )
}
