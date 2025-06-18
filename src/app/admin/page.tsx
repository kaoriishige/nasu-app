'use client'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">管理者メニュー</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li><Link href="/admin/landing-editor">ランディングページ編集</Link></li>
        <li><Link href="/admin/apps">アプリ管理ページ</Link></li>
        <li><Link href="/admin/users">ユーザー一覧管理</Link></li>
        <li><Link href="/admin/referrals">紹介報酬管理</Link></li>
        <li><Link href="/admin/accounts">銀行口座情報管理</Link></li>
        <li><Link href="/admin/inquiries">問い合わせ一覧</Link></li>
        <li><Link href="/landing" target=\"_blank\">▶ ランディングページを確認</Link></li>
      </ul>
    </div>
  )
}
