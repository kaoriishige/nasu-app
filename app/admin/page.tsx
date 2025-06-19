'use client'

import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">管理ダッシュボード</h1>

      <ul className="space-y-4">
        <li>
          <Link href="/admin/landing-editor">
            <button className="w-full bg-blue-100 p-4 rounded shadow hover:bg-blue-200 text-left">
              📝 ランディングページ編集
            </button>
          </Link>
        </li>
        <li>
          <Link href="/apps">
            <button className="w-full bg-green-100 p-4 rounded shadow hover:bg-green-200 text-left">
              📱 アプリ一覧を見る
            </button>
          </Link>
        </li>
        <li>
          <Link href="/mypage">
            <button className="w-full bg-yellow-100 p-4 rounded shadow hover:bg-yellow-200 text-left">
              👤 会員マイページ（紹介報酬）
            </button>
          </Link>
        </li>
        <li>
          <Link href="/mypage/bank">
            <button className="w-full bg-purple-100 p-4 rounded shadow hover:bg-purple-200 text-left">
              💳 振込口座情報の登録・確認
            </button>
          </Link>
        </li>
        <li>
          <Link href="/mypage/contact">
            <button className="w-full bg-pink-100 p-4 rounded shadow hover:bg-pink-200 text-left">
              ✉️ お問い合わせ送信（テスト）
            </button>
          </Link>
        </li>
        <li>
          <a href="https://console.firebase.google.com/project/minna-no-nasu-app/firestore/data" target="_blank">
            <button className="w-full bg-gray-100 p-4 rounded shadow hover:bg-gray-200 text-left">
              🔍 Firestore 管理（管理者用）
            </button>
          </a>
        </li>
        <li>
          <a href="https://console.cloud.google.com/storage/browser/_details/minna-no-nasu-app.appspot.com/reports/" target="_blank">
            <button className="w-full bg-red-100 p-4 rounded shadow hover:bg-red-200 text-left">
              📁 月次CSVレポートを見る（Firebase Storage）
            </button>
          </a>
        </li>
      </ul>
    </div>
  )
}
