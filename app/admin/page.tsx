'use client'

import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">管理ダッシュボード</h1>

      <ul className="space-y-4">

        {/* ✅ ランディングページを確認（公開画面） */}
        <li>
          <Link href="/landing" target="_blank">
            <button className="w-full bg-blue-50 p-4 rounded shadow hover:bg-blue-100 text-left">
              📄 ランディングページを確認（公開サイト）
            </button>
          </Link>
        </li>

        {/* 📝 ランディング編集 */}
        <li>
          <Link href="/admin/landing-editor">
            <button className="w-full bg-blue-100 p-4 rounded shadow hover:bg-blue-200 text-left">
              📝 ランディングページ編集
            </button>
          </Link>
        </li>

        {/* 📱 アプリ管理 */}
        <li>
          <Link href="/apps">
            <button className="w-full bg-green-100 p-4 rounded shadow hover:bg-green-200 text-left">
              📱 アプリ管理ページ
            </button>
          </Link>
        </li>

        {/* 👥 ユーザー一覧管理（未実装） */}
        <li>
          <button className="w-full bg-gray-100 p-4 rounded shadow text-left cursor-not-allowed opacity-60">
            👥 ユーザー一覧管理（準備中）
          </button>
        </li>

        {/* 💰 紹介報酬管理 */}
        <li>
          <Link href="/mypage">
            <button className="w-full bg-yellow-100 p-4 rounded shadow hover:bg-yellow-200 text-left">
              💰 紹介報酬管理
            </button>
          </Link>
        </li>

        {/* 💳 銀行口座管理 */}
        <li>
          <Link href="/mypage/bank">
            <button className="w-full bg-purple-100 p-4 rounded shadow hover:bg-purple-200 text-left">
              💳 銀行口座情報管理
            </button>
          </Link>
        </li>

        {/* ✉️ 問い合わせ一覧（未実装） */}
        <li>
          <button className="w-full bg-pink-100 p-4 rounded shadow text-left cursor-not-allowed opacity-60">
            ✉️ 問い合わせ一覧（準備中）
          </button>
        </li>

        {/* 🤖 ChatGPT 質問ガイド */}
        <li>
          <Link href="/admin/help">
            <button className="w-full bg-gray-100 p-4 rounded shadow hover:bg-gray-200 text-left">
              🤖 ChatGPT質問ガイド
            </button>
          </Link>
        </li>

      </ul>
    </div>
  )
}

