import { NextRequest, NextResponse } from 'next/server'
import { cors, getAllowedOrigin } from '@/lib/cors'

// Verify admin session token
export async function GET(req: NextRequest) {
  const origin = getAllowedOrigin(req)
  const token = req.cookies.get('admin_token')?.value

  if (token) {
    try {
      const decoded = Buffer.from(token, 'base64').toString()
      if (decoded.endsWith('-admin')) {
        const response = NextResponse.json({ authenticated: true })
        return cors(response, origin)
      }
    } catch {}
  }

  const response = NextResponse.json({ authenticated: false }, { status: 401 })
  return cors(response, origin)
}

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  const { corsPreflight } = await import('@/lib/cors')
  return corsPreflight(req)
}
