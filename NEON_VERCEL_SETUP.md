# PixelWire Solutions — Neon + Vercel Backend Setup

This guide walks you through deploying the PixelWire Solutions backend to **Vercel** with a **Neon** PostgreSQL database.

---

## Architecture

```
GitHub Pages (static index.html)
    ↕ API fetch (optional — set API_BASE_URL)
Vercel (Next.js API + Frontend)
    ↕ Prisma + Neon Serverless Driver
Neon PostgreSQL (serverless database)
```

- **Neon** hosts the product catalog, orders, categories, brands, and site settings in a serverless Postgres database.
- **Vercel** runs the Next.js app with serverless API routes (`/api/products`, `/api/categories`, `/api/orders`, etc.).
- The static GitHub Pages site can optionally fetch live data from the Vercel API by setting `API_BASE_URL`.

---

## Step 1: Create a Neon Database

1. Go to [https://console.neon.tech](https://console.neon.tech) and sign up/log in.
2. Click **Create Project** → name it `pixelwire-solutions` → pick a region (e.g. `us-east-2`).
3. Once created, go to the **Dashboard** → **Connection Details**.
4. Copy the **Pooled connection string** (ends with `-pooler`):
   ```
   postgresql://neondb_owner:XXXX@ep-cool-name-123456-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
   This is your `DATABASE_URL`.
5. Copy the **Direct connection string** (without `-pooler`):
   ```
   postgresql://neondb_owner:XXXX@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
   This is your `DIRECT_URL`.

---

## Step 2: Push the Database Schema

From your local project directory:

```bash
# Set the environment variables
export DATABASE_URL="postgresql://neondb_owner:XXXX@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
export DIRECT_URL="postgresql://neondb_owner:XXXX@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Push the Prisma schema to Neon (creates all tables)
npx prisma db push

# Seed the database with all 38 products
npx prisma db seed
```

If `prisma db seed` doesn't work, run it directly:
```bash
npx tsx prisma/seed.ts
```

---

## Step 3: Deploy to Vercel

### Option A: Vercel CLI (fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from the project root
cd /home/z/my-project
vercel

# Set environment variables (use your actual Neon connection strings)
vercel env add DATABASE_URL production
vercel env add DIRECT_URL production

# Redeploy to pick up the env vars
vercel --prod
```

### Option B: Vercel Dashboard (GitHub-connected)

1. Go to [https://vercel.com](https://vercel.com) → **Add New Project**.
2. Import your GitHub repo (`pixelwiresolutionsapp.github.io` or whatever repo).
3. Set **Framework Preset** to `Next.js`.
4. Add **Environment Variables**:
   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | Your Neon pooled connection string |
   | `DIRECT_URL` | Your Neon direct connection string |
5. Click **Deploy**.

---

## Step 4: Connect the Static Site to the Backend

In `/home/z/my-project/index.html`, find the `API_BASE_URL` variable near the top of the `<script>` section and set it to your Vercel deployment URL:

```javascript
var API_BASE_URL = 'https://your-app-name.vercel.app';
```

This makes the static GitHub Pages site fetch products and categories from the Neon database via the Vercel API.

If `API_BASE_URL` is empty (`''`), the static site falls back to its hardcoded product data.

---

## API Endpoints

All endpoints are available at `https://your-app.vercel.app/api/...`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (supports `?category=`, `?brand=`, `?search=`, `?featured=true`, `?minPrice=`, `?maxPrice=`, `?sort=`, `?limit=`, `?offset=`) |
| GET | `/api/products/[id]` | Get a single product by ID |
| POST | `/api/products` | Create a new product |
| GET | `/api/categories` | List all categories with product counts |
| GET | `/api/brands` | List all brands with product counts |
| GET | `/api/orders` | List orders (supports `?status=`) |
| POST | `/api/orders` | Create a new order |
| GET | `/api/settings` | Get site settings (whatsapp numbers, currency, delivery costs) |
| PUT | `/api/settings` | Update site settings |
| GET | `/api/health` | Database health check |

---

## Managing Products

### Add a new product via API:

```bash
curl -X POST https://your-app.vercel.app/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Backpack",
    "model": "KNB-999",
    "price": 8500,
    "description": "Amazing new backpack",
    "size": "15.6\"",
    "color": "#111827",
    "categoryId": "YOUR_CATEGORY_ID",
    "brandId": "YOUR_BRAND_ID",
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ]
  }'
```

### Get category/brand IDs:

```bash
curl https://your-app.vercel.app/api/categories
curl https://your-app.vercel.app/api/brands
```

---

## WhatsApp Contact Numbers

- **Primary:** (876) 773-1173
- **Secondary:** (876) 559-5290

These are stored in the `site_settings` table as `whatsapp_primary` and `whatsapp_secondary`.

---

## Local Development

```bash
# Set up local env (use Neon connection strings for remote DB, or a local Postgres)
export DATABASE_URL="postgresql://..."
export DIRECT_URL="postgresql://..."

# Generate Prisma client
npx prisma generate

# Run dev server
bun run dev
```

The dev server runs at `http://localhost:3000` with the same API routes.
