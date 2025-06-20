'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="px-4 py-12 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">🎉 まずは7日間無料でお試し使い放題！</h1>
      <p className="text-center text-lg">
        特売情報・今日の運勢・相性診断・地域情報アプリ、あなたに役立つ55選、ぜんぶ入り使い放題！
      </p>

      <div className="bg-yellow-100 p-4 rounded space-y-2">
        <p>✅ 初回7日間は完全無料使い放題！</p>
        <p>✅ 初月480円キャンペーン中</p>
        <p>✅ 月額980円（自動更新・いつでも解約可）</p>
        <p>✅ 一日たったの30円でフードロス・特売情報チェック</p>
        <p>✅ 家族みんなで使えるアプリ55個</p>
      </div>

      <div className="text-center">
        <Link href="/subscribe">
          <button className="bg-blue-600 text-white px-6 py-3 text-lg rounded">📱 今すぐ無料で始める</button>
        </Link>
      </div>

      <div className="bg-green-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">💰 紹介制度</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>紹介者に手数料30%</li>
          <li>3人紹介で自分の利用料が無料に</li>
          <li>例：100人紹介で月3万円の紹介報酬</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">📝 ご利用の流れ</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>「無料で始める」ボタンをタップ</li>
          <li>メール登録＆決済でアカウント作成</li>
          <li>第1段階（7日無料）開始</li>
          <li>自動で月480円→980円</li>
          <li>いつでもキャンセル可能</li>
        </ol>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">📱 ピックアップアプリ</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>今日の運勢</li>
          <li>相性診断</li>
          <li>フードロス現品</li>
          <li>地域フリマ</li>
          <li>健康チェック etc…</li>
        </ul>
      </div>

      <div className="text-center text-gray-700 italic">
        「お得・地域・エンタメ」情報が全部入り。全年齢対応、誰でも使える55個の便利アプリ。
      </div>
    </div>
  )
}
