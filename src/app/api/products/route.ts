import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/products — list all products with images, brand, category
export async function GET(req: NextRequest) {
  const url = req.nextUrl
  const category = url.searchParams.get('category')
  const brand = url.searchParams.get('brand')
  const search = url.searchParams.get('search')
  const featured = url.searchParams.get('featured')
  const minPrice = url.searchParams.get('minPrice')
  const maxPrice = url.searchParams.get('maxPrice')
  const sort = url.searchParams.get('sort') || 'sortOrder'
  const limit = parseInt(url.searchParams.get('limit') || '100')
  const offset = parseInt(url.searchParams.get('offset') || '0')

  const where: any = { isActive: true }

  if (category) where.category = { slug: category }
  if (brand) where.brand = { slug: brand }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { model: { contains: search } },
      { description: { contains: search } },
    ]
  }
  if (featured === 'true') where.featured = true
  if (minPrice || maxPrice) {
    where.price = {}
    if (minPrice) where.price.gte = parseFloat(minPrice)
    if (maxPrice) where.price.lte = parseFloat(maxPrice)
  }

  const orderBy: any = {}
  if (sort === 'price_asc') orderBy.price = 'asc'
  else if (sort === 'price_desc') orderBy.price = 'desc'
  else if (sort === 'name') orderBy.name = 'asc'
  else if (sort === 'newest') orderBy.createdAt = 'desc'
  else orderBy.sortOrder = 'asc'

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      include: { images: { orderBy: { sortOrder: 'asc' } }, brand: true, category: true },
      orderBy,
      take: limit,
      skip: offset,
    }),
    db.product.count({ where }),
  ])

  return NextResponse.json({ products, total, limit, offset })
}

// POST /api/products — create a new product
export async function POST(req: NextRequest) {
  const body = await req.json()

  const product = await db.product.create({
    data: {
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      model: body.model,
      price: body.price,
      description: body.description,
      size: body.size,
      color: body.color || '#111827',
      categoryId: body.categoryId,
      brandId: body.brandId,
      featured: body.featured || false,
      images: {
        create: (body.images || []).map((img: any, i: number) => ({
          url: typeof img === 'string' ? img : img.url,
          alt: body.name,
          sortOrder: i,
          isPrimary: i === 0,
        })),
      },
    },
    include: { images: true, brand: true, category: true },
  })

  return NextResponse.json(product, { status: 201 })
}
