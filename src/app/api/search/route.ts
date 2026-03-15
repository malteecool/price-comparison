import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export type SearchResult = {
  id: string
  name: string
  brand: string | null
  lowestPrice: number | null
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json([])
  }

  const { data, error } = await supabase
    .from('products')
    .select('id, name, brand, prices(price)')
    .or(`name.ilike.%${q}%,brand.ilike.%${q}%`)
    .limit(6)

  if (error) return NextResponse.json([], { status: 500 })

  type Row = { id: string; name: string; brand: string | null; prices: { price: number }[] }

  const results: SearchResult[] = (data as Row[]).map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    lowestPrice: p.prices.length > 0
      ? Math.min(...p.prices.map(x => x.price))
      : null,
  }))

  return NextResponse.json(results)
}
