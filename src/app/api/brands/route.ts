import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cors, getAllowedOrigin, corsPreflight } from '@/lib/cors'

// GET /api/brands
export async function GET(req: NextRequest) {
  const origin = getAllowedOrigin(req)
  const brands = await db.brand.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { products: { where: { isActive: true } } } } },
  })
  return cors(NextResponse.json(brands), origin)
}

// POST /api/brands
export async function POST(req: NextRequest) {
  const origin = getAllowedOrigin(req)
  const body = await req.json()
  const brand = await db.brand.create({
    data: {
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      logoUrl: body.logoUrl || null,
    },
  })
  return cors(NextResponse.json(brand, { status: 201 }), origin)
}

// OPTIONS — CORS preflight
export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req)
}
