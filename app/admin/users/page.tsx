'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

type User = {
  uid: string
  email: string
  displayName?: string
  referrerId?: string
  createdAt?: any
}

export default function AdminUserListPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'))
      const list: User[] = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...(doc.data() as Omit<User, 'uid'>),
      }))
      setUsers(list)
    }
    fetchUsers()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">ユーザー一覧</h1>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">UID</th>
            <th className="p-2 border">メールアドレス</th>
            <th className="p-2 border">ユーザー名</th>
            <th className="p-2 border">紹介者ID</th>
            <th className="p-2 border">作成日時</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid} className="border-t">
              <td className="p-2 border">{user.uid}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.displayName || '-'}</td>
              <td className="p-2 border">{user.referrerId || '-'}</td>
              <td className="p-2 border">
                {user.createdAt?.toDate?.().toLocaleString() || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
