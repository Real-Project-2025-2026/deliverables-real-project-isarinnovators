"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NEWS_DATA, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/data/news-data"
import { Search, Calendar, Building2, Filter, ArrowRight, Sparkles } from "lucide-react"
import { format, parseISO } from "date-fns"
import { de } from "date-fns/locale"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const COMMUNITIES = [
  { id: "1", name: "München", news: 342 },
  { id: "2", name: "Augsburg", news: 156 },
  { id: "3", name: "Freising", news: 89 },
  { id: "4", name: "Dachau", news: 78 },
  { id: "5", name: "Erding", news: 65 },
  { id: "6", name: "Starnberg", news: 54 },
]

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
    } else {
      setIsLoading(false)
    }
  }, [router])

  const filteredNews = NEWS_DATA.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detailedContent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredCommunities = COMMUNITIES.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const uniqueCategories = Array.from(new Set(NEWS_DATA.map((item) => item.category)))

  if (isLoading) return null

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Search className="h-4 w-4" />
            Durchsuchen
          </div>
          <h1 className="mb-4 text-4xl font-bold">Suche</h1>
          <p className="text-lg text-muted-foreground">Durchsuchen Sie News, Gemeinden und Themen in Unterhaching</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-fade-in-up animation-delay-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Nach News, Gemeinden oder Themen suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 text-lg rounded-xl"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 animate-fade-in-up animation-delay-200">
          <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-lg"
          >
            Alle Kategorien
          </Button>
          {uniqueCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-lg"
            >
              {CATEGORY_LABELS[category]}
            </Button>
          ))}
        </div>

        {/* Results Tabs */}
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="news">News ({filteredNews.length})</TabsTrigger>
            <TabsTrigger value="communities">Gemeinden ({filteredCommunities.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-6">
            {filteredNews.length === 0 ? (
              <Card className="p-12 text-center rounded-xl">
                <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Keine Ergebnisse gefunden</h3>
                <p className="text-muted-foreground">
                  Versuchen Sie einen anderen Suchbegriff oder passen Sie die Filter an.
                </p>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNews.map((item, index) => (
                  <Card
                    key={item.id}
                    onClick={() => router.push(`/news/${item.id}`)}
                    className={`group flex cursor-pointer flex-col transition-all hover:shadow-lg card-hover-lift rounded-xl animate-fade-in-up animation-delay-${Math.min(((index % 6) + 1) * 100, 600)}`}
                  >
                    <CardHeader>
                      <Badge className={CATEGORY_COLORS[item.category]}>
                        {item.categoryIcon} {CATEGORY_LABELS[item.category]}
                      </Badge>
                      <CardTitle className="line-clamp-2 text-xl group-hover:text-primary">{item.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {format(parseISO(item.date), "dd. MMM yyyy", { locale: de })}
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                      <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground">{item.summary}</p>
                      <Button variant="ghost" className="w-full justify-between rounded-lg pointer-events-none">
                        Details ansehen
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="communities" className="space-y-6">
            {filteredCommunities.length === 0 ? (
              <Card className="p-12 text-center rounded-xl">
                <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Keine Gemeinden gefunden</h3>
                <p className="text-muted-foreground">Versuchen Sie einen anderen Suchbegriff.</p>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCommunities.map((community) => (
                  <Card
                    key={community.id}
                    className="cursor-pointer transition-all hover:shadow-lg card-hover-lift rounded-xl"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{community.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{community.news} Nachrichten</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full justify-between rounded-lg">
                        News ansehen
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Trending Topics */}
        {searchQuery === "" && (
          <section className="mt-12 animate-fade-in-up animation-delay-400">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Beliebte Themen</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Haushalt", "Freibad", "Gymnasium", "Feuerwehr", "Klimaschutz", "Geothermie", "Kubiz"].map((topic) => (
                <Button key={topic} variant="outline" onClick={() => setSearchQuery(topic)} className="rounded-full">
                  {topic}
                </Button>
              ))}
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  )
}
