import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"

import { LoginForm } from "./login-form"

type LoginGateProps = {
  /** Подзаголовок под формой (например, для защищённого маршрута) */
  description?: string
}

export function LoginGate({
  description = "Введите пароль, чтобы открыть остальные разделы демонстрации.",
}: LoginGateProps) {
  return (
    <div className="mx-auto flex max-w-md justify-center py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Вход</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm idPrefix="login-gate" />
        </CardContent>
      </Card>
    </div>
  )
}
