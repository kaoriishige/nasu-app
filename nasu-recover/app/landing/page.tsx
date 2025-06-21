'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

type LandingData = {
  title: string
  headline: string
  subtitle: string
  copy: string
  priceInfo: string[]
  ctaText: string
  ctaLink: string
  referralInfo: string
  introSteps: string[]
  appPicks: string[]
  pr: string
}

export default function LandingPage() {
  const [data, setData] = useState<LandingData | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, 'settings', 'landing'))
      if (snap.exists()) setData(snap.data() as LandingData)
    }
    fetch()
  }, [])

  if (!data) return <div className="p-8 text-center">読み込み中...</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 px-6 py-12 text-gray-800">
      <div className="max-w-3xl mx-auto space-y-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600">{data.title}</h1>
        <p className="text-xl font-semibold text-blue-700">{data.headline}</p>
        <p className="text-lg">{data.subtitle}</p>

        <div className="space-y-2 text-left">
          <h2 className="text-xl font-bold text-pink-700">📌 {data.copy}</h2>
          <ul className="list-disc pl-6 text-base space-y-1">
            {data.priceInfo.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <a
          href={`/${data.ctaLink}`}
          className="inline-block mt-6 px-6 py-3 bg-pink-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-pink-600 transition"
        >
          {data.ctaText}
        </a>

        <div className="space-y-2 text-left">
          <h2 className="text-xl font-bold text-blue-700">💸 紹介制度</h2>
          <p>{data.referralInfo}</p>
        </div>

        <div className="space-y-2 text-left">
          <h2 className="text-xl font-bold text-blue-700">📝 使用手順</h2>
          <ol className="list-decimal pl-6 space-y-1">
            {data.introSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="space-y-2 text-left">
          <h2 className="text-xl font-bold text-blue-700">📱 ピックアップアプリ</h2>
          <ul className="list-disc pl-6 space-y-1">
            {data.appPicks.map((app, i) => (
              <li key={i}>{app}</li>
            ))}
          </ul>
        </div>

        <p className="text-center text-lg font-semibold text-gray-700">{data.pr}</p>

        <a
          href={`/${data.ctaLink}`}
          className="inline-block mt-8 px-8 py-3 bg-pink-500 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-pink-600 transition"
        >
          {data.ctaText}
        </a>
      </div>
    </div>
  )
}


