'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useUser } from '@/lib/auth' // ← Firebase AuthContext を使ってる前提

export default function MyPage() {
  const { user } = useUser()
  const [referrals, setReferrals] = useState<Record<string, any>[]>([])
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    if (!user?.email) return

    const fetchReferrals = async () => {
      const q = query(
        collection(db, 'referrals'),
        where('referrerId', '==', user.uid)
      )
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => doc.data())
      setReferrals(data)
      setTotalAmount(data.reduce((sum, r) => sum + (r.amount || 0), 0))
    }

    fetchReferrals()
  }, [user])

  if (!user) return <p className="p-6">ログインしてください</p>

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">マイページ</h1>

      <div className="bg-gray-100 p-4 rounded">
        <p>紹介した人数：{referrals.length} 人</p>
        <p>紹介報酬合計：{totalAmount.toLocaleString()} 円</p>
      </div>

      <h2 className="text-xl font-bold pt-4">紹介履歴</h2>
      <ul className="list-disc pl-6">
        {referrals.map((r, i) => (
          <li key={i}>
            {r.referredEmail} - {r.amount}円 -{' '}
            {new Date(r.timestamp.seconds * 1000).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
