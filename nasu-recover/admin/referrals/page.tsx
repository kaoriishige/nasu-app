'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

type Summary = {
  month: string
  referrerId: string
  referralCount: number
  rewardAmount: number
}

export default function ReferralSummaryPage() {
  const [summaries, setSummaries] = useState<Summary[]>([])

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, 'referralSummaries'), orderBy('month', 'desc'))
      const snap = await getDocs(q)
      const data = snap.docs.map((doc) => doc.data() as Summary)
      setSummaries(data)
    }
    fetch()
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-pink-600">紹介報酬集計</h1>
      <table className="min-w-full border text-sm bg-white shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">月</th>
            <th className="px-4 py-2 border">紹介者ID</th>
            <th className="px-4 py-2 border">紹介人数</th>
            <th className="px-4 py-2 border">報酬金額</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((s, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{s.month}</td>
              <td className="px-4 py-2 border">{s.referrerId}</td>
              <td className="px-4 py-2 border text-right">{s.referralCount}</td>
              <td className="px-4 py-2 border text-right">¥{s.rewardAmount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
