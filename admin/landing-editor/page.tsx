'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export default function LandingEditor() {
  const [form, setForm] = useState<any>({
    title: '',
    headline: '',
    subtitle: '',
    copy: '',
    priceInfo: [],
    introSteps: [],
    referralInfo: '',
    appPicks: [],
    pr: '',
    ctaText: '',
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, 'settings', 'landing')
      const snap = await getDoc(ref)
      if (snap.exists()) setForm(snap.data())
    }
    load()
  }, [])

  const handleChange = (key: string, value: any) => {
    setForm({ ...form, [key]: value })
  }

  const handleMultiLine = (key: string, value: string) => {
    handleChange(key, value.split('\n').filter(Boolean))
  }

  const handleSave = async () => {
    await setDoc(doc(db, 'settings', 'landing'), form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">ランディングページ編集</h1>

      {[
        ['title', 'タイトル'],
        ['headline', '見出し'],
        ['subtitle', 'サブタイトル'],
        ['copy', 'キャッチコピー'],
        ['referralInfo', '紹介制度の説明'],
        ['pr', 'PR文'],
        ['ctaText', 'CTAボタン文言'],
      ].map(([key, label]) => (
        <div key={key}>
          <label className="block font-semibold">{label}</label>
          <input
            className="w-full border p-2 rounded"
            value={form[key]}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </div>
      ))}

      {[
        ['priceInfo', '価格説明（改行区切り）'],
        ['introSteps', 'ご利用の流れ（改行区切り）'],
        ['appPicks', 'おすすめアプリ（改行区切り）'],
      ].map(([key, label]) => (
        <div key={key}>
          <label className="block font-semibold">{label}</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            value={form[key]?.join('\n') || ''}
            onChange={(e) => handleMultiLine(key, e.target.value)}
          />
        </div>
      ))}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSave}
      >
        保存
      </button>

      {saved && <p className="text-green-600">保存しました</p>}
    </div>
  )
}



