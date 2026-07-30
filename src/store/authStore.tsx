import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

interface User {
  email: string
  displayName: string
  memberSince: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  signup: (email: string, password: string, displayName: string) => boolean
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = "pixelforge_users"
const SESSION_KEY = "pixelforge_session"

function getUsers(): Record<string, { password: string; displayName: string; memberSince: string }> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
  } catch {
    return {}
  }
}

function saveUsers(users: Record<string, { password: string; displayName: string; memberSince: string }>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null")
    } catch {
      return null
    }
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
    } else {
      sessionStorage.removeItem(SESSION_KEY)
    }
  }, [user])

  const login = useCallback((email: string, password: string) => {
    setError(null)
    const users = getUsers()
    const record = users[email.toLowerCase()]
    if (!record) {
      setError("No account found with this email.")
      return false
    }
    if (record.password !== password) {
      setError("Incorrect password.")
      return false
    }
    setUser({ email: email.toLowerCase(), displayName: record.displayName, memberSince: record.memberSince })
    return true
  }, [])

  const signup = useCallback((email: string, password: string, displayName: string) => {
    setError(null)
    const users = getUsers()
    const key = email.toLowerCase()
    if (users[key]) {
      setError("An account with this email already exists.")
      return false
    }
    users[key] = { password, displayName, memberSince: new Date().toISOString().split("T")[0] }
    saveUsers(users)
    setUser({ email: key, displayName, memberSince: users[key].memberSince })
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setError(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
