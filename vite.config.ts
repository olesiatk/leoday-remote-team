import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// Only prefix asset paths when building for the standalone GitHub Pages
// deploy; the federation build consumed by host-shell stays at '/'.
const base = process.env.GH_PAGES === 'true' ? '/leoday-remote-team/' : '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    federation({
      name: 'remoteTeam',
      filename: 'remoteEntry.js',
      exposes: { './TeamJoin': './src/TeamJoin.tsx' },
      shared: ['react', 'react-dom']
    })
  ],
  server: { host:true, port: 3003, strictPort: true },
    preview: {
    host: true,
    port: 3003,
    strictPort: true,
    cors: true
  },
  build: { modulePreload: false, target: 'esnext', minify: false, cssCodeSplit: false }
});
