import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { cors, getAllowedOrigin } from '@/lib/cors'

export const runtime = 'edge'

/**
 * POST /api/upload — Upload one or more images to Vercel Blob storage.
 * Accepts multipart/form-data with a "files" field (single or multiple files).
 * Returns { urls: string[] } with the public URLs of uploaded images.
 */
export async function POST(req: NextRequest) {
  const origin = getAllowedOrigin(req)

  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      const response = NextResponse.json({ error: 'No files provided' }, { status: 400 })
      return cors(response, origin)
    }

    const uploadedUrls: string[] = []

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        const response = NextResponse.json(
          { error: `File "${file.name}" is not an image. Only image files are allowed.` },
          { status: 400 }
        )
        return cors(response, origin)
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        const response = NextResponse.json(
          { error: `File "${file.name}" is too large. Maximum size is 5MB.` },
          { status: 400 }
        )
        return cors(response, origin)
      }

      // Generate a unique path for the blob
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).slice(2, 8)
      const ext = file.name.split('.').pop() || 'jpg'
      const pathname = `product-images/${timestamp}-${randomStr}.${ext}`

      const blob = await put(pathname, file, {
        access: 'public',
        contentType: file.type,
      })

      uploadedUrls.push(blob.url)
    }

    const response = NextResponse.json({ urls: uploadedUrls }, { status: 200 })
    return cors(response, origin)
  } catch (err) {
    console.error('Upload error:', err)
    const response = NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    return cors(response, origin)
  }
}

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  const { corsPreflight } = await import('@/lib/cors')
  return corsPreflight(req)
}
