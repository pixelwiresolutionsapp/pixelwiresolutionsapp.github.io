import { NextRequest, NextResponse } from 'next/server'

// Admin login endpoint — verifies password and returns a session token
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'PixelWire2026!'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    if (password === ADMIN_PASSWORD) {
      // Generate a simple session token (timestamp + random component, base64 encoded)
      const token = Buffer.from(
        `${Date.now()}-${Math.random().toString(36).slice(2)}-admin`
      ).toString('base64')

      return NextResponse.json(
        { success: true, token },
        {
          status: 200,
          headers: {
            'Set-Cookie': `admin_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800`, // 8 hours
          },
        }
      )
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
