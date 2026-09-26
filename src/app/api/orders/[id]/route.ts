import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cors, corsPreflight } from '@/lib/cors'

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
  return cors(NextResponse.json(order))
}

export async function OPTIONS() { return corsPreflight() }
