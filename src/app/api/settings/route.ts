import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cors, corsPreflight } from '@/lib/cors'

// GET /api/settings
export async function GET() {
  const settings = await db.siteSetting.findMany()
  const map: Record<string, string> = {}
  for (const s of settings) map[s.key] = s.value
  return cors(NextResponse.json(map))
}

// PUT /api/settings — update settings
export async function PUT(req: NextRequest) {
  const body = await req.json()
  const updates = Object.entries(body).map(([key, value]) =>
    db.siteSetting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    })
  )
  await Promise.all(updates)
  return cors(NextResponse.json({ success: true }))
}

export async function OPTIONS() { return corsPreflight() }
