import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct, getPriceHistory } from '@/lib/api'
import { getLocale, getTranslations } from '@/lib/i18n'
import { Header } from '@/components/Header'
import { ProductImage } from '@/components/ProductImage'
import { PriceHistoryChart } from '@/components/PriceHistoryChart'
import { SpecsTable } from '@/components/SpecsTable'
import { CompareSection } from '@/components/CompareSection'
import { SPEC_TEMPLATES } from '@/lib/specs'
import type { PriceWithSupplier } from '@/lib/database.types'

function formatSEK(amount: number): string {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(amount)
}

function PriceRow({ entry, isLowest, labelLowest, labelBuy }: {
  entry: PriceWithSupplier
  isLowest: boolean
  labelLowest: string
  labelBuy: string
}) {
  return (
    <a
      href={entry.url ?? entry.supplier.website_url ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between px-5 py-4 border border-foreground/10 rounded-xl hover:border-foreground/30 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <span className="font-medium">{entry.supplier.name}</span>
        {isLowest && (
          <span className="text-xs bg-green-500/15 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
            {labelLowest}
          </span>
        )}
      </div>
      <div className="text-right">
        <span className={`text-lg font-semibold ${isLowest ? 'text-green-600 dark:text-green-400' : ''}`}>
          {formatSEK(entry.price)}
        </span>
        <span className="text-xs text-foreground/40 ml-2 group-hover:underline">{labelBuy}</span>
      </div>
    </a>
  )
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [locale, product] = await Promise.all([
    getLocale(),
    getProduct(id),
  ])

  if (!product) notFound()

  const history = await getPriceHistory(id)

  const t = await getTranslations(locale)

  const sorted: PriceWithSupplier[] = [...product.prices].sort((a, b) => a.price - b.price)
  const lowestPrice = sorted[0]?.price ?? null
  const highestPrice = sorted[sorted.length - 1]?.price ?? null
  const savings = lowestPrice !== null && highestPrice !== null ? highestPrice - lowestPrice : null

  const categorySlug = product.category?.slug ?? ''
  const rawSpecTemplate = SPEC_TEMPLATES[categorySlug] ?? []
  const resolvedSpecTemplate = rawSpecTemplate.map(f => ({ key: f.key, label: t(f.i18nKey) }))

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header locale={locale} appName={t('app.name')} />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link href="/" className="text-sm text-foreground/50 hover:text-foreground mb-6 inline-block">
          {t('nav.back')}
        </Link>

        {/* Product header */}
        <div className="mb-8 md:flex md:gap-8 md:items-start">
          <ProductImage
            src={product.image_url}
            alt={product.name}
            brand={product.brand}
            className="aspect-square w-full md:w-56 md:shrink-0 rounded-2xl overflow-hidden mb-6 md:mb-0"
            sizes="(max-width: 768px) 100vw, 224px"
          />
          <div className="flex-1">
            <p className="text-sm text-foreground/50 mb-1">
              {product.brand}
              {product.category && (
                <> · <Link href={`/?category=${product.category.slug}`} className="hover:underline">{product.category.name}</Link></>
              )}
            </p>
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
            {product.description && (
              <p className="text-foreground/60 text-sm">{product.description}</p>
            )}
          </div>
        </div>

        {/* Specs */}
        <SpecsTable
          specs={product.specs}
          template={rawSpecTemplate}
          t={t}
          labelTitle={t('specs.title')}
        />

        {/* Price summary */}
        {lowestPrice !== null && (
          <div className="bg-foreground/5 rounded-xl px-5 py-4 mb-6 flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs text-foreground/50 mb-0.5">{t('product.lowest_price')}</p>
              <p className="text-3xl font-bold">{formatSEK(lowestPrice)}</p>
            </div>
            {savings !== null && savings > 0 && (
              <div className="text-right">
                <p className="text-xs text-foreground/50 mb-0.5">{t('product.save_up_to')}</p>
                <p className="text-xl font-semibold text-green-600 dark:text-green-400">{formatSEK(savings)}</p>
              </div>
            )}
          </div>
        )}

        {/* Price history chart */}
        <PriceHistoryChart
          history={history}
          labelTitle={t('chart.title')}
          labelNoData={t('chart.no_data')}
        />

        {/* Compare section */}
        <CompareSection
          product={product}
          categorySlug={categorySlug}
          specTemplate={resolvedSpecTemplate}
          labels={{
            title: t('compare.title'),
            searchPlaceholder: t('compare.search_placeholder'),
            prompt: t('compare.prompt'),
            clear: t('compare.clear'),
            noResults: t('compare.no_results'),
            specsTitle: t('specs.title'),
            lowestPrice: t('product.lowest_price'),
            saveUpTo: t('product.save_up_to'),
            storeCountOne: t('product.store_count_one'),
            storeCountOther: t('product.store_count_other'),
            noPrices: t('product.no_prices'),
          }}
        />

        {/* Price list */}
        <h2 className="text-sm font-medium text-foreground/50 mb-3 uppercase tracking-wide">
          {t('product.prices_at')} {sorted.length} {sorted.length !== 1 ? t('product.store_count_other') : t('product.store_count_one')}
        </h2>
        <div className="flex flex-col gap-2">
          {sorted.map(entry => (
            <PriceRow
              key={entry.id}
              entry={entry}
              isLowest={entry.price === lowestPrice}
              labelLowest={t('product.badge.lowest_price')}
              labelBuy={t('product.buy')}
            />
          ))}
        </div>

        {sorted.length === 0 && (
          <p className="text-foreground/40 text-center py-10">{t('product.no_prices')}</p>
        )}
      </div>
    </main>
  )
}
