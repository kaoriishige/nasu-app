// /app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'みんなの那須アプリ',
  description: '地域アプリ55選が使い放題！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  )
}


