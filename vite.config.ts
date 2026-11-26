import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// The prototype ships as one self-contained index.html, so the same file works on
// GitHub Pages, as a claude.ai artifact, and when opened straight from disk.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    // Keep CSS byte-for-byte: the minifier rewrites some shorthands (backdrop-filter, background-position) and changes rendering.
    cssMinify: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
  },
});
