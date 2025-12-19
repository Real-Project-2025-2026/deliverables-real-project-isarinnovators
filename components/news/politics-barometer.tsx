import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users } from "lucide-react"

type PartyVote = "yes" | "no" | "abstention" | "not-voted"

interface VotingByParty {
  party: string
  vote: PartyVote
  votes?: number
}

interface PoliticsBarometerProps {
  votingResult?: { yes: number; no: number; abstention: number }
  votingByParty?: VotingByParty[]
  compact?: boolean
}

const voteIcon = (v: PartyVote) => {
  switch (v) {
    case "yes":
      return "✅"
    case "no":
      return "❌"
    case "abstention":
      return "➖"
    default:
      return "—"
  }
}

const voteLabel = (v: PartyVote) => {
  switch (v) {
    case "yes":
      return "Ja"
    case "no":
      return "Nein"
    case "abstention":
      return "Enthaltung"
    default:
      return "Nicht abgestimmt"
  }
}

export function PoliticsBarometer({ votingResult, votingByParty = [], compact = false }: PoliticsBarometerProps) {
  const yes = votingResult?.yes ?? 0
  const no = votingResult?.no ?? 0
  const abst = votingResult?.abstention ?? 0
  const total = yes + no + abst

  if (!votingResult || total === 0) {
    return (
      <Card className={compact ? "p-3" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Politik-Barometer
          </CardTitle>
          <CardDescription>Keine Abstimmungsdaten vorhanden</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Für diesen Beschluss liegen keine Abstimmungsergebnisse vor.</p>
        </CardContent>
      </Card>
    )
  }

  const supportPercent = Math.round((yes / total) * 100)
  const opposePercent = Math.round((no / total) * 100)
  const abstPercent = Math.round((abst / total) * 100)

  const getSupportColor = () => {
    if (supportPercent >= 75) return "text-green-600 dark:text-green-400"
    if (supportPercent >= 50) return "text-blue-600 dark:text-blue-400"
    return "text-amber-600 dark:text-amber-400"
  }

  return (
    <Card className={`card-hover-lift ${compact ? "p-3" : ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Politik-Barometer
        </CardTitle>
        <CardDescription>Abstimmungsübersicht im Gemeinderat</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Support Percentage */}
        <div className="text-center">
          <div className={`text-5xl font-bold ${getSupportColor()}`}>{supportPercent}%</div>
          <p className="mt-1 text-sm text-muted-foreground">Zustimmung</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={supportPercent} className="h-3" />
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-3 gap-3 rounded-lg bg-muted/50 p-3 text-center">
          <div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{yes}</div>
            <div className="text-xs text-muted-foreground">Ja ({supportPercent}%)</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-600 dark:text-red-400">{no}</div>
            <div className="text-xs text-muted-foreground">Nein ({opposePercent}%)</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-600 dark:text-gray-400">{abst}</div>
            <div className="text-xs text-muted-foreground">Enth. ({abstPercent}%)</div>
          </div>
        </div>

        {/* Total Votes */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Gesamt: {total} Stimmen</span>
        </div>

        {/* Party Breakdown */}
        {votingByParty.length > 0 && (
          <div className="space-y-3 border-t pt-4">
            <h4 className="text-sm font-semibold">Abstimmung nach Partei</h4>
            <div className="space-y-2">
              {votingByParty.map((p) => (
                <div
                  key={p.party}
                  className="flex items-center justify-between gap-3 rounded-lg bg-muted/30 p-2 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{voteIcon(p.vote)}</span>
                    <div>
                      <div className="font-medium">{p.party}</div>
                      {p.votes !== undefined && p.votes > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {p.votes} Stimme{p.votes !== 1 ? "n" : ""}
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      p.vote === "yes"
                        ? "border-green-600 text-green-700 dark:border-green-400 dark:text-green-400"
                        : p.vote === "no"
                          ? "border-red-600 text-red-700 dark:border-red-400 dark:text-red-400"
                          : "border-gray-600 text-gray-700 dark:border-gray-400 dark:text-gray-400"
                    }
                  >
                    {voteLabel(p.vote)}
                  </Badge>
                </div>
              ))}
            </div>
            {votingByParty.length === 0 && (
              <div className="text-sm text-muted-foreground">Keine Parteiinformationen vorhanden</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
