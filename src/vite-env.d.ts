/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
interface ImportMetaEnv {
  readonly VITE_NAVER_CLIENT_ID: string;
  readonly VITE_SEA_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
