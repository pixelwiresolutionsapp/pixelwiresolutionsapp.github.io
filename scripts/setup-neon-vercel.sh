#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════════════
# PixelWire Solutions — One-Command Neon + Vercel Setup
# ═══════════════════════════════════════════════════════════════════
# 
# Run this script from the project root:
#   chmod +x scripts/setup-neon-vercel.sh
#   ./scripts/setup-neon-vercel.sh
#
# Prerequisites:
#   - Node.js 18+ and npm
#   - A Neon account (https://console.neon.tech)
#   - A Vercel account (https://vercel.com)
# ═══════════════════════════════════════════════════════════════════

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

echo ""
echo "🚀 PixelWire Solutions — Neon + Vercel Setup"
echo "═══════════════════════════════════════════════"
echo ""

# ─── Step 1: Check CLIs ───
echo "📦 Step 1/6: Checking CLI tools..."

if ! command -v neonctl &>/dev/null; then
  echo "   Installing Neon CLI..."
  npm i -g neonctl
fi

if ! command -v vercel &>/dev/null; then
  echo "   Installing Vercel CLI..."
  npm i -g vercel
fi

echo "   ✅ CLIs ready"
echo ""

# ─── Step 2: Authenticate ───
echo "🔐 Step 2/6: Authentication"
echo ""
echo "   You'll need to log in to both Neon and Vercel."
echo "   Browser windows will open for each."
echo ""

# Check Neon auth
if ! neonctl me &>/dev/null 2>&1; then
  echo "   → Logging in to Neon..."
  neonctl auth
else
  echo "   ✅ Already authenticated with Neon"
fi

# Check Vercel auth
if ! vercel whoami &>/dev/null 2>&1; then
  echo "   → Logging in to Vercel..."
  vercel login
else
  echo "   ✅ Already authenticated with Vercel"
fi

echo ""

# ─── Step 3: Create Neon Project ───
echo "🗄️  Step 3/6: Creating Neon database..."

NEON_PROJECT="pixelwire-solutions"

# Check if project already exists
EXISTING=$(neonctl projects list --output json 2>/dev/null | grep -c "\"name\":\"$NEON_PROJECT\"" || true)

if [ "$EXISTING" -gt 0 ]; then
  echo "   ✅ Neon project '$NEON_PROJECT' already exists"
else
  echo "   Creating project '$NEON_PROJECT' in us-east-2..."
  neonctl projects create --name "$NEON_PROJECT" --region aws-us-east-2
  echo "   ✅ Project created"
fi

# Get connection strings
echo "   Fetching connection strings..."

# Get the project ID
PROJECT_ID=$(neonctl projects list --output json 2>/dev/null | python3 -c "
import sys, json
data = json.load(sys.stdin)
for p in data:
    if p.get('name') == '$NEON_PROJECT':
        print(p['id'])
        break
" 2>/dev/null || echo "")

if [ -z "$PROJECT_ID" ]; then
  echo ""
  echo "   ⚠️  Could not auto-detect project ID."
  echo "   Please go to https://console.neon.tech and copy your connection strings."
  echo ""
  echo "   Pooled connection (DATABASE_URL):"
  read -rp "   > " DATABASE_URL
  echo "   Direct connection (DIRECT_URL):"
  read -rp "   > " DIRECT_URL
else
  # Get connection strings from the project
  CONN_INFO=$(neonctl connection-string --project-id "$PROJECT_ID" --role-name neondb_owner --database-name neondb 2>/dev/null || echo "")
  POOL_CONN=$(neonctl connection-string --project-id "$PROJECT_ID" --role-name neondb_owner --database-name neondb --pooled 2>/dev/null || echo "")

  DATABASE_URL="${POOL_CONN:-$CONN_INFO}"
  DIRECT_URL="${CONN_INFO:-$POOL_CONN}"

  # If still empty, ask user
  if [ -z "$DATABASE_URL" ] || [ -z "$DIRECT_URL" ]; then
    echo ""
    echo "   ⚠️  Go to https://console.neon.tech → $NEON_PROJECT → Dashboard → Connection Details"
    echo ""
    echo "   Copy the Pooled connection string (DATABASE_URL):"
    read -rp "   > " DATABASE_URL
    echo "   Copy the Direct connection string (DIRECT_URL):"
    read -rp "   > " DIRECT_URL
  fi
fi

echo "   ✅ Connection strings obtained"
echo ""

# ─── Step 4: Push Schema & Seed ───
echo "📐 Step 4/6: Pushing database schema & seeding data..."

export DATABASE_URL
export DIRECT_URL

echo "   Generating Prisma client..."
npx prisma generate

echo "   Pushing schema to Neon..."
npx prisma db push --accept-data-loss

echo "   Seeding 38 products, 13 categories, 12 brands..."
npx tsx prisma/seed.ts

echo "   ✅ Database ready"
echo ""

# ─── Step 5: Deploy to Vercel ───
echo "▲ Step 5/6: Deploying to Vercel..."

# Set env vars on Vercel
echo "   Setting environment variables..."

# Deploy
echo "   Deploying... (follow the prompts)"
vercel --prod

# Set env vars after first deploy
echo ""
echo "   Setting Neon connection strings as Vercel env vars..."
echo "$DATABASE_URL" | vercel env add DATABASE_URL production
echo "$DIRECT_URL" | vercel env add DIRECT_URL production

echo "   Redeploying with env vars..."
vercel --prod

echo "   ✅ Deployed"
echo ""

# ─── Step 6: Get the URL ───
echo "🌐 Step 6/6: Final setup..."

VERCEL_URL=$(vercel ls --limit 1 2>/dev/null | head -1 | awk '{print $2}' || echo "")

if [ -n "$VERCEL_URL" ]; then
  echo "   Your Vercel app: https://$VERCEL_URL"
  echo ""
  echo "   📡 API endpoints:"
  echo "   → https://$VERCEL_URL/api/products"
  echo "   → https://$VERCEL_URL/api/categories"
  echo "   → https://$VERCEL_URL/api/brands"
  echo "   → https://$VERCEL_URL/api/orders"
  echo "   → https://$VERCEL_URL/api/settings"
  echo "   → https://$VERCEL_URL/api/health"
  echo ""
  echo "   To connect your static GitHub Pages site, set in index.html:"
  echo "   var API_BASE_URL = 'https://$VERCEL_URL';"
else
  echo "   Check your Vercel dashboard for the deployment URL:"
  echo "   https://vercel.com/dashboard"
fi

echo ""
echo "═══════════════════════════════════════════════"
echo "🎉 Setup complete!"
echo ""
echo "📱 WhatsApp: (876) 773-1173 or (876) 559-5290"
echo "🛒 Products: 38 | Categories: 13 | Brands: 12"
echo "═══════════════════════════════════════════════"
