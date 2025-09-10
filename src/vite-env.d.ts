/// <reference types="vite/client" />

type ImportMeta = {
  readonly env: ImportMetaEnv
}

type ImportMetaEnv = {
  readonly VITE_ENDPOINT_URL: string
}