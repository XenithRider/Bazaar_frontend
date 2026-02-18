import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

// Normalize whatever the backend sends into ROLE_XXX form
function normalizeRole(raw) {
  if (!raw) return null
  if (raw.startsWith('ROLE_')) return raw
  return `ROLE_${raw.toUpperCase()}`
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user')
      if (stored) {
        const parsed = JSON.parse(stored)
        // Normalize role on load in case it was stored in a different format
        parsed.role = normalizeRole(parsed.role)
        setUser(parsed)
      }
    } catch {
      // Corrupted storage — wipe it
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
    setLoading(false)
  }, [])

  const login = useCallback((userData) => {
    const normalized = { ...userData, role: normalizeRole(userData.role) }
    localStorage.setItem('token', normalized.token)
    localStorage.setItem('user', JSON.stringify(normalized))
    setUser(normalized)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  const role     = user?.role ?? null
  const isAdmin  = role === 'ROLE_ADMIN'
  const isSeller = role === 'ROLE_SELLER'
  const isUser   = role === 'ROLE_USER'

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, role, isAdmin, isSeller, isUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}