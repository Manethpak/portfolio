/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DEV_API_KEY: string;
  readonly PUBLIC_DEV_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
