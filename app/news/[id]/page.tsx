"use client"
import { notFound } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { NewsDetailClient } from "@/components/news/news-detail-client"
import { NEWS_DATA } from "@/lib/data/news-data"

interface NewsDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params
  const newsItem = NEWS_DATA.find((item) => item.id === id)

  if (!newsItem) {
    notFound()
  }

  return (
    <DashboardLayout>
      <NewsDetailClient newsItem={newsItem} />
    </DashboardLayout>
  )
}
