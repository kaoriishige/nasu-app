// app/admin/layout.tsx
import Link from 'next/link'
import './admin.css' // 任意。Tailwindで十分なら不要

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-100 p-4 border-r space-y-4">
        <h2 className="text-xl font-bold text-pink-600">管理メニュー</h2>
        <nav className="space-y-2">
          <Link className="block text-blue-700 hover:underline" href="/admin">ダッシュボード</Link>
          <Link className="block text-blue-700 hover:underline" href="/admin/landing-editor">ランディング編集</Link>
          <Link className="block text-blue-700 hover:underline" href="/admin/users">ユーザー管理</Link>
          <Link className="block text-blue-700 hover:underline" href="/admin/referrals">紹介報酬管理</Link>
          <Link className="block text-blue-700 hover:underline" href="/admin/accounts">口座情報</Link>
          <Link className="block text-blue-700 hover:underline" href="/admin/contact">お問い合わせ</Link>
          <Link className="block text-blue-700 hover:underline" href="/admin/help">運営マニュアル</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
