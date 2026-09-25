'use client'

import { useEffect, useState, useCallback } from 'react'
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

type Tab = 'products' | 'add' | 'categories' | 'brands' | 'orders'

// ─── Component ───
export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Edit state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Add product form
  const [form, setForm] = useState({
    name: '', model: '', price: 0, description: '', size: 'N/A', color: '#111827',
    categoryId: '', brandId: '', featured: false, isActive: true, sortOrder: 0,
    imageUrls: ''  // comma-separated
  })

  // Add category form
  const [catForm, setCatForm] = useState({ name: '', slug: '', icon: '', color: '#1a1a2e' })
  // Add brand form
  const [brandForm, setBrandForm] = useState({ name: '', slug: '', logoUrl: '' })

  const API = '/api'

  // ─── Load data ───
  const loadData = useCallback(async () => {
    try {
      const [prodRes, catRes, brandRes] = await Promise.all([
        fetch(`${API}/products?limit=500`),
        fetch(`${API}/categories`),
        fetch(`${API}/brands`),
      ])
      const prodData = await prodRes.json()
      const catData = await catRes.json()
      const brandData = await brandRes.json()
      setProducts(prodData.products || [])
      setCategories(catData || [])
      setBrands(brandData || [])
    } catch {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadOrders = useCallback(async () => {
    try {
      const res = await fetch(`${API}/orders?limit=100`)
      const data = await res.json()
      setOrders(data.orders || [])
    } catch {
      toast.error('Failed to load orders')
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])
  useEffect(() => { if (tab === 'orders') loadOrders() }, [tab, loadOrders])

  // ─── Product CRUD ───
  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return
    try {
      await fetch(`${API}/products/${id}`, { method: 'DELETE' })
      toast.success('Product deleted')
      loadData()
    } catch {
      toast.error('Delete failed')
    }
  }

  const toggleActive = async (product: Product) => {
    try {
      await fetch(`${API}/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, isActive: !product.isActive, brandId: product.brand.id, categoryId: product.category.id }),
      })
      toast.success(product.isActive ? 'Product hidden' : 'Product visible')
      loadData()
    } catch {
      toast.error('Update failed')
    }
  }

  const toggleFeatured = async (product: Product) => {
    try {
      await fetch(`${API}/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, featured: !product.featured, brandId: product.brand.id, categoryId: product.category.id }),
      })
      toast.success(product.featured ? 'Unfeatured' : 'Featured!')
      loadData()
    } catch {
      toast.error('Update failed')
    }
  }

  // ─── Add product ───
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.model || !form.categoryId || !form.brandId) {
      toast.error('Fill in all required fields')
      return
    }
    try {
      const images = form.imageUrls.split(',').map(u => u.trim()).filter(Boolean)
      const res = await fetch(`${API}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, images, price: Number(form.price), sortOrder: Number(form.sortOrder) }),
      })
      if (!res.ok) throw new Error()
      toast.success('Product added!')
      setForm({ name: '', model: '', price: 0, description: '', size: 'N/A', color: '#111827', categoryId: '', brandId: '', featured: false, isActive: true, sortOrder: 0, imageUrls: '' })
      loadData()
      setTab('products')
    } catch {
      toast.error('Failed to add product')
    }
  }

  // ─── Update product ───
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return
    try {
      const images = form.imageUrls.split(',').map(u => u.trim()).filter(Boolean)
      await fetch(`${API}/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, model: form.model, price: Number(form.price),
          description: form.description, size: form.size, color: form.color,
          categoryId: form.categoryId, brandId: form.brandId,
          featured: form.featured, isActive: form.isActive, sortOrder: Number(form.sortOrder),
          images
        }),
      })
      toast.success('Product updated!')
      setEditingProduct(null)
      setForm({ name: '', model: '', price: 0, description: '', size: 'N/A', color: '#111827', categoryId: '', brandId: '', featured: false, isActive: true, sortOrder: 0, imageUrls: '' })
      loadData()
      setTab('products')
    } catch {
      toast.error('Failed to update product')
    }
  }

  const startEdit = (p: Product) => {
    setEditingProduct(p)
    setForm({
      name: p.name, model: p.model, price: p.price, description: p.description || '',
      size: p.size || 'N/A', color: p.color, categoryId: p.category.id, brandId: p.brand.id,
      featured: p.featured, isActive: p.isActive, sortOrder: p.sortOrder,
      imageUrls: p.images.map(i => i.url).join(', ')
    })
    setTab('add')
  }

  // ─── Add category ───
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!catForm.name) return
    try {
      const slug = catForm.slug || catForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const res = await fetch(`${API}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...catForm, slug }),
      })
      if (!res.ok) throw new Error()
      toast.success('Category added!')
      setCatForm({ name: '', slug: '', icon: '', color: '#1a1a2e' })
      loadData()
    } catch {
      toast.error('Failed to add category')
    }
  }

  // ─── Add brand ───
  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!brandForm.name) return
    try {
      const slug = brandForm.slug || brandForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const res = await fetch(`${API}/brands`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...brandForm, slug }),
      })
      if (!res.ok) throw new Error()
      toast.success('Brand added!')
      setBrandForm({ name: '', slug: '', logoUrl: '' })
      loadData()
    } catch {
      toast.error('Failed to add brand')
    }
  }

  // ─── Delete category ───
  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category? All products in it will also be deleted!')) return
    try {
      await fetch(`${API}/categories/${id}`, { method: 'DELETE' })
      toast.success('Category deleted')
      loadData()
    } catch { toast.error('Delete failed') }
  }

  // ─── Delete brand ───
  const deleteBrand = async (id: string) => {
    if (!confirm('Delete this brand? All products under it will also be deleted!')) return
    try {
      await fetch(`${API}/brands/${id}`, { method: 'DELETE' })
      toast.success('Brand deleted')
      loadData()
    } catch { toast.error('Delete failed') }
  }

  const fmtPrice = (p: number) => `$${p.toLocaleString('en-JM', { minimumFractionDigits: 2 })}`

  const filtered = products.filter(p =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.model.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // ─── Render ───
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1a1a2e] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">PixelWire Admin</h1>
            <p className="text-xs opacity-60">Product &amp; Inventory Management</p>
          </div>
          <a href="/" className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
            View Storefront
          </a>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {([
            ['products', 'Products', `${products.length} items`],
            ['add', editingProduct ? 'Edit Product' : 'Add Product', ''],
            ['categories', 'Categories', `${categories.length}`],
            ['brands', 'Brands', `${brands.length}`],
            ['orders', 'Orders', ''],
          ] as [Tab, string, string][]).map(([key, label, count]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                tab === key
                  ? 'border-[#1a1a2e] text-[#1a1a2e]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}{count ? ` (${count})` : ''}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* ─── PRODUCTS TAB ─── */}
        {tab === 'products' && (
          <div>
            <div className="flex gap-3 items-center mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none"
              />
              <button
                onClick={() => { setEditingProduct(null); setForm({ name: '', model: '', price: 0, description: '', size: 'N/A', color: '#111827', categoryId: '', brandId: '', featured: false, isActive: true, sortOrder: 0, imageUrls: '' }); setTab('add') }}
                className="bg-[#1a1a2e] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0f3460] transition"
              >
                + Add Product
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading...</div>
            ) : (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Product</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Brand</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Price</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-600">Images</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-600">Active</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-600">Featured</th>
                      <th className="px-4 py-3 text-center font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filtered.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {p.images[0] && (
                              <img src={p.images[0].url} alt="" className="w-10 h-10 object-contain rounded border bg-gray-50" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{p.name}</p>
                              <p className="text-xs text-gray-400 font-mono">{p.model}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{p.brand.name}</td>
                        <td className="px-4 py-3 text-gray-700">{p.category.name}</td>
                        <td className="px-4 py-3 font-semibold text-green-600">{fmtPrice(p.price)}</td>
                        <td className="px-4 py-3 text-center text-gray-500">{p.images.length}</td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => toggleActive(p)} className={`px-2 py-1 rounded-full text-xs font-bold ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {p.isActive ? 'Live' : 'Hidden'}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => toggleFeatured(p)} className={`text-lg ${p.featured ? 'text-yellow-500' : 'text-gray-300'}`}>
                            ★
                          </button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex gap-1 justify-center">
                            <button onClick={() => startEdit(p)} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-semibold hover:bg-blue-100 transition">
                              Edit
                            </button>
                            <button onClick={() => deleteProduct(p.id)} className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-semibold hover:bg-red-100 transition">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="text-center py-12 text-gray-400">No products found</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── ADD / EDIT PRODUCT TAB ─── */}
        {tab === 'add' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model/SKU *</label>
                  <input type="text" value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} required className="w-full px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (JMD) *</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} required className="w-full px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size (laptop fit)</label>
                  <input type="text" value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} placeholder='e.g. "15.6 inch" or "N/A"' className="w-full px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} required className="w-full px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none">
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                  <select value={form.brandId} onChange={e => setForm({ ...form, brandId: e.target.value })} required className="w-full px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none">
                    <option value="">Select brand</option>
                    {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs <span className="text-gray-400 font-normal">(comma-separated)</span></label>
                <textarea value={form.imageUrls} onChange={e => setForm({ ...form, imageUrls: e.target.value })} rows={3} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" className="w-full px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none font-mono" />
                {form.imageUrls && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {form.imageUrls.split(',').map((u, i) => u.trim() && (
                      <img key={i} src={u.trim()} alt="" className="w-16 h-16 object-contain rounded border bg-gray-50" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className="w-full h-10 rounded-lg border cursor-pointer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none" />
                </div>
                <div className="flex flex-col justify-end gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
                    Active
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" />
                    Featured
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-[#1a1a2e] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0f3460] transition">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                {editingProduct && (
                  <button type="button" onClick={() => { setEditingProduct(null); setForm({ name: '', model: '', price: 0, description: '', size: 'N/A', color: '#111827', categoryId: '', brandId: '', featured: false, isActive: true, sortOrder: 0, imageUrls: '' }); setTab('products') }} className="px-6 py-2.5 border rounded-lg text-gray-600 hover:bg-gray-50 transition">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ─── CATEGORIES TAB ─── */}
        {tab === 'categories' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-4">Add Category</h2>
              <form onSubmit={handleAddCategory} className="grid grid-cols-2 gap-4">
                <input type="text" value={catForm.name} onChange={e => setCatForm({ ...catForm, name: e.target.value })} placeholder="Category name *" required className="px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none" />
                <input type="text" value={catForm.slug} onChange={e => setCatForm({ ...catForm, slug: e.target.value })} placeholder="Slug (auto-generated)" className="px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none" />
                <input type="text" value={catForm.icon} onChange={e => setCatForm({ ...catForm, icon: e.target.value })} placeholder="Icon emoji" className="px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none" />
                <input type="color" value={catForm.color} onChange={e => setCatForm({ ...catForm, color: e.target.value })} className="h-10 rounded-lg border cursor-pointer" />
                <button type="submit" className="col-span-2 bg-[#1a1a2e] text-white py-2 rounded-lg font-semibold hover:bg-[#0f3460] transition">
                  Add Category
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Icon</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Slug</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Products</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {categories.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-xl">{c.icon || '—'}</td>
                      <td className="px-4 py-3 font-medium">{c.name}</td>
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">{c.slug}</td>
                      <td className="px-4 py-3 text-gray-500">{products.filter(p => p.category.id === c.id).length}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => deleteCategory(c.id)} className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-semibold hover:bg-red-100 transition">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── BRANDS TAB ─── */}
        {tab === 'brands' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-4">Add Brand</h2>
              <form onSubmit={handleAddBrand} className="grid grid-cols-3 gap-4">
                <input type="text" value={brandForm.name} onChange={e => setBrandForm({ ...brandForm, name: e.target.value })} placeholder="Brand name *" required className="px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none" />
                <input type="text" value={brandForm.slug} onChange={e => setBrandForm({ ...brandForm, slug: e.target.value })} placeholder="Slug (auto)" className="px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none" />
                <input type="text" value={brandForm.logoUrl} onChange={e => setBrandForm({ ...brandForm, logoUrl: e.target.value })} placeholder="Logo URL" className="px-3 py-2 border rounded-lg text-sm focus:border-[#1a1a2e] focus:outline-none" />
                <button type="submit" className="col-span-3 bg-[#1a1a2e] text-white py-2 rounded-lg font-semibold hover:bg-[#0f3460] transition">
                  Add Brand
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Slug</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Products</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {brands.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{b.name}</td>
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">{b.slug}</td>
                      <td className="px-4 py-3 text-gray-500">{products.filter(p => p.brand.id === b.id).length}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => deleteBrand(b.id)} className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-semibold hover:bg-red-100 transition">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── ORDERS TAB ─── */}
        {tab === 'orders' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
            {orders.length === 0 ? (
              <div className="text-center py-12 text-gray-400 bg-white rounded-xl shadow">No orders yet</div>
            ) : (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Customer</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Items</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Total</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Channel</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Delivery</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map((o: any) => (
                      <tr key={o.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{o.customerName}</td>
                        <td className="px-4 py-3 text-gray-500">{o.items?.length || 0} item(s)</td>
                        <td className="px-4 py-3 font-semibold text-green-600">{fmtPrice(o.totalPrice)}</td>
                        <td className="px-4 py-3 text-gray-500 capitalize">{o.channel}</td>
                        <td className="px-4 py-3 text-gray-500 capitalize">{o.delivery?.replace('_', ' ')}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            o.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            o.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                            o.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                            o.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>{o.status}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
