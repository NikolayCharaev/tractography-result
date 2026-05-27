/**
 * Пароль задаётся в `.env` как VITE_APP_ACCESS_PASSWORD (попадает в бандл — только для демо).
 * Если переменная не задана, используется значение по умолчанию для локальной разработки.
 */
export function getExpectedAccessPassword(): string {
  const fromEnv = import.meta.env.VITE_APP_ACCESS_PASSWORD
  if (typeof fromEnv === "string" && fromEnv.length > 0) {
    return fromEnv
  }
  return "demo"
}
