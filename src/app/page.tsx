import Link from 'next/link'
import { getCategories, getProducts } from '@/lib/api'
import { getLocale, getTranslations } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { SearchBar } from '@/components/SearchBar'
import { ProductImage } from '@/components/ProductImage'
import type { ProductWithPrices } from '@/lib/database.types'

function lowestPrice(product: ProductWithPrices): number | null {
  if (!product.prices.length) return null
  return Math.min(...product.prices.map(p => p.price))
}

function savings(product: ProductWithPrices): number {
  if (product.prices.length < 2) return 0
  const prices = product.prices.map(p => p.price)
  return Math.max(...prices) - Math.min(...prices)
}

function bestDeals(products: ProductWithPrices[]): ProductWithPrices[] {
  return [...products]
    .filter(p => p.prices.length >= 2)
    .sort((a, b) => savings(b) - savings(a))
    .slice(0, 4)
}

function formatSEK(amount: number): string {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(amount)
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const { category, q } = await searchParams

  const [locale, categories, products] = await Promise.all([
    getLocale(),
    getCategories(),
    getProducts({ categorySlug: category, searchQuery: q }),
  ])

  const t = await getTranslations(locale)
  const deals = bestDeals(products)
  const isSearching = Boolean(q)

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-foreground/8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {t('app.name')}
        </Link>
        <LanguageSwitcher current={locale} />
      </header>

      {/* Hero */}
      <section
        style={{ background: 'var(--foreground)', color: 'var(--background)' }}
        className="px-6 py-16 md:py-24"
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] mb-5 opacity-40 font-mono">
            {t('hero.eyebrow')}
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-10">
            {t('hero.title')}
          </h1>
          <SearchBar placeholder={t('search.placeholder')} defaultValue={q ?? ''} />
          {isSearching && (
            <p className="mt-4 text-sm opacity-50">
              {products.length} {t('search.results_for')} &ldquo;{q}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* Category filter */}
      <div className="border-b border-foreground/8 px-6 py-4">
        <div className="max-w-5xl mx-auto flex gap-2 flex-wrap">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              !category
                ? 'bg-foreground text-background border-foreground'
                : 'border-foreground/15 hover:border-foreground/40'
            }`}
          >
            {t('category.all')}
          </Link>
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/?category=${cat.slug}`}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                category === cat.slug
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-foreground/15 hover:border-foreground/40'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Best deals */}
        {!category && !isSearching && deals.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <h2 className="text-xs font-medium uppercase tracking-widest text-foreground/50">
                {t('deals.title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {deals.map(product => {
                const lowest = lowestPrice(product)
                const saving = savings(product)
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group relative flex flex-col border border-foreground/10 rounded-2xl overflow-hidden hover:border-green-500/40 hover:bg-green-500/[0.02] transition-all"
                  >
                    <ProductImage
                      src={product.image_url}
                      alt={product.name}
                      brand={product.brand}
                      className="aspect-square w-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-xs text-foreground/40">{product.brand}</p>
                        <span className="shrink-0 text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                          -{formatSEK(saving)}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium leading-snug mb-3 group-hover:underline line-clamp-2">
                        {product.name}
                      </h3>
                      <div>
                        <p className="text-xs text-foreground/40 mb-0.5">{t('product.from_price')}</p>
                        <p className="text-xl font-semibold">
                          {lowest !== null ? formatSEK(lowest) : '—'}
                        </p>
                        <p className="text-xs text-foreground/30 mt-1">
                          {product.prices.length}&nbsp;
                          {product.prices.length !== 1
                            ? t('product.store_count_other')
                            : t('product.store_count_one')}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* All products */}
        <section>
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/25" />
            <h2 className="text-xs font-medium uppercase tracking-widest text-foreground/50">
              {t('products.all_title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map(product => {
              const lowest = lowestPrice(product)
              const storeCount = product.prices.length
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group flex flex-col border border-foreground/10 rounded-2xl overflow-hidden hover:border-foreground/25 transition-all"
                >
                  <ProductImage
                    src={product.image_url}
                    alt={product.name}
                    brand={product.brand}
                    className="aspect-square w-full"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="p-4">
                    <p className="text-xs text-foreground/40 mb-1">{product.brand}</p>
                    <h2 className="text-sm font-medium leading-snug mb-3 group-hover:underline line-clamp-2">
                      {product.name}
                    </h2>
                    <div className="flex items-end justify-between">
                      <div>
                        {lowest !== null ? (
                          <>
                            <p className="text-xs text-foreground/40">{t('product.from_price')}</p>
                            <p className="text-lg font-semibold">{formatSEK(lowest)}</p>
                          </>
                        ) : (
                          <p className="text-sm text-foreground/30">{t('product.no_price')}</p>
                        )}
                      </div>
                      <p className="text-xs text-foreground/30">
                        {storeCount}&nbsp;
                        {storeCount !== 1
                          ? t('product.store_count_other')
                          : t('product.store_count_one')}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          {products.length === 0 && (
            <p className="text-foreground/40 text-center py-16">{t('product.no_results')}</p>
          )}
        </section>
      </div>
    </main>
  )
}
