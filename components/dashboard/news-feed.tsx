"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NEWS_DATA, CATEGORY_LABELS, CATEGORY_COLORS, type NewsItem } from "@/lib/data/news-data"
import { Search, Star, CalendarIcon, ArrowRight, Filter } from "lucide-react"
import { format } from "date-fns"
import { de } from "date-fns/locale"

export function NewsFeed() {
  const [userInterests, setUserInterests] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  useEffect(() => {
    const interests = localStorage.getItem("userInterests")
    const favorites = localStorage.getItem("favoriteNews")
    if (interests) {
      setUserInterests(JSON.parse(interests))
    }
    if (favorites) {
      setFavoriteIds(JSON.parse(favorites))
    }
  }, [])

  const toggleFavorite = (id: string) => {
    const newFavorites = favoriteIds.includes(id) ? favoriteIds.filter((fid) => fid !== id) : [...favoriteIds, id]
    setFavoriteIds(newFavorites)
    localStorage.setItem("favoriteNews", JSON.stringify(newFavorites))
  }

  const filteredNews = NEWS_DATA.filter((item) => {
    const matchesInterests = userInterests.length === 0 || userInterests.includes(item.category)
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    return matchesInterests && matchesSearch && matchesCategory
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const uniqueCategories = Array.from(new Set(NEWS_DATA.map((item) => item.category)))

  if (selectedNews) {
    return (
      <div className="container max-w-4xl py-6 md:py-8">
        <Button variant="ghost" className="mb-4" onClick={() => setSelectedNews(null)}>
          ← Zurück zur Übersicht
        </Button>
        <Card>
          <CardHeader>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge className={CATEGORY_COLORS[selectedNews.category]}>
                {selectedNews.categoryIcon} {CATEGORY_LABELS[selectedNews.category]}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                {format(new Date(selectedNews.date), "dd. MMMM yyyy", { locale: de })}
              </div>
            </div>
            <CardTitle className="text-3xl">{selectedNews.title}</CardTitle>
            <CardDescription className="text-base">{selectedNews.summary}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{selectedNews.content}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-6 md:py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Willkommen in Unterhaching</h1>
        <p className="text-lg text-muted-foreground">
          Bleiben Sie auf dem Laufenden über lokale Entscheidungen und Entwicklungen
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Nachrichten durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            Alle
          </Button>
          {uniqueCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {CATEGORY_LABELS[category]}
            </Button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Keine Nachrichten gefunden. Versuchen Sie einen anderen Suchbegriff.</p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item) => (
            <Card key={item.id} className="flex flex-col transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex items-start justify-between gap-2">
                  <Badge className={CATEGORY_COLORS[item.category]}>
                    {item.categoryIcon} {CATEGORY_LABELS[item.category]}
                  </Badge>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Star className={`h-5 w-5 ${favoriteIds.includes(item.id) ? "fill-primary text-primary" : ""}`} />
                  </button>
                </div>
                <CardTitle className="line-clamp-2 text-xl">{item.title}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {format(new Date(item.date), "dd. MMM yyyy", { locale: de })}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground">{item.summary}</p>
                <Button variant="ghost" className="w-full justify-between" onClick={() => setSelectedNews(item)}>
                  Weiterlesen
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
