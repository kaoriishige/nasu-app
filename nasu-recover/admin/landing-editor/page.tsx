'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const defaultData = {
  title: '',
  headline: '',
  subtitle: '',
  copy: '',
  priceInfo: [] as string[],
  ctaText: '',
  ctaLink: '',
  referralInfo: '',
  introSteps: [] as string[],
  appPicks: [] as string[],
  pr: '',
}

export default function LandingEditor() {
  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, 'settings', 'landing'))
      if (snap.exists()) {
        setData(snap.data() as typeof defaultData)
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleArrayChange = (field: keyof typeof defaultData, index: number, value: string) => {
    const updated = [...(data[field] as string[])]
    updated[index] = value
    setData({ ...data, [field]: updated })
  }

  const addToArray = (field: keyof typeof defaultData) => {
    setData({ ...data, [field]: [...(data[field] as string[]), ''] })
  }

  const removeFromArray = (field: keyof typeof defaultData, index: number) => {
    const updated = [...(data[field] as string[])]
    updated.splice(index, 1)
    setData({ ...data, [field]: updated })
  }

  const save = async () => {
    setSaving(true)
    await setDoc(doc(db, 'settings', 'landing'), data, { merge: true })
    setSaving(false)
    alert('保存しました')
  }

  if (loading) return <div className="p-6 text-center">読み込み中...</div>

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-pink-600">ランディングページ編集</h1>

      {(['title', 'headline', 'subtitle', 'copy', 'ctaText', 'ctaLink', 'referralInfo', 'pr'] as const).map((key) => (
        <div key={key}>
          <label className="font-semibold block mb-1">{key}</label>
          <input
            className="w-full border p-2 rounded"
            value={data[key]}
            onChange={(e) => setData({ ...data, [key]: e.target.value })}
          />
        </div>
      ))}

      {(['priceInfo', 'introSteps', 'appPicks'] as const).map((key) => (
        <div key={key}>
          <label className="font-semibold block mb-1">{key}</label>
          {data[key].map((item, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                className="flex-1 border p-2 rounded"
                value={item}
                onChange={(e) => handleArrayChange(key, i, e.target.value)}
              />
              <button
                className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                onClick={() => removeFromArray(key, i)}
              >
                削除
              </button>
            </div>
          ))}
          <button
            className="mt-1 px-3 py-1 bg-blue-500 text-white text-sm rounded"
            onClick={() => addToArray(key)}
          >
            + 追加
          </button>
        </div>
      ))}

      <button
        onClick={save}
        className="px-6 py-2 bg-pink-600 text-white font-bold rounded hover:bg-pink-700"
        disabled={saving}
      >
        {saving ? '保存中...' : '保存する'}
      </button>
    </div>
  )
}
