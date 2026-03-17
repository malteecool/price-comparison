export type Database = {
  public: {
    Tables: {
      suppliers: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          website_url: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          parent_id: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          brand: string | null
          category_id: string | null
          ean: string | null
          description: string | null
          image_url: string | null
          specs: Record<string, string> | null
        }
      }
      prices: {
        Row: {
          id: string
          product_id: string
          supplier_id: string
          price: number
          currency: string
          url: string | null
          updated_at: string
        }
      }
      price_history: {
        Row: {
          id: string
          product_id: string
          supplier_id: string
          price: number
          currency: string
          recorded_at: string
        }
      }
    }
  }
}

// Convenience types used across the app
export type Supplier = Database['public']['Tables']['suppliers']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type CategoryNode = Category & { children: Category[] }
export type Product = Database['public']['Tables']['products']['Row']
export type Price = Database['public']['Tables']['prices']['Row']
export type PriceHistory = Database['public']['Tables']['price_history']['Row']

export type PriceHistoryWithSupplier = PriceHistory & { supplier: Pick<Supplier, 'id' | 'name'> }

export type PriceWithSupplier = Price & { supplier: Supplier }

export type ProductWithPrices = Product & {
  category: Category | null
  prices: PriceWithSupplier[]
}
