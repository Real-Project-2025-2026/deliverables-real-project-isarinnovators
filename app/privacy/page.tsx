"use client"

import { useI18n } from "@/lib/i18n/context"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  const { t } = useI18n()

  return (
    <main className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Datenschutzerklärung</h1>
          <p className="text-muted-foreground">Wie wir Ihre Daten schützen</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Verantwortlicher */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Verantwortlicher</h2>
            <p className="text-sm text-muted-foreground">
              Tobias Rumscheidt und Thomas Ostermaier
              <br />
              RatsRadar (Universitätsprojekt der Hochschule München)
            </p>
          </div>

          {/* Gesammelte Daten */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Gesammelte Daten</h2>
            <p className="text-sm text-muted-foreground mb-4">RatsRadar erhebt und verarbeitet folgende Daten:</p>
            <ul className="space-y-3 text-sm">
              <li className="text-muted-foreground">
                <strong className="text-foreground">Sprachpräferenz:</strong> Wird lokal im Browser gespeichert
                (localStorage)
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Favorisierte Artikel:</strong> Werden lokal im Browser gespeichert
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Community-Interaktionen:</strong> Umfrage-Abstimmungen und
                Diskussions-Beiträge werden lokal gespeichert
              </li>
            </ul>
          </div>

          {/* Cookies */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Cookies</h2>
            <p className="text-sm text-muted-foreground">
              Diese Website nutzt Cookies – kleine Dateien, die in Ihrem Browser gespeichert werden. Wir setzen
              ausschließlich technisch notwendige Cookies ein, um die Website funktionsfähig zu halten.
            </p>
          </div>

          {/* Analytik */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Analytik und externe Dienste</h2>
            <p className="text-sm text-muted-foreground">
              Diese Website verwendet Vercel Analytics zur Erfassung anonymisierter Nutzungsdaten. Dies hilft uns, die
              Website zu verbessern und das Nutzererlebnis zu optimieren.
            </p>
          </div>

          {/* Ihre Rechte */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Ihre Rechte</h2>
            <p className="text-sm text-muted-foreground mb-4">Sie haben folgende Rechte:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Recht auf Auskunft über Ihre personenbezogenen Daten</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Recht auf Berichtigung unrichtiger Daten</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Recht auf Löschung Ihrer Daten</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Recht auf Einschränkung der Verarbeitung</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Recht auf Datenportabilität</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Recht auf Widerspruch</span>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Kontakt</h2>
            <p className="text-sm text-muted-foreground">
              Für Datenschutzanfragen und zur Ausübung Ihrer Rechte kontaktieren Sie uns unter:
              <br />
              <a href="mailto:info@ratsradar.de" className="text-primary hover:text-primary/80 transition-colors">
                info@ratsradar.de
              </a>
            </p>
          </div>

          {/* Änderungen */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Änderungen</h2>
            <p className="text-sm text-muted-foreground">
              Wir behalten uns vor, diese Datenschutzerklärung jederzeit zu ändern. Änderungen werden auf dieser Seite
              veröffentlicht.
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <p className="text-xs text-muted-foreground mt-12 pt-8 border-t border-border">
          Stand: {new Date().getFullYear()}
        </p>
      </div>
    </main>
  )
}
