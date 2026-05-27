/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Пароль для доступа к разделам кроме трактографии (попадает в клиентский бандл) */
  readonly VITE_APP_ACCESS_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
