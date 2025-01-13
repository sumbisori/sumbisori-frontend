/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
interface ImportMetaEnv {
  readonly VITE_KAKAO_APPKEY: string;
  readonly VITE_SEA_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
