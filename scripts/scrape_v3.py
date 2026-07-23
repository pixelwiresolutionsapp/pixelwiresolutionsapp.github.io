#!/usr/bin/env python3
"""Scrape product images - v3: fixed JSON parsing."""
import json, re, os, subprocess, time

S3 = "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/"

EXISTING = {
    "KNS-214BL": [S3+"KNS-214BL-land.jpg", S3+"KNS-214BL-detalle-01.jpg", S3+"KNS-214BL-detalle-02.jpg", S3+"KNS-214BL-detalle-03.jpg"],
    "KNS-330": [S3+"KNS-330-land.jpg", S3+"KNS-330-detalle-03.jpg", S3+"KNS-330-detalle-04.jpg", S3+"KNS-330-detalle-01.jpg"],
    "KNC-025": [S3+"KNC-025-land.jpg", S3+"KNC-025-detalle-01.jpg", S3+"KNC-025-detalle-02.jpg", S3+"KNC-025-detalle-03.jpg"],
    "KNB-416": [S3+"KNB-416GR-landing.jpg", S3+"KNB-416-detalle-01.jpg", S3+"KNB-416-detalle-02.jpg", S3+"KNB-416-detalle-03.jpg"],
    "KNB-456": [S3+"KNB-456BK.jpg", S3+"fotos-detalle-KNB-456-1(1).jpg", S3+"fotos-detalle-KNB-456-2(1).jpg", S3+"fotos-detalle-KNB-456-3(0).jpg"],
    "KLB-461": [S3+"KLB-461GR-Landing.jpg", S3+"KLB-461BG_Detalles_02(0).jpg", S3+"KLB-461BG_Detalles_03(0).jpg", S3+"KLB-461BG_Detalles_04(0).jpg"],
}

MISSING_KLIP = ["KNS-215", "KNS-420", "KNC-041", "KNB-406GR", "KNB-577", "KNB-582", "KNB-426BL", "KNB-895", "KNB-467KH", "KNB-650BK", "KNB-583", "KNB-468"]

OTHER = [
    ("TAS-119", "Targus Sport Backpack TAS-119 15.6"),
    ("TAS-217", "Targus Intellect Essential TAS-217 15.6"),
    ("HP-PP15", "HP Prelude Pro 15.6 laptop backpack"),
    ("HP-RB15", "HP Renew Business 15.6 laptop bag"),
    ("DL-PS15", "Dell Pro Slim Briefcase 15"),
    ("DL-EL15", "Dell Eco Loop Essential Backpack 15.6"),
]

SKIP_WORDS = ['icon', 'icono', 'logo', 'banner-top', 'banner-1', 'banner-2', 'banner-3', 'banner-4',
               'warranty', 'specification', 'dimension', 'additional-information', 'max-load',
               'screen-size', 'zippered', 'organizer', 'premium', 'cookie', 'close', 'strap',
               'carry_on', 'bolsillo', 'usb', 'sub-categoria', 'imgico']

def parse_search_stdout(raw):
    """Parse web_search stdout, extracting JSON array."""
    # Find the JSON array start
    idx = raw.find('[')
    if idx < 0:
        return []
    # Find matching closing bracket
    depth = 0
    end = idx
    for i in range(idx, len(raw)):
        if raw[i] == '[':
            depth += 1
        elif raw[i] == ']':
            depth -= 1
            if depth == 0:
                end = i + 1
                break
    try:
        return json.loads(raw[idx:end])
    except:
        return []

def web_search(query, num=5):
    """Run web search and return parsed results."""
    try:
        r = subprocess.run(
            ["z-ai", "function", "-n", "web_search",
             "-a", json.dumps({"query": query, "num": num})],
            capture_output=True, text=True, timeout=30
        )
        return parse_search_stdout(r.stdout)
    except:
        return []

def scrape_url(url, outname):
    """Scrape a URL and return HTML."""
    try:
        outpath = f"/home/z/my-project/scripts/{outname}.json"
        r = subprocess.run(
            ["z-ai", "function", "-n", "page_reader",
             "-a", json.dumps({"url": url}), "-o", outpath],
            capture_output=True, text=True, timeout=60
        )
        if r.returncode != 0:
            return ""
        with open(outpath) as f:
            data = json.load(f)
        return data.get("data", {}).get("html", "")
    except:
        return ""

def extract_klip_imgs(html):
    """Extract Klipxtreme product images from HTML."""
    imgs = re.findall(r'src=["\x27](https?://[^"\x27>]+\.(?:jpg|jpeg|png|webp))["\x27]', html, re.I)
    product_imgs = []
    for img in imgs:
        fname = os.path.basename(img).lower()
        if any(sw in fname for sw in SKIP_WORDS):
            continue
        if 'klip-xtreme' in img or 'klipxtreme' in img.lower():
            product_imgs.append(img.replace('http://', 'https://').split('?')[0].rstrip('/'))
    seen = set()
    unique = []
    for img in product_imgs:
        if img not in seen:
            seen.add(img)
            unique.append(img)
    return unique[:5]

def extract_generic_imgs(html):
    """Extract product images from any site."""
    imgs = re.findall(r'src=["\x27](https?://[^"\x27>]+\.(?:jpg|jpeg|png|webp))["\x27]', html, re.I)
    skip = ['icon', 'logo', 'banner', 'sprite', 'pixel', '1x1', 'blank', 'placeholder', 
            'favicon', 'avatar', 'cookie', 'tracking', 'analytics', 'facebook', 'google',
            'btn', 'button', 'arrow', 'close', 'star', 'rating', 'trust']
    product_imgs = []
    for img in imgs:
        fname = os.path.basename(img).lower()
        if any(s in fname for s in skip):
            continue
        if len(img) > 50:  # Reasonable product image URL
            product_imgs.append(img.split('?')[0].rstrip('/'))
    seen = set()
    unique = []
    for img in product_imgs:
        if img not in seen:
            seen.add(img)
            unique.append(img)
    return unique[:5]

# === MAIN ===
print("=== Phase 1: Klipxtreme products ===")
for model in MISSING_KLIP:
    print(f"  {model}...", end=" ", flush=True)
    
    # Search for the product
    results = web_search(f"Klipxtreme {model}")
    kx_url = None
    for r in results:
        url = r.get("url", "")
        if 'klipxtreme.com' in url and 'st-products' in url:
            kx_url = url
            break
    
    if not kx_url:
        # Try syndicated endpoint
        syn_url = f"https://www.klipxtreme.com/syndicated/?search={model}"
        html = scrape_url(syn_url, f"syn_{model}")
        if html:
            # Look for product page links
            links = re.findall(r'href=["\x27]([^"\x27>]*st-products[^"\x27>]+)["\x27]', html)
            for link in links:
                if model.upper() in link.upper():
                    kx_url = link if link.startswith('http') else f"https://www.klipxtreme.com{link}"
                    break
            if not kx_url and links:
                kx_url = links[0] if links[0].startswith('http') else f"https://www.klipxtreme.com{links[0]}"
    
    if kx_url:
        html = scrape_url(kx_url, f"kxv3_{model}")
        imgs = extract_klip_imgs(html) if html else []
        if imgs:
            EXISTING[model] = imgs
            print(f"FOUND {len(imgs)} images")
        else:
            print(f"page found but no product images")
    else:
        # Fallback: search external sites
        results2 = web_search(f'Klipxtreme {model} buy price')
        found = False
        for r in results2[:3]:
            url = r.get("url", "")
            if not url or 'klipxtreme.com' in url:
                continue
            html = scrape_url(url, f"ext_{model}")
            imgs = extract_generic_imgs(html) if html else []
            if imgs:
                EXISTING[model] = imgs
                print(f"FOUND {len(imgs)} images (external)")
                found = True
                break
        if not found:
            print("no images found")
    time.sleep(0.3)

print("\n=== Phase 2: Targus/HP/Dell products ===")
for model, search_name in OTHER:
    print(f"  {model}...", end=" ", flush=True)
    results = web_search(search_name)
    found = False
    for r in results[:4]:
        url = r.get("url", "")
        if not url:
            continue
        html = scrape_url(url, f"brand_{model}")
        imgs = extract_generic_imgs(html) if html else []
        if imgs:
            EXISTING[model] = imgs
            print(f"FOUND {len(imgs)} images")
            found = True
            break
        time.sleep(0.3)
    if not found:
        print("no images found")
    time.sleep(0.3)

# Save
with open("/home/z/my-project/scripts/all_product_images.json", "w") as f:
    json.dump(EXISTING, f, indent=2)

print(f"\n=== FINAL: {len(EXISTING)}/24 models ===")
for model, imgs in sorted(EXISTING.items()):
 print(f"  {model}: {len(imgs)} images")

all_models = ["KNS-214BL","KNS-215","KNS-420","KNS-330","KNC-041","KNC-025",
    "KNB-406GR","KNB-416","KNB-577","KNB-582","KNB-426BL","KNB-456","KNB-895",
    "KNB-467KH","KNB-650BK","KLB-461","KNB-583","KNB-468",
    "TAS-119","TAS-217","HP-PP15","HP-RB15","DL-PS15","DL-EL15"]
missing = [m for m in all_models if m not in EXISTING]
if missing:
    print(f"\nStill missing: {missing}")
