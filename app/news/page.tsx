"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NEWS_DATA, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/data/news-data"
import { Star, CalendarIcon, ArrowRight, MessageSquare, Clock, Newspaper } from "lucide-react"
import { format, parseISO } from "date-fns"
import { de } from "date-fns/locale"

const getImageForNews = (newsItem: any): string => {
  if (newsItem.image) {
    return newsItem.image
  }
  return "/news-collage.png"
}

function NewsPageContent() {
  const router = useRouter()
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    const favorites = localStorage.getItem("favoriteNews")
    if (favorites) {
      setFavoriteIds(JSON.parse(favorites))
    }
  }, [router])

  const toggleFavorite = (id: string) => {
    const newFavorites = favoriteIds.includes(id) ? favoriteIds.filter((fid) => fid !== id) : [...favoriteIds, id]
    setFavoriteIds(newFavorites)
    localStorage.setItem("favoriteNews", JSON.stringify(newFavorites))
  }

  const filteredNews = NEWS_DATA.filter((item) => {
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    return matchesCategory
  }).sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())

  const uniqueCategories = Array.from(new Set(NEWS_DATA.map((item) => item.category)))

  const featuredNews = filteredNews[0]
  const otherNews = filteredNews.slice(1)

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary">
            <Newspaper className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Aktuelle Nachrichten
          </div>
          <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl font-bold">Nachrichten & Beschlüsse</h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Aktuelle Entscheidungen und Berichte aus dem Gemeinderat Unterhaching
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-5 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-2 sm:mb-3 text-xs sm:text-sm font-medium text-muted-foreground">
            Themen
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="rounded-full text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
            >
              Alle
            </Button>
            {uniqueCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
              >
                {CATEGORY_LABELS[category]}
              </Button>
            ))}
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-xl border bg-card">
            <p className="text-muted-foreground text-sm sm:text-base">
              Keine Nachrichten in dieser Kategorie gefunden.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Article - Large Hero Style */}
            {featuredNews && (
              <div
                className="mb-6 sm:mb-8 cursor-pointer group"
                onClick={() => router.push(`/news/${featuredNews.id}`)}
              >
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-card border shadow-lg">
                  <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full">
                    <img
                      src={getImageForNews(featuredNews) || "/placeholder.svg"}
                      alt={featuredNews.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8 text-white">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          {featuredNews.categoryIcon} {CATEGORY_LABELS[featuredNews.category]}
                        </Badge>
                        <span className="text-xs sm:text-sm text-white/80 flex items-center gap-1">
                          <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          {format(parseISO(featuredNews.date), "dd. MMMM yyyy", { locale: de })}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {featuredNews.title}
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base text-white/90 line-clamp-2 max-w-3xl">
                        {featuredNews.summary}
                      </p>
                      <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(featuredNews.id)
                          }}
                          className="flex items-center gap-1 text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
                        >
                          <Star
                            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${favoriteIds.includes(featuredNews.id) ? "fill-yellow-400 text-yellow-400" : ""}`}
                          />
                          Merken
                        </button>
                        {(featuredNews.comments?.length || 0) > 0 && (
                          <span className="flex items-center gap-1 text-xs sm:text-sm text-white/80">
                            <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            {featuredNews.comments?.length} Kommentare
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* News Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {otherNews.map((item) => {
                const commentCount = item.comments?.length || 0
                const imageUrl = getImageForNews(item)
                return (
                  <article
                    key={item.id}
                    onClick={() => router.push(`/news/${item.id}`)}
                    className="group cursor-pointer rounded-xl overflow-hidden bg-card border shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-36 sm:h-40 md:h-44 w-full overflow-hidden">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <Badge
                        className={`absolute top-2 sm:top-3 left-2 sm:left-3 text-xs ${CATEGORY_COLORS[item.category]}`}
                      >
                        {item.categoryIcon} {CATEGORY_LABELS[item.category]}
                      </Badge>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(item.id)
                        }}
                        className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                      >
                        <Star
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 text-white ${favoriteIds.includes(item.id) ? "fill-yellow-400 text-yellow-400" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <CalendarIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {format(parseISO(item.date), "dd. MMM yyyy", { locale: de })}
                        {commentCount > 0 && (
                          <>
                            <span className="text-muted-foreground/50">•</span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              {commentCount}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3">
                        {item.summary}
                      </p>
                      <span className="text-xs sm:text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Weiterlesen
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Laden...</div>}>
      <NewsPageContent />
    </Suspense>
  )
}
