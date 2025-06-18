// /app/admin/landing-editor/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function LandingEditor() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ctaText, setCtaText] = useState('')
  const [ctaLink, setCtaLink] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, 'settings', 'landing'))
      if (snap.exists()) {
        const data = snap.data()
        setTitle(data.title || '')
        setDescription(data.description || '')
        setCtaText(data.ctaText || '')
        setCtaLink(data.ctaLink || '')
      }
    }
    fetch()
  }, [])

  const save = async () => {
    await setDoc(doc(db, 'settings', 'landing'), {
      title,
      description,
      ctaText,
      ctaLink,
    })
    alert('保存しました')
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ランディングページ編集</h1>
      <input
        className="border w-full p-2 mb-4"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border w-full p-2 mb-4"
        placeholder="説明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-4"
        placeholder="CTAボタン文言"
        value={ctaText}
        onChange={(e) => setCtaText(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-4"
        placeholder="CTAリンク先（例: subscribe）※スラッシュなしで"
        value={ctaLink}
        onChange={(e) => setCtaLink(e.target.value)}
      />
      <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        保存
      </button>
    </div>
  )
}

