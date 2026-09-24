with open('/home/z/my-project/download/index.html', 'r') as f:
    c = f.read()

# Add filter button for Networking
c = c.replace(
    '<button class="filter-btn" data-filter="printer">Printers</button>',
    '<button class="filter-btn" data-filter="printer">Printers</button>\n    <button class="filter-btn" data-filter="network">Networking</button>'
)

# Add size label for network category
c = c.replace(
    "'printer': '&#128424; Printer'",
    "'printer': '&#128424; Printer',\n      'network': '&#128225; Networking'"
)

# Add product after Thermal Printer line
old = '{ name: "Portable Mini Thermal Printer", brand: "Bisoffice", model: "Bisoffice Portable Mini Thermal Printer 58mm 2-Inch Wireless USB Receipt Bill Ticket Printer", price: 8000, category: "printer", color: "#1d4ed8", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/printer-1.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/printer-2.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/printer-3.jpeg"], size: "58mm (2 inch)", desc: "Portable mini thermal receipt printer - prints receipts, tickets, labels and bills via USB and wireless connection." }'

new = old + ''',
    { name: "WiFi Range Extender", brand: "Kebidumei", model: "Kebidumei 1200/300Mbps WiFi Repeater Amplifier 2.4G/5G Network Expander Range Extender", price: 5500, category: "network", color: "#7c3aed", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/wifi-ext-1.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/wifi-ext-2.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/wifi-ext-3.jpeg"], size: "N/A", desc: "Dual-band WiFi range extender/repeater with 4 antennas - extends wireless coverage up to 1200Mbps on 5GHz and 300Mbps on 2.4GHz." }'''

c = c.replace(old, new)

# Add product specs
old_specs = '"Portable Mini Thermal Printer": ["Type: Portable mini 58mm (2-inch) thermal receipt/bill/ticket printer", "Brand: Bisoffice", "Print Width: 58mm (2 inch) thermal paper roll", "Connectivity: USB and wireless (Bluetooth/Wi-Fi) for flexible printing from multiple devices", "Controls: POWER button with power symbol and FEED button for manual paper feed", "Design: Blue translucent top cover (shows paper roll level) with matte black base", "Cable: Includes USB cable with USB-A connector", "Compact & Portable: Small lightweight design ideal for mobile vendors, small businesses and events", "Uses: Receipts, bills, tickets, labels, orders - perfect for POS systems, market stalls and food trucks"]'

new_specs = old_specs + ''',
    "WiFi Range Extender": ["Type: Dual-band WiFi range extender / wireless repeater / signal amplifier", "Brand: Kebidumei", "Speed: 1200Mbps (5GHz band) + 300Mbps (2.4GHz band) dual-band wireless", "Antennas: 4 external omni-directional antennas (2 taller center, 2 shorter outer) for maximum coverage", "Plug: US plug - plugs directly into wall outlet; no cables needed", "Input: AC 100-240V 50/60Hz", "Modes: WiFi Repeater mode and WiFi AP (Access Point) mode", "LED Indicators: Power, signal strength and connection status LEDs on front panel", "Setup: Default IP 192.168.10.1; easy web-based configuration", "Extends WiFi coverage to eliminate dead zones in homes, offices and buildings"]'''

c = c.replace(old_specs, new_specs)

with open('/home/z/my-project/download/index.html', 'w') as f:
    f.write(c)

print('done')
