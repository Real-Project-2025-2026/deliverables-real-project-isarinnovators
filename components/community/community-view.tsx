"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BarChart3, MessageCircle, HelpCircle, ThumbsUp, MessageSquare } from "lucide-react"

// Mock data
const POLLS = [
  {
    id: "1",
    title: "Neues Eisstadion - Ihre Meinung?",
    description: "Soll das Eisstadion in Unterhaching neu gebaut werden?",
    options: [
      { label: "Ja, unbedingt", votes: 245, percentage: 68 },
      { label: "Nein, zu teuer", votes: 87, percentage: 24 },
      { label: "Unentschieden", votes: 28, percentage: 8 },
    ],
    totalVotes: 360,
    endsAt: "31. Dez 2025",
  },
  {
    id: "2",
    title: "Radweg-Ausbau Prioritäten",
    description: "Welcher Radweg sollte zuerst ausgebaut werden?",
    options: [
      { label: "Taufkirchner Straße", votes: 156, percentage: 52 },
      { label: "Münchner Straße", votes: 98, percentage: 33 },
      { label: "Hauptstraße", votes: 46, percentage: 15 },
    ],
    totalVotes: 300,
    endsAt: "15. Jan 2026",
  },
]

const DISCUSSIONS = [
  {
    id: "1",
    title: "Diskussion zum Haushalt 2025",
    author: "BürgerMax",
    replies: 23,
    likes: 45,
    preview: "Ich finde die Investitionen in Bildung sehr wichtig...",
    time: "vor 2 Stunden",
  },
  {
    id: "2",
    title: "Verkehrssituation an der Grundschule",
    author: "MamaMaria",
    replies: 18,
    likes: 32,
    preview: "Die Verkehrssituation morgens ist wirklich problematisch...",
    time: "vor 5 Stunden",
  },
  {
    id: "3",
    title: "Grünflächen in Unterhaching",
    author: "NaturFreund",
    replies: 12,
    likes: 28,
    preview: "Mehr Grünflächen würden unsere Gemeinde noch schöner machen...",
    time: "vor 1 Tag",
  },
]

const FAQS = [
  {
    category: "Allgemein",
    questions: [
      { q: "Wie kann ich mich in der Gemeinde engagieren?", a: "Es gibt viele Möglichkeiten..." },
      { q: "Wann finden Gemeinderatssitzungen statt?", a: "Jeden ersten Donnerstag im Monat..." },
    ],
  },
  {
    category: "Verwaltung",
    questions: [
      { q: "Wo beantrage ich einen Parkausweis?", a: "Im Bürgerbüro des Rathauses..." },
      { q: "Wie melde ich ein defektes Straßenschild?", a: "Über das Online-Formular..." },
    ],
  },
]

export function CommunityView() {
  const router = useRouter()
  const [votedPolls, setVotedPolls] = useState<Record<string, string>>({}) // pollId -> selected option
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({}) // pollId -> option label

  const handleVote = (pollId: string) => {
    const selected = selectedOptions[pollId]
    if (selected) {
      setVotedPolls({ ...votedPolls, [pollId]: selected })
    }
  }

  const hasVoted = (pollId: string) => pollId in votedPolls

  return (
    <div className="space-y-8">
      {/* Umfragen Section */}
      <section className="animate-fade-in-up animation-delay-100">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Umfragen</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {POLLS.map((poll) => {
            const voted = hasVoted(poll.id)
            return (
              <Card key={poll.id} className="rounded-xl hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{poll.title}</CardTitle>
                  <CardDescription>{poll.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!voted ? (
                    <RadioGroup
                      value={selectedOptions[poll.id] || ""}
                      onValueChange={(value) => setSelectedOptions({ ...selectedOptions, [poll.id]: value })}
                    >
                      {poll.options.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.label} id={`${poll.id}-${idx}`} />
                          <Label htmlFor={`${poll.id}-${idx}`} className="cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    poll.options.map((option, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">
                            {option.label}
                            {votedPolls[poll.id] === option.label && (
                              <Badge variant="secondary" className="ml-2">
                                Ihre Wahl
                              </Badge>
                            )}
                          </span>
                          <span className="text-muted-foreground">
                            {option.votes} Stimmen ({option.percentage}%)
                          </span>
                        </div>
                        <Progress value={option.percentage} className="h-2" />
                      </div>
                    ))
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">
                      {poll.totalVotes} Stimmen • Endet {poll.endsAt}
                    </span>
                    {!voted && (
                      <Button size="sm" onClick={() => handleVote(poll.id)} disabled={!selectedOptions[poll.id]}>
                        Abstimmen
                      </Button>
                    )}
                    {voted && (
                      <Badge variant="secondary" className="text-xs">
                        ✓ Abgestimmt
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Diskussionen Section */}
      <section className="animate-fade-in-up animation-delay-200">
        <div className="mb-4 flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Diskussionen</h2>
        </div>
        <div className="grid gap-4">
          {DISCUSSIONS.map((discussion) => (
            <Card
              key={discussion.id}
              className="rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/community/discussion/${discussion.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{discussion.title}</CardTitle>
                    <CardDescription className="mt-2">{discussion.preview}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-3 text-sm text-muted-foreground">
                  <span className="font-medium">{discussion.author}</span>
                  <span>•</span>
                  <span>{discussion.time}</span>
                  <div className="ml-auto flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {discussion.replies}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {discussion.likes}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="animate-fade-in-up animation-delay-300">
        <div className="mb-4 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Häufig gestellte Fragen</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {FAQS.map((category, idx) => (
            <Card key={idx} className="rounded-xl">
              <CardHeader>
                <Badge className="w-fit">{category.category}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.questions.map((item, qIdx) => (
                  <div key={qIdx} className="space-y-2">
                    <h3 className="font-medium">{item.q}</h3>
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
