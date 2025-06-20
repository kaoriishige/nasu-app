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
}

export default function LandingEditorPage() {
  const [form, setForm] = useState<LandingForm>({
    title: '',
    headline: '',
    subtitle: '',
    copy: '',
    ctaText: '',
  })

  const ref = doc(db, 'settings', 'landing')

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data() as Partial<LandingForm>
        setForm(prev => ({
          ...prev,
          ...data,
        }))
      }
    }
    fetch()
  }, [ref])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }


  const save = async () => {
    await setDoc(ref, form, { merge: true })
    alert('保存しました')
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">ランディングページ編集</h1>

      {(['title', 'headline', 'subtitle', 'copy', 'ctaText'] as Array<keyof LandingForm>).map((key) => (
        <div key={key}>
          <label className="block font-medium mb-1">{key}</label>
          <input
            className="w-full border px-3 py-2 rounded"
            name={key}
            value={form[key] || ''}
            onChange={handleChange}
          />
        </div>
      ))}

      <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        保存する
      </button>
    </div>
  )
}

