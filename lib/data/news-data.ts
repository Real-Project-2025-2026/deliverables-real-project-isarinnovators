export interface NewsComment {
  id: string
  author: string
  date: string
  content: string
  likes: number
  userLiked?: boolean
}

export type PartyVote = "yes" | "no" | "abstention" | "not-voted"

export interface VotingByParty {
  party: string
  vote: PartyVote
  votes?: number
}

export interface NewsItem {
  id: string
  title: string
  date: string
  category: string
  categoryIcon: string
  summary: string
  content: string
  image: string
  parties?: string[]
  decision?: string
  votingResult?: {
    yes: number
    no: number
    abstention: number
  }
  votingByParty?: VotingByParty[]
  documentUrl?: string
  detailedContent?: string
  tags?: string[]
  source?: string
  comments?: NewsComment[]
}

export const NEWS_DATA: NewsItem[] = [
  {
    id: "1",
    title: "Ortsentwicklungsplanung: Zukunftsforum präsentiert Ergebnisse",
    date: "2025-02-25",
    image: "/news/ortsentwicklung-zukunftsforum-stadtplanung.jpg",
    category: "politics",
    categoryIcon: "🏛️",
    summary:
      "Das Zukunftsforum präsentierte die Ergebnisse der Zukunftsteams. Bürger können weiterhin an der Online-Befragung zur Ortsentwicklung teilnehmen.",
    content: "Am 25. Februar fand im Kubiz das Zukunftsforum zur Ortsentwicklungsplanung statt.",
    parties: ["CSU", "SPD", "Grüne", "FDP", "FW"],
    decision: "Information",
    documentUrl: "/documents/ortsentwicklung-2025.pdf",
    source: "Gemeinde Unterhaching, Website 25.02.2025",
    detailedContent:
      "Am 25. Februar fand in Kubiz im Rahmen der Ortsentwicklungsplanung das Zukunftsforum mit der Präsentation der Ergebnisse der Zukunftsteams und einem Workshop zur weiteren gemeinsamen Reflexion statt.\n\nDie Veranstaltung war ein Erfolg! Die Mitglieder der Zukunftsteams präsentierten ihre Anregungen, Ideen und Vorschläge der Öffentlichkeit, Vertretern der Gemeindeverwaltung, des Gemeinderats und der Agenda-21- und Behinderten-Beiräte auf professionelle Weise.\n\nAnschließend wurden alle Themen in angenehmer Atmosphäre diskutiert und gemeinsam reflektiert. Die Ergebnisse wurden in der Gemeinderatsklausur am 12. März mit den Mitgliedern der Zukunftsteams besprochen.",
    tags: ["Bürgerbeteiligung", "Zukunft", "Planung", "Entwicklung"],
    comments: [
      {
        id: "c1-1",
        author: "BürgerinLena",
        date: "2025-02-26T10:23:00",
        content: "Toll, dass so viele Bürger mitgestalten können! Die Präsentationen waren sehr interessant.",
        likes: 24,
      },
      {
        id: "c1-2",
        author: "ThomasM",
        date: "2025-02-26T14:45:00",
        content: "Bin gespannt, was aus den Vorschlägen wird. Hoffe, dass viele Ideen umgesetzt werden.",
        likes: 18,
      },
    ],
  },
  {
    id: "2",
    title: "Haushalt 2025: Rekordvolumen von 121 Millionen Euro beschlossen",
    date: "2025-01-15",
    image: "/news/haushalt-2025-budget-finanzen-gemeinde.jpg",
    category: "politics",
    categoryIcon: "💰",
    summary:
      "Der Gemeinderat hat den Haushalt 2025 mit einem Rekordvolumen von 121 Millionen Euro beschlossen. Zur Finanzierung werden 22,5 Millionen Euro aus Rücklagen entnommen.",
    content: "Der Haushalt 2025 wurde mit einem Rekordvolumen von 121 Millionen Euro beschlossen.",
    parties: ["CSU", "SPD", "Grüne", "FW", "FDP"],
    decision: "Angenommen",
    votingResult: { yes: 24, no: 0, abstention: 1 },
    documentUrl: "/documents/haushalt-2025.pdf",
    source: "Süddeutsche Zeitung, Januar 2025",
    detailedContent:
      "Der Haushalt für Unterhaching für das Jahr 2025 hat ein Rekordvolumen von 121 Millionen Euro und gilt als ausgeglichen.\n\nFinanzierung:\n- 22,5 Millionen Euro werden aus Rücklagen entnommen\n- 7 Millionen Euro vom Vermögenshaushalt zum Verwaltungshaushalt verschoben\n- 96,5 Millionen Euro für den Verwaltungshaushalt erwartet\n- 25,2 Millionen Euro aus Gewerbesteuer\n\nDer Gemeinderat hat den ausgeglichenen Haushalt genehmigt, trotz der notwendigen Entnahmen aus den Rücklagen.",
    tags: ["Haushalt", "Finanzen", "Budget", "2025"],
    comments: [
      {
        id: "c2-1",
        author: "FinanzinteressierterBürger",
        date: "2025-01-16T09:30:00",
        content: "121 Millionen - das ist viel Geld! Hoffe, es wird sinnvoll eingesetzt.",
        likes: 15,
      },
      {
        id: "c2-2",
        author: "StefanK",
        date: "2025-01-16T14:00:00",
        content: "Die Entnahme von 22,5 Mio. aus Rücklagen macht mir Sorgen. Ist das nachhaltig?",
        likes: 12,
      },
    ],
  },
  {
    id: "3",
    title: "Neues Schwimmlernhaus für Wasserwacht am Freibad geplant",
    date: "2025-01-10",
    image: "/news/schwimmlernhaus-wasserwacht-bau.jpg",
    category: "infrastructure",
    categoryIcon: "🏊‍♂️",
    summary:
      "Der Gemeinderat hat den Bau eines neuen zweigeschossigen Schwimmlernhauses für die Wasserwacht beschlossen. Der Bau soll im Herbst 2025 beginnen.",
    content: "Ein neues 135 Quadratmeter großes Schwimmlernhaus wird am Freibad gebaut.",
    parties: ["CSU", "SPD", "Grüne", "FW"],
    decision: "Einstimmig angenommen",
    votingResult: { yes: 25, no: 0, abstention: 0 },
    documentUrl: "/documents/schwimmlernhaus-2025.pdf",
    source: "TZ München, Januar 2025",
    detailedContent:
      "Der Gemeinderat hat einstimmig beschlossen, ein neues zweigeschossiges Schwimmlernhaus für die Wasserwacht am Freibad Unterhaching zu errichten.\n\nDetails:\n- Größe: 135 Quadratmeter\n- Baubeginn: Herbst 2025\n- Fertigstellung: Ende Oktober 2026\n- Zweck: Ersatz für das alte Zelt der Wasserwacht\n\nDas alte Wasserrettungszelt wurde bereits 2024 abgerissen. Nach anfänglichen Kostendiskussionen einigte man sich auf die größere Variante des Gebäudes.",
    tags: ["Freibad", "Wasserwacht", "Schwimmen", "Infrastruktur"],
    comments: [
      {
        id: "c3-1",
        author: "WasserwachtMitglied",
        date: "2025-01-11T10:00:00",
        content: "Endlich! Wir freuen uns sehr auf das neue Haus. Das alte Zelt war nicht mehr zeitgemäß.",
        likes: 20,
      },
      {
        id: "c3-2",
        author: "SchwimmelternMartin",
        date: "2025-01-11T15:30:00",
        content: "Super für die Kinder, die hier schwimmen lernen!",
        likes: 16,
      },
    ],
  },
  {
    id: "4",
    title: "Freibad Unterhaching öffnet am 18. Mai 2025",
    date: "2025-03-01",
    image: "/news/freibad-unterhaching-sommer-eroeffnung.jpg",
    category: "social",
    categoryIcon: "🏊",
    summary: "Das Freibad Unterhaching öffnet am 18. Mai 2025 mit uneingeschränkten Öffnungszeiten für die Badesaison.",
    content: "Das beliebte Freibad öffnet pünktlich zur Saison mit vollen Öffnungszeiten.",
    parties: [],
    decision: "Information",
    documentUrl: "/documents/freibad-oeffnung-2025.pdf",
    source: "Wochenanzeiger, März 2025",
    detailedContent:
      "Das Freibad Unterhaching wird am 18. Mai 2025 wiedereröffnet und wird in der Saison 2025 mit uneingeschränkten Öffnungszeiten betrieben.\n\nDie Bürger können sich auf eine vollständige Badesaison freuen mit allen gewohnten Angeboten des beliebten Freibads.",
    tags: ["Freibad", "Sommer", "Öffnung", "Baden"],
    comments: [
      {
        id: "c4-1",
        author: "SommerfreundSandra",
        date: "2025-03-02T09:00:00",
        content: "Ich kann es kaum erwarten! Endlich wieder ins Freibad.",
        likes: 18,
      },
    ],
  },
  {
    id: "5",
    title: "Sanierung von Geh- und Radwegen läuft",
    date: "2024-09-15",
    image: "/news/radwege-sanierung-fahrrad-infrastruktur.jpg",
    category: "infrastructure",
    categoryIcon: "🚴",
    summary: "Als Sofortmaßnahme der Ortsentwicklungsplanung werden Geh- und Radwege in Unterhaching saniert.",
    content: "Die Sanierung von Geh- und Radwegen ist eine der ersten Maßnahmen aus der Ortsentwicklungsplanung.",
    parties: ["Grüne", "SPD", "FDP"],
    decision: "Umgesetzt",
    documentUrl: "/documents/radwege-sanierung-2024.pdf",
    source: "Facebook Gemeinde Unterhaching, September 2024",
    detailedContent:
      "Die Ortsentwicklungsplanung (OEP) schreitet voran: Als Sofortmaßnahme startete im September 2024 die Sanierung von Geh- und Radwegen in Unterhaching.\n\nDie Maßnahme soll die Verkehrssicherheit erhöhen und die Infrastruktur für Fußgänger und Radfahrer verbessern.",
    tags: ["Radweg", "Sanierung", "Mobilität", "Infrastruktur"],
    comments: [
      {
        id: "c5-1",
        author: "RadfahrerMarkus",
        date: "2024-09-16T09:00:00",
        content: "Endlich! Viele Wege waren in schlechtem Zustand.",
        likes: 14,
      },
    ],
  },
  {
    id: "6",
    title: "Geothermie-Ausbau: Baustellen im Gemeindegebiet",
    date: "2025-03-10",
    image: "/news/geothermie-ausbau-baustelle-fernwaerme.jpg",
    category: "infrastructure",
    categoryIcon: "🔧",
    summary:
      "Im Rahmen des Geothermie-Ausbaus finden Bauarbeiten an mehreren Standorten statt, u.a. am Hallstattweg und Römerweg.",
    content: "Für den Ausbau des Geothermie-Netzes sind Straßenarbeiten an verschiedenen Orten notwendig.",
    parties: [],
    decision: "Information",
    documentUrl: "/documents/geothermie-ausbau-2025.pdf",
    source: "Gemeinde Unterhaching, Baustellen-Informationen März 2025",
    detailedContent:
      "Im Gemeindegebiet finden derzeit Bauarbeiten für die Fernwärmenetzerweiterung (Geothermie) statt.\n\nBetroffene Bereiche:\n- Hallstattweg\n- Römerweg\n- Weitere Standorte\n\nDie Arbeiten führen zu temporären Beeinträchtigungen für Fußgänger und Radfahrer. Die Gemeinde bittet um Verständnis für die notwendigen Maßnahmen.",
    tags: ["Geothermie", "Baustelle", "Fernwärme", "Energie"],
    comments: [
      {
        id: "c6-1",
        author: "AnwohnerPeter",
        date: "2025-03-11T08:30:00",
        content: "Die Baustellen sind lästig, aber für die Energiewende notwendig.",
        likes: 10,
      },
    ],
  },
  {
    id: "7",
    title: "Förderprogramm für Energiesparen und Klimaschutz",
    date: "2024-06-01",
    image: "/news/foerderprogramm-klimaschutz-solar-energie.jpg",
    category: "environment",
    categoryIcon: "☀️",
    summary:
      "Die Gemeinde bietet ein Förderprogramm für Bürger zur Umsetzung klimafreundlicher Maßnahmen an Wohngebäuden an.",
    content: "Bürger können finanzielle Unterstützung für Energiesparmaßnahmen und erneuerbare Energien erhalten.",
    parties: ["Grüne", "SPD"],
    decision: "Information",
    documentUrl: "/documents/foerderung-klimaschutz-2024.pdf",
    source: "Gemeinde Unterhaching, Klimaschutz-Website",
    detailedContent:
      "Die Gemeinde Unterhaching bietet ein Förderprogramm für Energiesparen und kommunalen Klimaschutz an.\n\nGefördert werden:\n- Maßnahmen zur Steigerung der Energieeffizienz\n- Ausbau erneuerbarer Energien\n- Klimafreundliche Maßnahmen in und an Wohngebäuden\n\nZiel ist die Reduzierung lokaler Treibhausgasemissionen und die Förderung der Klimaziele der Gemeinde.",
    tags: ["Klimaschutz", "Förderung", "Energie", "Nachhaltigkeit"],
    comments: [
      {
        id: "c7-1",
        author: "UmweltbewussteAnna",
        date: "2024-06-02T09:00:00",
        content: "Tolle Initiative! Ich werde mich über die Förderung für eine Wärmepumpe informieren.",
        likes: 16,
      },
    ],
  },
  {
    id: "8",
    title: "Lise-Meitner-Gymnasium: 20-Millionen-Euro-Erweiterung startet",
    date: "2025-02-01",
    image: "/news/lmgu-gymnasium-erweiterung-schule.jpg",
    category: "infrastructure",
    categoryIcon: "🏫",
    summary:
      "Die Erweiterung des Lise-Meitner-Gymnasiums für 20 Millionen Euro ist in Planung. Fertigstellung ist für 2027 geplant.",
    content: "Das LMGU wird um 20 Millionen Euro erweitert, um mehr Platz für Schüler zu schaffen.",
    parties: ["CSU", "SPD", "Grüne"],
    decision: "Genehmigt",
    votingResult: { yes: 22, no: 0, abstention: 3 },
    documentUrl: "/documents/lmgu-erweiterung-2025.pdf",
    source: "Merkur, Januar 2025",
    detailedContent:
      "Die Erweiterung des Lise-Meitner-Gymnasiums Unterhaching (LMGU) ist ein 20-Millionen-Euro-Projekt, das voraussichtlich 2027 fertiggestellt wird.\n\nDetails:\n- Bauvolumen: 20 Millionen Euro\n- Fertigstellung: 2027\n- Spatenstich oder Richtfest möglich in 2025\n- 2025 finden keine Abiturprüfungen statt (Umstellung auf G9)\n\nDie Umstellung auf G9 wird als organisatorischer Vorteil für die Bauarbeiten gesehen.",
    tags: ["Gymnasium", "Bildung", "Schule", "LMGU", "Erweiterung"],
    comments: [],
  },
  {
    id: "9",
    title: "Kubiz-Umbau: VHS zieht aus, neue Schülerbetreuung entsteht",
    date: "2025-03-01",
    image: "/news/kubiz-umbau-bildungszentrum.jpg",
    category: "infrastructure",
    categoryIcon: "🏢",
    summary:
      "Die VHS zieht im März aus dem Kubiz aus. Das Gebäude wird für Schülerbetreuung umgebaut mit Cafeteria und Gruppenräumen.",
    content: "Das Kubiz wird umgebaut: 180 qm im ersten Stock und 255 qm mit Cafeteria im zweiten Stock.",
    parties: ["SPD", "Grüne"],
    decision: "Genehmigt",
    documentUrl: "/documents/kubiz-umbau-2025.pdf",
    source: "Merkur, Bürgerversammlung 2025",
    detailedContent:
      "Das Kubiz wird für die Schülerbetreuung umgebaut. Die Volkshochschule (VHS) zieht im März 2025 aus.\n\nUmbau-Details:\n- 180 Quadratmeter im ersten Stock werden umgebaut\n- 255 Quadratmeter im zweiten Stock für kleine Cafeteria und Gruppenräume\n- Bauarbeiten im ersten Stock starten bald\n\nDas Projekt schafft mehr Betreuungsplätze für Schüler in Unterhaching.",
    tags: ["Kubiz", "Umbau", "Schülerbetreuung", "VHS"],
    comments: [],
  },
  {
    id: "10",
    title: "Neuer Baubetriebshof: 7,9 Millionen Euro Investition",
    date: "2025-01-20",
    image: "/news/baubetriebshof-kommunal-neubau.jpg",
    category: "infrastructure",
    categoryIcon: "🏗️",
    summary:
      "Am Grünwalder Weg entsteht ein neuer kommunaler Bauhof für 7,9 Millionen Euro mit Mehrzweckhalle und Werkstätten.",
    content: "Der neue Baubetriebshof am Grünwalder Weg kostet 7,9 Millionen Euro.",
    parties: ["CSU", "SPD", "FW"],
    decision: "Genehmigt",
    votingResult: { yes: 20, no: 2, abstention: 3 },
    documentUrl: "/documents/baubetriebshof-2025.pdf",
    source: "TZ München, Bürgerversammlung 2025",
    detailedContent:
      "Ein neuer kommunaler Bauhof wird am Grünwalder Weg gebaut. Dies ist ein Großprojekt der Gemeinde.\n\nProjekt-Details:\n- Kosten: 7,9 Millionen Euro\n- Standort: Grünwalder Weg\n- Umfang: Neue Mehrzweckhalle und Werkstätten\n\nDer Baubetriebshof ist wichtig für die gemeindliche Infrastruktur und Wartungsarbeiten.",
    tags: ["Bauhof", "Infrastruktur", "Bauprojekt", "Investition"],
    comments: [],
  },
  {
    id: "11",
    title: "Feuerwehr feiert 150-jähriges Jubiläum",
    date: "2025-04-01",
    image: "/news/feuerwehr-jubilaeum-150-jahre.jpg",
    category: "events",
    categoryIcon: "🚒",
    summary:
      "Die Freiwillige Feuerwehr Unterhaching feiert vom 29. Mai bis 1. Juni ihr 150-jähriges Bestehen (nachgeholt von 2020).",
    content: "Die Feuerwehr feiert ihr 150-jähriges Jubiläum mit großem Fest.",
    parties: [],
    decision: "Information",
    documentUrl: "/documents/feuerwehr-jubilaeum-2025.pdf",
    source: "Merkur, Januar 2025",
    detailedContent:
      "Die Freiwillige Feuerwehr Unterhaching feiert ihr 150-jähriges Bestehen mit einem großen Fest.\n\nJubiläums-Details:\n- Datum: 29. Mai bis 1. Juni 2025\n- Anlass: 150 Jahre Feuerwehr Unterhaching\n- Hintergrund: Nachgeholt von 2020 (Corona-Pandemie)\n\nAuch die Schützengesellschaft Unterhaching feiert 2025 ihr 150-jähriges Jubiläum.",
    tags: ["Feuerwehr", "Jubiläum", "150 Jahre", "Fest"],
    comments: [],
  },
  {
    id: "12",
    title: "SpVgg Unterhaching: 100 Jahre Vereinsgeschichte",
    date: "2025-03-15",
    image: "/news/spvgg-unterhaching-fussball-100-jahre.jpg",
    category: "events",
    categoryIcon: "⚽",
    summary: "Die SpVgg Unterhaching feiert 2025 ihr 100-jähriges Bestehen. Der Verein wurde 1925 gegründet.",
    content: "Die SpVgg wird 100 Jahre alt und feiert das Jubiläum.",
    parties: [],
    decision: "Information",
    documentUrl: "/documents/spvgg-jubilaeum-2025.pdf",
    source: "Merkur, Januar 2025",
    detailedContent:
      "Die Spielvereinigung Unterhaching (SpVgg) feiert 2025 ihr 100-jähriges Bestehen.\n\nJubiläums-Details:\n- Gründung: 1925\n- Jubiläum: 2025 - 100 Jahre\n- Der Verein ist ein wichtiger Teil der Gemeindegeschichte\n\nDie SpVgg Unterhaching ist über die Gemeindegrenzen hinaus bekannt und spielt aktuell in der 3. Liga.",
    tags: ["SpVgg", "Fußball", "100 Jahre", "Jubiläum", "Sport"],
    comments: [],
  },
  {
    id: "13",
    title: "Kreissparkasse: Neubau ab Februar 2025",
    date: "2025-02-01",
    image: "/news/kreissparkasse-neubau-bank.jpg",
    category: "infrastructure",
    categoryIcon: "🏦",
    summary:
      "Die Kreissparkasse an der Hauptstraße wird abgerissen und durch einen modernen Neubau ersetzt. Fertigstellung Herbst 2026.",
    content: "Die Kreissparkasse wird neu gebaut. Vollsperrung des Gehwegs ab April 2025.",
    parties: [],
    decision: "Information",
    documentUrl: "/documents/sparkasse-neubau-2025.pdf",
    source: "Gemeinde Unterhaching, Neuigkeiten",
    detailedContent:
      "Die Kreissparkassen-Filiale an der Hauptstraße wird Anfang Februar 2025 abgerissen und durch einen modernen Neubau ersetzt.\n\nBaumaßnahmen:\n- Abriss: Februar 2025\n- Fertigstellung: Herbst 2026\n- Vollsperrung Gehweg Westseite Hauptstraße ab 4. April 2025\n- Betroffene Parkplätze werden gesperrt\n\nDie Bauarbeiten dauern bis Herbst 2026.",
    tags: ["Sparkasse", "Neubau", "Hauptstraße", "Baustelle"],
    comments: [],
  },
  {
    id: "14",
    title: "Hachinger Bach: Ufersanierung und Hochwasserschutz",
    date: "2025-02-15",
    image: "/news/hachinger-bach-hochwasserschutz-natur.jpg",
    category: "environment",
    categoryIcon: "🌊",
    summary:
      "Die Ufersanierung und Hochwasserschutzmaßnahmen am Hachinger Bach sind geplant, koordiniert mit Neubiberg.",
    content: "Der Hachinger Bach wird saniert und Hochwasserschutz verbessert.",
    parties: ["Grüne", "SPD"],
    decision: "In Planung",
    documentUrl: "/documents/hachinger-bach-2025.pdf",
    source: "Merkur, Januar 2025",
    detailedContent:
      "Am Hachinger Bach stehen Ufersanierung und Hochwasserschutzmaßnahmen auf der Agenda.\n\nMaßnahmen:\n- Ufersanierung\n- Verbesserung Hochwasserschutz\n- Koordinierung mit Nachbargemeinde Neubiberg\n\nDie Maßnahmen sollen die Sicherheit bei Hochwasser erhöhen und die Ufer ökologisch aufwerten.",
    tags: ["Hochwasserschutz", "Hachinger Bach", "Umwelt", "Sanierung"],
    comments: [],
  },
]

export const CATEGORY_LABELS: Record<string, string> = {
  politics: "Politik & Gemeinderat",
  infrastructure: "Infrastruktur & Verkehr",
  environment: "Umwelt & Energie",
  social: "Soziales & Kultur",
  events: "Veranstaltungen",
  waste: "Abfall & Dienste",
  safety: "Sicherheit",
  housing: "Wohnen & Bauen",
}

export const CATEGORY_COLORS: Record<string, string> = {
  politics: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  infrastructure: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  environment: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  social: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  events: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
  waste: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  safety: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  housing: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
}
