#!/usr/bin/env python3
"""Extract product images from Amazon page scrape."""
import json, re, sys

with open(sys.argv[1]) as f:
    data = json.load(f)
html = data.get('data',{}).get('html','')

# Find Amazon product image URLs (pattern: /I/XXXXXXXXX._AC_...)
# Product image IDs are ~10-15 chars, alphanumeric with %
all_imgs = re.findall(r'(https://m\.media\.amazon\.com/images/I/[A-Za-z0-9%+]+)\.', html)

# Filter: must end with L (large), skip JS files, must have reasonable length
product_ids = set()
for img in all_imgs:
    img_id = img.split('/I/')[-1]
    # Skip JS, CSS, and tiny assets
    if any(skip in img_id for skip in ['javascript', '.js', '.css', '.png', 'sprite', 'nav-', 'gno/', 'omaha/']):
        continue
    # Product images typically have IDs 8-20 chars
    if 5 < len(img_id) < 25:
        product_ids.add(img_id)

# Build full image URLs
print(f'Found {len(product_ids)} unique product image IDs:')
for pid in sorted(product_ids)[:10]:
    url = f'https://m.media-amazon.com/images/I/{pid}._AC_SL1500_.jpg'
    print(f'  {url}')
