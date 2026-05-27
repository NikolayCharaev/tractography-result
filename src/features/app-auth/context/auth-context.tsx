import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { APP_AUTH_STORAGE_KEY } from "../config"
import { getExpectedAccessPassword } from "../lib/access-password"
import { useNavigate } from "react-router-dom"

type AuthContextValue = {
  isAuthenticated: boolean
  /** Возвращает true при успешном входе */
  login: (password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredAuth(): boolean {
  try {
    return localStorage.getItem(APP_AUTH_STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readStoredAuth)
  const navigate = useNavigate()
  const login = useCallback((password: string) => {
    if (password === getExpectedAccessPassword()) {
      try {
        localStorage.setItem(APP_AUTH_STORAGE_KEY, "1")
      } catch {
        /* ignore quota / private mode */
      }
      setIsAuthenticated(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(APP_AUTH_STORAGE_KEY)
      navigate('/')
    } catch {
      /* ignore */
    }
    setIsAuthenticated(false)
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return ctx
}
