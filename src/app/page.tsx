'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

// ─── Types ───
interface ProductImage { id: string; url: string; alt?: string; sortOrder: number; isPrimary: boolean }
interface Brand { id: string; name: string; slug: string }
interface Category { id: string; name: string; slug: string; icon?: string; color?: string }
interface Product {
  id: string; name: string; slug: string; model: string; price: number
  description?: string; size?: string; color: string; isActive: boolean; featured: boolean; sortOrder: number
  images: ProductImage[]; brand: Brand; category: Category
}

// ─── Component ───
export default function Storefront() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('sortOrder')

  // Lightbox
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null)
  const [lightboxIdx, setLightboxIdx] = useState(0)

  // Order modal
  const [orderProduct, setOrderProduct] = useState<Product | null>(null)
  const [custName, setCustName] = useState('')
  const [custQty, setCustQty] = useState(1)
  const [delivery, setDelivery] = useState<'pickup' | 'kgn' | 'parish'>('pickup')
  const [channel, setChannel] = useState<'whatsapp' | 'call' | 'email'>('whatsapp')

  // Fetch data
  useEffect(() => {
    async function load() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('/api/products?limit=200'),
          fetch('/api/categories'),
        ])
        const prodData = await prodRes.json()
        const catData = await catRes.json()
        setProducts(prodData.products || [])
        setCategories(catData || [])
      } catch (e) {
        toast.error('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Filter & sort
  const filtered = products
    .filter(p => activeCategory === 'all' || p.category.slug === activeCategory)
    .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.model.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price
      if (sortBy === 'price_desc') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return a.sortOrder - b.sortOrder
    })

  // Format price
  const fmtPrice = (p: number) => `$${p.toLocaleString('en-JM', { minimumFractionDigits: 2 })}`

  // Size label
  const sizeLabel = (p: Product) => {
    if (p.size && p.size !== 'N/A') return `Fits ${p.size}`
    return ''
  }

  // WhatsApp order
  const sendWhatsApp = useCallback(() => {
    if (!orderProduct) return
    const deliveryCost = delivery === 'kgn' ? 1500 : delivery === 'parish' ? 3000 : 0
    const total = orderProduct.price * custQty + deliveryCost
    const msg = `Hi PixelWire! I'd like to order:\n\n` +
      `📦 ${orderProduct.brand.name} ${orderProduct.name}\n` +
      `💲 ${fmtPrice(orderProduct.price)} each × ${custQty}\n` +
      `🚚 Delivery: ${delivery === 'pickup' ? 'Pickup (free)' : delivery === 'kgn' ? `Kingston ($1,500)` : `Islandwide ($3,000)`}\n` +
      `💰 Total: ${fmtPrice(total)} JMD\n\n` +
      `👤 Name: ${custName || 'Not provided'}`
    window.open(`https://wa.me/18767731173?text=${encodeURIComponent(msg)}`, '_blank')
    setOrderProduct(null)
  }, [orderProduct, custQty, delivery, custName, fmtPrice])

  // ─── Render ───
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5 text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">PixelWire Solutions</h1>
          <p className="text-sm opacity-80 mt-1">Laptop Bags, Tech Accessories &amp; More — Order via WhatsApp</p>
        </div>
        {/* WhatsApp bar */}
        <div className="bg-[#075e54] text-center py-2 text-sm font-medium">
          📞 Call or WhatsApp: <a href="https://wa.me/18767731173" className="underline font-bold hover:text-green-300 transition">(876) 773-1173</a> or <a href="https://wa.me/18765595290" className="underline font-bold hover:text-green-300 transition">(876) 559-5290</a>
        </div>
        {/* Search */}
        <div className="max-w-2xl mx-auto px-4 pb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-green-400 focus:outline-none transition"
          />
        </div>
      </header>

      {/* Filter bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold transition ${activeCategory === 'all' ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
          All ({products.length})
        </button>
        {categories
          .filter(c => products.some(p => p.category.slug === c.slug))
          .map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.slug)}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold transition ${activeCategory === c.slug ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {c.icon && <span className="mr-1">{c.icon}</span>}
              {c.name} ({products.filter(p => p.category.slug === c.slug).length})
            </button>
          ))}
        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="ml-auto px-3 py-1.5 rounded-lg border text-sm bg-white"
        >
          <option value="sortOrder">Default</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      {/* Product grid */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-semibold">No products found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(p => {
              const primaryImg = p.images[0]
              return (
                <div key={p.id} className="bg-white rounded-xl shadow hover:shadow-lg transition group">
                  {/* Image */}
                  <div
                    className="relative h-48 rounded-t-xl overflow-hidden cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}22, ${p.color}44), radial-gradient(circle at 30% 20%, rgba(255,255,255,.25), transparent 60%)`,
                    }}
                    onClick={() => { setLightboxProduct(p); setLightboxIdx(0) }}
                  >
                    <span className="absolute top-2 left-2 bg-white/90 text-[10px] font-bold px-2 py-0.5 rounded-full text-gray-700 z-10">
                      {p.brand.name}
                    </span>
                    {primaryImg && (
                      <img
                        src={primaryImg.url}
                        alt={p.name}
                        className="w-full h-full object-contain p-4 transition group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    )}
                    {p.images.length > 1 && (
                      <span
                        className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10"
                        onClick={(e) => { e.stopPropagation(); setLightboxProduct(p); setLightboxIdx(0) }}
                      >
                        {p.images.length} Photos
                      </span>
                    )}
                    <span className="absolute top-2 right-2 bg-green-600 text-white text-sm font-bold px-2.5 py-0.5 rounded-full z-10">
                      {fmtPrice(p.price)}
                    </span>
                  </div>
                  {/* Body */}
                  <div className="p-4">
                    <span className="text-[11px] text-gray-400 font-mono">{p.model}</span>
                    <h3 className="font-bold text-gray-900 text-sm mt-0.5 leading-tight">{p.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                    {sizeLabel(p) && (
                      <span className="inline-block mt-2 text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                        {sizeLabel(p)}
                      </span>
                    )}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => { setOrderProduct(p); setCustQty(1); setDelivery('pickup'); setChannel('whatsapp') }}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded-lg transition flex items-center justify-center gap-1"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.768-6.262-2.064l-.438-.332-2.639.885.885-2.639-.332-.438A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                        Order
                      </button>
                      <button
                        onClick={() => { setLightboxProduct(p); setLightboxIdx(0) }}
                        className="px-3 py-2 border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 text-xs rounded-lg transition"
                      >
                        ⚙ Specs
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm opacity-70">
          © {new Date().getFullYear()} PixelWire Solutions. All rights reserved. Powered by Neon &amp; Vercel.
        </div>
      </footer>

      {/* ─── Lightbox Modal ─── */}
      {lightboxProduct && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4" onClick={() => setLightboxProduct(null)}>
          <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightboxProduct(null)} className="absolute top-3 right-3 z-10 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition">✕</button>
            <div className="p-6">
              {/* Gallery */}
              <div className="relative bg-gray-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center" style={{ minHeight: 300 }}>
                {lightboxProduct.images[lightboxIdx] && (
                  <img
                    src={lightboxProduct.images[lightboxIdx].url}
                    alt={lightboxProduct.name}
                    className="max-h-80 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                )}
                {lightboxProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setLightboxIdx(prev => prev > 0 ? prev - 1 : lightboxProduct.images.length - 1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70"
                    >‹</button>
                    <button
                      onClick={() => setLightboxIdx(prev => prev < lightboxProduct.images.length - 1 ? prev + 1 : 0)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70"
                    >›</button>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {lightboxProduct.images.length > 1 && (
                <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                  {lightboxProduct.images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setLightboxIdx(i)}
                      className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${i === lightboxIdx ? 'border-green-500' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    </button>
                  ))}
                </div>
              )}
              {/* Info */}
              <span className="text-xs text-gray-400 font-mono">{lightboxProduct.brand.name} — {lightboxProduct.model}</span>
              <h2 className="text-xl font-bold text-gray-900 mt-1">{lightboxProduct.name}</h2>
              <p className="text-green-600 font-bold text-lg mt-1">{fmtPrice(lightboxProduct.price)} JMD</p>
              <p className="text-sm text-gray-600 mt-2">{lightboxProduct.description}</p>
              {lightboxProduct.size && lightboxProduct.size !== 'N/A' && (
                <p className="text-sm text-gray-500 mt-1">Fits {lightboxProduct.size} laptops</p>
              )}
              <button
                onClick={() => { setOrderProduct(lightboxProduct); setLightboxProduct(null); setCustQty(1); setDelivery('pickup'); setChannel('whatsapp') }}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.768-6.262-2.064l-.438-.332-2.639.885.885-2.639-.332-.438A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Order Modal ─── */}
      {orderProduct && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4" onClick={() => setOrderProduct(null)}>
          <div className="relative bg-white rounded-2xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setOrderProduct(null)} className="absolute top-3 right-3 z-10 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70">✕</button>
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900">Order: {orderProduct.brand.name} — {orderProduct.name}</h2>
              <p className="text-green-600 font-bold text-xl mt-1">{fmtPrice(orderProduct.price)} JMD</p>

              {/* Name */}
              <label className="block mt-4">
                <span className="text-sm font-medium text-gray-700">Your Name</span>
                <input
                  type="text"
                  value={custName}
                  onChange={e => setCustName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:border-green-500 focus:outline-none"
                />
              </label>

              {/* Quantity */}
              <label className="block mt-3">
                <span className="text-sm font-medium text-gray-700">Quantity</span>
                <input
                  type="number"
                  min={1}
                  value={custQty}
                  onChange={e => setCustQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:border-green-500 focus:outline-none"
                />
              </label>

              {/* Delivery */}
              <div className="mt-3">
                <span className="text-sm font-medium text-gray-700 block mb-1">Delivery</span>
                <div className="space-y-1">
                  {[
                    { key: 'pickup' as const, label: 'Pickup (Free)', cost: 0 },
                    { key: 'kgn' as const, label: 'Kingston ($1,500)', cost: 1500 },
                    { key: 'parish' as const, label: 'Islandwide ($3,000)', cost: 3000 },
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setDelivery(opt.key)}
                      className={`w-full px-3 py-2 rounded-lg text-sm text-left border transition ${delivery === opt.key ? 'bg-green-50 border-green-500 font-semibold' : 'hover:bg-gray-50'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Channel */}
              <div className="mt-3">
                <span className="text-sm font-medium text-gray-700 block mb-1">Order via</span>
                <div className="flex gap-2">
                  {(['whatsapp', 'call', 'email'] as const).map(ch => (
                    <button
                      key={ch}
                      onClick={() => setChannel(ch)}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition ${channel === ch ? 'bg-green-50 border-green-500' : 'hover:bg-gray-50'}`}
                    >
                      {ch === 'whatsapp' ? '💬 WhatsApp' : ch === 'call' ? '📞 Call' : '📧 Email'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="mt-4 pt-3 border-t flex justify-between items-center">
                <span className="text-sm text-gray-600">Total:</span>
                <span className="text-xl font-bold text-green-600">
                  {fmtPrice(orderProduct.price * custQty + (delivery === 'kgn' ? 1500 : delivery === 'parish' ? 3000 : 0))} JMD
                </span>
              </div>

              {/* Submit */}
              <button
                onClick={sendWhatsApp}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.768-6.262-2.064l-.438-.332-2.639.885.885-2.639-.332-.438A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                Send Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
