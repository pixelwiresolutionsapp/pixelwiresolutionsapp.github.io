with open('/home/z/my-project/download/index.html', 'r') as f:
    c = f.read()

# Add product after USB 3.0 Gigabit Ethernet Adapter line
old = '{ name: "USB 3.0 Gigabit Ethernet Adapter", brand: "GLAABIT", model: "10/100/1000Mbps USB 3.0 to RJ45 LAN Ethernet Adapter", price: 2500, category: "hub", color: "#1e293b", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/ethernet-1.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/ethernet-2.jpeg"], size: "N/A", desc: "USB 3.0 Gigabit Ethernet LAN adapter - plug into any USB port for wired network connectivity up to 1000Mbps." }'

new = old + ''',
    { name: "Laptop Stand", brand: "Generic", model: "Creative Folding Storage Bracket Laptop Stand", price: 3500, category: "mount", color: "#374151", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/laptop-stand-1.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/laptop-stand-2.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/laptop-stand-3.jpeg"], size: "N/A", desc: "X-shaped folding laptop stand with ventilation slots - elevates laptop for better airflow and ergonomic typing angle." }'''

c = c.replace(old, new)

# Add product specs
old_specs = '"USB 3.0 Gigabit Ethernet Adapter": ["Type: USB 3.0 to RJ45 Gigabit Ethernet LAN network adapter", "Brand: GLAABIT", "Speed: 10/100/1000Mbps Gigabit Ethernet - supports up to 1000Mbps wired connection", "USB: USB 3.0 (backward compatible with USB 2.0) with blue-tinted connector", "Port: RJ45 Ethernet port with LINK and ACT LED status indicators", "Cable: Built-in short USB cable for easy connection without additional cable needed", "Build: Compact matte black rectangular dongle with textured surface", "Use: Add wired Ethernet to laptops, tablets or PCs without built-in LAN ports", "Plug and play - no drivers needed for most operating systems"]'

new_specs = old_specs + ''',
    "Laptop Stand": ["Type: Creative folding storage bracket laptop stand", "Design: X-shaped scissor/cross-bar structure with central pivot point for foldable design", "Ventilation: Base bars with cut-out ventilation slots for improved laptop airflow and cooling", "Grips: Grey rubberized pads on vertical side supports to prevent laptop from slipping", "Adjustment: Adjustment slots on vertical arms for multiple height/angle settings", "Material: Black metal or high-durability plastic construction", "Folding: Fully foldable - collapses flat for easy storage and portability", "Ergonomic: Elevates laptop for improved typing angle, better posture and reduced neck strain", "Compatible with most laptop sizes; ideal for desk use at home or office"]'''

c = c.replace(old_specs, new_specs)

with open('/home/z/my-project/download/index.html', 'w') as f:
    f.write(c)

print('done')
