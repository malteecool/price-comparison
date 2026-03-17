import { NextRequest, NextResponse } from 'next/server'
import { getProduct } from '@/lib/api'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) return NextResponse.json(null, { status: 404 })
  return NextResponse.json(product)
}
