'use client'

import { useState } from 'react'
import Link from 'next/link'

const emotions = [
  '困っている', 'ヒマつぶし', 'お得を探したい', 'つながりたい', '自分を知りたい',
  '色んなこと知りたい', 'もっとデキる', 'スッキリしたい', 'ワクワクしたい',
  '癒やされたい', '誰かの役に立ちたい'
]

const categories = [
  '生活情報', '健康支援', '子育て', '緊急情報', '地域イベント', '防災',
  '高齢者支援', '観光', '交通', '仕事・学び', '防犯・見守り', '行政サービス'
]

export default function AppsPage() {
  const [activeTab, setActiveTab] = useState<'emotion' | 'category'>('emotion')
  const list = activeTab === 'emotion' ? emotions : categories

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 👇ここが追加案内文です */}
      <div className="text-center text-lg mb-4">
        みんなの那須アプリへようこそ！<br />
        👇こちらからアプリ一覧をチェックできます！
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">目的に合わせてアプリを探す</h1>

      <div className="flex justify-center mb-6 gap-4">
        <button
          onClick={() => setActiveTab('emotion')}
          className={`px-4 py-2 rounded-full ${activeTab === 'emotion' ? 'bg-yellow-300' : 'bg-gray-200'}`}
        >
          🎭 感情から探す
        </button>
        <button
          onClick={() => setActiveTab('category')}
          className={`px-4 py-2 rounded-full ${activeTab === 'category' ? 'bg-blue-300' : 'bg-gray-200'}`}
        >
          📂 ジャンルから探す
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {list.map((item, idx) => (
          <Link
            key={idx}
            href={`/apps/${activeTab}/${encodeURIComponent(item)}`}
            className="bg-white hover:bg-gray-100 p-4 rounded-xl shadow text-center text-sm sm:text-base font-medium transition-all"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}


