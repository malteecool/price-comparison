'use client'

import { useState, useRef, useCallback } from 'react'
import type { ProductWithPrices } from '@/lib/database.types'
import type { SearchResult } from '@/app/api/search/route'

type ResolvedSpecField = { key: string; label: string }

function formatSEK(amount: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(amount)
}

function lowestPrice(product: ProductWithPrices): number | null {
  if (!product.prices.length) return null
  return Math.min(...product.prices.map(p => p.price))
}

function savings(product: ProductWithPrices): number {
  if (product.prices.length < 2) return 0
  const prices = product.prices.map(p => p.price)
  return Math.max(...prices) - Math.min(...prices)
}

interface Labels {
  title: string
  searchPlaceholder: string
  prompt: string
  clear: string
  noResults: string
  specsTitle: string
  lowestPrice: string
  saveUpTo: string
  storeCountOne: string
  storeCountOther: string
  noPrices: string
}

interface Props {
  product: ProductWithPrices
  categorySlug: string
  specTemplate: ResolvedSpecField[]
  labels: Labels
}

export function CompareSection({ product, categorySlug, specTemplate, labels }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [comparing, setComparing] = useState<ProductWithPrices | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const search = useCallback((q: string) => {
    if (q.length < 2) {
      setResults([])
      setDropdownOpen(false)
      return
    }
    setLoading(true)
    fetch(`/api/search?q=${encodeURIComponent(q)}&category=${encodeURIComponent(categorySlug)}`)
      .then(r => r.json())
      .then((data: SearchResult[]) => {
        // Exclude the current product from results
        setResults(data.filter(r => r.id !== product.id))
        setDropdownOpen(true)
      })
      .finally(() => setLoading(false))
  }, [categorySlug, product.id])

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value
    setQuery(q)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(q), 300)
  }

  async function selectProduct(result: SearchResult) {
    setDropdownOpen(false)
    setQuery('')
    setResults([])
    setFetching(true)
    try {
      const res = await fetch(`/api/products/${result.id}`)
      const data: ProductWithPrices = await res.json()
      setComparing(data)
    } finally {
      setFetching(false)
    }
  }

  function clearComparison() {
    setComparing(null)
    setQuery('')
  }

  const productALowest = lowestPrice(product)
  const productASavings = savings(product)
  const productBLowest = comparing ? lowestPrice(comparing) : null
  const productBSavings = comparing ? savings(comparing) : null

  return (
    <section className="mb-8">
      {/* Section header */}
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/25" />
        <h2 className="text-xs font-medium uppercase tracking-widest text-foreground/50">
          {labels.title}
        </h2>
      </div>

      {/* Search / selection */}
      {!comparing ? (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInput}
            onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
            onFocus={() => results.length > 0 && setDropdownOpen(true)}
            placeholder={labels.searchPlaceholder}
            className="w-full border border-foreground/15 rounded-xl px-4 py-3 text-sm bg-background placeholder:text-foreground/30 focus:outline-none focus:border-foreground/40 transition-colors"
          />
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 rounded-full border-2 border-foreground/20 border-t-foreground/60 animate-spin" />
            </div>
          )}
          {dropdownOpen && results.length > 0 && (
            <div className="absolute top-full mt-1 left-0 right-0 border border-foreground/10 rounded-xl bg-background shadow-lg overflow-hidden z-40">
              {results.map(r => (
                <button
                  key={r.id}
                  onMouseDown={() => selectProduct(r)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-foreground/5 transition-colors border-b border-foreground/5 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    {r.brand && <p className="text-xs text-foreground/40">{r.brand}</p>}
                  </div>
                  {r.lowestPrice !== null && (
                    <p className="text-sm font-semibold shrink-0 ml-4">{formatSEK(r.lowestPrice)}</p>
                  )}
                </button>
              ))}
            </div>
          )}
          {dropdownOpen && results.length === 0 && !loading && query.length >= 2 && (
            <div className="absolute top-full mt-1 left-0 right-0 border border-foreground/10 rounded-xl bg-background shadow-lg px-4 py-3 z-40">
              <p className="text-sm text-foreground/40">{labels.noResults}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 py-2.5 border border-foreground/10 rounded-xl mb-4 text-sm">
          <span className="text-foreground/60">
            <span className="font-medium text-foreground">{comparing.name}</span>
          </span>
          <button
            onClick={clearComparison}
            className="text-xs text-foreground/40 hover:text-foreground transition-colors ml-4"
          >
            {labels.clear}
          </button>
        </div>
      )}

      {/* Loading state */}
      {fetching && (
        <div className="flex justify-center py-8">
          <div className="w-5 h-5 rounded-full border-2 border-foreground/20 border-t-foreground/60 animate-spin" />
        </div>
      )}

      {/* Comparison table */}
      {comparing && !fetching && (
        <div className="border border-foreground/10 rounded-2xl overflow-hidden">
          {/* Product header row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-foreground/8">
            <div className="px-4 py-3" />
            <div className="px-4 py-3 border-l border-foreground/8">
              <p className="text-xs text-foreground/40 mb-0.5">{product.brand}</p>
              <p className="text-sm font-semibold leading-snug">{product.name}</p>
            </div>
            <div className="px-4 py-3 border-l border-foreground/8 bg-foreground/[0.02]">
              <p className="text-xs text-foreground/40 mb-0.5">{comparing.brand}</p>
              <p className="text-sm font-semibold leading-snug">{comparing.name}</p>
            </div>
          </div>

          {/* Specs section label */}
          <div className="grid grid-cols-[1fr_1fr_1fr] bg-foreground/[0.03] border-b border-foreground/8">
            <div className="px-4 py-2">
              <p className="text-xs font-medium uppercase tracking-widest text-foreground/40">{labels.specsTitle}</p>
            </div>
            <div className="border-l border-foreground/8" />
            <div className="border-l border-foreground/8 bg-foreground/[0.02]" />
          </div>

          {/* Spec rows */}
          {specTemplate.map((field, i) => {
            const valA = product.specs?.[field.key]
            const valB = comparing.specs?.[field.key]
            const rowBg = i % 2 === 1 ? 'bg-foreground/[0.015]' : ''
            return (
              <div
                key={field.key}
                className={`grid grid-cols-[1fr_1fr_1fr] border-b border-foreground/5 last:border-0 ${rowBg}`}
              >
                <div className="px-4 py-2.5">
                  <p className="text-xs text-foreground/50">{field.label}</p>
                </div>
                <div className="px-4 py-2.5 border-l border-foreground/8">
                  <p className="text-sm">{valA ?? <span className="text-foreground/25">—</span>}</p>
                </div>
                <div className={`px-4 py-2.5 border-l border-foreground/8 ${rowBg}`}>
                  <p className="text-sm">{valB ?? <span className="text-foreground/25">—</span>}</p>
                </div>
              </div>
            )
          })}

          {/* Prices section label */}
          <div className="grid grid-cols-[1fr_1fr_1fr] bg-foreground/[0.03] border-t border-b border-foreground/8">
            <div className="px-4 py-2">
              <p className="text-xs font-medium uppercase tracking-widest text-foreground/40">{labels.lowestPrice}</p>
            </div>
            <div className="border-l border-foreground/8" />
            <div className="border-l border-foreground/8 bg-foreground/[0.02]" />
          </div>

          {/* Lowest price row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-foreground/5">
            <div className="px-4 py-3">
              <p className="text-xs text-foreground/50">{labels.lowestPrice}</p>
            </div>
            <div className="px-4 py-3 border-l border-foreground/8">
              {productALowest !== null
                ? <p className="text-base font-semibold text-green-600 dark:text-green-400">{formatSEK(productALowest)}</p>
                : <p className="text-sm text-foreground/25">{labels.noPrices}</p>}
            </div>
            <div className="px-4 py-3 border-l border-foreground/8 bg-foreground/[0.02]">
              {productBLowest !== null
                ? <p className="text-base font-semibold text-green-600 dark:text-green-400">{formatSEK(productBLowest)}</p>
                : <p className="text-sm text-foreground/25">{labels.noPrices}</p>}
            </div>
          </div>

          {/* Savings row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-foreground/5">
            <div className="px-4 py-3">
              <p className="text-xs text-foreground/50">{labels.saveUpTo}</p>
            </div>
            <div className="px-4 py-3 border-l border-foreground/8">
              {productASavings > 0
                ? <p className="text-sm font-medium">{formatSEK(productASavings)}</p>
                : <p className="text-sm text-foreground/25">—</p>}
            </div>
            <div className="px-4 py-3 border-l border-foreground/8 bg-foreground/[0.02]">
              {productBSavings !== null && productBSavings > 0
                ? <p className="text-sm font-medium">{formatSEK(productBSavings)}</p>
                : <p className="text-sm text-foreground/25">—</p>}
            </div>
          </div>

          {/* Store count row */}
          <div className="grid grid-cols-[1fr_1fr_1fr]">
            <div className="px-4 py-3">
              <p className="text-xs text-foreground/50">{labels.storeCountOther}</p>
            </div>
            <div className="px-4 py-3 border-l border-foreground/8">
              <p className="text-sm">
                {product.prices.length}&nbsp;
                {product.prices.length === 1 ? labels.storeCountOne : labels.storeCountOther}
              </p>
            </div>
            <div className="px-4 py-3 border-l border-foreground/8 bg-foreground/[0.02]">
              <p className="text-sm">
                {comparing.prices.length}&nbsp;
                {comparing.prices.length === 1 ? labels.storeCountOne : labels.storeCountOther}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Prompt when no product selected */}
      {!comparing && !fetching && (
        <p className="text-sm text-foreground/30 text-center py-6">{labels.prompt}</p>
      )}
    </section>
  )
}
