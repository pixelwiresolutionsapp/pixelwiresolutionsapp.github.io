import { PrismaClient } from '@prisma/client'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

// ─── Neon Serverless Adapter for Vercel ───
// Uses WebSocket for pooled connections on Vercel; falls back to PrismaClient locally.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // If DATABASE_URL is a Neon connection string, use the serverless adapter
  const databaseUrl = process.env.DATABASE_URL

  if (databaseUrl && databaseUrl.includes('neon.tech')) {
    // Configure Neon for serverless environments
    neonConfig.webSocketConstructor = ws
    neonConfig.poolQueryViaFetch = true

    const pool = new Pool({ connectionString: databaseUrl })
    const adapter = new PrismaNeon(pool)
    return new PrismaClient({ adapter } as any)
  }

  // Fallback: standard PrismaClient (works with direct PostgreSQL or local dev)
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
