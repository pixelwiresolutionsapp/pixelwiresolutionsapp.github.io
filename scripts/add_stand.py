with open('/home/z/my-project/download/index.html', 'r') as f:
    c = f.read()

# Add product after Screen Storage Rack line
old = '{ name: "Screen Storage Rack", brand: "Generic", model: "Computer and TV Screen Storage Rack - Large 26x11.5cm", price: 1800, category: "mount", color: "#1f2937", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/rack-1.jpeg"], size: "26x11.5cm", desc: "Large storage rack that sits on top of monitors or TVs to hold wireless routers, set-top boxes and small devices." }'

new = old + ''',
    { name: "Foldable Tablet Stand", brand: "Generic", model: "Adjustable Foldable Tablet & Phone Stand", price: 2800, category: "mount", color: "#374151", imgs: ["https://pixelwiresolutionsapp.github.io/download/images/stand-1.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/stand-2.jpeg", "https://pixelwiresolutionsapp.github.io/download/images/stand-3.jpeg"], size: "N/A", desc: "Universal foldable desktop stand for tablets and phones - adjustable multi-angle with articulated hinges." }'''

c = c.replace(old, new)

# Add product specs
old_specs = '"Screen Storage Rack": ["Type: Computer/TV screen top storage rack (wireless router & set-top box holder)", "Size: Large - 26 x 11.5 cm", "Material: Black textured surface (carbon-fiber look) with raised back lip and two front support legs", "Design: Sits on top of computer monitors or TVs to free up desk space", "Use: Holds wireless routers, set-top boxes, streaming devices, small speakers and other lightweight electronics", "Installation: No tools required - simply rests on top of screen; non-slip legs keep it stable", "Color: Black", "Max Load: Designed for lightweight electronic devices", "Perfect for organizing clutter around monitors and TVs"]'

new_specs = old_specs + ''',
    "Foldable Tablet Stand": ["Type: Universal foldable desktop tablet and phone stand", "Design: Articulated/folding stand with multiple joints and circular hinge mechanism for angle adjustment", "Compatibility: Holds tablets (iPad and all sizes), phones and e-readers", "Angles: Multi-angle adjustable - find the perfect viewing angle for reading, typing, watching videos or video calls", "Material: Matte black plastic/metal construction; lightweight and portable", "Base: Two support legs forming a stable A-frame/triangular base", "Folding: Fully foldable/collapsible - folds flat for easy storage and portability", "Non-slip: Rubberized feet and pads keep devices secure without scratching", "Use: Desktop use for work, presentations, video calls, watching media and reading"]'''

c = c.replace(old_specs, new_specs)

with open('/home/z/my-project/download/index.html', 'w') as f:
    f.write(c)

print('done')
