'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

type Account = {
  name: string
  bank: string
  branch: string
  type: '普通' | '当座' | string
  number: string
}

export default function AccountListPage() {
  const [accounts, setAccounts] = useState<Account[]>([])

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, 'accounts'))
      const data = snap.docs.map((doc) => doc.data() as Account)
      setAccounts(data)
    }
    fetch()
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-pink-600">口座情報一覧</h1>
      <table className="min-w-full border text-sm bg-white shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">氏名</th>
            <th className="px-4 py-2 border">銀行</th>
            <th className="px-4 py-2 border">支店</th>
            <th className="px-4 py-2 border">種別</th>
            <th className="px-4 py-2 border">口座番号</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((a, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{a.name}</td>
              <td className="px-4 py-2 border">{a.bank}</td>
              <td className="px-4 py-2 border">{a.branch}</td>
              <td className="px-4 py-2 border">{a.type}</td>
              <td className="px-4 py-2 border">{a.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
