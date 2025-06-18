'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'

export default function LandingPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, 'settings', 'landing')
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setData(snap.data())
      }
    }
    fetchData()
  }, [])

  if (!data) return <div className="p-6">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <h2 className="text-xl">{data.headline}</h2>
      <p>{data.subtitle}</p>
      <p className="text-lg font-semibold">{data.copy}</p>

      <Link href="/subscribe">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {data.ctaText}
        </button>
      </Link>

      <ul className="list-disc pl-6 space-y-1">
        {data.priceInfo?.map((line: string, i: number) => (
          <li key={i}>{line}</li>
        ))}
      </ul>

      <h3 className="text-xl font-bold">ご利用の流れ</h3>
      <ul className="list-decimal pl-6 space-y-1">
        {data.introSteps?.map((step: string, i: number) => (
          <li key={i}>{step}</li>
        ))}
      </ul>

      <h3 className="text-xl font-bold">紹介制度</h3>
      <p className="whitespace-pre-line">{data.referralInfo}</p>

      <h3 className="text-xl font-bold">おすすめアプリ</h3>
      <ul className="list-disc pl-6 space-y-1">
        {data.appPicks?.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <p className="whitespace-pre-line text-gray-700">{data.pr}</p>

      <div className="text-center">
        <Link href="/subscribe">
          <button className="bg-blue-600 text-white px-6 py-3 rounded text-lg mt-4">
            {data.ctaText}
          </button>
        </Link>
      </div>
    </div>
  )
}

