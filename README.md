# 🌐 MuscleRice — Frontend

Sitio web de **MuscleRice**, tienda online de suplementos deportivos en Colombia.
Construido con **React + TypeScript + Vite** como una SPA (Single Page Application).

> 🔗 Backend: [MuscleRice-Backend](https://github.com/FelipeAmaya7/MuscleRice-Backend)

---

## 📑 Índice
1. [¿Qué hace el frontend?](#-qué-hace-el-frontend)
2. [Stack tecnológico](#-stack-tecnológico)
3. [Estructura del proyecto](#-estructura-del-proyecto)
4. [Conceptos clave de la arquitectura](#-conceptos-clave-de-la-arquitectura)
5. [Páginas y rutas](#-páginas-y-rutas)
6. [Conexión con el backend](#-conexión-con-el-backend)
7. [Instalación y ejecución](#-instalación-y-ejecución)
8. [Estado actual y pendientes](#-estado-actual-y-pendientes)

---

## 🎯 ¿Qué hace el frontend?

Es todo lo que el cliente **ve y toca** en el navegador:

- Página de inicio con categorías y productos destacados
- Catálogo con **búsqueda, filtros por categoría/marca y ordenamiento**
- **Carrito** persistente (sobrevive al cerrar la pestaña) con cálculo de envío gratis
- Inicio de sesión y panel de perfil (órdenes y direcciones)

---

## 🧱 Stack tecnológico

| Tecnología | Uso |
|---|---|
| **React 19** | Interfaz construida con componentes |
| **TypeScript** | Tipos para detectar errores antes de ejecutar |
| **Vite 5** | Servidor de desarrollo y build de producción |
| **React Router 7** | Navegación entre páginas sin recargar |
| **CSS** propio + tokens | Estilos por capas (`tokens → components → layouts → pages`) |
| **Bootstrap 3** (legacy) | Grilla heredada de la plantilla original (`public/vendor`) |
| **Font Awesome 4.7** | Íconos |

---

## 📁 Estructura del proyecto

```
WebsiteMuscleRice/
├── index.html              # HTML base: React se monta en <div id="root">
├── vite.config.ts          # Alias @ → src, proxy /api → localhost:3000
├── public/
│   ├── img/                # Imágenes de productos, logos, marcas (.webp)
│   └── vendor/             # Bootstrap, Font Awesome, jQuery (legacy)
├── scripts/                # Utilidades: convertir imágenes a WebP
└── src/
    ├── main.tsx            # Arranca React y envuelve la app en los Providers
    ├── App.tsx             # Tabla de rutas (qué página va en cada URL)
    ├── types/
    │   └── index.ts        # Tipos: Product, CartItem, User, Address
    ├── services/           # Funciones que hablan con el backend
    │   ├── productService.ts
    │   ├── authService.ts
    │   └── supabaseClient.ts   # Placeholder (no se usa aún)
    ├── hooks/              # Estado global con Context API
    │   ├── useCart.tsx     # Carrito → localStorage ('mr-cart')
    │   └── useAuth.tsx     # Usuario → localStorage ('mr-auth')
    ├── components/
    │   ├── ProductCard.tsx
    │   └── layout/
    │       ├── Header.tsx
    │       └── Footer.tsx
    ├── pages/
    │   ├── home/           # HomePage
    │   ├── shop/           # Categorías, Productos, Producto, Carrito
    │   ├── auth/           # LoginPage
    │   ├── profile/        # ProfilePage
    │   ├── contacto/       # ContactoPage
    │   ├── info/           # FaqPage, NotFoundPage
    │   └── blog/           # BlogPage, SingleBlogPage
    ├── styles/
    │   ├── main.css        # Orquestador: importa todas las capas
    │   ├── tokens/         # Colores, espaciados, tipografía
    │   ├── base/ components/ layouts/ pages/
    │   └── pages/_legacy-*.css   # Estilos heredados de la plantilla
    └── assets/             # Fuentes e imágenes procesadas por Vite
```

---

## 🧠 Conceptos clave de la arquitectura

### 1. Capas: página → hook/servicio → backend
```
ProductosPage.tsx   (muestra datos y maneja la interacción)
      │ usa
      ▼
productService.ts   (sabe cómo pedir los datos: fetch a /api/productos)
      │ HTTP
      ▼
Backend Express     (consulta MongoDB y responde JSON)
```
Las páginas **no** hacen `fetch` directamente: se lo piden a un *service*. Si mañana cambia la API, solo se toca el service.

### 2. Estado global con Context (`hooks/`)
El carrito y el usuario se necesitan en muchas páginas (Header, Carrito, Perfil…).
En lugar de pasarlos de componente en componente, `main.tsx` envuelve la app:

```tsx
<AuthProvider>
  <CartProvider>
    <App />
  </CartProvider>
</AuthProvider>
```
Cualquier componente puede usar `const { cart, addToCart } = useCart()`.

### 3. Persistencia con `localStorage`
`useCart` guarda el carrito en el navegador cada vez que cambia, y lo lee al arrancar. Por eso el carrito sigue ahí si cierras la pestaña.

### 4. Fallback si el backend no responde
Si `/api/productos` falla, `productService.ts` devuelve una lista de respaldo (`mockProducts`) para que la tienda no quede vacía.

### 5. SPA + React Router
Todo el sitio es un solo `index.html`. React Router cambia la "página" sin recargar el navegador. Por eso los enlaces internos deben ser `<Link to="...">` y no `<a href="...">`.

---

## 🗺️ Páginas y rutas

| Ruta | Página | Estado |
|---|---|---|
| `/` | Inicio | ✅ |
| `/categorias` | Categorías | ✅ |
| `/productos` | Catálogo (búsqueda, filtros `?cat=` y `?brand=`, orden) | ✅ |
| `/producto/single` | Ficha de producto | 🔴 contenido de plantilla |
| `/carrito` | Carrito | ✅ (falta checkout) |
| `/login` | Login en 2 pasos (correo → código) | 🟡 simulado |
| `/registro` | Redirige a `/login` | ✅ |
| `/profile` | Perfil: órdenes y direcciones | 🟡 sin datos reales |
| `/contacto` | Contacto | 🔴 contenido de plantilla |
| `/faq` | Preguntas frecuentes | 🔴 contenido de plantilla |
| `/blog`, `/blog/single` | Blog | 🔴 contenido de plantilla |
| `*` | Página 404 | 🔴 en inglés |

---

## 🔌 Conexión con el backend

- En desarrollo, Vite redirige todo lo que empieza por **`/api`** a `http://localhost:3000` (ver `server.proxy` en `vite.config.ts`). Así no hay problemas de CORS.
- Opcionalmente se puede definir `VITE_API_URL` en un `.env` para apuntar a otro servidor.

| Service | Endpoint | Estado |
|---|---|---|
| `apiGetProducts()` | `GET /api/productos` | ✅ conectado |
| `sendOtp()` / `verifyOtp()` | — | 🟡 **mock**: el código siempre es `123456` |

---

## 🚀 Instalación y ejecución

### Requisitos
- Node.js 18+
- [Backend](https://github.com/FelipeAmaya7/MuscleRice-Backend) corriendo en `http://localhost:3000` (si no está, se usan productos de respaldo)

### Pasos
```bash
npm install
npm run dev        # → http://localhost:5173
```

### Producción
```bash
npm run build      # genera dist/
npm run preview    # prueba local del build
```

### Login de prueba
Mientras la autenticación sea simulada: ingresa cualquier correo y usa el código **`123456`**.

---

## 📌 Estado actual y pendientes

### ✅ Hecho
- Migración de HTML estático + jQuery a **React + TypeScript**
- Catálogo conectado a la API con búsqueda, filtros y orden
- Carrito completo con persistencia y envío gratis desde $150.000
- Flujo de login en 2 pasos y panel de perfil con pestañas
- Imágenes optimizadas en WebP

### 🛠️ Pendiente
- [ ] Contenido real en Contacto, FAQ y 404 (hoy es texto de plantilla)
- [ ] Arreglar enlaces rotos (Ofertas, Sale, redes, footer) e íconos `fa-solid` (requieren Font Awesome 6)
- [ ] Ficha de producto real en `/producto/:id`
- [ ] Login real contra el backend (JWT) y Header que muestre la sesión
- [ ] Checkout y pedidos reales; órdenes visibles en el perfil
- [ ] Menú móvil, buscador en el header, botón de WhatsApp
- [ ] Páginas legales (privacidad, términos, devoluciones)
- [ ] Limpiar CSS legacy y retirar Bootstrap 3 / jQuery

---

## 👤 Autor

**Felipe Amaya** — Proyecto académico MuscleRice
