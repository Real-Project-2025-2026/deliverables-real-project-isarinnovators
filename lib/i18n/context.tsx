"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "de" | "en"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("de")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "de" || savedLang === "en")) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (mounted) {
      localStorage.setItem("language", lang)
    }
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}

const translations = {
  de: {
    nav: {
      home: "Startseite",
      myTown: "Meine Gemeinde",
      myTownShort: "Gemeinde",
      news: "News",
      calendar: "Kalender",
      community: "Community",
      profile: "Profil",
    },
    dashboard: {
      badge: "Ihre lokale Politik-Plattform",
      welcome: "Willkommen in",
      subtitle:
        "Bleiben Sie informiert über lokale Entscheidungen, Entwicklungen und beteiligen Sie sich aktiv an der Gestaltung Ihrer Gemeinde.",
      allNews: "Alle News ansehen",
      toCalendar: "Zum Kalender",
      currentNews: "Aktuelle News",
      appointments: "Termine",
      discussions: "Diskussionen",
      topNews: "Top News",
      topNewsDesc: "Die wichtigsten Entwicklungen aus Unterhaching",
      readMore: "Weiterlesen",
      otherCommunities: "Andere Gemeinden",
      otherCommunitiesDesc: "Was bewegt die Nachbargemeinden?",
      exploreAll: "Alle Gemeinden erkunden",
      popularTopics: "Beliebte Themen aus anderen Gemeinden",
      popularTopicsDesc: "Diese Themen werden aktuell in mehreren Gemeinden intensiv diskutiert",
      quickAccess: "Schnellzugriff",
      allNewsTitle: "Alle Nachrichten",
      allNewsDesc: "Durchsuchen Sie alle Beschlüsse und Entwicklungen mit Filter- und Suchfunktion",
      calendarTitle: "Terminkalender",
      calendarDesc: "Verpassen Sie keine Gemeinderatssitzungen und öffentliche Veranstaltungen",
      communityTitle: "Community",
      communityDesc: "Diskutieren Sie mit anderen Bürgern und nehmen Sie an Umfragen teil",
    },
    gemeinde: {
      badge: "Gemeinde-Informationen",
      title: "Meine Gemeinde",
      desc: "Alle wichtigen Informationen über Unterhaching und die politische Zusammensetzung des Gemeinderats",
      residents: "Einwohner",
      area: "Fläche",
      density: "EW/km²",
      founded: "Ersterwähnung",
      contact: "Kontakt",
      address: "Adresse",
      mayor: "Bürgermeister",
      mayorOf: "Bürgermeister der Gemeinde Unterhaching",
      party: "Partei",
      inOfficeSince: "Im Amt seit",
      term: "Amtszeit",
      councilTitle: "Gemeinderat",
      seatDistribution: "Sitzverteilung",
      legislativePeriod: "Legislaturperiode 2020-2026",
      totalSeats: "Gesamt Sitze",
      factions: "Fraktionen",
      nextElection: "Nächste Wahl",
      committees: "Ausschüsse",
      members: "Mitglieder",
      chairperson: "Fraktionsvorsitz",
    },
    news: {
      title: "Alle News & Beschlüsse",
      desc: "Durchsuchen Sie alle Nachrichten und Gemeinderatsbeschlüsse aus Unterhaching",
      search: "Nach News, Gemeinden oder Themen suchen...",
      all: "Alle",
      upcomingEvents: "Bevorstehende Veranstaltungen & Events",
      allNews: "Alle Nachrichten",
      noResults: "Keine Nachrichten gefunden. Versuchen Sie einen anderen Suchbegriff.",
      readMore: "Weiterlesen & Kommentieren",
      viewDetails: "Details ansehen",
    },
    calendar: {
      title: "Veranstaltungen & Termine",
      desc: "Bleiben Sie informiert über Gemeinderatssitzungen und Bürgerbeteiligungen",
    },
    community: {
      title: "Community",
      polls: "Umfragen",
      discussions: "Diskussionen",
      faq: "FAQ",
    },
    profile: {
      title: "Mein Profil",
      desc: "Verwalte deine Einstellungen und Präferenzen",
    },
    search: {
      title: "Suche",
      desc: "Durchsuchen Sie News, Gemeinden und Themen",
      placeholder: "Nach News, Gemeinden oder Themen suchen...",
      allCategories: "Alle Kategorien",
      newsTab: "News",
      communitiesTab: "Gemeinden",
      noResults: "Keine Ergebnisse gefunden",
      noResultsDesc: "Versuchen Sie einen anderen Suchbegriff oder passen Sie die Filter an.",
      noCommunitiesDesc: "Versuchen Sie einen anderen Suchbegriff.",
      viewNews: "News ansehen",
      popularTopics: "Beliebte Themen",
    },
    challenge: {
      title: "Die Herausforderung",
      subtitle: "10 Millionen Beschlüsse pro Jahr – versteckt in Tausenden PDFs",
      decisionsYear: "~10 Mio",
      decisionsDesc: "Beschlüsse pro Jahr in Deutschland",
      towns: "11.000+",
      townsDesc: "Gemeinden mit Ratsinformationssystemen",
      systems: "~3.000",
      systemsDesc: "unterschiedliche RIS-Systeme bundesweit",
      pages: "300+",
      pagesDesc: "PDF-Seiten pro Beschluss durchschnittlich",
      solution: "Unsere Lösung: Alles an einem Ort",
      aggregated: "Aggregiert",
      aggregatedDesc: "Alle relevanten Beschlüsse in einem übersichtlichen News-Feed",
      visualized: "Visualisiert",
      visualizedDesc: "Politik-Barometer zeigt, welche Partei wie gestimmt hat",
      interactive: "Interaktiv",
      interactiveDesc: "Kommentieren, diskutieren und mit anderen Bürgern austauschen",
      prepared: "Aufbereitet",
      preparedDesc: "Komplexe PDF-Dokumente werden verständlich zusammengefasst",
      tryNow: "Jetzt ausprobieren",
    },
    howItWorks: {
      title: "So funktioniert's",
      subtitle: "Lokal informieren. Mitreden. Mitgestalten.",
      step1Title: "Aggregieren",
      step1Desc: "Wir verbinden hunderte Ratsinformationssysteme aus Deutschland",
      step2Title: "Aufbereiten",
      step2Desc: "Komplexe PDF-Dokumente werden verständlich zusammengefasst",
      step3Title: "Visualisieren",
      step3Desc: "Abstimmungsverhalten von Parteien wird transparent gemacht",
      step4Title: "Engagieren",
      step4Desc: "Bürger:innen können kommentieren und diskutieren",
      cta: "Jetzt aktiv werden",
    },
    features: {
      title: "Alle Features auf einen Blick",
      desc: "Alles was du brauchst, um deine lokale Politik zu verstehen und aktiv mitzugestalten",
      feature1Title: "News & Beschlüsse",
      feature1Desc:
        "Alle Beschlüsse aus Unterhaching und Umgebung an einem Ort aggregiert und verständlich aufbereitet",
      feature2Title: "Politik-Barometer",
      feature2Desc: "Sehe auf einen Blick, welche Partei wie zu jedem Thema gestimmt hat – transparent und visuell",
      feature3Title: "Community & Diskussionen",
      feature3Desc: "Diskutiere mit anderen Bürgern, stelle Fragen und teile deine Meinung zu lokalen Entscheidungen",
    },
    landing: {
      tagline: "Jetzt für Unterhaching verfügbar",
      heroTitle: "RatsRadar — Lokal informieren.",
      heroHighlight: "Mitreden. Mitgestalten.",
      heroDesc:
        "Wir aggregieren kommunale Beschlüsse aus Ratsinformationssystemen in Deutschland, visualisieren, wer wie gestimmt hat und zeigen bevorstehende Termine – damit Bürger:innen lokal aktiv werden können.",
      ctaMain: "Jetzt aktiv werden",
      ctaLearnMore: "Mehr erfahren",
      toApp: "Zur App",
      trustSecure: "Offen & Sicher",
      trustAggregated: "Alle RIS-Systeme aggregiert",
      trustVisualized: "Abstimmungen visuell aufbereitet",
      trustUsers: "für Gemeinden in Deutschland",
      trustRating: "von 5 Sternen",
      about: {
        title: "Über uns",
        subtitle: "Entstanden aus persönlicher Frustration – gebaut für eine bessere Demokratie",
        desc: "Entstanden aus persönlicher Frustration – gebaut für eine bessere Demokratie",
        text1:
          "Wir sind zwei Gemeindebewohner, denen aufgefallen ist: Lokale Entscheidungen betreffen uns am meisten – doch die politischen Hintergründe bleiben oft im Dunkeln.",
        text2:
          "Als wir auf die kommunalen Ratsinformationssysteme (RIS) stießen, hofften wir auf Transparenz. Stattdessen fanden wir: Hunderte Seiten PDFs, unübersichtliche Strukturen, keine Suchfunktionen – und vor allem keine Möglichkeit für Engagement und Community.",
        quote:
          "Lokale Demokratie sollte nicht in PDF-Dateien versteckt sein. Sie gehört in die Hände der Menschen, die sie betrifft.",
        text3:
          "So entstand RatsRadar – eine Plattform, die komplexe Ratsbeschlüsse aggregiert, visualisiert und echtes Community-Engagement ermöglicht.",
        story:
          "Wir sind zwei Gemeindebewohner, denen aufgefallen ist: Lokale Entscheidungen betreffen uns am meisten – doch die politischen Hintergründe bleiben oft im Dunkeln.",
        problem:
          "Als wir auf die kommunalen Ratsinformationssysteme (RIS) stießen, hofften wir auf Transparenz. Stattdessen fanden wir: Hunderte Seiten PDFs, unübersichtliche Strukturen, keine Suchfunktionen – und vor allem keine Möglichkeit für Engagement und Community.",
        solution:
          "So entstand RatsRadar – eine Plattform, die komplexe Ratsbeschlüsse aggregiert, visualisiert und echtes Community-Engagement ermöglicht.",
        startNow: "Jetzt starten",
        cta: "Jetzt starten",
      },
    },
    footer: {
      tagline: "Deine Plattform für lokale Politik und Engagement in Unterhaching und Umgebung.",
      desc: "Deine Plattform für lokale Politik und Engagement in Unterhaching und Umgebung.",
      product: "Produkt",
      features: "Features",
      pricing: "Preise",
      faq: "FAQ",
      roadmap: "Roadmap",
      legal: "Rechtliches",
      privacy: "Datenschutz",
      imprint: "Impressum",
      terms: "AGB",
      cookies: "Cookies",
      copyright: "Alle Rechte vorbehalten. Made with",
      in: "in Bayern",
    },
  },
  en: {
    nav: {
      home: "Home",
      myTown: "My Town",
      myTownShort: "Town",
      news: "News",
      calendar: "Calendar",
      community: "Community",
      profile: "Profile",
    },
    dashboard: {
      badge: "Your local politics platform",
      welcome: "Welcome to",
      subtitle:
        "Stay informed about local decisions and developments, and actively participate in shaping your community.",
      allNews: "View all news",
      toCalendar: "Go to calendar",
      currentNews: "Current news",
      appointments: "Appointments",
      discussions: "Discussions",
      topNews: "Top News",
      topNewsDesc: "The most important developments from Unterhaching",
      readMore: "Read more & Comment",
      otherCommunities: "Other Communities",
      otherCommunitiesDesc: "What's happening in neighboring communities?",
      exploreAll: "Explore all communities",
      popularTopics: "Popular topics from other communities",
      popularTopicsDesc: "These topics are currently being discussed intensively in several communities",
      quickAccess: "Quick access",
      allNewsTitle: "All news",
      allNewsDesc: "Browse all decisions and developments with filter and search function",
      calendarTitle: "Calendar",
      calendarDesc: "Don't miss council meetings and public events",
      communityTitle: "Community",
      communityDesc: "Discuss with other citizens and participate in polls",
    },
    gemeinde: {
      badge: "Municipality information",
      title: "My Town",
      desc: "All important information about Unterhaching and the political composition of the council",
      residents: "Residents",
      area: "Area",
      density: "per km²",
      founded: "First mention",
      contact: "Contact",
      address: "Address",
      mayor: "Mayor",
      mayorOf: "Mayor of Unterhaching",
      party: "Party",
      inOfficeSince: "In office since",
      term: "Term",
      councilTitle: "Municipal Council",
      seatDistribution: "Seat distribution",
      legislativePeriod: "Legislative period 2020-2026",
      totalSeats: "Total seats",
      factions: "Factions",
      nextElection: "Next election",
      committees: "Committees",
      members: "Members",
      chairperson: "Faction leader",
    },
    news: {
      title: "All News & Decisions",
      desc: "Browse all news and council decisions from Unterhaching",
      search: "Search for news, communities or topics...",
      all: "All",
      upcomingEvents: "Upcoming Events",
      allNews: "All News",
      noResults: "No news found. Try a different search term.",
      readMore: "Read more & Comment",
      viewDetails: "View details",
    },
    calendar: {
      title: "Events & Appointments",
      desc: "Stay informed about council meetings and citizen participation",
    },
    community: {
      title: "Community",
      polls: "Polls",
      discussions: "Discussions",
      faq: "FAQ",
    },
    profile: {
      title: "My Profile",
      desc: "Manage your settings and preferences",
    },
    search: {
      title: "Search",
      desc: "Search news, communities and topics",
      placeholder: "Search for news, communities or topics...",
      allCategories: "All categories",
      newsTab: "News",
      communitiesTab: "Communities",
      noResults: "No results found",
      noResultsDesc: "Try a different search term or adjust the filters.",
      noCommunitiesDesc: "Try a different search term.",
      viewNews: "View news",
      popularTopics: "Popular topics",
    },
    challenge: {
      title: "The Challenge",
      subtitle: "10 Million decisions per year – hidden in thousands of PDFs",
      decisionsYear: "~10M",
      decisionsDesc: "Decisions per year in Germany",
      towns: "11,000+",
      townsDesc: "Municipalities with council information systems",
      systems: "~3,000",
      systemsDesc: "Different RIS systems nationwide",
      pages: "300+",
      pagesDesc: "PDF pages per decision on average",
      solution: "Our Solution: Everything in One Place",
      aggregated: "Aggregated",
      aggregatedDesc: "All relevant decisions in a clear news feed",
      visualized: "Visualized",
      visualizedDesc: "Political barometer shows how each party voted",
      interactive: "Interactive",
      interactiveDesc: "Comment, discuss and exchange with other citizens",
      prepared: "Processed",
      preparedDesc: "Complex PDF documents are summarized in an understandable way",
      tryNow: "Try now",
    },
    howItWorks: {
      title: "How it works",
      subtitle: "Stay informed locally. Participate. Shape your community.",
      step1Title: "Aggregate",
      step1Desc: "We connect hundreds of council information systems from Germany",
      step2Title: "Process",
      step2Desc: "Complex PDF documents are summarized in an understandable way",
      step3Title: "Visualize",
      step3Desc: "Voting behavior of parties is made transparent",
      step4Title: "Engage",
      step4Desc: "Citizens can comment and discuss",
      cta: "Get active now",
    },
    features: {
      title: "All Features at a Glance",
      desc: "Everything you need to understand your local politics and actively shape it",
      feature1Title: "News & Decisions",
      feature1Desc:
        "All decisions from Unterhaching and surrounding areas aggregated in one place and presented clearly",
      feature2Title: "Political Barometer",
      feature2Desc: "See at a glance which party voted how on each topic – transparent and visual",
      feature3Title: "Community & Discussions",
      feature3Desc: "Discuss with other citizens, ask questions and share your opinion on local decisions",
    },
    landing: {
      tagline: "Now available for Unterhaching",
      heroTitle: "RatsRadar — Stay informed locally.",
      heroHighlight: "Participate. Shape your community.",
      heroDesc:
        "We aggregate municipal decisions from council information systems in Germany, visualize how parties voted, and show upcoming appointments – so citizens can actively participate locally.",
      ctaMain: "Try it now",
      ctaLearnMore: "Learn more",
      toApp: "Go to App",
      trustSecure: "Open & Secure",
      trustAggregated: "All RIS systems aggregated",
      trustVisualized: "Votes visually prepared",
      trustUsers: "for municipalities in Germany",
      trustRating: "out of 5 stars",
      about: {
        title: "About us",
        subtitle: "Born from personal frustration – built for better democracy",
        desc: "Born from personal frustration – built for better democracy",
        text1:
          "We are two municipality residents who realized: Local decisions affect us most – yet the political background often remains hidden.",
        text2:
          "When we discovered the municipal council information systems (RIS), we hoped for transparency. Instead we found: Hundreds of PDF pages, confusing structures, no search functions – and above all no possibility for engagement and community.",
        quote: "Local democracy should not be hidden in PDF files. It belongs in the hands of the people it affects.",
        text3:
          "This is how RatsRadar was created – a platform that aggregates complex council decisions, visualizes them and enables real community engagement.",
        story:
          "We are two municipality residents who realized: Local decisions affect us most – yet the political background often remains hidden.",
        problem:
          "When we discovered the municipal council information systems (RIS), we hoped for transparency. Instead we found: Hundreds of PDF pages, confusing structures, no search functions – and above all no possibility for engagement and community.",
        solution:
          "This is how RatsRadar was created – a platform that aggregates complex council decisions, visualizes them and enables real community engagement.",
        startNow: "Start now",
        cta: "Start now",
      },
    },
    footer: {
      tagline: "Your platform for local politics and engagement in Unterhaching and surrounding areas.",
      desc: "Your platform for local politics and engagement in Unterhaching and surrounding areas.",
      product: "Product",
      features: "Features",
      pricing: "Pricing",
      faq: "FAQ",
      roadmap: "Roadmap",
      legal: "Legal",
      privacy: "Privacy",
      imprint: "Imprint",
      terms: "Terms",
      cookies: "Cookies",
      copyright: "All rights reserved. Made with",
      in: "in Bavaria",
    },
  },
}
