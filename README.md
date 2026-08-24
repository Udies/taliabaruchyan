# טליה ברוכיאן — Portfolio

A modern, minimal, fully responsive portfolio for **Talia Baruchyan** (טליה ברוכיאן) — Director, Screenwriter & Producer (במאית • תסריטאית • מפיקה).

Built **Hebrew-first / RTL** with a clean, editorial, media-focused aesthetic.

## Tech stack

- **[Next.js 14](https://nextjs.org/)** — App Router
- **TypeScript** — strict mode
- **Tailwind CSS** — with logical (RTL-aware) utilities
- **next/font/google** — [Heebo](https://fonts.google.com/specimen/Heebo) (display) + [Assistant](https://fonts.google.com/specimen/Assistant) (body)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script          | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the dev server            |
| `npm run build` | Production build                |
| `npm run start` | Serve the production build      |
| `npm run lint`  | Run ESLint (`eslint-config-next`) |

## RTL & Hebrew

- `<html lang="he" dir="rtl">` is set in `src/app/layout.tsx`.
- Layouts use Tailwind **logical properties** (`ms-*`, `me-*`, `ps-*`, `start-*`, `end-*`, `text-start`) so they mirror correctly.
- Fonts are loaded with the `hebrew` + `latin` subsets.

## Project structure

```
src/
├── app/
│   ├── layout.tsx        # RTL + fonts + metadata
│   ├── page.tsx          # composes all sections
│   └── globals.css       # design tokens + Tailwind layers
├── components/
│   ├── Navbar.tsx        # sticky, scroll-aware, mobile menu
│   ├── Hero.tsx          # headline + showreel placeholder
│   ├── ProjectCard.tsx   # single work card
│   ├── ProjectGrid.tsx   # responsive grid + category filter
│   ├── AboutSection.tsx  # bio + portrait + filmography
│   ├── ContactForm.tsx   # contact form + social links
│   └── Footer.tsx        # minimal footer
├── data/
│   └── projects.json     # mock project data (placeholder)
└── types/
    └── project.ts        # Project type
```

## Placeholder content

All copy, imagery and project data are **placeholders** so the structure is
ready before final content arrives:

- **Projects** live in [`src/data/projects.json`](src/data/projects.json) —
  edit titles, categories, years and descriptions there.
- **Thumbnails / portrait / showreel** are CSS gradient placeholders — drop in
  real media (e.g. `next/image` + Vimeo embeds) when available.
- **Contact form** is wired on the client only; connect it to an email service
  or an API route (`src/app/api/...`) to send real messages.

## Design tokens

Colors and fonts are defined as CSS variables in `src/app/globals.css` and
exposed to Tailwind in `tailwind.config.ts` (`paper`, `ink`, `muted`, `line`,
`accent`, `surface`). The palette adapts to light/dark via
`prefers-color-scheme`.
