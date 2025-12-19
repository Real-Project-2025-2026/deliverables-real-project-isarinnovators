"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Building2, Phone, Mail, Globe, User, Calendar, TrendingUp } from "lucide-react"

const COUNCIL_SEATS = [
  { party: "CSU", seats: 8, color: "bg-black text-white", leader: "Markus Stiller" },
  { party: "SPD", seats: 6, color: "bg-red-600 text-white", leader: "Johanna Zapf" },
  { party: "Grüne", seats: 5, color: "bg-green-600 text-white", leader: "Martin Bachhuber" },
  { party: "FDP", seats: 3, color: "bg-yellow-500 text-black", leader: "Thomas Weber" },
  { party: "Freie Wähler", seats: 2, color: "bg-orange-600 text-white", leader: "Michael Huber" },
]

const TOTAL_SEATS = COUNCIL_SEATS.reduce((sum, party) => sum + party.seats, 0)

export default function GemeindePage() {
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
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary">
            <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Gemeinde-Informationen
          </div>
          <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl font-bold">Meine Gemeinde</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Alle wichtigen Informationen über Unterhaching und die politische Zusammensetzung des Gemeinderats
          </p>
        </div>

        <div className="mb-6 sm:mb-8 overflow-hidden rounded-xl border bg-card shadow-sm animate-fade-in-up">
          <div className="h-32 sm:h-40 relative w-full">
            <img
              src="/unterhaching-bavaria-germany-aerial-view-town-hall.jpg"
              alt="Unterhaching Luftaufnahme"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                Landkreis München
              </Badge>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-0.5">Unterhaching</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Gemeinde im Landkreis München, Bayern</p>
              </div>
            </div>

            <div className="grid gap-2 sm:gap-3 grid-cols-2 lg:grid-cols-4 mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold">~27.000</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Einwohner</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                  <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold">10,37 km²</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Fläche</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                  <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold">2.603</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">EW/km²</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold">1818</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Ersterwähnung</p>
                </div>
              </div>
            </div>

            <div className="grid gap-2 sm:gap-3 border-t pt-3 sm:pt-4 grid-cols-1 sm:grid-cols-2 text-xs sm:text-sm">
              <div className="space-y-1 sm:space-y-1.5">
                <h3 className="font-semibold text-xs sm:text-sm">Kontakt</h3>
                <div className="space-y-0.5 sm:space-y-1 text-[11px] sm:text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 flex-shrink-0" />
                    <span>089 / 665 600</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span className="break-all">rathaus@unterhaching.de</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 flex-shrink-0" />
                    <span className="break-all">www.unterhaching.de</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1 sm:space-y-1.5">
                <h3 className="font-semibold text-xs sm:text-sm">Adresse</h3>
                <div className="text-[11px] sm:text-xs text-muted-foreground">
                  <p>Rathausplatz 7</p>
                  <p>82008 Unterhaching</p>
                  <p className="mt-1">Bayern, Deutschland</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 sm:mb-8 animate-fade-in-up animation-delay-100">
          <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">Bürgermeister</h2>
          <Card className="rounded-xl">
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <User className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 text-lg sm:text-xl font-bold">Wolfgang Panzer</h3>
                  <p className="mb-2 sm:mb-3 text-xs sm:text-sm text-muted-foreground">
                    Bürgermeister der Gemeinde Unterhaching
                  </p>
                  <div className="grid gap-2 sm:gap-3 grid-cols-1 xs:grid-cols-2">
                    <div>
                      <p className="text-xs sm:text-sm font-semibold">Partei</p>
                      <Badge className="mt-1 bg-red-600 text-white text-xs">SPD</Badge>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold">Im Amt seit</p>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Mai 2008</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold">Amtszeit</p>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">2020 - 2026</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold">Kontakt</p>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground break-all">
                        buergermeister@unterhaching.de
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gemeinderat */}
        <div className="mb-6 sm:mb-8 animate-fade-in-up animation-delay-200">
          <h2 className="mb-4 text-2xl font-bold">Gemeinderat</h2>
          <Card className="rounded-xl">
            <CardHeader>
              <CardTitle>Sitzverteilung</CardTitle>
              <CardDescription>
                Aktuell {TOTAL_SEATS} Sitze im Gemeinderat (Legislaturperiode 2020-2026)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Visual Seats Representation */}
              <div className="mb-6 flex flex-wrap gap-1">
                {COUNCIL_SEATS.map((party) =>
                  Array.from({ length: party.seats }).map((_, i) => (
                    <div
                      key={`${party.party}-${i}`}
                      className={`h-8 w-8 rounded-full ${party.color} flex items-center justify-center text-xs font-bold`}
                      title={party.party}
                    >
                      {party.party.substring(0, 1)}
                    </div>
                  )),
                )}
              </div>

              {/* Party List */}
              <div className="space-y-3">
                {COUNCIL_SEATS.map((party, index) => (
                  <div
                    key={party.party}
                    className={`flex items-center justify-between rounded-lg border p-4 animate-scale-in animation-delay-${(index + 1) * 100}`}
                  >
                    <div className="flex items-center gap-4">
                      <Badge className={`${party.color} px-4 py-2 text-base`}>{party.party}</Badge>
                      <div>
                        <p className="font-semibold">{party.leader}</p>
                        <p className="text-sm text-muted-foreground">Fraktionsvorsitz</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{party.seats}</p>
                      <p className="text-sm text-muted-foreground">{((party.seats / TOTAL_SEATS) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Gesamt Sitze</p>
                    <p className="text-2xl font-bold">{TOTAL_SEATS}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fraktionen</p>
                    <p className="text-2xl font-bold">{COUNCIL_SEATS.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nächste Wahl</p>
                    <p className="text-2xl font-bold">2026</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ausschüsse */}
        <div className="animate-fade-in-up animation-delay-300">
          <h2 className="mb-4 text-2xl font-bold">Ausschüsse</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Hauptausschuss", members: 12, description: "Vorbereitung aller Beschlüsse des Gemeinderats" },
              { name: "Bauausschuss", members: 8, description: "Baugenehmigungen und Stadtentwicklung" },
              { name: "Finanzausschuss", members: 8, description: "Haushaltsplanung und Finanzen" },
              { name: "Kulturausschuss", members: 6, description: "Kulturelle Angelegenheiten und Veranstaltungen" },
              { name: "Sozialausschuss", members: 6, description: "Soziale Belange und Jugendarbeit" },
              { name: "Umweltausschuss", members: 6, description: "Umweltschutz und Nachhaltigkeit" },
            ].map((committee, index) => (
              <Card key={committee.name} className={`rounded-xl animate-scale-in animation-delay-${(index + 1) * 100}`}>
                <CardHeader>
                  <CardTitle className="text-lg">{committee.name}</CardTitle>
                  <CardDescription>{committee.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{committee.members} Mitglieder</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
