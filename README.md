# Cesar Cunyarache — Portfolio

Portfolio personal bilingüe (ES/EN) construido con Astro 7, estático, sin frameworks de UI y con ~3 KB de JavaScript.

## Comandos

| Comando        | Acción                                            |
| -------------- | ------------------------------------------------- |
| `pnpm install` | Instala dependencias                              |
| `pnpm dev`     | Servidor local en `localhost:4321`                |
| `pnpm lint`    | ESLint                                            |
| `pnpm check`   | Typecheck (`astro check`)                         |
| `pnpm build`   | Typecheck + build de producción en `dist/`        |
| `pnpm preview` | Sirve el build localmente                         |
| `pnpm validate`| Lint + typecheck + build                          |

## Editar contenido

Todo el contenido vive en **`src/data/portfolio.ts`**. Los textos traducibles se escriben como `{ es: '…', en: '…' }`; los valores que no cambian con el idioma (fechas, URLs, tecnologías) son strings simples.
Los textos de interfaz (navegación, botones, SEO) están en **`src/i18n/ui.ts`**.

Antes de publicar, reemplaza los valores marcados con `TODO`:

- `contact` en `src/data/portfolio.ts` (correo, LinkedIn, GitHub)
- `site` en `astro.config.mjs` (dominio de producción, usado en canonical, Open Graph y sitemap)
- los proyectos de ejemplo (`placeholder: true`)

### Agregar un proyecto

Añade un objeto al array `projects`. Solo `slug`, `title`, `description`, `category` y `technologies` son obligatorios:

```ts
{
  slug: 'erp-inventario',
  title: { es: 'Módulo de inventario', en: 'Inventory module' },
  description: { es: '…', en: '…' },
  category: { es: 'ERP', en: 'ERP' },
  role: { es: 'Backend', en: 'Backend' },
  year: 2026,
  technologies: ['Laravel', 'PostgreSQL'],
  highlights: [{ es: '…', en: '…' }],
  image: inventoryCover,          // import inventoryCover from '../assets/inventory.png'
  imageAlt: { es: '…', en: '…' },
  repositoryUrl: 'https://github.com/…',
  liveUrl: 'https://…',
  featured: true,
}
```

Los proyectos `featured` se muestran primero. Si no hay `image`, se genera un diagrama a partir de `technologies`.

### Agregar un idioma

1. Añade el código a `locales` y sus metadatos a `localeMeta` en `src/i18n/config.ts`.
2. Ejecuta `pnpm check`: TypeScript marcará cada texto de `portfolio.ts` y `ui.ts` al que le falte la traducción.

La ruta (`/fr/`, etc.), el selector de idioma, `hreflang` y el sitemap se generan automáticamente.

## Estructura

```text
src/
├── data/          portfolio.ts (contenido), types.ts (esquema), index.ts (resolver por idioma)
├── i18n/          config.ts (idiomas + localize), ui.ts (textos de interfaz)
├── components/    Header, Hero, About, Projects, Approach, Experience, Skills, Education, Contact, Footer, ui/
├── layouts/       BaseLayout.astro
├── pages/         [...locale].astro, 404.astro, sitemap.xml.ts, robots.txt.ts
├── scripts/       módulos de interacción (reveal, scroll progress, cursor, navegación…)
└── styles/        global.css (tokens de diseño y utilidades)
```
