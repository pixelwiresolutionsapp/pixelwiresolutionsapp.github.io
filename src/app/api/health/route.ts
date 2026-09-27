import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cors, getAllowedOrigin, corsPreflight } from '@/lib/cors'

export async function GET(req: NextRequest) {
  const origin = getAllowedOrigin(req)
  try {
    const result = await db.$queryRaw`SELECT NOW() as now, current_database() as db`
    const row = result[0] as any
    return cors(NextResponse.json({
      status: 'connected',
      timestamp: row.now,
      database: row.db,
      provider: 'Neon PostgreSQL via Prisma',
      envSource: process.env.DATABASE_URL ? 'env' : 'fallback',
    }), origin)
  } catch (error: any) {
    return cors(NextResponse.json({
      error: error.message || String(error),
      name: error.name,
    }, { status: 500 }), origin)
  }
}

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req)
}
