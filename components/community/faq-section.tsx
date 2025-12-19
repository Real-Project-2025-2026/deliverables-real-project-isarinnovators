"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

const FAQ_ITEMS = [
  {
    question: "Was ist das Ratsinformationssystem?",
    answer:
      "Das Ratsinformationssystem ist eine Online-Plattform, auf der alle Beschlüsse des Gemeinderats transparent dokumentiert werden. Sie können dort Tagesordnungen, Beschlussvorlagen und Protokolle einsehen. Das System wurde 2020 modernisiert und enthält alle Beschlüsse seit 2008.",
  },
  {
    question: "Wie kann ich mich an Gemeinderatssitzungen beteiligen?",
    answer:
      "Gemeinderatssitzungen sind öffentlich und Sie können als Bürger daran teilnehmen. Die Termine finden Sie im Kalender dieser App. In der Einwohnerfragestunde zu Beginn jeder Sitzung haben Sie die Möglichkeit, Fragen zu stellen und Anliegen vorzubringen.",
  },
  {
    question: "Wo finde ich Informationen zu aktuellen Bauprojekten?",
    answer:
      "Aktuelle Bauprojekte werden in den Nachrichten dieser App veröffentlicht und im Gemeinderat beschlossen. Sie können auch das Ratsinformationssystem auf der offiziellen Website der Gemeinde Unterhaching besuchen oder sich für den Newsletter anmelden.",
  },
  {
    question: "Wie funktioniert die Online-Befragung zur Ortsentwicklung?",
    answer:
      "Die Online-Befragung ist Teil des Ortsentwicklungskonzepts. Alle Bürger können bis Februar 2025 an der Befragung teilnehmen und ihre Meinung zu wichtigen Themen äußern. Die Ergebnisse fließen direkt in die Planung der zukünftigen Gemeindeentwicklung ein.",
  },
  {
    question: "Was sind die Zukunftsteams?",
    answer:
      "Die Zukunftsteams sind ein innovatives Beteiligungsformat. Vier Teams arbeiten zu den Themen Mobilität, Klimawandel, Städtebau und Gesellschaft. Zufällig ausgewählte Bürger werden eingeladen, intensiv an der Ortsentwicklung mitzuarbeiten und konkrete Vorschläge zu erarbeiten.",
  },
  {
    question: "Wie kann ich Fördermittel für energetische Sanierung beantragen?",
    answer:
      'Die Gemeinde Unterhaching bietet finanzielle Zuschüsse für energetische Sanierungen. Anträge und weitere Informationen finden Sie auf der offiziellen Website der Gemeinde unter dem Bereich "Klimaschutz und Energie" oder Sie wenden sich direkt an das Bauamt.',
  },
  {
    question: "Wann findet die nächste Gemeinderatssitzung statt?",
    answer:
      "Die Termine für Gemeinderatssitzungen finden Sie im Kalender dieser App. Die Sitzungen finden in der Regel einmal im Monat statt. Tagesordnungen werden einige Tage vorher im Ratsinformationssystem veröffentlicht.",
  },
  {
    question: "Was ist das STADTRADELN und wie kann ich teilnehmen?",
    answer:
      "STADTRADELN ist eine bundesweite Kampagne, bei der Teams 21 Tage lang möglichst viele Kilometer mit dem Fahrrad sammeln. Unterhaching nimmt jährlich daran teil. Sie können sich online anmelden und einem Team beitreten oder ein eigenes gründen.",
  },
]

export function FAQSection() {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-2xl font-semibold">Häufig gestellte Fragen</h2>
      <Accordion type="single" collapsible className="w-full">
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  )
}
