import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/categories
export async function GET() {
  const categories = await db.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { products: { where: { isActive: true } } } } },
  })
  return NextResponse.json(categories)
}
