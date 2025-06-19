'use client'

export default function AdminHelp() {
  return (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">管理者ヘルプ（ChatGPT質問ガイド）</h1>

      <p>
        この管理システムは、操作に困った場合でも「ChatGPTに質問するだけ」で解決できるよう設計されています。
      </p>

      <h2 className="text-xl font-semibold">🧭 ChatGPTへの質問の仕方</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          ChatGPTに「日本語で」質問して大丈夫です。英語は不要です。
        </li>
        <li>
          操作で困ったら「画面のスクリーンショットを撮って貼る」だけでOKです。
        </li>
        <li>
          たとえば次のように聞いてください：
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
            <li>
              「この画面でボタンの文言を変えたいのですが、どこを編集すればいいですか？」
            </li>
            <li>
              「保存ボタンを押しましたが、ランディングに反映されません。原因を教えてください。」
            </li>
            <li>
              「紹介報酬の合計が表示されません。どこを確認すればいいですか？」
            </li>
          </ul>
        </li>
      </ul>

      <h2 className="text-xl font-semibold">📎 画像の使い方</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          PCなら <strong>PrintScreenキー</strong> → ChatGPTに貼り付け
        </li>
        <li>
          スマホなら <strong>スクリーンショットを撮影</strong> → 画像をChatGPTにドラッグ or アップロード
        </li>
        <li>
          ChatGPTは画像を読み取り、どこをどう直すかまで具体的に教えてくれます
        </li>
      </ul>

      <p className="text-sm text-gray-500">
        ※ この仕組みは、技術に詳しくない方でも安心して運用できるように設計されています。
        操作がわからない時は、迷わずChatGPTに相談してください。
      </p>
    </div>
  )
}
