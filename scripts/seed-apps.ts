// scripts/seed-apps.ts
import dotenv from 'dotenv'
dotenv.config()

import { app } from '../lib/firebase-core'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const db = getFirestore(app)

const apps = [
  {
    name: 'フードロスナビゲーター',
    description: '飲食店、パン屋などのフードロスを解消し、お得に購入できるアプリ',
    url: 'https://example.com/foodloss',
    categories: ['お得を探したい', '誰かの役に立ちたい', 'スッキリしたい'],
    region: '栃木県北',
    isPremium: false,
    rating: 4.7,
    downloads: 410,
  },
  {
    name: '個性心理学（動物性格診断）',
    description: 'あなたの内なる個性と他者の個性を見つけよう',
    url: 'https://example.com/personality',
    categories: ['自分を知りたい', '色んなこと知りたい', 'ヒマつぶし'],
    region: '栃木県北',
    isPremium: false,
    rating: 4.4,
    downloads: 150,
  },
  {
    name: '今日の運勢アプリ',
    description: '今日の運勢を見てみよう',
    url: 'https://example.com/fortune',
    categories: ['ヒマつぶし', 'ワクワクしたい'],
    region: '栃木県北',
    isPremium: true,
    rating: 4.9,
    downloads: 180,
  },
  {
    name: '地域のペット情報',
    description: '迷子ペットの情報共有、新しい家族を待つペットのための掲示板',
    url: 'https://example.com/pet-connect',
    categories: ['癒やされたい', '誰かの役に立ちたい', 'つながりたい'],
    region: '栃木県北',
    isPremium: true,
    rating: 4.8,
    downloads: 290,
  },
  {
    name: 'スーパー特売情報',
    description: '那須塩原市、大田原市、那須町のスーパー特価情報をまとめたアプリ',
    url: 'https://example.com/flyer',
    categories: ['お得を探したい', 'スッキリしたい'],
    region: '栃木県北',
    isPremium: false,
    rating: 4.6,
    downloads: 320,
  },
]

async function seedApps() {
  for (const app of apps) {
    await addDoc(collection(db, 'apps'), app)
  }
  console.log('✅ 感情カテゴリ付きアプリをFirestoreに追加しました')
}

seedApps()



