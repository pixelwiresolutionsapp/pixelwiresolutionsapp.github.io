import { NextRequest, NextResponse } from 'next/server'
import { cors, getAllowedOrigin } from '@/lib/cors'

// Admin login endpoint — verifies password and returns a session token
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'PixelWire2026!'

export async function POST(req: NextRequest) {
  const origin = getAllowedOrigin(req)

  try {
    const { password } = await req.json()

    if (!password) {
      const response = NextResponse.json({ error: 'Password is required' }, { status: 400 })
      return cors(response, origin)
    }

    if (password === ADMIN_PASSWORD) {
      // Generate a simple session token (timestamp + random component, base64 encoded)
      const token = Buffer.from(
        `${Date.now()}-${Math.random().toString(36).slice(2)}-admin`
      ).toString('base64')

      // Determine if this is a cross-origin request (from GitHub Pages)
      // Cross-origin requires SameSite=None; Secure
      const isCrossOrigin = origin && origin !== `https://${req.headers.get('host')}`
      const cookieSameSite = isCrossOrigin ? 'None' : 'Lax'
      const cookieSecure = isCrossOrigin ? '; Secure' : ''

      const response = NextResponse.json({ success: true, token }, { status: 200 })
      response.headers.set(
        'Set-Cookie',
        `admin_token=${token}; Path=/; HttpOnly; SameSite=${cookieSameSite}${cookieSecure}; Max-Age=28800`
      )
      return cors(response, origin)
    }

    const response = NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    return cors(response, origin)
  } catch {
    const response = NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    return cors(response, origin)
  }
}

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  const { corsPreflight } = await import('@/lib/cors')
  return corsPreflight(req)
}
