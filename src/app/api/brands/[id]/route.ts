import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cors, getAllowedOrigin, corsPreflight } from '@/lib/cors'

// DELETE /api/brands/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const origin = getAllowedOrigin(req)
  const { id } = await params
  await db.brand.delete({ where: { id } })
  return cors(NextResponse.json({ success: true }), origin)
}

export async function OPTIONS(req: NextRequest) { return corsPreflight(req) }
