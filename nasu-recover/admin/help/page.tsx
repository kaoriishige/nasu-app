export default function AdminHelpPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <h1 className="text-2xl font-bold text-pink-600">運営マニュアル / ChatGPT質問ガイド</h1>

      <p className="text-gray-700">
        このページでは、運営者が困ったときにChatGPTに質問するためのテンプレートをまとめています。
        下記の例をコピーして、ChatGPTに貼り付けると、すぐに回答が得られます。
      </p>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-blue-700">✅ よくある質問テンプレート</h2>

        <div className="bg-gray-50 border p-4 rounded text-sm">
          <strong>【例1】紹介報酬が反映されていない</strong><br />
          「紹介されたユーザーが決済したのに、紹介報酬が `referralSummaries` に反映されていないようです。原因と確認方法を教えてください」
        </div>

        <div className="bg-gray-50 border p-4 rounded text-sm">
          <strong>【例2】Firestore の内容が画面に表示されない</strong><br />
          「`settings/landing` ドキュメントを編集したのに、`/landing` ページに反映されません。どこを確認すればよいですか？」
        </div>

        <div className="bg-gray-50 border p-4 rounded text-sm">
          <strong>【例3】口座情報の一括出力方法</strong><br />
          「`accounts` コレクションの全データを CSV 出力したいです。Next.js + Firebase で出力コードを教えてください」
        </div>

        <p className="text-sm text-gray-600">
          その他の質問も、「管理画面」「ランディングページ」「紹介機能」など具体的に書くことで、より正確な回答が得られます。
        </p>
      </div>
    </div>
  )
}
