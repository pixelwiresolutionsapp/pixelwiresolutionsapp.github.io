import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const result = await db.$queryRaw`SELECT NOW() as now, current_database() as db`
    const row = result[0] as any
    return NextResponse.json({
      status: 'connected',
      timestamp: row.now,
      database: row.db,
      provider: 'Neon PostgreSQL via Prisma',
      envSource: process.env.DATABASE_URL ? 'env' : 'fallback',
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || String(error),
      name: error.name,
    }, { status: 500 })
  }
}
