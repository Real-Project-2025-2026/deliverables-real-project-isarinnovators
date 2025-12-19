"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Star, LogOut, MessageSquare, ThumbsUp, Calendar, TrendingUp, Award, Activity } from "lucide-react"
import { NEWS_DATA } from "@/lib/data/news-data"
import Link from "next/link"

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

export function ProfileView() {
  const router = useRouter()
  const [userName, setUserName] = useState("Benutzer")
  const [userInterests, setUserInterests] = useState<string[]>([])
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [notifications, setNotifications] = useState({
    news: true,
    events: true,
    polls: false,
  })

  useEffect(() => {
    const name = localStorage.getItem("userName")
    const interests = localStorage.getItem("userInterests")
    const favorites = localStorage.getItem("favoriteNews")

    if (name) setUserName(name)
    if (interests) setUserInterests(JSON.parse(interests))
    if (favorites) setFavoriteIds(JSON.parse(favorites))
  }, [])

  const toggleInterest = (id: string) => {
    const newInterests = userInterests.includes(id) ? userInterests.filter((i) => i !== id) : [...userInterests, id]
    setUserInterests(newInterests)
    localStorage.setItem("userInterests", JSON.stringify(newInterests))
  }

  const updateNotificationSetting = (key: keyof typeof notifications, value: boolean) => {
    setNotifications({ ...notifications, [key]: value })
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userName")
    router.push("/")
  }

  const favoriteNews = NEWS_DATA.filter((item) => favoriteIds.includes(item.id))
  const pollVotes = Object.keys(JSON.parse(localStorage.getItem("pollVotes") || "{}")).length

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const stats = [
    { icon: Star, label: "Favoriten", value: favoriteIds.length, color: "text-yellow-500" },
    { icon: ThumbsUp, label: "Abstimmungen", value: pollVotes, color: "text-blue-500" },
    { icon: MessageSquare, label: "Kommentare", value: 0, color: "text-green-500" },
    { icon: Calendar, label: "Events", value: 3, color: "text-purple-500" },
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card className="overflow-hidden rounded-xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold">{userName}</h1>
              <p className="text-sm text-muted-foreground">Bürger aus Unterhaching</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Badge variant="secondary" className="gap-1 text-xs">
                  <Award className="h-3 w-3" />
                  Aktives Mitglied
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Seit November 2024
                </Badge>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2 rounded-xl bg-transparent">
              <LogOut className="h-4 w-4" />
              Abmelden
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className={`rounded-xl card-hover-lift animate-fade-in-up animation-delay-${(index + 1) * 100}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg bg-muted p-3 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Ihre Interessen</CardTitle>
                <CardDescription>Personalisieren Sie Ihren News-Feed</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {INTEREST_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleInterest(category.id)}
                  className={`flex w-full items-center justify-between rounded-xl border-2 p-4 transition-all ${
                    userInterests.includes(category.id)
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium">{category.label}</span>
                  </div>
                  {userInterests.includes(category.id) && <Badge className="shrink-0">Aktiv</Badge>}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-blue-500/10 p-2">
                  <Bell className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle>Benachrichtigungen</CardTitle>
                  <CardDescription>Bleiben Sie auf dem Laufenden</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="news-notifications" className="font-medium">
                    Neue Nachrichten
                  </Label>
                  <p className="text-sm text-muted-foreground">Wichtige Beschlüsse & Updates</p>
                </div>
                <Switch
                  id="news-notifications"
                  checked={notifications.news}
                  onCheckedChange={(checked) => updateNotificationSetting("news", checked)}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="event-notifications" className="font-medium">
                    Veranstaltungen
                  </Label>
                  <p className="text-sm text-muted-foreground">Erinnerungen an Termine</p>
                </div>
                <Switch
                  id="event-notifications"
                  checked={notifications.events}
                  onCheckedChange={(checked) => updateNotificationSetting("events", checked)}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="poll-notifications" className="font-medium">
                    Umfragen
                  </Label>
                  <p className="text-sm text-muted-foreground">Neue Abstimmungen verfügbar</p>
                </div>
                <Switch
                  id="poll-notifications"
                  checked={notifications.polls}
                  onCheckedChange={(checked) => updateNotificationSetting("polls", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-green-500/10 p-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <CardTitle>Ihre Aktivität</CardTitle>
                  <CardDescription>Letzte 30 Tage</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Favorisierte Artikel</span>
                  </div>
                  <Badge variant="secondary">{favoriteIds.length}</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Abgegebene Stimmen</span>
                  </div>
                  <Badge variant="secondary">{pollVotes}</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Gewählte Interessen</span>
                  </div>
                  <Badge variant="secondary">{userInterests.length}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {favoriteNews.length > 0 && (
        <Card className="rounded-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-yellow-500/10 p-2">
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <CardTitle>Ihre Favoriten</CardTitle>
                <CardDescription>Wichtige Artikel auf einen Blick</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="group flex flex-col gap-3 rounded-xl border p-4 transition-all hover:border-primary hover:shadow-md card-hover-lift"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.categoryIcon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary line-clamp-2">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
