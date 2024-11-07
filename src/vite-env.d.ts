/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_APPKEY: string;
  readonly VITE_SEA_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    kakao: any;
  }
}
