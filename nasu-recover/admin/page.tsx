// app/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-pink-600">管理者ダッシュボード</h1>
      <p className="text-gray-700">ここから各種編集・管理ページへアクセスできます。</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { href: '/admin/landing-editor', title: 'ランディング編集' },
          { href: '/admin/users', title: 'ユーザー管理' },
          { href: '/admin/referrals', title: '紹介報酬管理' },
          { href: '/admin/accounts', title: '口座情報管理' },
          { href: '/admin/contact', title: 'お問い合わせ' },
          { href: '/admin/help', title: '運営マニュアル' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="p-4 border rounded-lg shadow hover:bg-pink-50 transition"
          >
            <h2 className="text-lg font-bold text-blue-700">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.href}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
