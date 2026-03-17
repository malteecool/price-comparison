import Link from 'next/link'
import { getCategoryTree } from '@/lib/api'
import { getLocale, getTranslations } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { CategoryNav } from '@/components/CategoryNav'
import type { Locale } from '@/lib/i18n.config'

interface Props {
  locale: Locale
  appName: string
}

export async function Header({ locale, appName }: Props) {
  const tree = await getCategoryTree()

  return (
    <header className="border-b border-foreground/8">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            {appName}
          </Link>
          <CategoryNav tree={tree} />
        </div>
        <LanguageSwitcher current={locale} />
      </div>
    </header>
  )
}
