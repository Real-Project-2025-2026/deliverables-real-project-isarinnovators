"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  MessageSquare,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  FileSearch,
  Vote,
  Languages,
  MapPin,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n/context"
import { RatsRadarLogo } from "@/components/logo"

export default function LandingPage() {
  const router = useRouter()
  const { language, setLanguage, t } = useI18n()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleGoToApp = () => {
    localStorage.setItem("isAuthenticated", "true")
    router.push("/dashboard")
  }

  const toggleLanguage = () => {
    setLanguage(language === "de" ? "en" : "de")
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2">
              <RatsRadarLogo className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-lg sm:text-xl font-bold text-foreground">RatsRadar</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("impact")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Die Herausforderung
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                So funktioniert's
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Funktionen
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Über uns
              </button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                title={language === "de" ? "Switch to English" : "Auf Deutsch wechseln"}
              >
                <Languages className="h-4 w-4" />
              </Button>
            </nav>
            <Button onClick={handleGoToApp} className="rounded-lg px-3 sm:px-5 text-xs sm:text-sm shadow-sm">
              {t("landing.toApp")}
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            </Button>
          </div>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8 overflow-hidden ambient-glow">
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium bg-muted/50 animate-fade-in-down">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {t("landing.tagline")}
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-[1.1] animate-fade-in-up animation-delay-100 px-2">
              {t("landing.heroTitle")} <br />
              <span className="text-primary">{t("landing.heroHighlight")}</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200 px-2">
              {t("landing.heroDesc")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-4 animate-fade-in-up animation-delay-300 px-2">
              <Button
                size="lg"
                onClick={handleGoToApp}
                className="rounded-lg px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold shadow-lg button-hover-scale w-full sm:w-auto"
              >
                {t("landing.ctaMain")}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("features")}
                className="rounded-lg px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold button-hover-scale w-full sm:w-auto"
              >
                {t("landing.ctaLearnMore")}
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground pt-6 sm:pt-8 animate-fade-in-up animation-delay-400 px-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                <span>{t("landing.trustSecure")}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileSearch className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <span>{t("landing.trustAggregated")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Vote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <span>{t("landing.trustVisualized")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="impact"
        className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden ambient-glow-purple"
      >
        <div className="max-w-6xl mx-auto w-full relative z-10 space-y-12 sm:space-y-16">
          <div className="text-center space-y-3 sm:space-y-4 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold px-2">{t("challenge.title")}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2">{t("challenge.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                value: "~10 Mio",
                label: t("challenge.decisionsDesc"),
                delay: "0",
                gradient: "from-blue-500/10 to-cyan-500/10",
                iconColor: "text-blue-500",
              },
              {
                value: "11.000+",
                label: t("challenge.townsDesc"),
                delay: "100",
                gradient: "from-purple-500/10 to-pink-500/10",
                iconColor: "text-purple-500",
              },
              {
                value: "~3.000",
                label: t("challenge.systemsDesc"),
                delay: "200",
                gradient: "from-green-500/10 to-emerald-500/10",
                iconColor: "text-green-500",
              },
              {
                value: "300+",
                label: t("challenge.pagesDesc"),
                delay: "300",
                gradient: "from-orange-500/10 to-amber-500/10",
                iconColor: "text-orange-500",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden group card-hover-lift rounded-2xl border-0 bg-gradient-to-br ${item.gradient} backdrop-blur-sm animate-scale-in animation-delay-${item.delay}`}
              >
                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full opacity-50" />

                <div className="relative p-6 sm:p-8 space-y-4">
                  {/* Icon indicator */}
                  <div
                    className={`w-3 h-3 rounded-full ${item.iconColor} opacity-60 transition-all group-hover:scale-125 group-hover:opacity-100`}
                  />

                  {/* Number with better visual hierarchy */}
                  <div className="space-y-2">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-none">
                      {item.value}
                    </div>

                    {/* Visual separator */}
                    <div className={`w-12 h-1 rounded-full ${item.iconColor} opacity-40`} />
                  </div>

                  {/* Description text */}
                  <p className="text-sm sm:text-base font-medium text-muted-foreground leading-snug">{item.label}</p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Card>
            ))}
          </div>

          <Card className="p-6 sm:p-10 shadow-lg border-0 bg-card/80 backdrop-blur-sm animate-fade-in-up animation-delay-400">
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
              <div className="flex-1 space-y-4 sm:space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold">{t("challenge.solution")}</h3>
                <ul className="space-y-3 sm:space-y-4 text-muted-foreground text-sm sm:text-base">
                  {[
                    { title: t("challenge.aggregated"), desc: t("challenge.aggregatedDesc") },
                    { title: t("challenge.visualized"), desc: t("challenge.visualizedDesc") },
                    { title: t("challenge.interactive"), desc: t("challenge.interactiveDesc") },
                    { title: t("challenge.prepared"), desc: t("challenge.preparedDesc") },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground">{item.title}</strong> — {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-shrink-0 w-full sm:w-auto">
                <Button
                  size="lg"
                  onClick={handleGoToApp}
                  className="rounded-lg px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg w-full sm:w-auto"
                >
                  {t("challenge.tryNow")}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section
        id="how-it-works"
        className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden ambient-glow-green"
      >
        <div className="max-w-5xl mx-auto w-full relative z-10 space-y-12 sm:space-y-16">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold px-2">{t("howItWorks.title")}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground px-2">{t("howItWorks.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: "1", title: t("howItWorks.step1Title"), desc: t("howItWorks.step1Desc") },
              { step: "2", title: t("howItWorks.step2Title"), desc: t("howItWorks.step2Desc") },
              { step: "3", title: t("howItWorks.step3Title"), desc: t("howItWorks.step3Desc") },
              { step: "4", title: t("howItWorks.step4Title"), desc: t("howItWorks.step4Desc") },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-3 sm:space-y-4">
                <div className="bg-primary text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-base sm:text-lg font-bold px-2">{item.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed px-2">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center px-2">
            <Button
              size="lg"
              onClick={handleGoToApp}
              className="rounded-lg px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg w-full sm:w-auto"
            >
              {t("howItWorks.cta")}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden ambient-glow-indigo"
      >
        <div className="max-w-6xl mx-auto w-full relative z-10 space-y-12 sm:space-y-16">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance px-2">{t("features.title")}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">{t("features.desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: FileSearch, title: t("features.feature1Title"), desc: t("features.feature1Desc") },
              { icon: Vote, title: t("features.feature2Title"), desc: t("features.feature2Desc") },
              { icon: MessageSquare, title: t("features.feature3Title"), desc: t("features.feature3Desc") },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 sm:p-8 space-y-3 sm:space-y-4 card-hover-lift border-0 bg-card/80 backdrop-blur-sm"
              >
                <div className="bg-primary/10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-primary text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-grid-white/10"
          style={{ maskImage: "linear-gradient(to bottom, transparent, black, transparent)" }}
        />
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
            {[
              { icon: MapPin, value: "11.000+", label: "Gemeinden in Deutschland" },
              { icon: MessageSquare, value: "10 Mio+", label: "Beschlüsse pro Jahr" },
              { icon: CheckCircle2, value: "3.000+", label: "RIS-Systeme bundesweit" },
            ].map((stat, index) => (
              <div key={index} className="space-y-3 sm:space-y-4">
                <stat.icon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto opacity-90" />
                <div className="text-4xl sm:text-5xl font-bold">{stat.value}</div>
                <div className="text-base sm:text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden ambient-glow-pink"
      >
        <div className="max-w-4xl mx-auto w-full relative z-10 space-y-8 sm:space-y-12">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold px-2">{t("landing.about.title")}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2">{t("landing.about.desc")}</p>
          </div>

          <Card className="p-6 sm:p-10 space-y-4 sm:space-y-6 border-0 bg-card/80 backdrop-blur-sm">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{t("landing.about.story")}</p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{t("landing.about.problem")}</p>

            <div className="bg-primary/5 border-l-4 border-primary p-4 sm:p-6 rounded-r-lg">
              <p className="text-foreground font-medium italic text-base sm:text-lg">{t("landing.about.quote")}</p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{t("landing.about.solution")}</p>

            <div className="pt-4 sm:pt-6 text-center">
              <Button
                size="lg"
                asChild
                className="rounded-lg px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg w-full sm:w-auto"
              >
                <Link href="/dashboard">{t("landing.about.cta")}</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <footer className="py-8 sm:py-12 px-3 sm:px-6 lg:px-8 border-t bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <RatsRadarLogo className="w-7 h-7 sm:w-8 sm:h-8" />
              <div>
                <span className="text-base sm:text-lg font-bold">RatsRadar</span>
                <p className="text-xs text-muted-foreground">© 2025 Alle Rechte vorbehalten</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm">
              <Link
                href="/imprint"
                className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                Impressum
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                Datenschutz
              </Link>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                AGB
              </a>
              <a
                href="mailto:info@ratsradar.de"
                className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                Kontakt
              </a>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="rounded-lg bg-transparent text-xs sm:text-sm"
            >
              <Languages className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
              {language === "de" ? "English" : "Deutsch"}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
