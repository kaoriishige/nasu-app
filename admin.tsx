import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>管理者メニュー</h1>
      <ul style={{ paddingLeft: 20, marginTop: 16 }}>
        <li><Link href="/admin/landing-editor">ランディングページ編集</Link></li>
        <li><Link href="/admin/apps">アプリ管理ページ</Link></li>
        <li><Link href="/admin/users">ユーザー一覧管理</Link></li>
        <li><Link href="/admin/referrals">紹介報酬管理</Link></li>
        <li><Link href="/admin/accounts">銀行口座情報管理</Link></li>
        <li><Link href="/admin/inquiries">問い合わせ一覧</Link></li>
        <li><Link href="/landing" target="_blank">▶ ランディングページを確認</Link></li>
      </ul>
    </div>
  )
}
