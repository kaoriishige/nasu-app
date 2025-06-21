'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

type Contact = {
  name: string
  email: string
  message: string
  createdAt?: { seconds: number }
}

export default function ContactListPage() {
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    const fetchContacts = async () => {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      const data = snap.docs.map((doc) => doc.data() as Contact)
      setContacts(data)
    }
    fetchContacts()
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-pink-600">お問い合わせ一覧</h1>
      <table className="min-w-full border text-sm bg-white shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">日時</th>
            <th className="px-4 py-2 border">名前</th>
            <th className="px-4 py-2 border">メール</th>
            <th className="px-4 py-2 border">内容</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">
                {c.createdAt
                  ? new Date(c.createdAt.seconds * 1000).toLocaleString()
                  : '-'}
              </td>
              <td className="px-4 py-2 border">{c.name}</td>
              <td className="px-4 py-2 border">{c.email}</td>
              <td className="px-4 py-2 border whitespace-pre-wrap">{c.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
