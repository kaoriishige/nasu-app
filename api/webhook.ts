// pages/api/square/webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const event = req.body

  // 例：支払い成功イベント
  if (event.type === 'payment.created') {
    const payment = event.data.object
    // Firestoreに保存などの処理
    console.log('💰 支払い成功:', payment.id)
  }

  res.status(200).end()
}
