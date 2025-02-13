// global.d.ts
import * as naverMaps from 'navermaps';

declare global {
  interface Window {
    naver: typeof naverMaps;
  }
}

export {};
