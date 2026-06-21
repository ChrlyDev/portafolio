# Portfolio — Carlos

Stack: Next.js 14 · TypeScript · Tailwind CSS · GSAP

## Arrancar en local

```bash
pnpm install
pnpm dev
```

Abre http://localhost:3000

## Personalizar

Toda tu info está en un solo archivo:

```
src/lib/data.ts
```

Edita ahí: nombre, apellido, descripción, proyectos, skills, links.

## Subir tu foto

Coloca tu foto en `/public/photo.jpg` y reemplaza el div del avatar en:
```
src/components/sections/Hero.tsx
```

Por:
```tsx
<Image src="/photo.jpg" alt="Carlos" width={220} height={260} className="rounded-xl object-cover" />
```

## Deploy en Vercel

```bash
pnpm build
```

Conecta el repo a Vercel y listo — zero config necesaria.

## Estructura

```
src/
  app/           → layout, page, globals.css
  components/
    layout/      → Navbar
    sections/    → Hero, Strips, Projects, Skills, Contact
  lib/           → data.ts (toda tu info aquí)
  hooks/         → useGSAP.ts
```

## Animaciones GSAP

- Hero: entrada staggered al cargar la página
- Projects: ScrollTrigger desde abajo al hacer scroll
- Skills: barras animadas al entrar en viewport
- Navbar: blur + border al hacer scroll
