// ✅ app/landing/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'

export default function LandingPage() {
  const [data, setData] = useState<Record<string, any> | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, 'settings', 'landing')
      const snap = await getDoc(ref)
      if (snap.exists()) setData(snap.data())
    }
    fetchData()
  }, [])

  if (!data) return <div className="p-6">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <h2 className="text-xl">{data.headline}</h2>
      <p>{data.subtitle}</p>
      <Link href="/subscribe">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">{data.ctaText}</button>
      </Link>
    </div>
  )
}


