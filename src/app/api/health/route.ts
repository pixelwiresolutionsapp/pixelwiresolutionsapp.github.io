import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    return NextResponse.json({ error: 'DATABASE_URL not configured' }, { status: 500 })
  }

  try {
    const { Pool } = await import('@neondatabase/serverless')
    const pool = new Pool({ connectionString })
    const result = await pool.query('SELECT NOW() as now')
    await pool.end()
    return NextResponse.json({
      status: 'connected',
      timestamp: result.rows[0].now,
      provider: 'Neon PostgreSQL',
    })
  } catch (error: any) {
    // Fallback to Prisma check
    try {
      const { db } = await import('@/lib/db')
      await db.$queryRaw`SELECT 1`
      return NextResponse.json({ status: 'connected', provider: 'SQLite (local)' })
    } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 500 })
    }
  }
}
