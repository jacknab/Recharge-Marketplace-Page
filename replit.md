# Recharge Marketplace

A beauty deals marketplace that helps people discover limited-time offers first, then browse and compare nearby nail salons.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/recharge-marketplace/src/App.tsx` — marketplace homepage, deal rails, location selector, and salon directory content
- `artifacts/recharge-marketplace/src/index.css` — marketplace typography, colors, responsive layout, and card treatments
- `artifacts/recharge-marketplace/public/` — homepage imagery used by the deal and salon cards
- `artifacts/api-server/` — shared Express API service
- `lib/api-spec/`, `lib/api-zod/`, and `lib/api-client-react/` — API contract and generated client packages

## Architecture decisions

- The homepage is a static React/Vite experience with local sample content and client-side interactions.
- The deals rail is intentionally the first content module after the promotional hero; salon discovery follows it.
- Trending gifts and Featured Deals are presented as nail-salon discovery rails rather than generic marketplace content.

## Product

- Browse limited-time beauty and wellness offers.
- Filter deals by service category and search by keyword.
- Change the active location between Aurora, Denver, and Boulder.
- Save offers and salon listings locally for the current session.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
