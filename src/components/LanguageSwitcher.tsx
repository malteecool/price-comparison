'use client'

import { setLocale } from '@/app/actions'
import { locales, type Locale } from '@/lib/i18n.config'

export function LanguageSwitcher({ current }: { current: Locale }) {
  return (
    <div className="flex gap-1 text-sm">
      {locales.map(locale => (
        <button
          key={locale}
          onClick={() => setLocale(locale)}
          className={`px-2 py-1 rounded transition-colors ${
            current === locale
              ? 'font-semibold'
              : 'text-foreground/40 hover:text-foreground'
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
