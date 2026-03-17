import type { SpecField } from '@/lib/specs'

interface Props {
    specs: Record<string, string> | null
    template: SpecField[]
    t: (key: string) => string
    labelTitle: string
}

export function SpecsTable({ specs, template, t, labelTitle }: Props) {
    if (!specs) return null

    const rows = template.filter(field => specs[field.key] != null)
    if (rows.length === 0) return null

    return (
        <section className="mb-8">
            <div className="flex items-center gap-2.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/25" />
                <h2 className="text-xs font-medium uppercase tracking-widest text-foreground/50">
                    {labelTitle}
                </h2>
            </div>
            <div className="border border-foreground/10 rounded-2xl overflow-hidden">
                {rows.map((field, i) => (
                    <div
                        key={field.key}
                        className={`flex items-center px-5 py-3 gap-6 ${i !== 0 ? 'border-t border-foreground/5' : ''
                            }`}
                    >
                        <span className="text-sm text-foreground/40 w-36 shrink-0">
                            {t(field.i18nKey)}
                        </span>
                        <span className="text-sm font-medium">{specs[field.key]}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
