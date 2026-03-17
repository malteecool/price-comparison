import { supabase } from './supabase'
import type { Category, CategoryNode, PriceHistoryWithSupplier, ProductWithPrices } from './database.types'

async function fetchAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) throw error
  return data as Category[]
}

export async function getCategoryTree(): Promise<CategoryNode[]> {
  const all = await fetchAllCategories()
  const parents = all.filter(c => c.parent_id === null)
  const children = all.filter(c => c.parent_id !== null)
  return parents.map(parent => ({
    ...parent,
    children: children.filter(c => c.parent_id === parent.id),
  }))
}

export async function getCategories(): Promise<Category[]> {
  return fetchAllCategories()
}

export async function getProducts(options: {
  categorySlug?: string
  searchQuery?: string
} = {}): Promise<ProductWithPrices[]> {
  const { categorySlug, searchQuery } = options

  let categoryIds: string[] | null = null

  if (categorySlug) {
    const all = await fetchAllCategories()
    const target = all.find(c => c.slug === categorySlug)
    if (target) {
      if (target.parent_id === null) {
        // Top-level category: include its own ID plus all children
        const childIds = all.filter(c => c.parent_id === target.id).map(c => c.id)
        categoryIds = childIds.length > 0 ? childIds : [target.id]
      } else {
        categoryIds = [target.id]
      }
    } else {
      return []
    }
  }

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

  if (categoryIds) {
    query = query.in('category_id', categoryIds)
  }

  const { data, error } = await query
  if (error) throw error
  return data as ProductWithPrices[]
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
