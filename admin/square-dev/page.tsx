'use client'
import { useState } from 'react'

export default function SquareDevPage() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<any>(null)

  const createCustomer = async () => {
    const res = await fetch('/api/square/create-customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Square 開発者ページ</h1>
      <input
        className="border w-full p-2 mb-2"
        placeholder="顧客メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={createCustomer}
      >
        顧客作成
      </button>
      <pre className="mt-4 bg-gray-100 p-2">{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}
