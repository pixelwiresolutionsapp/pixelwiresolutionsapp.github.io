import { NextRequest, NextResponse } from 'next/server'
import { cors, getAllowedOrigin, corsPreflight } from '@/lib/cors'

export async function GET(req: NextRequest) {
  const origin = getAllowedOrigin(req)
  return cors(NextResponse.json({ message: 'Hello, world!' }), origin)
}

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req)
}
