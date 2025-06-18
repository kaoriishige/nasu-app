import "./globals.css"
import { Metadata } from "next"
import { Geist_Sans, Geist_Mono } from "geist/font"

const geistSans = Geist_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "みんなの那須アプリ",
  description: "地域密着アプリ55選！初回7日無料で使い放題",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

