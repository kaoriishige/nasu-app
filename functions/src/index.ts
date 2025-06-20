import * as functions from 'firebase-functions' // ✅ v1構文
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { Storage } from '@google-cloud/storage'
import * as csv from 'fast-csv'
import * as fs from 'fs'

initializeApp()
const db = getFirestore()
const storage = new Storage()

export const summarizeReferralRewards = functions.pubsub
  .schedule('0 0 1 * *') // ✅ v1構文（v2ではない）
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    console.log('✅ summarizeReferralRewards running...')
    // 処理略（あなたの本来の内容）
  })

export const exportReferralSummariesToCSV = functions.https.onRequest(async (req, res) => {
  console.log('✅ exportReferralSummariesToCSV running...')
  // 処理略（あなたの本来の内容）
})



