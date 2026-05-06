# AmazinXpress ERP — Documentation Portal

Internal documentation portal. Next.js 15 App Router, static data, shared-password auth.

## Stack

| Layer | Package | Version |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | ^15.3 |
| UI | React + React DOM | ^19 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 + @tailwindcss/postcss | ^4 |
| Animation | Framer Motion | ^12 |
| Icons | Lucide React | ^0.475 |
| Linting | ESLint + eslint-config-next | ^9 / ^15.3 |

No backend database. All content lives in `lib/data.ts`.

## Getting started

```bash
npm install

cp .env.example .env.local
# set PORTAL_PASSWORD in .env.local

npm run dev        # http://localhost:3000  (Turbopack)
npm run build
npm run start
npm run lint
```

## Environment variables

| Variable | Description | Required |
|---|---|---|
| `PORTAL_PASSWORD` | Shared access password validated server-side | Yes |

`.env.example` ships with a placeholder. Never commit `.env.local`.

## Authentication

- `middleware.ts` intercepts every request, allows `/login` and `/api/auth/*` through
- Unauthenticated requests are redirected to `/login`
- `POST /api/auth` — validates `PORTAL_PASSWORD`, sets httpOnly cookie `cos-auth=authenticated`
- `POST /api/auth/logout` — clears the `cos-auth` cookie
- Cookie value is checked in middleware; password is never sent to the browser

Matcher excludes `_next/static`, `_next/image`, and `favicon.ico`.

## Project structure

```
dev.gpu-exchange.com/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── route.ts            POST /api/auth (login)
│   │       └── logout/
│   │           └── route.ts        POST /api/auth/logout
│   ├── knowledge-base/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── roadmap/
│   │   └── page.tsx
│   ├── tech-comparison/
│   │   └── page.tsx
│   ├── globals.css                 Design tokens + Tailwind v4 theme
│   ├── layout.tsx                  Root layout (Inter font, robots noindex)
│   └── page.tsx                    Dashboard (5-tab layout)
├── components/                     24 reusable components (see below)
├── lib/
│   └── data.ts                     Single source of truth — all content
├── middleware.ts
├── next.config.ts                  Minimal — Next.js 15 defaults
├── postcss.config.mjs
├── tsconfig.json
└── .env.example
```

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Dashboard, 5 tabs |
| `/login` | `app/login/page.tsx` | Password entry |
| `/knowledge-base` | `app/knowledge-base/page.tsx` | Business operations reference |
| `/roadmap` | `app/roadmap/page.tsx` | Team, milestones, sprints |
| `/tech-comparison` | `app/tech-comparison/page.tsx` | Power Platform vs Custom Code |

## Components

| Component | Purpose |
|---|---|
| `app-shell.tsx` | Main layout wrapper |
| `sidebar.tsx` | Left navigation |
| `top-bar.tsx` | Logo + top navigation |
| `header.tsx` | Page header |
| `tab-navigation.tsx` | Tab switcher |
| `module-card.tsx` | ERP module card |
| `stat-card.tsx` | Key metric card |
| `team-card.tsx` | Team member profile |
| `sprint-card.tsx` | Sprint summary |
| `sop-card.tsx` | SOP document card |
| `carrier-table.tsx` | Shipping carrier schedule |
| `comparison-table.tsx` | Side-by-side comparison matrix |
| `glossary-table.tsx` | Searchable glossary |
| `status-badge.tsx` | `planned / in-progress / completed / deferred` |
| `priority-badge.tsx` | `P1 / P2 / P3` |
| `progress-bar.tsx` | Progress indicator |
| `code-block.tsx` | Syntax-highlighted code |
| `collapsible-section.tsx` | Expandable content block |
| `search-input.tsx` | Search field |
| `global-search.tsx` | Full-text search across all data |
| `architecture-diagram.tsx` | SVG system architecture |
| `flow-diagram.tsx` | Process flow visualization |
| `milestone-timeline.tsx` | Vertical milestone timeline |

## Data layer

`lib/data.ts` is the only data source. No API calls, no database. All pages import from it directly.

Key exports: `PROJECT_META`, `STATS`, `MODULES_DATA`, `FEATURES_DATA`, `INTEGRATIONS_DATA`, `TEAM_MEMBERS`, `MILESTONES`, `SPRINTS`, `TEST_COVERAGE`, `E2E_JOURNEYS`, `QA_CHECKLISTS`, `CREDENTIALS_DATA`, `BUSINESS_GLOSSARY`, `CARRIER_SCHEDULE`, `RETURN_CLASSIFICATIONS`, `INTAKE_TYPES`, `ROLES_DATA`, `TECH_COMPARISON`, `ARCHITECTURE_LAYERS`, `ACCOUNTING_FLOWS`, `INVENTORY_STATES`, and more.

To add or update content, edit `lib/data.ts` only — no page files need to change for data updates.

## Design tokens

All tokens are defined in `app/globals.css` under `@theme`. Never hardcode colors or spacing in components.

```
/* Backgrounds */
--color-ax-base        #0A0A0F
--color-ax-surface     #111118
--color-ax-card        #1A1A24
--color-ax-elevated    #222230

/* Text */
--color-ax-text        #F0F0F5
--color-ax-secondary   #9090A8
--color-ax-muted       #5A5A70

/* Accents */
--color-ax-accent      #22C55E   (green — primary)
--color-ax-warning     #F59E0B
--color-ax-danger      #EF4444
--color-ax-info        #06B6D4
--color-ax-purple      #8B5CF6
--color-ax-orange      #F97316

/* Phase */
--color-ax-phase1      #F59E0B
--color-ax-phase2      #8B5CF6

/* Radius */
--radius-sm / md / lg / xl / full

/* Typography */
--font-sans   Inter, system-ui
--font-mono   JetBrains Mono, Fira Code
```

Utility classes available: `.ax-card`, `.ax-badge`, `.ax-table`, `.ax-input`, `.ax-btn-primary`, `.ax-btn-ghost`, `.ax-callout-{info|warning|danger|success|accent}`, `.nav-link`, `.ax-tab`, `.text-gradient-accent`, `.glow-accent`, `.animate-fade-in`, `.animate-slide-up`, `.scrollbar-thin`, `.grid-dot-bg`.

## Deployment

- Deployed on Centera Labs Pvt Ltd Servers
- Set `PORTAL_PASSWORD` as a production environment variable on the server
- Portal is not SEO-indexed — `robots: { index: false, follow: false }` is set in `app/layout.tsx`
