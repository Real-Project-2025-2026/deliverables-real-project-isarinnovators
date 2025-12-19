"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, ThumbsUp, MessageSquare, Send, Flag } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { de } from "date-fns/locale"

// Mock discussion data with full thread
const DISCUSSION_DATA: Record<string, any> = {
  "1": {
    id: "1",
    title: "Diskussion zum Haushalt 2025",
    author: "BürgerMax",
    authorInitials: "BM",
    content: `Ich finde die Investitionen in Bildung sehr wichtig und freue mich, dass die Gemeinde hier einen Schwerpunkt setzt. 

Allerdings frage ich mich, ob die geplanten 2,5 Millionen Euro für die Grundschulsanierung ausreichen werden. Meiner Meinung nach sollten wir auch die digitale Ausstattung nicht vernachlässigen.

Was denkt ihr darüber? Sollten wir mehr Mittel für die Digitalisierung bereitstellen?`,
    likes: 45,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    tags: ["Haushalt", "Bildung", "Investitionen"],
    replies: [
      {
        id: "r1",
        author: "TechieTina",
        authorInitials: "TT",
        content:
          "Absolut! Die Digitalisierung ist entscheidend für die Zukunft unserer Kinder. Wir sollten mindestens weitere 500.000€ einplanen.",
        likes: 23,
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      },
      {
        id: "r2",
        author: "SparsamStefan",
        authorInitials: "SS",
        content:
          "Ich bin da vorsichtiger. Wir sollten erst die Sanierung abschließen, bevor wir weitere Mittel binden. Der Haushalt ist eh schon knapp.",
        likes: 12,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        id: "r3",
        author: "LehrerinLena",
        authorInitials: "LL",
        content:
          "Als Lehrerin kann ich sagen: Beides ist wichtig. Aber ohne funktionierende Gebäude nützt auch die beste IT nichts. Priorität sollte die Sanierung haben.",
        likes: 34,
        timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000),
      },
    ],
  },
  "2": {
    id: "2",
    title: "Verkehrssituation an der Grundschule",
    author: "MamaMaria",
    authorInitials: "MM",
    content: `Die Verkehrssituation morgens zwischen 7:30 und 8:15 Uhr ist wirklich problematisch. Viele Eltern fahren ihre Kinder direkt bis vor die Schule, wodurch es zu gefährlichen Situationen kommt.

Ich schlage vor, eine "Elternhaltestelle" einzurichten - etwa 200m von der Schule entfernt. Von dort könnten die Kinder den Rest des Weges zu Fuß gehen.

Wie seht ihr das? Hat jemand andere Ideen?`,
    likes: 32,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    tags: ["Verkehr", "Schule", "Sicherheit"],
    replies: [
      {
        id: "r1",
        author: "VerkehrsPeterV",
        authorInitials: "VP",
        content:
          "Sehr gute Idee! In anderen Gemeinden funktioniert das Konzept der Elternhaltestelle bereits hervorragend. Zusätzlich sollten wir aber auch mehr Fahrradständer aufstellen.",
        likes: 18,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        id: "r2",
        author: "BesorgteBarbara",
        authorInitials: "BB",
        content:
          "Ich verstehe die Idee, aber ist es bei schlechtem Wetter zumutbar, dass die Kinder 200m laufen müssen? Vielleicht eine überdachte Haltestelle?",
        likes: 9,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      },
    ],
  },
  "3": {
    id: "3",
    title: "Grünflächen in Unterhaching",
    author: "NaturFreund",
    authorInitials: "NF",
    content: `Mehr Grünflächen würden unsere Gemeinde noch schöner machen und gleichzeitig das Mikroklima verbessern. Ich habe bemerkt, dass einige Brachflächen ungenutzt sind.

Könnten wir diese in kleine Parks oder Urban-Gardening-Projekte umwandeln? Das würde nicht nur die Lebensqualität erhöhen, sondern auch die Gemeinschaft stärken.`,
    likes: 28,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    tags: ["Umwelt", "Grünflächen", "Lebensqualität"],
    replies: [
      {
        id: "r1",
        author: "GärtnerGregor",
        authorInitials: "GG",
        content:
          "Urban Gardening finde ich super! Ich würde mich sofort als Pate für ein solches Projekt melden. Wer macht mit?",
        likes: 15,
        timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
      },
    ],
  },
}

export default function DiscussionDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [newReply, setNewReply] = useState("")
  const [discussion, setDiscussion] = useState<any>(null)
  const [likedReplies, setLikedReplies] = useState<string[]>([])

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    const id = params.id as string
    const data = DISCUSSION_DATA[id]
    if (data) {
      setDiscussion(data)
      setIsLoading(false)
    } else {
      router.push("/community")
    }
  }, [router, params.id])

  const handleSubmitReply = () => {
    if (newReply.trim()) {
      // Add new reply
      const reply = {
        id: `r${Date.now()}`,
        author: "Sie",
        authorInitials: "SIE",
        content: newReply,
        likes: 0,
        timestamp: new Date(),
      }
      setDiscussion({
        ...discussion,
        replies: [...discussion.replies, reply],
      })
      setNewReply("")
    }
  }

  const toggleLike = (replyId: string) => {
    if (likedReplies.includes(replyId)) {
      setLikedReplies(likedReplies.filter((id) => id !== replyId))
    } else {
      setLikedReplies([...likedReplies, replyId])
    }
  }

  const handleReportReply = (replyId: string) => {
    alert("Antwort wurde gemeldet. Unser Moderationsteam wird sie überprüfen.")
  }

  if (isLoading || !discussion) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-6 lg:px-8">
        {/* Back button */}
        <Button variant="ghost" className="mb-4 sm:mb-6 text-sm sm:text-base" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zur Übersicht
        </Button>

        {/* Main discussion post */}
        <Card className="mb-4 sm:mb-6 rounded-xl">
          <CardHeader className="px-4 sm:px-6">
            <div className="flex items-start gap-2.5 sm:gap-4">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-sm sm:text-base">
                  {discussion.authorInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">{discussion.title}</h1>
                <div className="mt-1 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
                  <span className="font-medium">{discussion.author}</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(discussion.timestamp, { addSuffix: true, locale: de })}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                  {discussion.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            {/* Moderation notice */}
            <div className="mt-3 sm:mt-4 rounded-lg bg-muted/50 border border-border/50 p-2.5 sm:p-3 text-xs sm:text-sm">
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Moderationshinweis:</strong> Alle Diskussionen werden moderiert.
                Respektvoller Umgang ist Pflicht.
              </p>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed">{discussion.content}</p>
            <div className="mt-3 sm:mt-4 flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {discussion.likes}
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {discussion.replies.length} Antworten
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold px-1">{discussion.replies.length} Antworten</h2>
          {discussion.replies.map((reply: any) => (
            <Card key={reply.id} className="rounded-xl">
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="flex items-start gap-2.5 sm:gap-4">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs sm:text-sm">
                      {reply.authorInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm flex-wrap">
                      <span className="font-medium">{reply.author}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">
                        {formatDistanceToNow(reply.timestamp, { addSuffix: true, locale: de })}
                      </span>
                    </div>
                    <p className="mt-1.5 sm:mt-2 whitespace-pre-line text-xs sm:text-sm md:text-base leading-relaxed">
                      {reply.content}
                    </p>
                    <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(reply.id)}
                        className="h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm"
                      >
                        <ThumbsUp
                          className={`mr-1 h-3 w-3 sm:h-4 sm:w-4 ${likedReplies.includes(reply.id) ? "fill-primary text-primary" : ""}`}
                        />
                        {reply.likes + (likedReplies.includes(reply.id) ? 1 : 0)}
                      </Button>
                      {/* Report button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm"
                        onClick={() => handleReportReply(reply.id)}
                      >
                        <Flag className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        Melden
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reply form */}
        <Card className="rounded-xl">
          <CardHeader className="px-4 sm:px-6">
            <h3 className="font-semibold text-sm sm:text-base">Ihre Antwort</h3>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
            <Textarea
              placeholder="Teilen Sie Ihre Gedanken mit..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              rows={4}
              className="text-sm sm:text-base"
            />
            <Button
              onClick={handleSubmitReply}
              disabled={!newReply.trim()}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              <Send className="mr-2 h-4 w-4" />
              Antwort senden
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
