'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts'
import type { PriceHistoryWithSupplier } from '@/lib/database.types'

type ChartPoint = {
  date: string
  fullDate: string
  price: number
  supplier: string
}

function buildChartData(history: PriceHistoryWithSupplier[]): ChartPoint[] {
  // Group by date, keep only the lowest-priced entry per day
  const byDate = new Map<string, ChartPoint>()

  for (const row of history) {
    const d = new Date(row.recorded_at)
    const dateKey = d.toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })
    const fullDate = d.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })
    const price = Number(row.price)
    const existing = byDate.get(dateKey)

    if (!existing || price < existing.price) {
      byDate.set(dateKey, { date: dateKey, fullDate, price, supplier: row.supplier.name })
    }
  }

  return Array.from(byDate.values())
}

function formatSEK(value: number) {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(value)
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload as ChartPoint
  return (
    <div
      style={{
        background: 'var(--background)',
        border: '1px solid color-mix(in srgb, var(--foreground) 12%, transparent)',
        color: 'var(--foreground)',
      }}
      className="rounded-xl px-3.5 py-3 text-sm shadow-lg"
    >
      <p className="text-xs opacity-40 mb-1">{point.fullDate}</p>
      <p className="font-semibold text-base">{formatSEK(point.price)}</p>
      <p className="text-xs opacity-60 mt-0.5">{point.supplier}</p>
    </div>
  )
}

interface Props {
  history: PriceHistoryWithSupplier[]
  labelTitle: string
  labelNoData: string
}

export function PriceHistoryChart({ history, labelTitle, labelNoData }: Props) {
  if (history.length === 0) {
    return (
      <p className="text-sm text-foreground/40 text-center py-10">{labelNoData}</p>
    )
  }

  const data = buildChartData(history)

  const prices = data.map(d => d.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const padding = (maxPrice - minPrice) * 0.2 || maxPrice * 0.05
  const yMin = Math.floor((minPrice - padding) / 100) * 100
  const yMax = Math.ceil((maxPrice + padding) / 100) * 100

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/25" />
        <h2 className="text-xs font-medium uppercase tracking-widest text-foreground/50">
          {labelTitle}
        </h2>
      </div>
      <div className="border border-foreground/10 rounded-2xl p-4 pt-6">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.06} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.4 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[yMin, yMax]}
              tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.4 }}
              tickLine={false}
              axisLine={false}
              width={36}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: 'currentColor', strokeOpacity: 0.08, strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#22c55e', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
