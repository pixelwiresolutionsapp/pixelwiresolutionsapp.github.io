#!/usr/bin/env python3
"""Update index.html: convert img: 'url' to imgs: ['url1','url2',...] for all 24 products."""
import json, re

# Load final image mapping
with open('/home/z/my-project/scripts/final_images.json') as f:
    final_images = json.load(f)

# Read the HTML file
with open('/home/z/my-project/download/index.html', 'r') as f:
    html = f.read()

# For each product, find the line and replace img: with imgs:
for model, imgs in final_images.items():
    # Build the imgs array string
    if len(imgs) == 1:
        # Single image - keep as img: (no change needed)
        continue
    
    imgs_str = json.dumps(imgs, ensure_ascii=False)
    
    # Find the pattern: model: "XXX", ... img: "...", in the products array
    # We need to find the specific product line containing the model and replace img:
    
    # Pattern: find the product object containing this model
    # Each product is on one line like:
    # { name: "...", brand: "...", model: "KNS-214BL", ..., img: "https://...", ... },
    
    # Find the product line by model
    pattern = r'(\{[^}]*model: "' + re.escape(model) + r'"[^}]*?)img: "([^"]+)"([^}]*\})'
    
    def replace_img(match):
        before = match.group(1)
        img_url = match.group(2)
        after = match.group(3)
        return before + 'imgs: ' + json.dumps(imgs, ensure_ascii=False) + after
    
    new_html = re.sub(pattern, replace_img, html, flags=re.DOTALL)
    
    if new_html != html:
        html = new_html
        print(f'  Updated {model}: {len(imgs)} images')
    else:
        print(f'  WARNING: Could not find {model} in HTML')

# Write back
with open('/home/z/my-project/download/index.html', 'w') as f:
    f.write(html)

print(f'\nDone! HTML updated.')

# Verify
with open('/home/z/my-project/download/index.html', 'r') as f:
    html = f.read()

img_count = html.count('img: "')
imgs_count = html.count('imgs: [')
print(f'Products with img: (single): {img_count}')
print(f'Products with imgs: (multi): {imgs_count}')
print(f'Total: {img_count + imgs_count} (should be 24)')
