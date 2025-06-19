import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { app } from './firebase'

// Contextの型定義
type AuthContextType = {
  user: User | null
  loading: boolean
}

// デフォルト値
const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

// プロバイダー
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// カスタムフック
export const useUser = () => useContext(AuthContext)

