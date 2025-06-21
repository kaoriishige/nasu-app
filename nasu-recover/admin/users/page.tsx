'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

type User = {
  email: string
  displayName?: string
  referrerId?: string
  createdAt?: { seconds: number }
}

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => doc.data() as User)
      setUsers(data)
    }
    fetchUsers()
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-pink-600">ユーザー一覧</h1>
      <table className="min-w-full border text-sm bg-white shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">メール</th>
            <th className="px-4 py-2 border">名前</th>
            <th className="px-4 py-2 border">紹介者ID</th>
            <th className="px-4 py-2 border">登録日</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.displayName || '-'}</td>
              <td className="px-4 py-2 border">{user.referrerId || '-'}</td>
              <td className="px-4 py-2 border">
                {user.createdAt
                  ? new Date(user.createdAt.seconds * 1000).toLocaleDateString()
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
