#!/usr/bin/env python3
"""Add specs modal, specs button, new mouse products, and accessories filter to index.html"""

import json, re

with open('/home/z/my-project/download/index.html', 'r') as f:
    html = f.read()

with open('/home/z/my-project/product_specs.json', 'r') as f:
    specs_data = json.load(f)

# Build specs lookup by model
specs_lookup = {}
for item in specs_data:
    specs_lookup[item['model']] = item['specs']

# Build JS specs object
specs_js_lines = []
for model, specs in specs_lookup.items():
    specs_json = json.dumps(specs, ensure_ascii=False)
    specs_js_lines.append(f'  "{model}": {specs_json}')
specs_js = 'var productSpecs = {\n' + ',\n'.join(specs_js_lines) + '\n};'

# 1. Add specs CSS before </style>
specs_css = """
    .specs-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 5px 10px;
      border: 1.5px solid #d0d5dd;
      border-radius: 8px;
      background: #f9fafb;
      color: #344054;
      font-size: .78rem;
      font-weight: 600;
      cursor: pointer;
      transition: all .2s;
      margin-top: 6px;
    }
    .specs-btn:hover { background: #1a1a2e; color: #fff; border-color: #1a1a2e; }
    .specs-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.6);
      z-index: 400;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .specs-overlay.open { display: flex; }
    .specs-panel {
      background: #fff;
      border-radius: 20px;
      padding: 28px 24px;
      max-width: 480px;
      width: 100%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0,0,0,.3);
      position: relative;
      animation: specsIn .3s ease;
    }
    @keyframes specsIn {
      from { opacity: 0; transform: translateY(30px) scale(.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .specs-panel h3 {
      font-size: 1.1rem;
      color: #1a1a2e;
      margin-bottom: 4px;
    }
    .specs-panel .specs-model {
      font-size: .82rem;
      color: #667085;
      margin-bottom: 16px;
    }
    .specs-panel ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .specs-panel ul li {
      padding: 10px 14px;
      background: #f9fafb;
      border-radius: 10px;
      margin-bottom: 8px;
      font-size: .85rem;
      color: #344054;
      line-height: 1.45;
      border-left: 3px solid #25d366;
    }
    .specs-panel ul li strong {
      color: #1a1a2e;
    }
    .specs-close {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: #f2f4f7;
      color: #344054;
      font-size: 1.1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background .2s;
    }
    .specs-close:hover { background: #e4e7ec; }
    @media (max-width: 600px) {
      .specs-btn { font-size: .72rem; padding: 4px 8px; }
      .specs-panel { padding: 20px 16px; border-radius: 16px; }
      .specs-panel ul li { font-size: .8rem; padding: 8px 10px; }
    }
"""

html = html.replace('</style>', specs_css + '\n  </style>')

# 2. Add specs overlay HTML before toast div
specs_html = """  <div class="specs-overlay" id="specsOverlay" onclick="if(event.target===this)closeSpecs()">
    <div class="specs-panel">
      <button class="specs-close" onclick="closeSpecs()">&times;</button>
      <h3 id="specsTitle"></h3>
      <div class="specs-model" id="specsModel"></div>
      <ul id="specsList"></ul>
    </div>
  </div>"""

html = html.replace('<div class="toast" id="toast"></div>', specs_html + '\n  <div class="toast" id="toast"></div>')

# 3. Add specs JS after productSpecs var (before productIndices)
specs_functions = """
  function openSpecsByIndex(idx) {
    var p = products[idx];
    if (!p) return;
    var sp = productSpecs[p.model] || productSpecs[p.name] || [];
    document.getElementById('specsTitle').textContent = p.brand + ' ' + p.name;
    document.getElementById('specsModel').textContent = 'Model: ' + p.model + ' | Fits: ' + p.size + ' Laptop';
    var list = document.getElementById('specsList');
    if (sp.length === 0) {
      list.innerHTML = '<li>No detailed specs available for this product yet.</li>';
    } else {
      var li = '';
      for (var i = 0; i < sp.length; i++) {
        li += '<li>' + sp[i] + '</li>';
      }
      list.innerHTML = li;
    }
    document.getElementById('specsOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeSpecs() {
    document.getElementById('specsOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }"""

# Insert productSpecs object and specs functions after "var selectedPhone" line
html = html.replace(
    'var selectedPhone = "18767731173";',
    specs_js + '\n' + specs_functions + '\n  var selectedPhone = "18767731173";'
)

# 4. Add specs button to card rendering - after the buy-btn
# Find the buy-btn section and add specs button after it
old_buy_section = """      html += '<button class="buy-btn" onclick="event.stopPropagation(); openModalByIndex(' + idx + ')">';
      html += '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.768-6.262-2.064l-.438-.332-2.639.885.885-2.639-.332-.438A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>';
      html += ' Order via WhatsApp</button>';"""

new_buy_section = """      html += '<button class="buy-btn" onclick="event.stopPropagation(); openModalByIndex(' + idx + ')">';
      html += '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.768-6.262-2.064l-.438-.332-2.639.885.885-2.639-.332-.438A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>';
      html += ' Order via WhatsApp</button>';
      html += '<button class="specs-btn" onclick="event.stopPropagation(); openSpecsByIndex(' + idx + ')">&#9881; View Specs</button>';"""

html = html.replace(old_buy_section, new_buy_section)

# 5. Add new mouse products to the products array
# Add them before the closing ]; of the products array
new_products = """,
    { name: "Sculpt Ergonomic Mouse", brand: "Microsoft", model: "Microsoft Sculpt Ergonomic Mouse", price: 3500, category: "accessory", color: "#111827", imgs: ["mouse-sculpt-1.jpg", "mouse-sculpt-2.jpg", "mouse-sculpt-3.jpg"], size: "N/A", desc: "Ergonomic vertical wireless mouse with 4-way scroll wheel." },
    { name: "Arc Mouse", brand: "Microsoft", model: "Microsoft Arc Mouse", price: 3500, category: "accessory", color: "#374151", imgs: ["mouse-arc-1.jpg"], size: "N/A", desc: "Ultra-slim folding Bluetooth mouse, snaps flat for pocket storage." },
    { name: "Vertical Ergonomic Mouse", brand: "HOMEFISH", model: "HOMEFISH Vertical Ergonomic Mouse", price: 3500, category: "accessory", color: "#1f2937", imgs: ["mouse-homefish-1.jpg"], size: "N/A", desc: "2.4GHz wireless ergonomic mouse with 3 adjustable DPI levels." }"""

# Find the last product entry (Dell Eco Loop) and add after it
html = html.replace(
    '{ name: "Eco Loop Essential Backpack", brand: "Dell", model: "DL-EL15"',
    new_products + '\n    { name: "Eco Loop Essential Backpack", brand: "Dell", model: "DL-EL15"'
)

# 6. Add "Accessories" filter button
# Find the filter bar and add accessories button
old_filter_all = '<button class="filter-btn active" data-filter="all">All</button>'
new_filters = """<button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="accessory">&#128433; Accessories</button>"""

html = html.replace(old_filter_all, new_filters)

# 7. Add Escape key handler for specs overlay
html = html.replace(
    "else if (e.key === 'Escape') closeLightbox();",
    "else if (e.key === 'Escape') { closeLightbox(); closeSpecs(); }"
)

with open('/home/z/my-project/download/index.html', 'w') as f:
    f.write(html)

print("SUCCESS: Added specs modal, specs buttons, 3 mouse products, and accessories filter")
