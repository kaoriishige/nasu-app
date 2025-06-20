// app/admin/layout.tsx
export const metadata = {
  title: '管理ページ',
  description: '管理者専用ページ',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-black p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">管理画面</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}
