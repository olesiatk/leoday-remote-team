import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteTeam',
      filename: 'remoteEntry.js',
      exposes: { './TeamJoin': './src/TeamJoin.jsx' },
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
