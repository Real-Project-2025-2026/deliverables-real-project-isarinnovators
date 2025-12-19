"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Building2, ArrowRight } from "lucide-react"

const INTEREST_CATEGORIES = [
  { id: "politics", label: "Politik & Gemeinderatsbeschlüsse", icon: "🏛️" },
  { id: "infrastructure", label: "Infrastruktur & Verkehr", icon: "🚴" },
  { id: "environment", label: "Umwelt & Energie", icon: "🌱" },
  { id: "social", label: "Soziales & Kultur", icon: "🎭" },
  { id: "events", label: "Veranstaltungen & Feste", icon: "🎉" },
  { id: "waste", label: "Abfall & öffentliche Dienste", icon: "♻️" },
  { id: "safety", label: "Sicherheit & Notfälle", icon: "🚨" },
  { id: "housing", label: "Wohnen & Bauen", icon: "🏗️" },
]

export function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleComplete = () => {
    localStorage.setItem("userInterests", JSON.stringify(selectedInterests))
    localStorage.setItem("onboardingComplete", "true")
    router.push("/dashboard")
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const canProceed = step === 3 ? selectedInterests.length > 0 : true

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <Card>
            <CardHeader className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                <Building2 className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-3xl">Willkommen!</CardTitle>
              <CardDescription className="text-base">
                Diese App hilft Ihnen, über lokale politische Entscheidungen in Unterhaching informiert zu bleiben
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Personalisierte Nachrichten</p>
                    <p className="text-sm text-muted-foreground">
                      Erhalten Sie Updates zu Themen, die Sie interessieren
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Gemeinderatssitzungen</p>
                    <p className="text-sm text-muted-foreground">Bleiben Sie über anstehende Sitzungen informiert</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Mitbestimmen</p>
                    <p className="text-sm text-muted-foreground">Nehmen Sie an Umfragen teil und kommentieren Sie</p>
                  </div>
                </div>
              </div>
              <Button onClick={handleNext} className="w-full" size="lg">
                Los geht's
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Municipality Selection */}
        {step === 2 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Wählen Sie Ihre Gemeinde</CardTitle>
              <CardDescription>Derzeit ist nur Unterhaching verfügbar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <button
                onClick={handleNext}
                className="w-full rounded-lg border-2 border-primary bg-primary/5 p-6 text-left transition-colors hover:bg-primary/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Unterhaching</h3>
                    <p className="text-sm text-muted-foreground">Bayern, Deutschland</p>
                  </div>
                  <Check className="h-6 w-6 text-primary" />
                </div>
              </button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Interest Selection */}
        {step === 3 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ihre Interessen</CardTitle>
              <CardDescription>Wählen Sie Themen aus, über die Sie informiert werden möchten</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {INTEREST_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleInterest(category.id)}
                    className={`rounded-lg border-2 p-4 text-left transition-all ${
                      selectedInterests.includes(category.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium leading-tight">{category.label}</p>
                      </div>
                      {selectedInterests.includes(category.id) && <Check className="h-5 w-5 shrink-0 text-primary" />}
                    </div>
                  </button>
                ))}
              </div>
              <div className="pt-4">
                <Button onClick={handleComplete} disabled={!canProceed} className="w-full" size="lg">
                  Fertig
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {selectedInterests.length > 0 && (
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    {selectedInterests.length} {selectedInterests.length === 1 ? "Thema" : "Themen"} ausgewählt
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
