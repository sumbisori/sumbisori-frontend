import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import pluginChecker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    // PWA 설정
    svgr(),
    pluginChecker({ typescript: true }),
    AutoImport({
      imports: [
        {
          clsx: [['default', 'clsx']],
        },
      ],

      dts: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: '숨비소리',
        short_name: '숨비소리',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'ko',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
});
