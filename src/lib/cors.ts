import { NextRequest, NextResponse } from 'next/server'

/**
 * Allowed origins for CORS.
 * - The GitHub Pages admin frontend
 * - The Vercel deployment (same-origin fallback)
 * - Local development
 */
const ALLOWED_ORIGINS = [
  'https://pixelwiresolutionsapp.github.io',
  'https://temporary-snappy-beryl-va7pr0z.vercel.app',
  'http://localhost:3000',
]

/**
 * Get the allowed origin from the request's Origin header.
 * Returns the origin if it's in the allowlist, otherwise undefined.
 */
export function getAllowedOrigin(req: NextRequest): string | undefined {
  const origin = req.headers.get('origin')
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return origin
  }
  return undefined
}

/**
 * Add CORS headers to any NextResponse for cross-origin requests
 * from pixelwiresolutionsapp.github.io (and other allowed origins).
 * Uses specific origin (not wildcard) to support credentials.
 */
export function cors(response: NextResponse, origin?: string) {
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  } else {
    response.headers.set('Access-Control-Allow-Origin', '*')
  }
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Max-Age', '86400')
  return response
}

/** Return a 204 empty response for CORS preflight (OPTIONS) */
export function corsPreflight(req: NextRequest) {
  const origin = getAllowedOrigin(req)
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }

  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Access-Control-Allow-Credentials'] = 'true'
  } else {
    headers['Access-Control-Allow-Origin'] = '*'
  }

  return new NextResponse(null, { status: 204, headers })
}
