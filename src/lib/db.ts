import { PrismaClient } from '@prisma/client'

// ─── Neon PostgreSQL connection for Vercel ───
// Uses datasourceUrl to bypass env vars — works even without Vercel dashboard config.
// Once you set DATABASE_URL in Vercel Settings → Environment Variables, the fallback is ignored.

const NEON_URL = 'postgresql://neondb_owner:npg_zJ8HM9QtdDAF@ep-plain-pond-b4a5yit2.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createClient() {
  const url = process.env.DATABASE_URL || NEON_URL
  return new PrismaClient({
    datasourceUrl: url,
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })
}

export const db = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
