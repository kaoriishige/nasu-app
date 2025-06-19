'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUser } from '@/lib/auth'

export default function BankPage() {
  const { user } = useUser()
  const [form, setForm] = useState({
    bankName: '',
    branchName: '',
    accountType: '普通',
    accountNumber: '',
    accountHolder: '',
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user?.uid) return
    const load = async () => {
      const ref = doc(db, 'bankAccounts', user.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setForm(snap.data() as any)
      }
    }
    load()
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (!user?.uid) return
    await setDoc(doc(db, 'bankAccounts', user.uid), form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!user) return <p className="p-6">ログインしてください</p>

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">振込先口座の登録</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="銀行名（例：楽天銀行）"
        name="bankName"
        value={form.bankName}
        onChange={handleChange}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="支店名（例：ピアノ支店）"
        name="branchName"
        value={form.branchName}
        onChange={handleChange}
      />
      <select
        className="w-full border p-2 rounded"
        name="accountType"
        value={form.accountType}
        onChange={handleChange}
      >
        <option value="普通">普通</option>
        <option value="当座">当座</option>
      </select>
      <input
        className="w-full border p-2 rounded"
        placeholder="口座番号（7桁）"
        name="accountNumber"
        value={form.accountNumber}
        onChange={handleChange}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="口座名義（例：タシロ ミノル）"
        name="accountHolder"
        value={form.accountHolder}
        onChange={handleChange}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSave}
      >
        保存する
      </button>

      {saved && <p className="text-green-600">保存しました</p>}
    </div>
  )
}
