// app/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div>
      <p>管理画面トップページ</p>
      <ul className="list-disc pl-6 space-y-2">
        <li><a href="/admin/landing-editor" className="text-blue-600 underline">ランディング編集</a></li>
        <li><a href="/admin/users" className="text-blue-600 underline">ユーザー一覧</a></li>
      </ul>
    </div>
  )
}

