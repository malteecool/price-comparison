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
  const categorySlug = request.nextUrl.searchParams.get('category')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json([])
  }

  type CatRow = { id: string; slug: string; parent_id: string | null }

  let categoryIds: string[] | null = null
  if (categorySlug) {
    const { data: cats } = await supabase
      .from('categories')
      .select('id, slug, parent_id')
    const all = (cats ?? []) as CatRow[]
    const target = all.find(c => c.slug === categorySlug)
    if (target) {
      const parentId = target.parent_id ?? target.id
      // Include: parent itself + all direct children (siblings of target)
      categoryIds = all
        .filter(c => c.id === parentId || c.parent_id === parentId)
        .map(c => c.id)
    }
  }

  let query = supabase
    .from('products')
    .select('id, name, brand, prices(price)')
    .or(`name.ilike.%${q}%,brand.ilike.%${q}%`)
    .limit(8)

  if (categoryIds) {
    query = query.in('category_id', categoryIds)
  }

  const { data, error } = await query
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
