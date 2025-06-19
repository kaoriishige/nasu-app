import * as functions from 'firebase-functions'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { Storage } from '@google-cloud/storage'
import * as csv from 'fast-csv'

initializeApp()
const db = getFirestore()
const storage = new Storage()

export const summarizeReferralRewards = functions.pubsub
  .schedule('0 0 1 * *') // 月初0時に実行
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const monthStr = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`

    const snapshot = await db.collection('referrals').get()
    const summary: Record<string, { totalAmount: number; count: number }> = {}

    snapshot.forEach(doc => {
      const data = doc.data()
      const uid = data.referrerId
      if (!uid || !data.amount) return

      if (!summary[uid]) {
        summary[uid] = { totalAmount: 0, count: 0 }
      }

      summary[uid].totalAmount += data.amount
      summary[uid].count += 1
    })

    await db.collection('referralSummaries').doc(monthStr).set(summary)
    console.log('Referral rewards summarized for', monthStr)
  })

export const exportReferralSummariesToCSV = functions.https.onRequest(async (req, res) => {
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const monthStr = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`

  const summaryDoc = await db.collection('referralSummaries').doc(monthStr).get()
  if (!summaryDoc.exists) {
    res.status(404).send('Summary not found')
    return
  }

  const data = summaryDoc.data() || {}
  const rows = Object.entries(data).map(([uid, info]: any) => ({
    uid,
    totalAmount: info.totalAmount,
    count: info.count,
  }))

  const filePath = `/tmp/referral_rewards_${monthStr}.csv`
  const file = storage.bucket().file(`reports/referral_rewards_${monthStr}.csv`)
  const fs = await import('fs')

  await new Promise<void>((resolve, reject) => {
    const ws = fs.createWriteStream(filePath)
    csv.write(rows, { headers: true }).pipe(ws).on('finish', resolve).on('error', reject)
  })

  await file.save(fs.readFileSync(filePath))
  res.send(`CSV exported to Storage: referral_rewards_${monthStr}.csv`)
})
