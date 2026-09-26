import { NextResponse } from 'next/server'

// Logout — clear the admin session cookie
export async function POST() {
  return NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: {
        'Set-Cookie': 'admin_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0',
      },
    }
  )
}
