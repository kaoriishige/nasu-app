return (
  <div className="p-8 max-w-2xl mx-auto bg-white rounded shadow mt-10">
    <h1 className="text-3xl font-bold mb-6 text-center">ランディングページ編集</h1>

    <label className="block text-sm font-medium mb-1">タイトル</label>
    <input
      className="border border-gray-300 w-full p-2 mb-4 rounded"
      placeholder="タイトル"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <label className="block text-sm font-medium mb-1">説明</label>
    <textarea
      className="border border-gray-300 w-full p-2 mb-4 rounded"
      placeholder="説明"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <label className="block text-sm font-medium mb-1">CTAボタン文言</label>
    <input
      className="border border-gray-300 w-full p-2 mb-4 rounded"
      placeholder="CTAボタン文言"
      value={ctaText}
      onChange={(e) => setCtaText(e.target.value)}
    />

    <label className="block text-sm font-medium mb-1">CTAリンク先（例: subscribe）※スラッシュなしで</label>
    <input
      className="border border-gray-300 w-full p-2 mb-4 rounded"
      placeholder="CTAリンク先（例: subscribe）"
      value={ctaLink}
      onChange={(e) => setCtaLink(e.target.value)}
    />

    <button
      onClick={save}
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
    >
      保存
    </button>
  </div>
)


