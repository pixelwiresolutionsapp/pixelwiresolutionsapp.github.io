import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PUT /api/orders/[id] — update order status
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const order = await db.order.update({
    where: { id },
    data: { status: body.status },
  })
  return NextResponse.json(order)
}
