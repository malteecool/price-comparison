# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

Next.js 16 app (App Router) with TypeScript, Tailwind CSS v4, and Supabase as the backend.

### Directory structure

```
src/
  app/
    page.tsx                  # Home: product listing with category filter
    products/[id]/page.tsx    # Product detail: price comparison across suppliers
    layout.tsx / globals.css
  lib/
    supabase.ts               # Supabase client (singleton)
    database.types.ts         # DB row types + convenience types (ProductWithPrices, etc.)
    api.ts                    # Data fetching functions (getProducts, getProduct, getCategories)
supabase/
  schema.sql                  # Run first in Supabase SQL editor
  seed.sql                    # Mock data: 4 Swedish suppliers, 5 categories, 19 electronics products
```

### Data model

- **suppliers** — Elgiganten, MediaMarkt, NetOnNet, Komplett
- **categories** — Laptops, Smartphones, Headphones, Tablets, TVs
- **products** — belongs to a category
- **prices** — join between product × supplier, with SEK price and affiliate URL

### Key conventions

- All data fetching is in `src/lib/api.ts` via server components (no client-side fetching yet).
- `ProductWithPrices` is the primary composite type used across pages — it includes nested `category`, and `prices` with each `supplier` embedded.
- Prices are stored as `numeric(10,2)` in SEK; format with `Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' })`.
- Tailwind v4: no `tailwind.config.js` — theme customization goes in `globals.css` using `@theme`.
- Path alias `@/*` maps to `src/*`.

### Internationalization

- Translation strings live in `src/i18n/sv.properties` and `src/i18n/en.properties`
- `src/lib/i18n.config.ts` — exports `locales`, `defaultLocale`, `Locale` type (no server imports, safe for client components)
- `src/lib/i18n.ts` — server-only; exports `getLocale()` (reads cookie), `getTranslations(locale)` (returns `t()`)
- Active locale is stored in a `locale` cookie, set via the `setLocale` server action in `src/app/actions.ts`
- When adding new UI strings: add to both `.properties` files, then call `t('your.key')` in the component

### Development plan

See `PLAN.md` for a full list of completed work and what to build next. **Read it at the start of each session** to understand current project state and priorities.

### Environment

Copy `.env.local.example` to `.env.local` and fill in Supabase credentials. Run `supabase/schema.sql` then `supabase/seed.sql` in the Supabase SQL editor to set up the database.
