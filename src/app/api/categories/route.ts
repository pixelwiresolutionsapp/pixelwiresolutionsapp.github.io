import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cors, getAllowedOrigin, corsPreflight } from '@/lib/cors'

// GET /api/categories
export async function GET(req: NextRequest) {
  const origin = getAllowedOrigin(req)
  const categories = await db.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { products: { where: { isActive: true } } } } },
  })
  return cors(NextResponse.json(categories), origin)
}

// POST /api/categories
export async function POST(req: NextRequest) {
  const origin = getAllowedOrigin(req)
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
  return cors(NextResponse.json(category, { status: 201 }), origin)
}

// OPTIONS — CORS preflight
export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req)
}
