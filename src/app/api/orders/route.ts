import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cors, corsPreflight } from '@/lib/cors'

// GET /api/orders — list orders
export async function GET(req: NextRequest) {
  const url = req.nextUrl
  const status = url.searchParams.get('status')
  const limit = parseInt(url.searchParams.get('limit') || '50')
  const offset = parseInt(url.searchParams.get('offset') || '0')

  const where: any = {}
  if (status) where.status = status

  const [orders, total] = await Promise.all([
    db.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    db.order.count({ where }),
  ])

  return cors(NextResponse.json({ orders, total, limit, offset }))
}

// POST /api/orders — create an order
export async function POST(req: NextRequest) {
  const body = await req.json()

  const order = await db.order.create({
    data: {
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail,
      quantity: body.quantity || 1,
      unitPrice: body.unitPrice,
      totalPrice: body.totalPrice,
      channel: body.channel || 'whatsapp',
      delivery: body.delivery || 'pickup',
      deliveryCost: body.deliveryCost || 0,
      notes: body.notes,
      items: {
        create: (body.items || []).map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity || 1,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  })

  return cors(NextResponse.json(order, { status: 201 }))
}

// OPTIONS — CORS preflight
export async function OPTIONS() {
  return corsPreflight()
}
