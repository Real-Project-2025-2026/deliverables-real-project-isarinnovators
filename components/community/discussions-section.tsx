"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp } from "lucide-react"
import { format } from "date-fns"
import { de } from "date-fns/locale"

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  likes: number
  userLiked?: boolean
}

interface Discussion {
  id: string
  title: string
  description: string
  comments: Comment[]
}

const DISCUSSIONS: Discussion[] = [
  {
    id: "1",
    title: "Wie können wir die Radinfrastruktur weiter verbessern?",
    description: "Diskutieren Sie über Verbesserungsmöglichkeiten für Radfahrer in Unterhaching.",
    comments: [
      {
        id: "1",
        author: "Maria Schmidt",
        content:
          "Ich würde mir mehr sichere Fahrradwege entlang der Hauptstraßen wünschen. Die aktuelle Situation ist für Familien mit Kindern nicht ideal.",
        timestamp: "2025-01-10T14:30:00",
        likes: 15,
      },
      {
        id: "2",
        author: "Thomas Müller",
        content: "Gute Idee! Außerdem brauchen wir mehr überdachte Fahrradständer an den S-Bahnhöfen.",
        timestamp: "2025-01-10T15:45:00",
        likes: 8,
      },
    ],
  },
  {
    id: "2",
    title: "Ortsentwicklungskonzept: Ihre Vorschläge",
    description: "Was sollte im neuen Ortsentwicklungskonzept berücksichtigt werden?",
    comments: [
      {
        id: "3",
        author: "Anna Weber",
        content: "Wir sollten mehr Grünflächen und Parks schaffen. Das verbessert die Lebensqualität erheblich.",
        timestamp: "2025-01-09T10:20:00",
        likes: 23,
      },
    ],
  },
]

export function DiscussionsSection() {
  const [discussions, setDiscussions] = useState(DISCUSSIONS)
  const [newComment, setNewComment] = useState<Record<string, string>>({})
  const [userName, setUserName] = useState("Gast")

  useEffect(() => {
    const name = localStorage.getItem("userName")
    if (name) {
      setUserName(name)
    }
  }, [])

  const handleAddComment = (discussionId: string) => {
    const content = newComment[discussionId]?.trim()
    if (!content) return

    const updatedDiscussions = discussions.map((disc) => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          comments: [
            ...disc.comments,
            {
              id: Date.now().toString(),
              author: userName,
              content,
              timestamp: new Date().toISOString(),
              likes: 0,
              userLiked: false,
            },
          ],
        }
      }
      return disc
    })

    setDiscussions(updatedDiscussions)
    setNewComment({ ...newComment, [discussionId]: "" })
  }

  const handleLike = (discussionId: string, commentId: string) => {
    const updatedDiscussions = discussions.map((disc) => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          comments: disc.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
                userLiked: !comment.userLiked,
              }
            }
            return comment
          }),
        }
      }
      return disc
    })
    setDiscussions(updatedDiscussions)
  }

  return (
    <div className="space-y-6">
      {discussions.map((discussion) => (
        <Card key={discussion.id}>
          <CardHeader>
            <CardTitle className="text-xl">{discussion.title}</CardTitle>
            <CardDescription>{discussion.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Comments */}
            <div className="space-y-4">
              {discussion.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 rounded-lg border p-4">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback>
                      {comment.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(comment.timestamp), "dd. MMM yyyy, HH:mm", { locale: de })}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{comment.content}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(discussion.id, comment.id)}
                      className={comment.userLiked ? "text-primary" : ""}
                    >
                      <ThumbsUp className={`mr-1 h-4 w-4 ${comment.userLiked ? "fill-current" : ""}`} />
                      {comment.likes}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="space-y-2 border-t pt-4">
              <Textarea
                placeholder="Ihre Meinung..."
                value={newComment[discussion.id] || ""}
                onChange={(e) => setNewComment({ ...newComment, [discussion.id]: e.target.value })}
                rows={3}
              />
              <div className="flex justify-end">
                <Button onClick={() => handleAddComment(discussion.id)} disabled={!newComment[discussion.id]?.trim()}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Kommentieren
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
