#!/usr/bin/env python3
import json, re, sys

with open(sys.argv[1]) as f:
    data = json.load(f)
html = data.get('data',{}).get('html','')

# Find all image URLs
imgs = re.findall(r'https?://[a-z0-9.-]+/[^"\s<>]+\.(?:jpg|jpeg|png|webp)', html, re.I)

# Deduplicate
seen = set()
unique = []
for i in imgs:
    base = i.split('?')[0].split('#')[0]
    if base not in seen:
        seen.add(base)
        unique.append(i)

print(f'Total unique images: {len(unique)}')
for i in unique[:30]:
    print(f'  {i[:150]}')
