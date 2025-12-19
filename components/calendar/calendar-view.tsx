"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import { format, parseISO, startOfToday, addDays } from "date-fns"
import { de } from "date-fns/locale"
import { useRouter } from "next/navigation"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  type: "meeting" | "survey" | "workshop"
}

const TODAY = startOfToday()
const formatDate = (d: Date) => format(d, "yyyy-MM-dd")

const EVENTS: Event[] = [
  {
    id: "1",
    title: "Gemeinderatssitzung",
    date: formatDate(addDays(TODAY, 7)), // in 7 Tagen
    time: "18:00 - 22:00 Uhr",
    location: "Rathaus Unterhaching",
    description: "Öffentliche Sitzung des Gemeinderats. Bürger sind herzlich eingeladen.",
    type: "meeting",
  },
  {
    id: "2",
    title: "Online-Befragung Ortsentwicklung endet",
    date: formatDate(addDays(TODAY, 21)), // in 3 Wochen
    time: "23:59 Uhr",
    location: "Online",
    description: "Letzte Chance zur Teilnahme an der Befragung zur Ortsentwicklung.",
    type: "survey",
  },
  {
    id: "3",
    title: "Bürgerwerkstatt Mobilität",
    date: formatDate(addDays(TODAY, 30)), // in 1 Monat
    time: "19:00 - 21:00 Uhr",
    location: "Bürgerhaus Unterhaching",
    description: "Workshop zur Zukunft der Mobilität in Unterhaching.",
    type: "workshop",
  },
  {
    id: "4",
    title: "Gemeinderatssitzung",
    date: formatDate(addDays(TODAY, 14)), // in 2 Wochen
    time: "18:00 - 22:00 Uhr",
    location: "Rathaus Unterhaching",
    description: "Öffentliche Sitzung mit Schwerpunkt Haushalt und Finanzen.",
    type: "meeting",
  },
  {
    id: "5",
    title: "Infoveranstaltung Eisstadion-Neubau",
    date: formatDate(addDays(TODAY, 25)), // in 25 Tagen
    time: "19:30 - 21:30 Uhr",
    location: "Sporthalle Unterhaching",
    description: "Präsentation der Pläne für den Neubau des Eisstadions mit Bürgerfragen.",
    type: "workshop",
  },
  {
    id: "6",
    title: "Zukunftsteams: Abschlusspräsentation",
    date: formatDate(addDays(TODAY, 18)), // in 18 Tagen
    time: "18:00 - 20:30 Uhr",
    location: "Rathaus Unterhaching",
    description: "Die vier Zukunftsteams präsentieren ihre Ergebnisse vor dem Gemeinderat.",
    type: "workshop",
  },
  {
    id: "7",
    title: "Gemeinderatssitzung",
    date: formatDate(addDays(TODAY, 42)), // in 6 Wochen
    time: "18:00 - 22:00 Uhr",
    location: "Rathaus Unterhaching",
    description: "Öffentliche Sitzung des Gemeinderats mit Beschlüssen zu Bauvorhaben.",
    type: "meeting",
  },
  {
    id: "8",
    title: "STADTRADELN-Auftakt 2025",
    date: formatDate(addDays(TODAY, 90)), // in 3 Monaten
    time: "10:00 - 12:00 Uhr",
    location: "S-Bahnhof Unterhaching",
    description: "Gemeinsame Radtour zum Start der STADTRADELN-Kampagne mit dem Bürgermeister.",
    type: "workshop",
  },
  {
    id: "past-1",
    title: "Bürgerdialog Klimaschutz",
    date: formatDate(addDays(TODAY, -10)), // vor 10 Tagen
    time: "19:00 - 21:00 Uhr",
    location: "Rathaus Unterhaching",
    description: "Diskussion über lokale Klimaschutzmaßnahmen.",
    type: "workshop",
  },
  {
    id: "past-2",
    title: "Gemeinderatssitzung",
    date: formatDate(addDays(TODAY, -21)), // vor 3 Wochen
    time: "18:00 - 22:00 Uhr",
    location: "Rathaus Unterhaching",
    description: "Öffentliche Sitzung mit Haushaltsbeschluss.",
    type: "meeting",
  },
]

const EVENT_TYPE_LABELS: Record<Event["type"], string> = {
  meeting: "Sitzung",
  survey: "Umfrage",
  workshop: "Workshop",
}

const EVENT_TYPE_COLORS: Record<Event["type"], string> = {
  meeting: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  survey: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  workshop: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
}

export function CalendarView() {
  const router = useRouter()
  const sortedEvents = [...EVENTS].sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())

  const today = startOfToday()

  const upcomingEvents = sortedEvents.filter((event) => {
    const eventDate = parseISO(event.date)
    return eventDate >= today
  })

  const pastEvents = sortedEvents.filter((event) => {
    const eventDate = parseISO(event.date)
    return eventDate < today
  })

  return (
    <div className="space-y-8">
      {/* Upcoming Events */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">Anstehende Termine</h2>
        {upcomingEvents.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Derzeit keine anstehenden Termine</p>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                onClick={() => router.push(`/calendar/${event.id}`)}
                className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden rounded-xl"
              >
                <CardHeader>
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <Badge className={EVENT_TYPE_COLORS[event.type]}>{EVENT_TYPE_LABELS[event.type]}</Badge>
                    <div className="text-right text-sm font-semibold text-primary">
                      {format(parseISO(event.date), "dd. MMM yyyy", { locale: de })}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="mb-6 text-2xl font-bold">Vergangene Termine</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {pastEvents.map((event) => (
              <Card
                key={event.id}
                onClick={() => router.push(`/calendar/${event.id}`)}
                className="cursor-pointer opacity-60 hover:opacity-80 transition-opacity overflow-hidden rounded-xl"
              >
                <CardHeader>
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <Badge variant="outline" className={EVENT_TYPE_COLORS[event.type]}>
                      {EVENT_TYPE_LABELS[event.type]}
                    </Badge>
                    <div className="text-right text-sm text-muted-foreground">
                      {format(parseISO(event.date), "dd. MMM yyyy", { locale: de })}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
