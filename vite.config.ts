import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  build: {
    rollupOptions: {
      input: {
        root: resolve(__dirname, 'index.html'),
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },

  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/registro': { target: 'http://localhost:3000', bypass: (req) => req.url?.includes('.') ? req.url : undefined },
      '/login':    { target: 'http://localhost:3000', bypass: (req) => req.url?.includes('.') ? req.url : undefined },
      '/usuario':  { target: 'http://localhost:3000', bypass: (req) => req.url?.includes('.') ? req.url : undefined },
      '/productos':{ target: 'http://localhost:3000', bypass: (req) => req.url?.includes('.') ? req.url : undefined },
      '/pedidos':  { target: 'http://localhost:3000', bypass: (req) => req.url?.includes('.') ? req.url : undefined },
      '/detalle-pedido': { target: 'http://localhost:3000', bypass: (req) => req.url?.includes('.') ? req.url : undefined },
      '/pagos':    { target: 'http://localhost:3000', bypass: (req) => req.url?.includes('.') ? req.url : undefined },
    },
  },
});