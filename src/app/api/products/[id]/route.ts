import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cors, corsPreflight } from '@/lib/cors'

// GET /api/products/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = await db.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      specs: true,
      brand: true,
      category: true,
    },
  })
  if (!product) return cors(NextResponse.json({ error: 'Not found' }, { status: 404 }))
  return cors(NextResponse.json(product))
}

// PUT /api/products/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()

  if (body.images) {
    await db.productImage.deleteMany({ where: { productId: id } })
    await db.productImage.createMany({
      data: body.images.map((img: any, i: number) => ({
        productId: id,
        url: typeof img === 'string' ? img : img.url,
        alt: body.name || '',
        sortOrder: i,
        isPrimary: i === 0,
      })),
    })
  }

  const product = await db.product.update({
    where: { id },
    data: {
      name: body.name,
      model: body.model,
      price: body.price,
      description: body.description,
      size: body.size,
      color: body.color,
      categoryId: body.categoryId,
      brandId: body.brandId,
      isActive: body.isActive,
      featured: body.featured,
      sortOrder: body.sortOrder,
    },
    include: { images: { orderBy: { sortOrder: 'asc' } }, brand: true, category: true },
  })

  return cors(NextResponse.json(product))
}

// DELETE /api/products/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  await db.product.delete({ where: { id } })
  return cors(NextResponse.json({ success: true }))
}

// OPTIONS — CORS preflight
export async function OPTIONS() {
  return corsPreflight()
}
