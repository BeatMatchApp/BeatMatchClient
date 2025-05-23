/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SPOTIFY_SERVICE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
