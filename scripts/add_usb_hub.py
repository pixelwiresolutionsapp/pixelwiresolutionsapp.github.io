import re

with open('/home/z/my-project/download/index.html', 'r') as f:
    c = f.read()

# Add the USB-C Hub product after the last product entry
old = "desc: \"Environmentally friendly with Eco Loop materials.\" }"
new = old + """,
    { name: "USB-C Hub 8-in-1", brand: "Generic", model: "USB C Hub 8in1 7in2 7in1 Type C 3.1 To 4K HDMI Adapter with RJ45 SD/TF Card Reader PD", price: 3500, category: "hub", color: "#475569", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/usb-hub-1.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/usb-hub-2.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/usb-hub-3.jpeg"], size: "N/A", desc: "8-in-1 USB-C hub with 4K HDMI, RJ45 Ethernet, SD/TF card reader, USB-A ports and PD charging." }"""

c = c.replace(old, new)

# Add filter button for Hubs
c = c.replace(
    '<button class="filter-btn" data-filter="auto">Car Auto</button>',
    '<button class="filter-btn" data-filter="auto">Car Auto</button>\n    <button class="filter-btn" data-filter="hub">USB Hubs</button>'
)

# Add size label for hub category
c = c.replace(
    "'auto': '&#128663; Car Auto Tool'",
    "'auto': '&#128663; Car Auto Tool',\n      'hub': '&#128268; USB Hub'"
)

# Add product specs for the hub
old_specs = """"10PCS Precision Pick and Hook Set": ["Type: 10-piece precision pick and hook tool set (automotive hand tools)", "Pieces: 10 picks/hooks with varying tip configurations for different jobs", "Tip Variations: Straight sharp pick, 90-degree angled hooks, curved picks, round hooks, complex double-bend hooks, complex angle hooks", "Handles: Ergonomic two-tone handles - black rubberized grip with green accents; textured finger grooves for non-slip use", "Shaft Material: Black-finished hardened metal (typically chrome vanadium steel)", "Protection: Several picks include clear plastic protective caps for safe storage", "Primary Use: Removing oil seals, O-rings, gaskets, cotter pins and accessing small internal components", "Applications: Engines, transmissions, machinery, electrical connectors, stubborn clips and fasteners", "Compact design for precision work in tight spaces; ideal for mechanics and DIYers"]"""

new_specs = old_specs + """,
    "USB-C Hub 8-in-1": ["Type: 8-in-1 USB-C multi-port hub/adapter", "Ports: HDMI (4K@30Hz), RJ45 Gigabit Ethernet, SD card slot, microSD/TF card slot, 2x USB-A 3.0, 2x USB-C (1x PD charging, 1x data)", "HDMI Output: Supports 4K resolution at 30Hz for external displays/monitors", "Ethernet: RJ45 port for wired Gigabit Ethernet network connection", "Card Readers: SD and microSD/TF slots for simultaneous card access", "USB-A: Two USB 3.0 ports (blue) for peripherals and data transfer", "USB-C PD: Power Delivery pass-through charging for laptop while using the hub", "Build: Dark gray/black metal body with USB-C cable attached", "Ideal for laptops with limited ports - expand connectivity for work, presentations and data transfer"]"""

c = c.replace(old_specs, new_specs)

with open('/home/z/my-project/download/index.html', 'w') as f:
    f.write(c)

print('done')
