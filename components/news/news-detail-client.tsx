"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PoliticsBarometer } from "@/components/news/politics-barometer"
import { type NewsItem, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/data/news-data"
import { CalendarIcon, Download, ArrowLeft, ThumbsUp, MessageSquare, Share2, FileText } from "lucide-react"
import { format } from "date-fns"
import { de } from "date-fns/locale"

interface NewsDetailClientProps {
  newsItem: NewsItem
}

export function NewsDetailClient({ newsItem }: NewsDetailClientProps) {
  const router = useRouter()
  const [comment, setComment] = useState("")
  const [userComments, setUserComments] = useState<any[]>([])

  const handleSubmitComment = () => {
    if (!comment.trim()) return

    const newComment = {
      id: Date.now().toString(),
      author: "Aktueller Nutzer",
      content: comment,
      date: new Date().toISOString(),
      likes: 0,
    }

    setUserComments([...userComments, newComment])
    setComment("")
  }

  const handleReportComment = (commentId: string) => {
    alert("Kommentar wurde gemeldet. Unser Moderationsteam wird ihn überprüfen.")
  }

  const existingComments = newsItem.comments || []
  const allComments = [...existingComments, ...userComments]

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 animate-fade-in-up">
      <Button variant="ghost" onClick={() => router.push("/news")} className="mb-4 sm:mb-6 gap-2 text-sm sm:text-base">
        <ArrowLeft className="h-4 w-4" />
        Zurück zur Übersicht
      </Button>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card className="card-hover-lift">
            <CardHeader className="px-4 sm:px-6">
              <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge className={`rounded-full text-xs sm:text-sm ${CATEGORY_COLORS[newsItem.category]}`}>
                  {newsItem.categoryIcon} {CATEGORY_LABELS[newsItem.category]}
                </Badge>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                  <CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {format(new Date(newsItem.date), "dd. MMMM yyyy", { locale: de })}
                </div>
              </div>

              <div className="group/title relative">
                <CardTitle className="text-balance text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
                  {newsItem.title}
                </CardTitle>
                {newsItem.source && (
                  <div className="pointer-events-none absolute -bottom-20 left-0 z-50 w-full max-w-md opacity-0 transition-opacity duration-200 group-hover/title:pointer-events-auto group-hover/title:opacity-100">
                    <div className="rounded-xl border bg-popover px-4 py-3 shadow-xl">
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold mb-1 text-foreground">Quelle:</p>
                          <p className="text-xs text-muted-foreground">{newsItem.source}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <CardDescription className="text-pretty text-sm sm:text-base mt-2">{newsItem.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert">
                {(newsItem.detailedContent || newsItem.content).split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-3 sm:mb-4 text-pretty leading-relaxed text-sm sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Separator />

              {newsItem.tags && newsItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {newsItem.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="rounded-full text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 sm:gap-2 rounded-full bg-transparent text-xs sm:text-sm"
                >
                  <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Hilfreich
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 sm:gap-2 rounded-full bg-transparent text-xs sm:text-sm"
                >
                  <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Teilen
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover-lift">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
                Kommentare ({allComments.length})
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Diskutieren Sie mit anderen Bürgern über dieses Thema
              </CardDescription>
              <div className="mt-2 sm:mt-3 rounded-lg bg-muted/50 border border-border/50 p-2.5 sm:p-3 text-xs sm:text-sm">
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Moderationshinweis:</strong> Alle Kommentare werden moderiert.
                  Beleidigungen, Hassrede und Spam werden nicht toleriert. Bitte bleiben Sie respektvoll und
                  konstruktiv.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-4 sm:px-6">
              {/* Add Comment Form */}
              <div className="space-y-2 sm:space-y-3 rounded-xl bg-muted/30 p-3 sm:p-4 border">
                <Textarea
                  placeholder="Teilen Sie Ihre Meinung zu diesem Beschluss..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="rounded-xl resize-none text-sm sm:text-base"
                />
                <Button
                  onClick={handleSubmitComment}
                  disabled={!comment.trim()}
                  className="rounded-full w-full sm:w-auto text-sm sm:text-base"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Kommentar absenden
                </Button>
              </div>

              <Separator />

              {/* Comments List */}
              <div className="space-y-3 sm:space-y-4">
                {allComments.length > 0 ? (
                  allComments.map((c, index) => (
                    <div
                      key={c.id}
                      className="flex gap-2.5 sm:gap-4 rounded-xl border bg-card p-3 sm:p-4 shadow-sm transition-all hover:shadow-md hover:border-muted-foreground/30 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border flex-shrink-0">
                        <AvatarFallback className="bg-muted text-xs sm:text-sm font-semibold text-foreground">
                          {c.author
                            .split(/[_\s]/)
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="mb-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="font-semibold text-foreground text-sm sm:text-base">{c.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(c.date), "dd. MMM yyyy, HH:mm", { locale: de })} Uhr
                          </span>
                        </div>
                        <p className="mb-2 sm:mb-3 text-pretty text-xs sm:text-sm leading-relaxed text-foreground">
                          {c.content}
                        </p>
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 sm:h-8 gap-1.5 sm:gap-2 rounded-full px-2 sm:px-3 text-muted-foreground hover:text-foreground text-xs sm:text-sm"
                          >
                            <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="font-medium">{c.likes}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 sm:h-8 rounded-full px-2 sm:px-3 text-muted-foreground hover:text-foreground text-xs sm:text-sm"
                          >
                            Antworten
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 sm:h-8 rounded-full px-2 sm:px-3 text-muted-foreground hover:text-destructive text-xs sm:text-sm"
                            onClick={() => handleReportComment(c.id)}
                          >
                            Melden
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border-2 border-dashed bg-muted/30 p-6 sm:p-8 text-center">
                    <MessageSquare className="mx-auto mb-2 sm:mb-3 h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground font-medium text-sm sm:text-base">
                      Noch keine Kommentare vorhanden
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Seien Sie der Erste, der seine Meinung teilt!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {newsItem.votingResult && (
            <PoliticsBarometer votingResult={newsItem.votingResult} votingByParty={newsItem.votingByParty} />
          )}

          {/* Document Download */}
          {newsItem.documentUrl && (
            <Card className="card-hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Download className="h-5 w-5" />
                  Dokumente
                </CardTitle>
                <CardDescription>Vollständiger Beschluss als PDF</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full gap-2 rounded-full bg-transparent"
                  onClick={() => alert("PDF-Download würde hier starten: " + newsItem.documentUrl)}
                >
                  <Download className="h-4 w-4" />
                  Beschluss herunterladen
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">
                  Vollständiges Dokument mit allen Details, Anlagen und offiziellen Unterschriften
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
