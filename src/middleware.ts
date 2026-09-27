import { NextRequest, NextResponse } from 'next/server'
import { cors, corsPreflight, getAllowedOrigin } from '@/lib/cors'

// Middleware to protect admin API routes and handle CORS
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const origin = getAllowedOrigin(req)

  // Handle CORS preflight for all API routes
  if (req.method === 'OPTIONS' && pathname.startsWith('/api/')) {
    return corsPreflight(req)
  }

  // Protect /api/admin/* routes (except login which needs to be public)
  if (pathname.startsWith('/api/admin/') && !pathname.endsWith('/login')) {
    const token = req.cookies.get('admin_token')?.value

    if (!token) {
      const response = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return cors(response, origin)
    }

    try {
      const decoded = Buffer.from(token, 'base64').toString()
      if (!decoded.endsWith('-admin')) {
        const response = NextResponse.json({ error: 'Invalid session' }, { status: 401 })
        return cors(response, origin)
      }
    } catch {
      const response = NextResponse.json({ error: 'Invalid session' }, { status: 401 })
      return cors(response, origin)
    }
  }

  // Add CORS headers to all API responses
  const response = NextResponse.next()
  if (pathname.startsWith('/api/')) {
    return cors(response, origin)
  }

  return response
}

export const config = {
  matcher: ['/api/:path*'],
  runtime: 'nodejs',
}
