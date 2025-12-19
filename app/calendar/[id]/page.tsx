"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ArrowLeft, Bell, FileText, MessageSquare } from "lucide-react"
import { format, parseISO } from "date-fns"
import { de } from "date-fns/locale"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Mock event data - in real app would come from database
const EVENTS = [
  {
    id: "1",
    title: "Gemeinderatssitzung",
    date: "2025-12-20",
    time: "18:00 - 22:00 Uhr",
    location: "Rathaus Unterhaching",
    description: "Öffentliche Sitzung des Gemeinderats. Bürger sind herzlich eingeladen.",
    type: "meeting" as const,
    details:
      "Dies ist die ordentliche Gemeinderatssitzung im Dezember. Auf der Tagesordnung stehen wichtige Beschlüsse zu Bauvorhaben, dem Haushalt 2026 und verschiedene Bürgeranträge.",
    agenda: [
      "Genehmigung der Niederschrift der letzten Sitzung",
      "Haushaltsentwurf 2026",
      "Bauvorhaben Lohestraße - Beschlussfassung",
      "Bürgeranträge und Anfragen",
      "Verschiedenes",
    ],
    attendees: 24,
    documents: [
      { name: "Tagesordnung.pdf", size: "125 KB" },
      { name: "Haushaltsentwurf_2026.pdf", size: "2.4 MB" },
    ],
  },
  // Add more events as needed
]

export default function EventDetailPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [isReminded, setIsReminded] = useState(false)
  const [comment, setComment] = useState("")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) return null

  const event = EVENTS.find((e) => e.id === eventId) || EVENTS[0]

  const EVENT_TYPE_LABELS = {
    meeting: "Sitzung",
    survey: "Umfrage",
    workshop: "Workshop",
  }

  const EVENT_TYPE_COLORS = {
    meeting: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    survey: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    workshop: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Zurück zum Kalender
        </Button>

        <div className="space-y-6">
          {/* Header */}
          <Card className="rounded-xl">
            <CardHeader>
              <div className="mb-4 flex items-start justify-between gap-4">
                <Badge className={EVENT_TYPE_COLORS[event.type]}>{EVENT_TYPE_LABELS[event.type]}</Badge>
                <div className="text-right">
                  <div className="text-sm font-semibold text-primary">
                    {format(parseISO(event.date), "dd. MMMM yyyy", { locale: de })}
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl">{event.title}</CardTitle>
              <p className="mt-2 text-muted-foreground">{event.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium">Zeit</div>
                    <div className="text-sm text-muted-foreground">{event.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium">Ort</div>
                    <div className="text-sm text-muted-foreground">{event.location}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsReminded(!isReminded)}
                  variant={isReminded ? "default" : "outline"}
                  className="flex-1 gap-2"
                >
                  <Bell className="h-4 w-4" />
                  {isReminded ? "Erinnerung aktiviert" : "Erinnerung setzen"}
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Calendar className="h-4 w-4" />
                  Zu Kalender hinzufügen
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="documents">Dokumente</TabsTrigger>
              <TabsTrigger value="discussion">Diskussion</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>Beschreibung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{event.details}</p>

                  {event.agenda && (
                    <div>
                      <h3 className="mb-3 font-semibold">Tagesordnung</h3>
                      <ol className="space-y-2">
                        {event.agenda.map((item, index) => (
                          <li key={index} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">{index + 1}.</span>
                            {item}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {event.attendees && (
                    <div className="flex items-center gap-2 rounded-lg border p-3">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm">
                        <span className="font-medium">{event.attendees}</span> Personen interessieren sich für diese
                        Veranstaltung
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>Dokumente & Unterlagen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {event.documents?.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <div className="text-sm font-medium">{doc.name}</div>
                            <div className="text-xs text-muted-foreground">{doc.size}</div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="mt-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Diskussion
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Ihre Gedanken zu dieser Veranstaltung..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                    />
                    <Button className="w-full">Kommentar abschicken</Button>
                  </div>

                  <div className="pt-4 text-center text-sm text-muted-foreground">
                    Noch keine Kommentare. Seien Sie der Erste!
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
