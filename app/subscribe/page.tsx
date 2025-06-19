'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function SubscribePage() {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
    })
    const { sessionId } = await res.json()
    const stripe = await stripePromise
    await stripe?.redirectToCheckout({ sessionId })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-6">
      <h1 className="text-3xl font-bold">月額プラン登録</h1>
      <p>初回7日間無料 → 初月480円 → 翌月以降980円</p>
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded text-lg"
      >
        {loading ? 'リダイレクト中...' : '登録する'}
      </button>
    </div>
  )
}
