import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/brands
export async function GET() {
  const brands = await db.brand.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { products: { where: { isActive: true } } } } },
  })
  return NextResponse.json(brands)
}
