// ─── Next.js Instrumentation Hook ───
// Runs before any other code. Sets Neon DB URL as env fallback for Vercel.

export async function register() {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_zJ8HM9QtdDAF@ep-plain-pond-b4a5yit2.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require'
  }
  if (!process.env.DIRECT_URL) {
    process.env.DIRECT_URL = 'postgresql://neondb_owner:npg_zJ8HM9QtdDAF@ep-plain-pond-b4a5yit2.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require'
  }
  // Admin password fallback (override via ADMIN_PASSWORD env var for production)
  if (!process.env.ADMIN_PASSWORD) {
    process.env.ADMIN_PASSWORD = 'PixelWire2026!'
  }
}
