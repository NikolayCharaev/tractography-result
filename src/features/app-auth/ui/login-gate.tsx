import { useState, type FormEvent } from "react"

import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"

import { useAuth } from "../context/auth-context"

type LoginGateProps = {
  /** Подзаголовок под формой (например, для защищённого маршрута) */
  description?: string
}

export function LoginGate({
  description = "Введите пароль, чтобы открыть остальные разделы демонстрации.",
}: LoginGateProps) {
  const { login } = useAuth()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const ok = login(password)
    if (!ok) {
      setError("Неверный пароль")
    }
  }

  return (
    <div className="mx-auto flex max-w-md justify-center py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Вход</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 mb-6">
              <label htmlFor="app-access-password" className="text-sm font-medium">
                Пароль
              </label>
              <Input
                id="app-access-password"
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
          </CardContent>
          <CardFooter className="flex justify-end border-t bg-muted/30 pt-6">
            <Button type="submit">Войти</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
