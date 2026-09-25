import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/categories
export async function GET() {
  const categories = await db.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { products: { where: { isActive: true } } } } },
  })
  return NextResponse.json(categories)
}

// POST /api/categories
export async function POST(req: NextRequest) {
  const body = await req.json()
  const category = await db.category.create({
    data: {
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      icon: body.icon || null,
      color: body.color || null,
      sortOrder: body.sortOrder || 0,
    },
  })
  return NextResponse.json(category, { status: 201 })
}
