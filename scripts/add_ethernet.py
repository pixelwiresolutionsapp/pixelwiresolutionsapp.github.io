with open('/home/z/my-project/download/index.html', 'r') as f:
    c = f.read()

# Add product after Foldable Tablet Stand line
old = '{ name: "Foldable Tablet Stand", brand: "Generic", model: "Adjustable Foldable Tablet & Phone Stand", price: 2800, category: "mount", color: "#374151", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/stand-1.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/stand-2.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/stand-3.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/stand-4.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/stand-5.jpeg"], size: "N/A", desc: "Universal foldable desktop stand for tablets and phones - adjustable multi-angle with articulated hinges." }'

new = old + ''',
    { name: "USB 3.0 Gigabit Ethernet Adapter", brand: "GLAABIT", model: "10/100/1000Mbps USB 3.0 to RJ45 LAN Ethernet Adapter", price: 2500, category: "hub", color: "#1e293b", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/ethernet-1.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/ethernet-2.jpeg"], size: "N/A", desc: "USB 3.0 Gigabit Ethernet LAN adapter - plug into any USB port for wired network connectivity up to 1000Mbps." }'''

c = c.replace(old, new)

# Add product specs
old_specs = '"Foldable Tablet Stand": ["Type: Universal foldable desktop tablet and phone stand", "Design: Articulated/folding stand with multiple joints and circular hinge mechanism for angle adjustment", "Compatibility: Holds tablets (iPad and all sizes), phones and e-readers", "Angles: Multi-angle adjustable - find the perfect viewing angle for reading, typing, watching videos or video calls", "Material: Matte black plastic/metal construction; lightweight and portable", "Base: Two support legs forming a stable A-frame/triangular base", "Folding: Fully foldable/collapsible - folds flat for easy storage and portability", "Non-slip: Rubberized feet and pads keep devices secure without scratching", "Use: Desktop use for work, presentations, video calls, watching media and reading"]'

new_specs = old_specs + ''',
    "USB 3.0 Gigabit Ethernet Adapter": ["Type: USB 3.0 to RJ45 Gigabit Ethernet LAN network adapter", "Brand: GLAABIT", "Speed: 10/100/1000Mbps Gigabit Ethernet - supports up to 1000Mbps wired connection", "USB: USB 3.0 (backward compatible with USB 2.0) with blue-tinted connector", "Port: RJ45 Ethernet port with LINK and ACT LED status indicators", "Cable: Built-in short USB cable for easy connection without additional cable needed", "Build: Compact matte black rectangular dongle with textured surface", "Use: Add wired Ethernet to laptops, tablets or PCs without built-in LAN ports", "Plug and play - no drivers needed for most operating systems"]'''

c = c.replace(old_specs, new_specs)

with open('/home/z/my-project/download/index.html', 'w') as f:
    f.write(c)

print('done')
