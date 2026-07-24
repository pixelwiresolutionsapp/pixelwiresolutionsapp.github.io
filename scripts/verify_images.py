#!/usr/bin/env python3
import re, urllib.request, urllib.error, sys

with open('/home/z/my-project/download/index.html','r') as f:
    content = f.read()

m = re.search(r'var products = \[(.*?)\];', content, re.DOTALL)
if not m:
    print('No products found')
    sys.exit(1)

prods_text = m.group(1)
entries = re.findall(r'\{[^}]+\}', prods_text)

for i, e in enumerate(entries):
    name_m = re.search(r'name: \"([^\"]+)\"', e)
    brand_m = re.search(r'brand: \"([^\"]+)\"', e)
    model_m = re.search(r'model: \"([^\"]+)\"', e)
    imgs_m = re.search(r'imgs: \[(.*?)\]', e)
    if not imgs_m or not model_m:
        continue
    imgs_text = imgs_m.group(1)
    urls = re.findall(r'(https?://[^\"]+)', imgs_text)
    name = name_m.group(1) if name_m else '?'
    brand = brand_m.group(1) if brand_m else '?'
    model = model_m.group(1)
    
    print(f'\n--- {i}: {brand} {model} - {name} ---')
    for j, url in enumerate(urls):
        is_chatglm = 'chatglm' in url
        is_s3 = 's3.amazonaws.com' in url
        tag = 'CHATGLM' if is_chatglm else 'S3' if is_s3 else 'EXT'
        try:
            req = urllib.request.Request(url, method='HEAD')
            req.add_header('User-Agent', 'Mozilla/5.0')
            resp = urllib.request.urlopen(req, timeout=8)
            ct = resp.headers.get('Content-Type','')
            sz = int(resp.headers.get('Content-Length',0))
            print(f'  [{j}] OK {sz:>8}B {tag} {url[-70:]}')
        except Exception as ex:
            print(f'  [{j}] FAIL {tag} {url[-70:]} | {str(ex)[:50]}')
