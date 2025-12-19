"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

interface Poll {
  id: string
  question: string
  description: string
  options: {
    id: string
    text: string
    votes: number
  }[]
  totalVotes: number
  endsAt: string
  status: "active" | "closed"
}

const POLLS: Poll[] = [
  {
    id: "1",
    question: "Befürworten Sie den Ausbau von Fahrradstraßen in Unterhaching?",
    description: "Die Gemeinde plant den Ausbau der Fahrradinfrastruktur. Ihre Meinung ist gefragt!",
    options: [
      { id: "a", text: "Ja, unbedingt", votes: 142 },
      { id: "b", text: "Nein", votes: 38 },
      { id: "c", text: "Keine Meinung", votes: 21 },
    ],
    totalVotes: 201,
    endsAt: "2025-03-31",
    status: "active",
  },
  {
    id: "2",
    question: "Sollte die Gemeinde mehr in erneuerbare Energien investieren?",
    description: "Diskussion über zukünftige Energiepolitik in Unterhaching.",
    options: [
      { id: "a", text: "Ja, deutlich mehr", votes: 187 },
      { id: "b", text: "Ja, etwas mehr", votes: 93 },
      { id: "c", text: "Nein, aktuelles Niveau ist gut", votes: 34 },
      { id: "d", text: "Nein, weniger", votes: 12 },
    ],
    totalVotes: 326,
    endsAt: "2025-02-28",
    status: "active",
  },
  {
    id: "3",
    question: "Wie zufrieden sind Sie mit der Online-Befragung zur Ortsentwicklung?",
    description: "Feedback zur aktuellen Bürgerbeteiligung.",
    options: [
      { id: "a", text: "Sehr zufrieden", votes: 89 },
      { id: "b", text: "Zufrieden", votes: 145 },
      { id: "c", text: "Neutral", votes: 42 },
      { id: "d", text: "Unzufrieden", votes: 18 },
    ],
    totalVotes: 294,
    endsAt: "2025-01-15",
    status: "closed",
  },
]

export function PollsSection() {
  const [votedPolls, setVotedPolls] = useState<Record<string, string>>({})

  useEffect(() => {
    const saved = localStorage.getItem("pollVotes")
    if (saved) {
      setVotedPolls(JSON.parse(saved))
    }
  }, [])

  const handleVote = (pollId: string, optionId: string) => {
    const newVotes = { ...votedPolls, [pollId]: optionId }
    setVotedPolls(newVotes)
    localStorage.setItem("pollVotes", JSON.stringify(newVotes))
  }

  const hasVoted = (pollId: string) => pollId in votedPolls

  return (
    <div className="space-y-6">
      {POLLS.filter((p) => p.status === "active").length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">Aktive Umfragen</h2>
          <div className="space-y-4">
            {POLLS.filter((p) => p.status === "active").map((poll) => (
              <Card key={poll.id}>
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <Badge variant="outline">Läuft bis {new Date(poll.endsAt).toLocaleDateString("de-DE")}</Badge>
                    {hasVoted(poll.id) && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Abgestimmt
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{poll.question}</CardTitle>
                  <CardDescription>{poll.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {!hasVoted(poll.id) ? (
                    <div className="space-y-2">
                      {poll.options.map((option) => (
                        <Button
                          key={option.id}
                          variant="outline"
                          className="w-full justify-start text-left bg-transparent"
                          onClick={() => handleVote(poll.id, option.id)}
                        >
                          {option.text}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {poll.options.map((option) => {
                        const percentage = (option.votes / poll.totalVotes) * 100
                        const isSelected = votedPolls[poll.id] === option.id
                        return (
                          <div key={option.id} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className={isSelected ? "font-semibold text-primary" : ""}>
                                {option.text}
                                {isSelected && " ✓"}
                              </span>
                              <span className="text-muted-foreground">
                                {percentage.toFixed(1)}% ({option.votes})
                              </span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        )
                      })}
                      <p className="pt-2 text-sm text-muted-foreground">Insgesamt {poll.totalVotes} Stimmen</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {POLLS.filter((p) => p.status === "closed").length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">Abgeschlossene Umfragen</h2>
          <div className="space-y-4">
            {POLLS.filter((p) => p.status === "closed").map((poll) => (
              <Card key={poll.id} className="opacity-80">
                <CardHeader>
                  <Badge variant="outline" className="mb-2 w-fit">
                    Beendet
                  </Badge>
                  <CardTitle className="text-xl">{poll.question}</CardTitle>
                  <CardDescription>{poll.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {poll.options.map((option) => {
                      const percentage = (option.votes / poll.totalVotes) * 100
                      return (
                        <div key={option.id} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>{option.text}</span>
                            <span className="text-muted-foreground">
                              {percentage.toFixed(1)}% ({option.votes})
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      )
                    })}
                    <p className="pt-2 text-sm text-muted-foreground">Insgesamt {poll.totalVotes} Stimmen</p>
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
