import type { ReactNode } from "react"

import { useAuth } from "../context/auth-context"
import { LoginGate } from "./login-gate"

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <LoginGate description="Этот раздел доступен после ввода пароля." />
    )
  }

  return <>{children}</>
}
