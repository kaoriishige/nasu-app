'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'

type LandingData = {
  title: string
  headline: string
  subtitle: string
  copy: string
  ctaText: string
  ctaLink: string
  priceInfo: string[]
  introSteps: string[]
  referralInfo: string
  appPicks: string[]
  pr: string
}

export default function LandingPage() {
  const [data, setData] = useState<LandingData | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, 'settings', 'landing'))
      if (snap.exists()) {
        setData(snap.data() as LandingData)
      }
    }
    fetch()
  }, [])

  if (!data) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">{data.title}</h1>
      <p className="text-center text-lg">{data.headline}</p>
      <p className="text-center">{data.subtitle}</p>
      <p className="text-lg font-semibold text-center">{data.copy}</p>

      <div className="text-center">
        <Link href={`/${data.ctaLink}`}>
          <button className="bg-blue-600 text-white px-6 py-3 rounded text-lg mt-4">
            {data.ctaText}
          </button>
        </Link>
      </div>

      <ul className="list-disc pl-6 space-y-1">
        {data.priceInfo.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-6">ご利用の流れ</h2>
      <ol className="list-decimal pl-6 space-y-1">
        {data.introSteps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <h2 className="text-xl font-bold mt-6">紹介制度</h2>
      <p className="whitespace-pre-line">{data.referralInfo}</p>

      <h2 className="text-xl font-bold mt-6">おすすめアプリ</h2>
      <ul className="list-disc pl-6 space-y-1">
        {data.appPicks.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <p className="text-gray-700 whitespace-pre-line">{data.pr}</p>
    </div>
  )
}


