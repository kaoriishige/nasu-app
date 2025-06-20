'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

type LandingForm = {
  title: string
  headline: string
  subtitle: string
  copy: string
  ctaText: string
  ctaLink: string
  priceInfo: string         // textarea用
  introSteps: string        // textarea用
  referralInfo: string
  appPicks: string          // textarea用
  pr: string
}

type FirestoreLandingData = Omit<LandingForm, 'priceInfo' | 'introSteps' | 'appPicks'> & {
  priceInfo: string[]
  introSteps: string[]
  appPicks: string[]
}

export default function LandingEditorPage() {
  const [form, setForm] = useState<LandingForm>({
    title: '',
    headline: '',
    subtitle: '',
    copy: '',
    ctaText: '',
    ctaLink: '',
    priceInfo: '',
    introSteps: '',
    referralInfo: '',
    appPicks: '',
    pr: '',
  })

  const ref = doc(db, 'settings', 'landing')

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data() as Partial<FirestoreLandingData>
        setForm(prev => ({
          ...prev,
          ...data,
          priceInfo: (data.priceInfo || []).join('\n'),
          introSteps: (data.introSteps || []).join('\n'),
          appPicks: (data.appPicks || []).join('\n'),
        }))
      }
    }
    fetch()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    const payload: FirestoreLandingData = {
      ...form,
      priceInfo: form.priceInfo.split('\n').filter(Boolean),
      introSteps: form.introSteps.split('\n').filter(Boolean),
      appPicks: form.appPicks.split('\n').filter(Boolean),
    }
    await setDoc(ref, payload, { merge: true })
    alert('保存しました')
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">ランディングページ編集</h1>

      {(['title', 'headline', 'subtitle', 'copy', 'ctaText', 'ctaLink', 'referralInfo', 'pr'] as const).map((key) => (
        <div key={key}>
          <label className="block font-medium mb-1">{key}</label>
          <input
            className="w-full border px-3 py-2 rounded"
            name={key}
            value={form[key]}
            onChange={handleChange}
          />
        </div>
      ))}

      {(['priceInfo', 'introSteps', 'appPicks'] as const).map((key) => (
        <div key={key}>
          <label className="block font-medium mb-1">{key}（複数行OK）</label>
          <textarea
            className="w-full border px-3 py-2 rounded h-32"
            name={key}
            value={form[key]}
            onChange={handleChange}
          />
        </div>
      ))}

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        保存する
      </button>
    </div>
  )
}

