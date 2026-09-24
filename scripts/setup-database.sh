#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════════════
# PixelWire Solutions — Manual Setup (after you create Neon + Vercel)
# ═══════════════════════════════════════════════════════════════════
#
# Use this AFTER you've:
#   1. Created a Neon project at https://console.neon.tech
#   2. Deployed to Vercel (via `vercel --prod` or the Vercel dashboard)
#   3. Set DATABASE_URL and DIRECT_URL in Vercel environment variables
#
# This script pushes the schema and seeds the data.
# ═══════════════════════════════════════════════════════════════════

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

echo ""
echo "🚀 PixelWire Solutions — Database Setup"
echo "═══════════════════════════════════════════════"
echo ""

# Check for env vars
if [ -z "${DATABASE_URL:-}" ]; then
  echo "❌ DATABASE_URL not set!"
  echo ""
  echo "Get it from your Neon dashboard: https://console.neon.tech"
  echo "  → Your Project → Dashboard → Connection Details → Pooled connection"
  echo ""
  echo "Then run:"
  echo "  export DATABASE_URL='postgresql://neondb_owner:xxx@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require'"
  echo "  export DIRECT_URL='postgresql://neondb_owner:xxx@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require'"
  echo "  ./scripts/setup-database.sh"
  exit 1
fi

if [ -z "${DIRECT_URL:-}" ]; then
  echo "❌ DIRECT_URL not set!"
  echo ""
  echo "Use the same connection string as DATABASE_URL but without '-pooler' in the hostname."
  exit 1
fi

export DATABASE_URL
export DIRECT_URL

echo "📊 Step 1/3: Generating Prisma client..."
npx prisma generate
echo "   ✅ Done"
echo ""

echo "📐 Step 2/3: Pushing schema to Neon (creating tables)..."
npx prisma db push --accept-data-loss
echo "   ✅ Tables created"
echo ""

echo "🌱 Step 3/3: Seeding database..."
echo "   → 13 categories"
echo "   → 12 brands"
echo "   → 38 products with images"
echo "   → Site settings (WhatsApp numbers, delivery costs)"
npx tsx prisma/seed.ts
echo "   ✅ Data seeded"
echo ""

echo "═══════════════════════════════════════════════"
echo "🎉 Database ready!"
echo ""
echo "📱 WhatsApp: (876) 773-1173 or (876) 559-5290"
echo "🛒 38 products seeded into Neon PostgreSQL"
echo ""
echo "Next: Deploy to Vercel (if not already done)"
echo "  vercel --prod"
echo "═══════════════════════════════════════════════"
