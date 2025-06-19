'use client'

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUser } from '@/lib/auth'

export default function ContactPage() {
  const { user } = useUser()
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    if (!user || !message.trim()) return

    await addDoc(collection(db, 'contacts'), {
      uid: user.uid,
      email: user.email,
      message,
      createdAt: serverTimestamp(),
    })

    setMessage('')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  if (!user) return <p className="p-6">ログインしてください</p>

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">お問い合わせ</h1>
      <textarea
        className="w-full border p-2 rounded"
        rows={5}
        placeholder="お問い合わせ内容を入力してください"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        送信する
      </button>
      {sent && <p className="text-green-600">送信しました</p>}
    </div>
  )
}
