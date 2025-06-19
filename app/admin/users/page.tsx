// ✅ app/admin/users/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

type User = {
  email: string
  displayName?: string
  createdAt?: string
}

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'))
      const list = snapshot.docs.map(doc => doc.data() as User)
      setUsers(list)
    }
    fetchUsers()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ユーザー一覧</h1>
      <ul className="space-y-2">
        {users.map((user, i) => (
          <li key={i} className="border-b py-1">
            {user.email} {user.displayName && `(${user.displayName})`}
          </li>
        ))}
      </ul>
    </div>
  )
}
