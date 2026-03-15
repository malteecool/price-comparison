import fs from 'fs'
import path from 'path'
import { cookies } from 'next/headers'
import { locales, defaultLocale, type Locale } from './i18n.config'

export { locales, defaultLocale } from './i18n.config'
export type { Locale } from './i18n.config'

function parseProperties(content: string): Record<string, string> {
  const result: Record<string, string> = {}
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIndex = trimmed.indexOf('=')
    if (eqIndex === -1) continue
    result[trimmed.slice(0, eqIndex).trim()] = trimmed.slice(eqIndex + 1).trim()
  }
  return result
}

// Cache translations per locale so the file is only read once per locale per process
const cache = new Map<Locale, Record<string, string>>()

function load(locale: Locale): Record<string, string> {
  if (cache.has(locale)) return cache.get(locale)!
  const filePath = path.join(process.cwd(), `src/i18n/${locale}.properties`)
  const parsed = parseProperties(fs.readFileSync(filePath, 'utf-8'))
  cache.set(locale, parsed)
  return parsed
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get('locale')?.value
  return (locales as readonly string[]).includes(value ?? '') ? (value as Locale) : defaultLocale
}

export async function getTranslations(locale?: Locale) {
  const resolved = locale ?? (await getLocale())
  const translations = load(resolved)
  return (key: string): string => translations[key] ?? key
}
