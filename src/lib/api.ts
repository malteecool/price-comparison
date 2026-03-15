import { supabase } from './supabase'
import type { Category, PriceHistoryWithSupplier, ProductWithPrices } from './database.types'

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export async function getProducts(options: {
  categorySlug?: string
  searchQuery?: string
} = {}): Promise<ProductWithPrices[]> {
  const { categorySlug, searchQuery } = options

  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      prices(*, supplier:suppliers(*))
    `)
    .order('name')

  if (searchQuery) {
    query = query.or(`name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%`)
  }

  if (categorySlug) {
    query = query.eq('category.slug', categorySlug)
  }

  const { data, error } = await query

  if (error) throw error
  // Filter out products with no matching category when filtering by slug
  return (data as ProductWithPrices[]).filter(p =>
    categorySlug ? p.category?.slug === categorySlug : true
  )
}

export async function getPriceHistory(productId: string): Promise<PriceHistoryWithSupplier[]> {
  const { data, error } = await supabase
    .from('price_history')
    .select('recorded_at, price, supplier_id, supplier:suppliers(id, name)')
    .eq('product_id', productId)
    .order('recorded_at', { ascending: true })

  if (error) throw error
  return data as PriceHistoryWithSupplier[]
}

export async function getProduct(id: string): Promise<ProductWithPrices | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      prices(*, supplier:suppliers(*))
    `)
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return data as ProductWithPrices
}
