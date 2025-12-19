"use client"

import { useI18n } from "@/lib/i18n/context"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ImprintPage() {
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
          <h1 className="text-4xl font-bold mb-2 text-foreground">Impressum</h1>
          <p className="text-muted-foreground">Rechtliche Informationen über RatsRadar</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Verantwortliche */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Verantwortliche Personen</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Tobias Rumscheidt</strong>
              </p>
              <p>
                <strong className="text-foreground">Thomas Ostermaier</strong>
              </p>
            </div>
          </div>

          {/* Projekt */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Über das Projekt</h2>
            <p className="text-sm text-muted-foreground mb-3">
              RatsRadar ist ein Universitätsprojekt der <strong className="text-foreground">Hochschule München</strong>{" "}
              im Rahmen eines Kurses am{" "}
              <strong className="text-foreground">Strascheg Center of Entrepreneurship (SCE)</strong>.
            </p>
          </div>

          {/* Kontakt */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Kontakt</h2>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                E-Mail:{" "}
                <a href="mailto:info@ratsradar.de" className="text-primary hover:text-primary/80 transition-colors">
                  info@ratsradar.de
                </a>
              </p>
            </div>
          </div>

          {/* Hochschule München */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Hochschule München</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Lothstraße 34</p>
              <p>80335 München</p>
              <p>Deutschland</p>
              <p className="mt-3">
                <strong className="text-foreground">Telefon:</strong> +49 89 1265-0
              </p>
              <p>
                <strong className="text-foreground">Website:</strong>{" "}
                <a
                  href="https://www.hm.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  www.hm.edu
                </a>
              </p>
            </div>
          </div>

          {/* SCE */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Strascheg Center of Entrepreneurship</h2>
            <p className="text-sm text-muted-foreground mb-3">
              <a
                href="https://www.sce.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                www.sce.de
              </a>
            </p>
          </div>

          {/* Haftungsausschluss */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Haftungsausschluss</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Haftung für Inhalte</h3>
                <p>
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
                  und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter. Wir sind nicht verantwortlich für externe
                  Inhalte.
                </p>
              </div>
            </div>
          </div>

          {/* Urheberrecht */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Urheberrecht</h2>
            <p className="text-sm text-muted-foreground">
              Die Inhalte unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung bedürfen
              der schriftlichen Zustimmung der Autoren.
            </p>
          </div>

          {/* Datenschutz */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Datenschutz</h2>
            <p className="text-sm text-muted-foreground">
              Informationen zum Datenschutz finden Sie in unserer{" "}
              <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                Datenschutzerklärung
              </Link>
              .
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
