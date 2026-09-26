import { NextRequest, NextResponse } from 'next/server'

// Verify admin session token
export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value

  if (token) {
    try {
      const decoded = Buffer.from(token, 'base64').toString()
      if (decoded.endsWith('-admin')) {
        return NextResponse.json({ authenticated: true })
      }
    } catch {}
  }

  return NextResponse.json({ authenticated: false }, { status: 401 })
}
