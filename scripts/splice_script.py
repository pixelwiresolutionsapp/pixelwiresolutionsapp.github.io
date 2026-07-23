#!/usr/bin/env python3
"""Replace the <script>...</script> block in index.html with new_script.js"""

with open('/home/z/my-project/download/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('/home/z/my-project/scripts/new_script.js', 'r', encoding='utf-8') as f:
    new_js = f.read()

# Find <script> and </script> positions
start = html.index('  <script>')
end = html.index('</script>', start) + len('</script>')

# Replace: keep <script> tag + new content + </script>
new_html = html[:start] + '  <script>\n' + new_js + '\n  </script>' + html[end:]

with open('/home/z/my-project/download/index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print(f"Done! Old size: {len(html)}, New size: {len(new_html)}")

# Verify no broken JSON in onclick
import re
onclicks = re.findall(r'onclick="([^"]+)"', new_html)
for oc in onclicks:
    if 'JSON' in oc or '&quot;' in oc or '&amp;' in oc:
        print(f"WARNING: Found old pattern in onclick: {oc[:80]}")
    if 'openModal(' in oc and 'openModalByIndex' not in oc:
        print(f"WARNING: Found old openModal call: {oc[:80]}")

print("Verification complete.")
