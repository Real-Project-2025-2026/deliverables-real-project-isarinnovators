"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NEWS_DATA, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/data/news-data"
import { CalendarIcon, Users, Newspaper, ArrowRight, Sparkles, MessageSquare, TrendingUp, MapPin } from "lucide-react"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { useI18n } from "@/lib/i18n/context"
import Image from "next/image"

const OTHER_COMMUNITIES = [
  {
    name: "München",
    trending: "Neue U-Bahn-Linie U9 genehmigt",
    category: "infrastructure",
    engagement: 2845,
  },
  {
    name: "Pullach",
    trending: "Diskussion um neues Gewerbegebiet",
    category: "politics",
    engagement: 1203,
  },
  {
    name: "Grünwald",
    trending: "Hochwasserschutz für Isarregion",
    category: "environment",
    engagement: 987,
  },
  {
    name: "Taufkirchen",
    trending: "Neues Schwimmbad beschlossen",
    category: "social",
    engagement: 1456,
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useI18n()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return null
  }

  const topNews = NEWS_DATA.slice(0, 3)

  const getImageForNews = (title: string, index: number): string => {
    const keywords = title.toLowerCase()

    if (keywords.includes("ortsentwicklung") || keywords.includes("entwicklung")) {
      return "/images/news/city-planning.jpg"
    }
    if (keywords.includes("schule") || keywords.includes("bildung") || keywords.includes("gymnasium")) {
      return "/images/news/school-education.jpg"
    }
    if (
      keywords.includes("verkehr") ||
      keywords.includes("straße") ||
      keywords.includes("radweg") ||
      keywords.includes("mobilität")
    ) {
      return "/images/news/traffic-bicycle.jpg"
    }
    if (
      keywords.includes("park") ||
      keywords.includes("spielplatz") ||
      keywords.includes("grün") ||
      keywords.includes("sport")
    ) {
      return "/images/news/park-playground.jpg"
    }
    if (
      keywords.includes("solar") ||
      keywords.includes("klima") ||
      keywords.includes("energie") ||
      keywords.includes("umwelt")
    ) {
      return "/images/news/solar-energy.jpg"
    }
    if (keywords.includes("kita") || keywords.includes("kindergarten") || keywords.includes("kinder")) {
      return "/images/news/kindergarten.jpg"
    }
    if (keywords.includes("schwimmbad") || keywords.includes("freibad") || keywords.includes("bad")) {
      return "/images/news/swimming-pool.jpg"
    }
    if (keywords.includes("rathaus") || keywords.includes("verwaltung") || keywords.includes("bürger")) {
      return "/images/news/town-hall.jpg"
    }
    if (
      keywords.includes("wohnung") ||
      keywords.includes("bauen") ||
      keywords.includes("wohnraum") ||
      keywords.includes("neubau")
    ) {
      return "/images/news/apartment-building.jpg"
    }
    if (keywords.includes("gewerbe") || keywords.includes("wirtschaft") || keywords.includes("unternehmen")) {
      return "/images/news/business-office.jpg"
    }
    if (keywords.includes("kultur") || keywords.includes("fest") || keywords.includes("veranstaltung")) {
      return "/images/news/cultural-festival.jpg"
    }
    if (keywords.includes("sicherheit") || keywords.includes("feuerwehr") || keywords.includes("polizei")) {
      return "/images/news/fire-station.jpg"
    }
    if (keywords.includes("digital") || keywords.includes("internet") || keywords.includes("smart")) {
      return "/images/news/smart-city.jpg"
    }
    if (keywords.includes("senioren") || keywords.includes("pflege") || keywords.includes("alter")) {
      return "/images/news/senior-center.jpg"
    }
    if (keywords.includes("haushalt") || keywords.includes("budget") || keywords.includes("finanzen")) {
      return "/images/news/municipal-budget.jpg"
    }

    // Default fallback based on index
    const defaultImages = [
      "/images/news/town-hall.jpg",
      "/images/news/city-planning.jpg",
      "/images/news/park-playground.jpg",
    ]
    return defaultImages[index % defaultImages.length]
  }

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <section className="border-b bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/unterhaching-aerial-view-bavaria-munich-suburb.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.18] scale-110 blur-[1px]"
            priority
          />
        </div>

        {/* Enhanced gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white/85" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/20 to-white/40" />

        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-20 relative z-10">
          <div className="text-center">
            <div className="mb-2 sm:mb-3 md:mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary animate-fade-in-down">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              {t("dashboard.badge")}
            </div>
            <h1 className="mb-3 sm:mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance animate-fade-in-up">
              {t("dashboard.welcome")} <span className="text-primary">Unterhaching</span>
            </h1>
            <p className="mx-auto mb-4 sm:mb-6 md:mb-8 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground text-pretty animate-fade-in-up animation-delay-100 px-2">
              {t("dashboard.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 animate-fade-in-up animation-delay-200 px-3">
              <Button
                size="lg"
                onClick={() => router.push("/news")}
                className="gap-2 button-hover-scale rounded-xl w-full sm:w-auto"
              >
                <Newspaper className="h-4 w-4 sm:h-5 sm:w-5" />
                {t("dashboard.allNews")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/calendar")}
                className="gap-2 button-hover-scale rounded-xl w-full sm:w-auto"
              >
                <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                {t("dashboard.toCalendar")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-muted/30 animate-fade-in animation-delay-100">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-6 md:py-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            <Card className="animate-scale-in hover:shadow-md transition-all card-hover-lift rounded-xl">
              <CardContent className="pt-4 pb-4 sm:pt-5 sm:pb-5">
                <div className="flex flex-col sm:flex-row items-center sm:gap-3 text-center sm:text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-2 sm:mb-0">
                    <Newspaper className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">{NEWS_DATA.length}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t("dashboard.currentNews")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="animate-scale-in animation-delay-100 hover:shadow-md transition-all card-hover-lift rounded-xl">
              <CardContent className="pt-4 pb-4 sm:pt-5 sm:pb-5">
                <div className="flex flex-col sm:flex-row items-center sm:gap-3 text-center sm:text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 mb-2 sm:mb-0">
                    <CalendarIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">8</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t("dashboard.appointments")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="animate-scale-in animation-delay-200 hover:shadow-md transition-all card-hover-lift rounded-xl col-span-2 lg:col-span-1">
              <CardContent className="pt-4 pb-4 sm:pt-5 sm:pb-5">
                <div className="flex flex-col sm:flex-row items-center sm:gap-3 text-center sm:text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 mb-2 sm:mb-0">
                    <MessageSquare className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">156</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t("dashboard.discussions")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top News Section */}
      <section className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 animate-fade-in animation-delay-200 overflow-hidden">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 animate-fade-in">
          <div>
            <h2 className="mb-1 sm:mb-2 text-2xl sm:text-3xl font-bold">{t("dashboard.topNews")}</h2>
            <p className="text-sm sm:text-base text-muted-foreground">{t("dashboard.topNewsDesc")}</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push("/news")}
            className="gap-2 rounded-xl button-hover-scale text-sm sm:text-base w-full sm:w-auto"
          >
            {t("dashboard.allNews")}
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {topNews.map((item, index) => {
            const imageUrl = getImageForNews(item.title, index)
            return (
              <div
                key={item.id}
                className={`group cursor-pointer flex flex-col overflow-hidden transition-all hover:shadow-lg card-hover-lift rounded-xl border-2 hover:border-primary/20 bg-card animate-fade-in-up animation-delay-${(index + 1) * 100}`}
                onClick={() => router.push(`/news/${item.id}`)}
              >
                <div className="h-36 sm:h-40 relative w-full">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
                  {/* Badge overlay */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <Badge className={`${CATEGORY_COLORS[item.category]} text-xs`}>
                      {item.categoryIcon} {CATEGORY_LABELS[item.category]}
                    </Badge>
                  </div>
                  {/* Date overlay */}
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground bg-white/90 rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1">
                    <CalendarIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    {format(new Date(item.date), "dd. MMM yyyy", { locale: de })}
                  </div>
                </div>
                {/* Content section */}
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <h3 className="line-clamp-2 text-base sm:text-lg font-semibold group-hover:text-primary transition-colors mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 flex-1">
                    {item.summary}
                  </p>
                  <Button variant="ghost" className="w-full justify-between rounded-lg button-hover-scale">
                    {t("dashboard.readMore")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Andere Gemeinden Section */}
      <section className="border-t bg-muted/20 animate-fade-in animation-delay-300">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="mb-2 flex items-center gap-2 text-3xl font-bold">
                  <MapPin className="h-8 w-8 text-primary" />
                  {t("dashboard.otherCommunities")}
                </h2>
                <p className="text-muted-foreground">{t("dashboard.otherCommunitiesDesc")}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-muted-foreground/20" />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OTHER_COMMUNITIES.map((community, index) => (
              <Card
                key={community.name}
                className={`group cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 card-hover-lift rounded-xl animate-scale-in animation-delay-${(index + 1) * 100}`}
              >
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <CardTitle className="text-lg">{community.name}</CardTitle>
                    <Badge variant="secondary" className="gap-1">
                      <Users className="h-3 w-3" />
                      {community.engagement}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{community.trending}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge className={CATEGORY_COLORS[community.category]} variant="outline">
                      {CATEGORY_LABELS[community.category]}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center animate-fade-in-up animation-delay-500">
            <Button variant="outline" size="lg" className="gap-2 bg-transparent button-hover-scale rounded-xl">
              {t("dashboard.exploreAll")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Beliebte Themen aus anderen Gemeinden Section */}
      <section className="border-t bg-background animate-fade-in animation-delay-400">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in">
            <h2 className="mb-2 text-3xl font-bold">{t("dashboard.popularTopics")}</h2>
            <p className="text-muted-foreground">{t("dashboard.popularTopicsDesc")}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                topic: "Klimaneutralität bis 2035",
                communities: ["München", "Pullach", "Grünwald", "Taufkirchen"],
                engagement: 4892,
                category: "environment",
                description: "Diskussion über konkrete Maßnahmen zur CO₂-Reduktion und erneuerbare Energien",
              },
              {
                topic: "Bezahlbarer Wohnraum",
                communities: ["München", "Grünwald", "Oberhaching"],
                engagement: 3654,
                category: "social",
                description: "Wie können Gemeinden mehr bezahlbaren Wohnraum schaffen?",
              },
              {
                topic: "Digitale Verwaltung",
                communities: ["Pullach", "Taufkirchen", "Unterhaching"],
                engagement: 2987,
                category: "politics",
                description: "Online-Anträge und digitale Bürgerdienste im Fokus",
              },
              {
                topic: "Radverkehrsinfrastruktur",
                communities: ["München", "Pullach", "Unterhaching", "Taufkirchen"],
                engagement: 2543,
                category: "infrastructure",
                description: "Ausbau sicherer Radwege und Fahrradstellplätze",
              },
              {
                topic: "Kinderbetreuung & Bildung",
                communities: ["Grünwald", "Oberhaching", "Taufkirchen"],
                engagement: 2234,
                category: "education",
                description: "Mehr Kita-Plätze und Ganztagsbetreuung an Schulen",
              },
              {
                topic: "Glasfaser-Ausbau",
                communities: ["Pullach", "Grünwald", "Oberhaching", "Taufkirchen"],
                engagement: 1876,
                category: "infrastructure",
                description: "Flächendeckendes Hochgeschwindigkeits-Internet für alle",
              },
            ].map((item, index) => (
              <Card
                key={item.topic}
                className={`group cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 card-hover-lift rounded-xl animate-scale-in animation-delay-${(index + 1) * 100}`}
              >
                <CardHeader>
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors flex-1">
                      {item.topic}
                    </CardTitle>
                    <Badge variant="secondary" className="gap-1 flex-shrink-0">
                      <TrendingUp className="h-3 w-3" />
                      {item.engagement}
                    </Badge>
                  </div>
                  <CardDescription className="mb-3 text-sm">{item.description}</CardDescription>
                  <div className="flex flex-wrap gap-1">
                    {item.communities.map((community) => (
                      <Badge key={community} variant="outline" className="text-xs">
                        {community}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge className={CATEGORY_COLORS[item.category]} variant="outline">
                      {CATEGORY_LABELS[item.category]}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}
