import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  build: {
    rollupOptions: {
      input: {
        // Raíz (redirige a home)
        root:              resolve(__dirname, 'index.html'),

        // ── Home ──────────────────────────────────────────────
        home:              resolve(__dirname, 'src/pages/home/index.html'),

        // ── Auth ──────────────────────────────────────────────
        login:             resolve(__dirname, 'src/pages/auth/login.html'),
        registro:          resolve(__dirname, 'src/pages/auth/registro.html'),

        // ── Shop ──────────────────────────────────────────────
        categorias:        resolve(__dirname, 'src/pages/shop/categorias.html'),
        'single-product':  resolve(__dirname, 'src/pages/shop/single-product.html'),
        'prodact-display': resolve(__dirname, 'src/pages/shop/prodact-display.html'),

        // ── Cart ──────────────────────────────────────────────
        carrito:           resolve(__dirname, 'src/pages/cart/carrito.html'),

        // ── Profile ───────────────────────────────────────────
        usuario:           resolve(__dirname, 'src/pages/profile/usuario.html'),

        // ── Blog ──────────────────────────────────────────────
        blog:              resolve(__dirname, 'src/pages/blog/blog.html'),
        'single-blog':     resolve(__dirname, 'src/pages/blog/single-blog.html'),

        // ── Info ──────────────────────────────────────────────
        contact:           resolve(__dirname, 'src/pages/info/contact.html'),
        faq:               resolve(__dirname, 'src/pages/info/faq.html'),

        // ── 404 ───────────────────────────────────────────────
        '404':             resolve(__dirname, '404.html'),
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },

  plugins: [
    {
      // Plugin: redirige rutas cortas a sus HTMLs en src/pages/
      name: 'musclerice-router',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const routeMap: Record<string, string> = {
            '/':                    '/src/pages/home/index.html',
            '/home':                '/src/pages/home/index.html',
            '/index.html':          '/src/pages/home/index.html',
            '/login':               '/src/pages/auth/login.html',
            '/login.html':          '/src/pages/auth/login.html',
            '/registro':            '/src/pages/auth/registro.html',
            '/registro.html':       '/src/pages/auth/registro.html',
            '/carrito':             '/src/pages/cart/carrito.html',
            '/carrito.html':        '/src/pages/cart/carrito.html',
            '/usuario':             '/src/pages/profile/usuario.html',
            '/usuario.html':        '/src/pages/profile/usuario.html',
            '/categorias':          '/src/pages/shop/categorias.html',
            '/categorias.html':     '/src/pages/shop/categorias.html',
            '/single-product':      '/src/pages/shop/single-product.html',
            '/single-product.html': '/src/pages/shop/single-product.html',
            '/prodact-display':     '/src/pages/shop/prodact-display.html',
            '/prodact-display.html':'/src/pages/shop/prodact-display.html',
            '/blog':                '/src/pages/blog/blog.html',
            '/blog.html':           '/src/pages/blog/blog.html',
            '/single-blog':         '/src/pages/blog/single-blog.html',
            '/single-blog.html':    '/src/pages/blog/single-blog.html',
            '/contact':             '/src/pages/info/contact.html',
            '/contact.html':        '/src/pages/info/contact.html',
            '/faq':                 '/src/pages/info/faq.html',
            '/faq.html':            '/src/pages/info/faq.html',
          };

          const url = req.url?.split('?')[0] ?? '/';
          if (routeMap[url]) {
            req.url = routeMap[url];
          }
          next();
        });
      },
    },
  ],

  server: {
    port: 5173,
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