import type { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
import Stripe from 'stripe'
import { initializeApp, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

if (!getApps().length) {
  initializeApp()
}

const db = getFirestore()

export const config = {
  api: {
    bodyParser: false,
  },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed')
  }

  const sig = req.headers['stripe-signature'] as string
  const buf = await buffer(req)

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret)
  } catch (err: any) {
    console.error('Webhook verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_email
    if (!email) return res.status(400).send('Missing email')

    const userRef = db.doc(`users/${email}`)
    const userSnap = await userRef.get()
    const userData = userSnap.exists ? userSnap.data() : null
    const referrerId = userData?.referrerId

    if (referrerId) {
      const amount = 294
      const referralId = `${referrerId}_${email}`

      await db.doc(`referrals/${referralId}`).set({
        referrerId,
        referredEmail: email,
        amount,
        timestamp: new Date(),
      })

      console.log('✅ Referral recorded:', referralId)
    }
  }

  res.status(200).json({ received: true })
}


  res.status(200).json({ received: true })
}


