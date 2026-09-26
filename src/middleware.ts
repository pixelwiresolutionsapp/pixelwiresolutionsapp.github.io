import { NextRequest, NextResponse } from 'next/server'

// Middleware to protect admin API routes
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect /api/admin/* routes (except login which needs to be public)
  if (pathname.startsWith('/api/admin/') && !pathname.endsWith('/login')) {
    const token = req.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
      const decoded = Buffer.from(token, 'base64').toString()
      if (!decoded.endsWith('-admin')) {
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
      }
    } catch {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/admin/:path*'],
  runtime: 'nodejs',
}
