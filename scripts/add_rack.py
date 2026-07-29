with open('/home/z/my-project/download/index.html', 'r') as f:
    c = f.read()

# Add product after USB-C Hub line
old = '{ name: "USB-C Hub 8-in-1", brand: "Generic", model: "USB C Hub 8in1 7in2 7in1 Type C 3.1 To 4K HDMI Adapter with RJ45 SD/TF Card Reader PD", price: 5000, category: "hub", color: "#475569", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/usb-hub-1.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/usb-hub-2.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/usb-hub-3.jpeg"], size: "N/A", desc: "8-in-1 USB-C hub with 4K HDMI, RJ45 Ethernet, SD/TF card reader, USB-A ports and PD charging." }'

new = old + ''',
    { name: "Screen Storage Rack", brand: "Generic", model: "Computer and TV Screen Storage Rack - Large 26x11.5cm", price: 1800, category: "mount", color: "#1f2937", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/rack-1.jpeg"], size: "26x11.5cm", desc: "Large storage rack that sits on top of monitors or TVs to hold wireless routers, set-top boxes and small devices." }'''

c = c.replace(old, new)

# Add filter button for Mounts & Stands
c = c.replace(
    '<button class="filter-btn" data-filter="hub">USB Hubs</button>',
    '<button class="filter-btn" data-filter="hub">USB Hubs</button>\n    <button class="filter-btn" data-filter="mount">Mounts & Stands</button>'
)

# Add size label for mount category
c = c.replace(
    "'hub': '&#128268; USB Hub'",
    "'hub': '&#128268; USB Hub',\n      'mount': '&#128208; Mount & Stand'"
)

# Add product specs
old_specs = '"USB-C Hub 8-in-1": ["Type: 8-in-1 USB-C multi-port hub/adapter", "Ports: HDMI (4K@30Hz), RJ45 Gigabit Ethernet, SD card slot, microSD/TF card slot, 2x USB-A 3.0, 2x USB-C (1x PD charging, 1x data)", "HDMI Output: Supports 4K resolution at 30Hz for external displays/monitors", "Ethernet: RJ45 port for wired Gigabit Ethernet network connection", "Card Readers: SD and microSD/TF slots for simultaneous card access", "USB-A: Two USB 3.0 ports (blue) for peripherals and data transfer", "USB-C PD: Power Delivery pass-through charging for laptop while using the hub", "Build: Dark gray/black metal body with USB-C cable attached", "Ideal for laptops with limited ports - expand connectivity for work, presentations and data transfer"]'

new_specs = old_specs + ''',
    "Screen Storage Rack": ["Type: Computer/TV screen top storage rack (wireless router & set-top box holder)", "Size: Large - 26 x 11.5 cm", "Material: Black textured surface (carbon-fiber look) with raised back lip and two front support legs", "Design: Sits on top of computer monitors or TVs to free up desk space", "Use: Holds wireless routers, set-top boxes, streaming devices, small speakers and other lightweight electronics", "Installation: No tools required - simply rests on top of screen; non-slip legs keep it stable", "Color: Black", "Max Load: Designed for lightweight electronic devices", "Perfect for organizing clutter around monitors and TVs"]'''

c = c.replace(old_specs, new_specs)

with open('/home/z/my-project/download/index.html', 'w') as f:
    f.write(c)

print('done')
