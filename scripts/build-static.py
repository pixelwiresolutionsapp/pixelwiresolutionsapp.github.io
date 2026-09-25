#!/usr/bin/env python3
"""
Build a static storefront HTML for GitHub Pages (pixelwiresolutionsapp.github.io)
that fetches product data from the Vercel API backend.
"""
import json
import os
import urllib.request

API_BASE = "https://temporary-snappy-beryl-va7pr0z.vercel.app"

def fetch(path):
    url = f"{API_BASE}{path}"
    req = urllib.request.Request(url, headers={"User-Agent": "build-script/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())

def main():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_dir = os.path.join(base, "docs")
    os.makedirs(out_dir, exist_ok=True)

    try:
        prod_data = fetch("/api/products?limit=500")
        cat_data = fetch("/api/categories")
        brand_data = fetch("/api/brands")
        print(f"Pre-fetched {prod_data['total']} products, {len(cat_data)} categories, {len(brand_data)} brands")
    except Exception as e:
        print(f"Warning: could not pre-fetch data: {e}")
        prod_data = {"products": [], "total": 0}
        cat_data = []
        brand_data = []

    # Read the JS template from a separate file to avoid Python escaping issues
    js_code = r'''
  // ─── Config ───
  const API = "''' + API_BASE + r'''/api";

  // ─── State ───
  let products = [];
  let categories = [];
  let loading = true;
  let activeCategory = "all";
  let searchQuery = "";
  let sortBy = "sortOrder";
  let lightboxProduct = null;
  let lightboxIdx = 0;
  let orderProduct = null;
  let custName = "";
  let custQty = 1;
  let delivery = "pickup";
  let channel = "whatsapp";

  async function loadData() {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(API + "/products?limit=200"),
        fetch(API + "/categories"),
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();
      products = prodData.products || [];
      categories = catData || [];
    } catch (e) {
      console.error("Failed to load:", e);
    } finally {
      loading = false;
      render();
    }
  }

  function fmtPrice(p) {
    return "$" + p.toLocaleString("en-JM", { minimumFractionDigits: 2 });
  }

  function sizeLabel(p) {
    if (p.size && p.size !== "N/A") return "Fits " + p.size;
    return "";
  }

  function getFiltered() {
    return products
      .filter(p => activeCategory === "all" || p.category.slug === activeCategory)
      .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.model.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return a.sortOrder - b.sortOrder;
      });
  }

  function sendWhatsApp() {
    if (!orderProduct) return;
    const deliveryCost = delivery === "kgn" ? 1500 : delivery === "parish" ? 3000 : 0;
    const total = orderProduct.price * custQty + deliveryCost;
    const msg = `Hi PixelWire! I'd like to order:\n\n` +
      `\u{1F4E6} ${orderProduct.brand.name} ${orderProduct.name}\n` +
      `\u{1F4B2} ${fmtPrice(orderProduct.price)} each \u00D7 ${custQty}\n` +
      `\u{1F69A} Delivery: ${delivery === "pickup" ? "Pickup (free)" : delivery === "kgn" ? "Kingston ($1,500)" : "Islandwide ($3,000)"}\n` +
      `\u{1F4B0} Total: ${fmtPrice(total)} JMD\n\n` +
      `\u{1F464} Name: ${custName || "Not provided"}`;
    window.open("https://wa.me/18767731173?text=" + encodeURIComponent(msg), "_blank");
    orderProduct = null;
    render();
  }

  const WA_ICON = '<svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.768-6.262-2.064l-.438-.332-2.639.885.885-2.639-.332-.438A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>';
  const WA_ICON_LG = WA_ICON.replace('w-4 h-4', 'w-5 h-5');

  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function render() {
    const filtered = getFiltered();
    const app = document.getElementById("app");
    let h = '';

    // Header
    h += '<header class="sticky top-0 z-50 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white shadow-lg">';
    h += '<div class="max-w-7xl mx-auto px-4 py-5 text-center">';
    h += '<h1 class="text-2xl md:text-3xl font-extrabold tracking-tight">PixelWire Solutions</h1>';
    h += '<p class="text-sm opacity-80 mt-1">Laptop Bags, Tech Accessories &amp; More \u2014 Order via WhatsApp</p>';
    h += '</div>';
    h += '<div class="bg-[#075e54] text-center py-2 text-sm font-medium">';
    h += '\u{1F4DE} Call or WhatsApp: <a href="https://wa.me/18767731173" class="underline font-bold hover:text-green-300 transition">(876) 773-1173</a> or <a href="https://wa.me/18765595290" class="underline font-bold hover:text-green-300 transition">(876) 559-5290</a>';
    h += '</div>';
    h += '<div class="max-w-2xl mx-auto px-4 pb-4">';
    h += '<input type="text" placeholder="Search products..." id="searchInput" class="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-green-400 focus:outline-none transition" />';
    h += '</div></header>';

    // Filter bar
    h += '<div class="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center">';
    h += '<button onclick="activeCategory=\'all\';render()" class="px-3 py-1.5 rounded-full text-sm font-semibold transition ' + (activeCategory === 'all' ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-700 hover:bg-gray-100') + '">All (' + products.length + ')</button>';
    categories.filter(c => products.some(p => p.category.slug === c.slug)).forEach(c => {
      const cnt = products.filter(p => p.category.slug === c.slug).length;
      const act = activeCategory === c.slug;
      h += '<button onclick="activeCategory=\'' + c.slug + '\';render()" class="px-3 py-1.5 rounded-full text-sm font-semibold transition ' + (act ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-700 hover:bg-gray-100') + '">';
      if (c.icon) h += '<span class="mr-1">' + c.icon + '</span>';
      h += c.name + ' (' + cnt + ')</button>';
    });
    h += '<select onchange="sortBy=this.value;render()" class="ml-auto px-3 py-1.5 rounded-lg border text-sm bg-white">';
    h += '<option value="sortOrder"' + (sortBy==='sortOrder'?' selected':'') + '>Default</option>';
    h += '<option value="price_asc"' + (sortBy==='price_asc'?' selected':'') + '>Price \u2191</option>';
    h += '<option value="price_desc"' + (sortBy==='price_desc'?' selected':'') + '>Price \u2193</option>';
    h += '<option value="name"' + (sortBy==='name'?' selected':'') + '>Name A-Z</option>';
    h += '</select></div>';

    // Grid
    h += '<main class="max-w-7xl mx-auto px-4 pb-12">';
    if (loading) {
      h += '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">';
      for (let i=0;i<8;i++) h += '<div class="bg-white rounded-xl shadow animate-pulse"><div class="h-48 bg-gray-200 rounded-t-xl"></div><div class="p-4 space-y-2"><div class="h-4 bg-gray-200 rounded w-1/3"></div><div class="h-6 bg-gray-200 rounded w-2/3"></div><div class="h-3 bg-gray-200 rounded w-full"></div></div></div>';
      h += '</div>';
    } else if (filtered.length === 0) {
      h += '<div class="text-center py-20 text-gray-500"><p class="text-5xl mb-4">\u{1F50D}</p><p class="text-lg font-semibold">No products found</p><p class="text-sm">Try a different search or category</p></div>';
    } else {
      h += '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">';
      filtered.forEach(p => {
        const pi = products.indexOf(p);
        const img = p.images[0];
        h += '<div class="bg-white rounded-xl shadow hover:shadow-lg transition group">';
        h += '<div class="relative h-48 rounded-t-xl overflow-hidden cursor-pointer" style="background:linear-gradient(135deg,'+p.color+'22,'+p.color+'44),radial-gradient(circle at 30% 20%,rgba(255,255,255,.25),transparent 60%)" onclick="lightboxProduct=products['+pi+'];lightboxIdx=0;render()">';
        h += '<span class="absolute top-2 left-2 bg-white/90 text-[10px] font-bold px-2 py-0.5 rounded-full text-gray-700 z-10">'+esc(p.brand.name)+'</span>';
        if (img) h += '<img src="'+img.url+'" alt="'+esc(p.name)+'" class="w-full h-full object-contain p-4 transition group-hover:scale-105" onerror="this.style.display=\'none\'" />';
        if (p.images.length>1) h += '<span class="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10" onclick="event.stopPropagation();lightboxProduct=products['+pi+'];lightboxIdx=0;render()">'+p.images.length+' Photos</span>';
        h += '<span class="absolute top-2 right-2 bg-green-600 text-white text-sm font-bold px-2.5 py-0.5 rounded-full z-10">'+fmtPrice(p.price)+'</span>';
        h += '</div>';
        h += '<div class="p-4">';
        h += '<span class="text-[11px] text-gray-400 font-mono">'+esc(p.model)+'</span>';
        h += '<h3 class="font-bold text-gray-900 text-sm mt-0.5 leading-tight">'+esc(p.name)+'</h3>';
        if (p.description) h += '<p class="text-xs text-gray-500 mt-1 line-clamp-2">'+esc(p.description)+'</p>';
        const sl = sizeLabel(p);
        if (sl) h += '<span class="inline-block mt-2 text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">'+sl+'</span>';
        h += '<div class="flex gap-2 mt-3">';
        h += '<button onclick="orderProduct=products['+pi+'];custQty=1;delivery=\'pickup\';channel=\'whatsapp\';render()" class="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded-lg transition flex items-center justify-center gap-1">'+WA_ICON+' Order</button>';
        h += '<button onclick="lightboxProduct=products['+pi+'];lightboxIdx=0;render()" class="px-3 py-2 border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 text-xs rounded-lg transition">\u2699 Specs</button>';
        h += '</div></div></div>';
      });
      h += '</div>';
    }
    h += '</main>';

    // Footer
    h += '<footer class="bg-[#1a1a2e] text-white py-6 mt-auto"><div class="max-w-7xl mx-auto px-4 text-center text-sm opacity-70">\u00A9 '+new Date().getFullYear()+' PixelWire Solutions. All rights reserved.</div></footer>';

    // Lightbox
    if (lightboxProduct) {
      const lp = lightboxProduct;
      h += '<div class="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4" onclick="lightboxProduct=null;render()">';
      h += '<div class="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">';
      h += '<button onclick="lightboxProduct=null;render()" class="absolute top-3 right-3 z-10 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition">\u2715</button>';
      h += '<div class="p-6">';
      h += '<div class="relative bg-gray-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center" style="min-height:300px">';
      if (lp.images[lightboxIdx]) h += '<img src="'+lp.images[lightboxIdx].url+'" alt="'+esc(lp.name)+'" class="max-h-80 object-contain" onerror="this.style.display=\'none\'" />';
      if (lp.images.length>1) {
        h += '<button onclick="lightboxIdx=lightboxIdx>0?lightboxIdx-1:'+(lp.images.length-1)+';render()" class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70">\u2039</button>';
        h += '<button onclick="lightboxIdx=lightboxIdx<'+(lp.images.length-1)+'?lightboxIdx+1:0;render()" class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70">\u203A</button>';
      }
      h += '</div>';
      if (lp.images.length>1) {
        h += '<div class="flex gap-2 mb-4 overflow-x-auto pb-1">';
        lp.images.forEach((img,i) => {
          h += '<button onclick="lightboxIdx='+i+';render()" class="shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition '+(i===lightboxIdx?'border-green-500':'border-gray-200 hover:border-gray-400')+'"><img src="'+img.url+'" alt="" class="w-full h-full object-cover" onerror="this.style.display=\'none\'" /></button>';
        });
        h += '</div>';
      }
      h += '<span class="text-xs text-gray-400 font-mono">'+esc(lp.brand.name)+' \u2014 '+esc(lp.model)+'</span>';
      h += '<h2 class="text-xl font-bold text-gray-900 mt-1">'+esc(lp.name)+'</h2>';
      h += '<p class="text-green-600 font-bold text-lg mt-1">'+fmtPrice(lp.price)+' JMD</p>';
      if (lp.description) h += '<p class="text-sm text-gray-600 mt-2">'+esc(lp.description)+'</p>';
      if (lp.size&&lp.size!=='N/A') h += '<p class="text-sm text-gray-500 mt-1">Fits '+lp.size+' laptops</p>';
      const lpi = products.indexOf(lp);
      h += '<button onclick="orderProduct=products['+lpi+'];lightboxProduct=null;custQty=1;delivery=\'pickup\';channel=\'whatsapp\';render()" class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">'+WA_ICON_LG+' Order via WhatsApp</button>';
      h += '</div></div></div>';
    }

    // Order modal
    if (orderProduct) {
      const op = orderProduct;
      const dc = delivery==="kgn"?1500:delivery==="parish"?3000:0;
      const tot = op.price*custQty+dc;
      h += '<div class="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4" onclick="orderProduct=null;render()">';
      h += '<div class="relative bg-white rounded-2xl max-w-md w-full" onclick="event.stopPropagation()">';
      h += '<button onclick="orderProduct=null;render()" class="absolute top-3 right-3 z-10 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70">\u2715</button>';
      h += '<div class="p-6">';
      h += '<h2 class="text-lg font-bold text-gray-900">Order: '+esc(op.brand.name)+' \u2014 '+esc(op.name)+'</h2>';
      h += '<p class="text-green-600 font-bold text-xl mt-1">'+fmtPrice(op.price)+' JMD</p>';
      h += '<label class="block mt-4"><span class="text-sm font-medium text-gray-700">Your Name</span><input type="text" id="custNameInput" placeholder="Enter your name" class="mt-1 w!-full px-3 py-2 border rounded-lg text-sm focus:border-green-500 focus:outline-none" /></label>';
      h += '<label class="block mt-3"><span class="text-sm font-medium text-gray-700">Quantity</span><input type="number" min="1" id="custQtyInput" value="'+custQty+'" class="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:border-green-500 focus:outline-none" /></label>';
      h += '<div class="mt-3"><span class="text-sm font-medium text-gray-700 block mb-1">Delivery</span><div class="space-y-1">';
      [{key:"pickup",label:"Pickup (Free)"},{key:"kgn",label:"Kingston ($1,500)"},{key:"parish",label:"Islandwide ($3,000)"}].forEach(o => {
        h += '<button onclick="delivery=\''+o.key+'\';render()" class="w-full px-3 py-2 rounded-lg text-sm text-left border transition '+(delivery===o.key?'bg-green-50 border-green-500 font-semibold':'hover:bg-gray-50')+'">'+o.label+'</button>';
      });
      h += '</div></div>';
      h += '<div class="mt-3"><span class="text-sm font-medium text-gray-700 block mb-1">Order via</span><div class="flex gap-2">';
      ['whatsapp','call','email'].forEach(ch => {
        const cl = ch==='whatsapp'?'\u{1F4AC} WhatsApp':ch==='call'?'\u{1F4DE} Call':'\u{1F4E7} Email';
        h += '<button onclick="channel=\''+ch+'\';render()" class="flex-1 py-2 rounded-lg text-sm font-semibold border transition '+(channel===ch?'bg-green-50 border-green-500':'hover:bg-gray-50')+'">'+cl+'</button>';
      });
      h += '</div></div>';
      h += '<div class="mt-4 pt-3 border-t flex justify-between items-center"><span class="text-sm text-gray-600">Total:</span><span class="text-xl font-bold text-green-600">'+fmtPrice(tot)+' JMD</span></div>';
      h += '<button onclick="custName=document.getElementById(\'custNameInput\').value;custQty=parseInt(document.getElementById(\'custQtyInput\').value)||1;sendWhatsApp()" class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">'+WA_ICON_LG+' Send Order</button>';
      h += '</div></div></div>';
    }

    app.innerHTML = h;

    const sEl = document.getElementById("searchInput");
    if (sEl) { sEl.value = searchQuery; sEl.oninput = function(){ searchQuery=this.value; render(); }; }
    if (orderProduct) {
      const nEl = document.getElementById("custNameInput");
      const qEl = document.getElementById("custQtyInput");
      if (nEl) nEl.value = custName;
      if (qEl) qEl.value = custQty;
    }
  }

  loadData();
'''

    html = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PixelWire Solutions | Laptop Bags, Tech Accessories & More</title>
  <meta name="description" content="Shop laptop bags, sleeves, backpacks, cases and tech accessories from Klipxtreme, Targus, HP, Dell & more. Order via WhatsApp in Jamaica.">
  <meta name="keywords" content="laptop bags, backpacks, Klipxtreme, Targus, HP, Dell, Jamaica, WhatsApp order">
  <link rel="icon" href="https://pixelwiresolutionsapp.github.io/logo.jpg">
  <meta property="og:title" content="PixelWire Solutions | Laptop Bags, Tech & More">
  <meta property="og:description" content="Shop laptop bags, sleeves, backpacks and tech accessories in Jamaica">
  <meta property="og:url" content="https://pixelwiresolutionsapp.github.io">
  <meta property="og:site_name" content="PixelWire Solutions">
  <meta property="og:type" content="website">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");
    body { font-family: "Inter", system-ui, sans-serif; }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] }
        }
      }
    }
  </script>
</head>
<body class="bg-[#f0f2f5] min-h-screen">
  <div id="app"></div>
  <script>
''' + js_code + '''
  </script>
</body>
</html>'''

    # Fix the typo in the generated code
    html = html.replace('w!-full', 'w-full')

    with open(os.path.join(out_dir, "index.html"), "w") as f:
        f.write(html)

    # Copy logo
    logo_src = os.path.join(base, "logo.jpg")
    if os.path.exists(logo_src):
        import shutil
        shutil.copy2(logo_src, os.path.join(out_dir, "logo.jpg"))

    # Create CNAME for custom domain (if needed later)
    # Create 404.html for SPA routing
    with open(os.path.join(out_dir, "404.html"), "w") as f:
        f.write(html)

    print(f"Static site built to {out_dir}/index.html")
    print(f"API backend: {API_BASE}")

if __name__ == "__main__":
    main()
