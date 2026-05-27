import { useState, type FormEvent } from "react"

import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"

import { useAuth } from "../context/auth-context"

type LoginFormProps = {
  /** После успешного входа (например, закрыть диалог) */
  onSuccess?: () => void
  /** Уникальный префикс для id полей (несколько форм на странице) */
  idPrefix?: string
  className?: string
}

export function LoginForm({
  onSuccess,
  idPrefix = "app-login",
  className,
}: LoginFormProps) {
  const { login } = useAuth()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const fieldId = `${idPrefix}-password`

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const ok = login(password)
    if (!ok) {
      setError("Неверный пароль")
      return
    }
    setPassword("")
    onSuccess?.()
  }

  return (
    <form
      className={cn("flex flex-col gap-4", className)}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId} className="text-sm font-medium">
          Пароль
        </label>
        <Input
          id={fieldId}
          type="password"
          autoComplete="current-password"
          placeholder="Пароль доступа"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={error ? true : undefined}
        />
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </div>
      <div className="flex justify-end">
        <Button type="submit">Войти</Button>
      </div>
    </form>
  )
}
