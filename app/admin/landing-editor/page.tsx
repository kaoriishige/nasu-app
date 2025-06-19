'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export default function LandingEditor() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cta, setCta] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const docRef = doc(db, 'settings', 'landing')
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setTitle(data.title || '')
        setDescription(data.description || '')
        setCta(data.cta || '')
      }
    }
    loadData()
  }, [])

  const handleSave = async () => {
    await setDoc(doc(db, 'settings', 'landing'), {
      title,
      description,
      cta,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">ランディングページ編集</h1>
      <input
        className="w-full border p-2 rounded"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="説明"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="CTAボタン文言"
        value={cta}
        onChange={(e) => setCta(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        保存
      </button>
      {saved && <p className="text-green-600">保存しました</p>}
    </div>
  )
}
