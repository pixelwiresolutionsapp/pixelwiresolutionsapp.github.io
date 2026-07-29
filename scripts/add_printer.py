with open('/home/z/my-project/download/index.html', 'r') as f:
    c = f.read()

# Add filter button for Printers
c = c.replace(
    '<button class="filter-btn" data-filter="mount">Mounts &amp; Stands</button>',
    '<button class="filter-btn" data-filter="mount">Mounts &amp; Stands</button>\n    <button class="filter-btn" data-filter="printer">Printers</button>'
)

# Add size label for printer category
c = c.replace(
    "'mount': '&#128208; Mount &amp; Stand'",
    "'mount': '&#128208; Mount &amp; Stand',\n      'printer': '&#128424; Printer'"
)

# Add product after Laptop Stand line
old = '{ name: "Laptop Stand", brand: "Generic", model: "Creative Folding Storage Bracket Laptop Stand", price: 3500, category: "mount", color: "#374151", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/laptop-stand-1.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/laptop-stand-2.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/laptop-stand-3.jpeg"], size: "N/A", desc: "X-shaped folding laptop stand with ventilation slots - elevates laptop for better airflow and ergonomic typing angle." }'

new = old + ''',
    { name: "Portable Mini Thermal Printer", brand: "Bisoffice", model: "Bisoffice Portable Mini Thermal Printer 58mm 2-Inch Wireless USB Receipt Bill Ticket Printer", price: 8000, category: "printer", color: "#1d4ed8", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/printer-1.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/printer-2.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/printer-3.jpeg"], size: "58mm (2 inch)", desc: "Portable mini thermal receipt printer - prints receipts, tickets, labels and bills via USB and wireless connection." }'''

c = c.replace(old, new)

# Add product specs
old_specs = '"Laptop Stand": ["Type: Creative folding storage bracket laptop stand", "Design: X-shaped scissor/cross-bar structure with central pivot point for foldable design", "Ventilation: Base bars with cut-out ventilation slots for improved laptop airflow and cooling", "Grips: Grey rubberized pads on vertical side supports to prevent laptop from slipping", "Adjustment: Adjustment slots on vertical arms for multiple height/angle settings", "Material: Black metal or high-durability plastic construction", "Folding: Fully foldable - collapses flat for easy storage and portability", "Ergonomic: Elevates laptop for improved typing angle, better posture and reduced neck strain", "Compatible with most laptop sizes; ideal for desk use at home or office"]'

new_specs = old_specs + ''',
    "Portable Mini Thermal Printer": ["Type: Portable mini 58mm (2-inch) thermal receipt/bill/ticket printer", "Brand: Bisoffice", "Print Width: 58mm (2 inch) thermal paper roll", "Connectivity: USB and wireless (Bluetooth/Wi-Fi) for flexible printing from multiple devices", "Controls: POWER button with power symbol and FEED button for manual paper feed", "Design: Blue translucent top cover (shows paper roll level) with matte black base", "Cable: Includes USB cable with USB-A connector", "Compact & Portable: Small lightweight design ideal for mobile vendors, small businesses and events", "Uses: Receipts, bills, tickets, labels, orders - perfect for POS systems, market stalls and food trucks"]'''

c = c.replace(old_specs, new_specs)

with open('/home/z/my-project/download/index.html', 'w') as f:
    f.write(c)

print('done')
