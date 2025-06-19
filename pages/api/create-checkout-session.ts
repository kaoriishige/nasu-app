import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: 'price_1RYgu8GSCi9v27aD3b3VOVA7', // 初月（7日無料付き）プラン
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/mypage?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe?canceled=true`,
  })

  res.status(200).json({ sessionId: session.id })
}
