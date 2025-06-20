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
    <div className="px-4 py-12 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">{data.title}</h1>
      <p className="text-center text-lg">{data.headline}</p>
      <p className="text-center">{data.subtitle}</p>
      <p className="text-lg font-semibold text-center">{data.copy}</p>

      <div className="text-center">
        <Link href={`/${data.ctaLink}`}>
          <button className="bg-blue-600 text-white px-6 py-3 text-lg rounded">{data.ctaText}</button>
        </Link>
      </div>

      <div className="bg-yellow-100 p-4 rounded space-y-2">
        {data.priceInfo.map((line, i) => (
          <p key={i}>✅ {line}</p>
        ))}
      </div>

      <div className="bg-green-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">💰 紹介制度</h2>
        <p className="whitespace-pre-line">{data.referralInfo}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">📝 ご利用の流れ</h2>
        <ol className="list-decimal list-inside space-y-1">
          {data.introSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">📱 ピックアップアプリ</h2>
        <ul className="list-disc list-inside space-y-1">
          {data.appPicks.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="text-center text-gray-700 italic whitespace-pre-line">{data.pr}</div>
    </div>
  )
}

