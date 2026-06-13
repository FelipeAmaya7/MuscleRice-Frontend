# 🌐 WebsiteMuscleRice — Frontend

Sitio web del proyecto **MuscleRice**, una tienda de suplementos deportivos. Construido con **TypeScript**, **Vite** y **CSS Vanilla**, siguiendo una arquitectura de componentes modular.

---

## 🧱 Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| TypeScript | ^6.0 | Lenguaje |
| Vite | ^5.0 | Bundler y dev server |
| CSS Vanilla | — | Estilos personalizados |
| jQuery (types) | ^4.0 | Tipado para jQuery |

---

## 📁 Estructura del Proyecto

```
WebsiteMuscleRice/
├── src/
│   ├── assets/          # Recursos estáticos del código fuente
│   ├── components/      # Componentes reutilizables (navbar, footer, etc.)
│   ├── hooks/           # Lógica reutilizable (comportamientos custom)
│   ├── pages/           # Páginas principales de la app
│   │   ├── auth/        # Login y registro
│   │   ├── blog/        # Blog de nutrición y fitness
│   │   ├── cart/        # Carrito de compras
│   │   ├── home/        # Página principal
│   │   ├── info/        # Información / Sobre nosotros
│   │   ├── profile/     # Perfil del usuario
│   │   └── shop/        # Tienda / Catálogo de productos
│   ├── scripts/         # Scripts globales de la aplicación
│   ├── services/        # Llamadas a la API del backend
│   ├── styles/          # Estilos globales y variables CSS
│   └── types/           # Definición de tipos TypeScript
├── public/              # Archivos públicos estáticos
├── img/                 # Imágenes del catálogo y UI
├── vendor/              # Librerías de terceros
├── dist/                # Build de producción (generado)
├── index.html           # HTML principal (entry point)
├── 404.html             # Página de error 404
├── vite.config.ts       # Configuración de Vite
└── tsconfig.json        # Configuración de TypeScript
```

---

## 🛍️ Páginas del Sitio

| Ruta | Descripción |
|---|---|
| `/` | **Home** — Landing page principal |
| `/shop` | **Tienda** — Catálogo de suplementos |
| `/cart` | **Carrito** — Gestión del carrito de compras |
| `/auth` | **Autenticación** — Login y registro de usuarios |
| `/profile` | **Perfil** — Datos y pedidos del usuario |
| `/blog` | **Blog** — Artículos de nutrición y fitness |
| `/info` | **Información** — Sobre nosotros y contacto |

---

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 18+
- Backend [`ServiceMuscleRice`](../ServiceMuscleRice/README.md) corriendo en `http://localhost:3000`

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

### Build para producción

```bash
npm run build    # Genera la carpeta dist/
npm run preview  # Vista previa del build de producción
```

---

## 🎨 Diseño y Estilos

- Estilos con **CSS Vanilla** puro, sin frameworks como Bootstrap o Tailwind
- Variables CSS globales definidas en `src/styles/`
- Diseño responsive para desktop y móvil
- Paleta de colores enfocada en fitness y suplementación deportiva

---

## 🔌 Conexión con el Backend

Los servicios de API se encuentran en `src/services/` y se conectan al backend en:

```
http://localhost:3000/api
```

Asegúrate de que [`ServiceMuscleRice`](../ServiceMuscleRice/README.md) esté corriendo antes de usar el frontend.

---

## 👤 Autor

**Felipe Amaya** — Proyecto académico MuscleRice
