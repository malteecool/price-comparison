'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { SearchResult } from '@/app/api/search/route'

function formatSEK(amount: number) {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(amount)
}

export function SearchBar({
  placeholder,
  defaultValue = '',
}: {
  placeholder: string
  defaultValue?: string
}) {
  const [value, setValue] = useState(defaultValue)
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const fetchResults = useCallback(async (q: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data: SearchResult[] = await res.json()
      setResults(data)
      setOpen(data.length > 0)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Debounced search — 300ms
  useEffect(() => {
    const trimmed = value.trim()
    if (trimmed.length < 2) {
      setResults([])
      setOpen(false)
      return
    }
    const timer = setTimeout(() => fetchResults(trimmed), 300)
    return () => clearTimeout(timer)
  }, [value, fetchResults])

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function handleClear() {
    setValue('')
    setResults([])
    setOpen(false)
    router.push('/')
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <form method="GET" action="/" onSubmit={() => setOpen(false)}>
        <div className="relative">
          {/* Search / spinner icon */}
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            {loading ? (
              <svg
                className="w-4 h-4 animate-spin"
                style={{ color: 'var(--background)', opacity: 0.5 }}
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                style={{ color: 'var(--background)', opacity: 0.4 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>

          <input
            ref={inputRef}
            type="search"
            name="q"
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder={placeholder}
            autoComplete="off"
            style={{ background: 'var(--background)', color: 'var(--foreground)' }}
            className="w-full pl-11 pr-12 py-4 rounded-2xl text-sm outline-none placeholder:opacity-30 focus:ring-2 focus:ring-offset-0"
          />

          {value && (
            <button
              type="button"
              onClick={handleClear}
              style={{ color: 'var(--foreground)', opacity: 0.4 }}
              className="absolute inset-y-0 right-4 flex items-center text-xl leading-none hover:opacity-70 transition-opacity"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </form>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div
          style={{ background: 'var(--background)', color: 'var(--foreground)' }}
          className="absolute top-full mt-2 left-0 right-0 rounded-2xl border border-foreground/10 shadow-xl overflow-hidden z-50"
        >
          {results.map((result, i) => (
            <Link
              key={result.id}
              href={`/products/${result.id}`}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between px-4 py-3 hover:bg-foreground/5 transition-colors ${
                i !== 0 ? 'border-t border-foreground/5' : ''
              }`}
            >
              <div className="min-w-0">
                <p className="text-xs text-foreground/40 mb-0.5">{result.brand}</p>
                <p className="text-sm font-medium truncate">{result.name}</p>
              </div>
              {result.lowestPrice !== null && (
                <p className="text-sm font-semibold shrink-0 ml-4">{formatSEK(result.lowestPrice)}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
