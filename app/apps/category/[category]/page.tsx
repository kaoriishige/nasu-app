'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

type AppData = {
  id: string
  name: string
  description: string
  url: string
  region: string
  categories: string[]
  isPremium: boolean
  rating: number
  downloads: number
}

export default function CategoryAppsPage() {
  const { category } = useParams()
  const [apps, setApps] = useState<AppData[]>([])

  useEffect(() => {
    const fetchApps = async () => {
      const snapshot = await getDocs(collection(db, 'apps'))
      const allApps = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as AppData[]

      const filtered = allApps.filter(app =>
        Array.isArray(app.categories) && app.categories.includes(category as string)
      )

      setApps(filtered)
    }

    fetchApps()
  }, [category])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">「{category}」に関連するアプリ</h1>

      {apps.length === 0 ? (
        <p className="text-gray-600">関連するアプリが見つかりませんでした。</p>
      ) : (
        <div className="space-y-4">
          {apps.map(app => (
            <div key={app.id} className="border rounded p-4 bg-white shadow">
              <h2 className="text-xl font-semibold">{app.name}</h2>
              <p className="text-gray-700 text-sm">{app.description}</p>
              <div className="text-sm text-gray-500">📍 {app.region} | ⭐️ {app.rating} | 📥 {app.downloads}</div>
              <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm mt-2 inline-block">
                アプリを開く
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
