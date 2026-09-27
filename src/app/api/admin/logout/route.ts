import { NextRequest, NextResponse } from 'next/server'
import { cors, getAllowedOrigin } from '@/lib/cors'

// Logout — clear the admin session cookie
export async function POST(req: NextRequest) {
  const origin = getAllowedOrigin(req)

  // Determine if cross-origin for SameSite cookie attribute
  const isCrossOrigin = origin && origin !== `https://${req.headers.get('host')}`
  const cookieSameSite = isCrossOrigin ? 'None' : 'Lax'
  const cookieSecure = isCrossOrigin ? '; Secure' : ''

  const response = NextResponse.json({ success: true }, { status: 200 })
  response.headers.set(
    'Set-Cookie',
    `admin_token=; Path=/; HttpOnly; SameSite=${cookieSameSite}${cookieSecure}; Max-Age=0`
  )
  return cors(response, origin)
}

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  const { corsPreflight } = await import('@/lib/cors')
  return corsPreflight(req)
}
