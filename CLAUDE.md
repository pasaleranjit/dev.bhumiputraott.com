# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint via Next.js
```

No test runner is configured.

## Architecture

**What it is:** An internal documentation portal for the AmazinXpress ERP & GPU Exchange platform — a knowledge base, roadmap, and technical reference for internal stakeholders. Password-protected (single shared password), no public indexing.

**Data layer:** All content lives in `lib/data.ts` (a single ~870-line file). There is no database or external API. Every page pulls from named exports in this file (`MODULES_DATA`, `SPRINTS`, `BUSINESS_GLOSSARY`, etc.). When adding or editing content, this is the only file to change.

**Authentication:** Middleware (`middleware.ts`) guards all routes except `/login` and `/api/auth/*`. It checks for a `cos-auth` httpOnly cookie. The API route `POST /api/auth` validates the `PORTAL_PASSWORD` env var and sets the cookie. Set `PORTAL_PASSWORD` in `.env.local` to develop locally.

**Pages (App Router):**
- `/` — Dashboard with 5 tabs (Overview, Modules, Features, Integrations, Credentials); tab state synced to `?tab=` query param
- `/knowledge-base` — 13-section SOP reference with scroll-spy jump navigation
- `/roadmap` — Milestone timeline and expandable sprint cards
- `/tech-comparison` — Power Platform vs Custom Code matrix
- `/login` — Password entry form

**Styling:** Tailwind CSS v4 with a custom `@theme` block in `app/globals.css`. Use the CSS custom properties and utility classes defined there (`.ax-card`, `.ax-badge`, `.ax-btn-primary`, etc.) rather than raw Tailwind classes for colors and spacing. The design system uses a dark base (`--color-ax-base: #0A0A0F`), accent green (`#22C55E`), and phase colors (orange = Phase 1, purple = Phase 2).

**State management:** React `useState` and `useSearchParams` only — no external store. Interactive pages use `'use client'`. A `GlobalSearch` component provides a context-based `useGlobalSearch()` hook used across the app.

**Animations:** Framer Motion for page transitions and entrance animations on all major pages.
