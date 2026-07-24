#!/usr/bin/env python3
"""Replace the <script>...</script> block in index.html with new_script_v2.js content."""
import re

html_path = '/home/z/my-project/download/index.html'
js_path = '/home/z/my-project/scripts/new_script_v2.js'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

with open(js_path, 'r', encoding='utf-8') as f:
    new_js = f.read()

# Find and replace the script block
start_marker = '<script>'
end_marker = '</script>'

start_idx = html.index(start_marker)
end_idx = html.index(end_marker, start_idx) + len(end_marker)

old_block = html[start_idx:end_idx]
new_block = start_marker + '\n  ' + new_js + '\n  ' + end_marker

html = html[:start_idx] + new_block + html[end_idx:]

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f'Replaced script block ({len(old_block)} chars) with new block ({len(new_block)} chars)')

# Verify no chatglm images remain as first image
chatglm_first = re.findall(r'imgs: \["https://sfile\.chatglm', html)
if chatglm_first:
    print(f'WARNING: {len(chatglm_first)} products still have chatglm as first image!')
else:
    print('OK: No chatglm images as first in any product')

# Verify no old broken S3 URLs
broken_215 = 'KNS-215-land.jpg' in html
broken_650 = 'KNB-650BK-land.jpg' in html  # lowercase version
broken_bh = 'bhphotovideo.com/images/images500x500' in html
broken_prov = 'provantage.com/1080962725' in html
if broken_215:
    print('WARNING: Old KNS-215-land.jpg URL still present')
if broken_650:
    print('WARNING: Old KNB-650BK-land.jpg URL still present')
if broken_bh:
    print('WARNING: B&H hotlinked images still present')
if broken_prov:
    print('WARNING: Provantage hotlinked image still present')
if not any([broken_215, broken_650, broken_bh, broken_prov]):
    print('OK: No broken image URLs found')

# Verify delivery options still present
if 'selectDelivery' in html and 'round-town' in html and 'outside-kingston' in html:
    print('OK: Delivery options present')
else:
    print('WARNING: Delivery options missing!')

# Verify key functions exist
for fn in ['openModalByIndex', 'openLightboxByIndex', 'sendOrder', 'getOrderMsg']:
    if fn in html:
        print(f'OK: {fn}() present')
    else:
        print(f'WARNING: {fn}() MISSING!')
