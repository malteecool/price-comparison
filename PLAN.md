# Priskollen — Development Plan

This file tracks what has been built and what comes next.
Update it as steps are completed or priorities shift.

---

## Completed

- [x] Next.js 16 project scaffolded (App Router, TypeScript, Tailwind CSS v4)
- [x] Supabase schema — `suppliers`, `categories`, `products`, `prices` tables (public schema)
- [x] Seed data — 4 Swedish retailers, 5 categories, 19 electronics products with realistic SEK prices
- [x] Supabase JS client + typed `database.types.ts`
- [x] Data layer — `getCategories()`, `getProducts(categorySlug?)`, `getProduct(id)` in `src/lib/api.ts`
- [x] Home page — hero with search bar, "Dagens bästa erbjudanden" deals section, full product grid with category filter
- [x] Product detail page — price comparison table sorted by price, lowest-price badge, savings callout
- [x] Internationalization — `.properties` file format, runtime locale switching via cookie, SV + EN supported
- [x] Language switcher component in header

---

## Up Next

- [x] **Search** — wire up the search bar to filter products by name/brand (server-side, via query param `?q=`)
- [x] **Product images** — add image support to the products table and display in cards/detail page
- [x] **Price history** — add a `price_history` table and a chart on the product detail page
- [ ] **Category navigation dropdown** — header dropdown with categories and subcategories (e.g. TV → LCD, OLED, QLED). Requires: adding a `subcategories` table (or a `parent_id` self-reference on `categories`), updating the schema/seed, and building a hover/click dropdown in the header that filters products by subcategory.
- [ ] **Scraping / data ingestion** — cron job or script to populate real prices from Swedish retailers

---

## Backlog / Future Ideas

- [ ] **Product specs — Option B migration** — replace the `specs jsonb` column with a normalized `product_specs (product_id, key, value, unit)` table. Enables filtering products by spec (e.g. "show laptops with ≥32 GB RAM") using standard SQL queries or Supabase's PostgREST filters. Migrate when spec-based filtering becomes a product requirement.


- [ ] User accounts (Supabase Auth) — save favourite products, price alerts
- [ ] Price alert emails — notify users when a tracked product drops below a threshold
- [ ] More categories beyond electronics
- [ ] SEO — static generation for product pages (`generateStaticParams`)
- [ ] Sitemap + robots.txt
