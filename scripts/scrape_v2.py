#!/usr/bin/env python3
"""Scrape product images - v2: search for full URLs, then scrape."""
import json, re, os, subprocess, time

S3 = "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/"

# Already have images from earlier scrape
EXISTING = {
    "KNS-214BL": [S3+"KNS-214BL-land.jpg", S3+"KNS-214BL-detalle-01.jpg", S3+"KNS-214BL-detalle-02.jpg", S3+"KNS-214BL-detalle-03.jpg"],
    "KNS-330": [S3+"KNS-330-land.jpg", S3+"KNS-330-detalle-03.jpg", S3+"KNS-330-detalle-04.jpg", S3+"KNS-330-detalle-01.jpg"],
    "KNC-025": [S3+"KNC-025-land.jpg", S3+"KNC-025-detalle-01.jpg", S3+"KNC-025-detalle-02.jpg", S3+"KNC-025-detalle-03.jpg"],
    "KNB-416": [S3+"KNB-416GR-landing.jpg", S3+"KNB-416-detalle-01.jpg", S3+"KNB-416-detalle-02.jpg", S3+"KNB-416-detalle-03.jpg"],
    "KNB-456": [S3+"KNB-456BK.jpg", S3+"fotos-detalle-KNB-456-1(1).jpg", S3+"fotos-detalle-KNB-456-2(1).jpg", S3+"fotos-detalle-KNB-456-3(0).jpg"],
    "KLB-461": [S3+"KLB-461GR-Landing.jpg", S3+"KLB-461BG_Detalles_02(0).jpg", S3+"KLB-461BG_Detalles_03(0).jpg", S3+"KLB-461BG_Detalles_04(0).jpg"],
}

# Missing Klipxtreme models
MISSING_KLIP = ["KNS-215", "KNS-420", "KNC-041", "KNB-406GR", "KNB-577", "KNB-582", "KNB-426BL", "KNB-895", "KNB-467KH", "KNB-650BK", "KNB-583", "KNB-468"]

OTHER = [
    ("TAS-119", "Targus Sport Backpack 15.6"),
    ("TAS-217", "Targus Intellect Essential 15.6"),
    ("HP-PP15", "HP Prelude Pro 15.6 backpack"),
    ("HP-RB15", "HP Renew Business 15.6 laptop bag"),
    ("DL-PS15", "Dell Pro Slim 15 briefcase"),
    ("DL-EL15", "Dell Eco Loop Essential 15.6 backpack"),
]

SKIP_WORDS = ['icon', 'icono', 'logo', 'banner-top', 'banner-1', 'banner-2', 'banner-3', 'banner-4',
               'warranty', 'specification', 'dimension', 'additional-information', 'max-load',
               'screen-size', 'zippered', 'organizer', 'premium', 'cookie', 'close', 'strap',
               'carry_on', 'bolsillo', 'usb']

def extract_product_imgs(html):
    """Extract product images from HTML, filtering out icons/banners."""
    imgs = re.findall(r'src=["\x27](https?://[^"\x27>]+\.(?:jpg|jpeg|png|webp))["\x27]', html, re.I)
    product_imgs = []
    for img in imgs:
        fname = os.path.basename(img).lower()
        if any(sw in fname for sw in SKIP_WORDS):
            continue
        if 'klip-xtreme' in img or 'klipxtreme' in img.lower():
            product_imgs.append(img)
    # Deduplicate
    seen = set()
    unique = []
    for img in product_imgs:
        norm = img.replace('http://', 'https://').split('?')[0].rstrip('/')
        if norm not in seen:
            seen.add(norm)
            unique.append(norm)
    return unique[:5]

def search_klipxtreme_url(model):
    """Search for the full Klipxtreme product URL."""
    try:
        r = subprocess.run(
            ["z-ai", "function", "-n", "web_search",
             "-a", json.dumps({"query": f"site:klipxtreme.com {model}", "num": 3})],
            capture_output=True, text=True, timeout=30
        )
        if r.returncode != 0:
            return None
        # Parse JSON from stdout (after emoji lines)
        lines = r.stdout.strip().split('\n')
        json_str = None
        for i, line in enumerate(lines):
            if line.strip().startswith('['):
                json_str = '\n'.join(lines[i:])
                break
        if not json_str:
            return None
        results = json.loads(json_str)
        for res in results:
            url = res.get("url", "")
            if model.upper() in url.upper() and 'st-products' in url:
                return url
        return results[0].get("url") if results else None
    except:
        return None

def scrape_url(url, model):
    """Scrape a URL and extract product images."""
    try:
        outpath = f"/home/z/my-project/scripts/scrape_{model}.json"
        r = subprocess.run(
            ["z-ai", "function", "-n", "page_reader",
             "-a", json.dumps({"url": url}), "-o", outpath],
            capture_output=True, text=True, timeout=60
        )
        if r.returncode != 0:
            return []
        with open(outpath) as f:
            data = json.load(f)
        html = data.get("data", {}).get("html", "")
        return extract_product_imgs(html)
    except:
        return []

def search_and_scrape_generic(query, model):
    """Search for product on any site, scrape for images."""
    try:
        r = subprocess.run(
            ["z-ai", "function", "-n", "web_search",
             "-a", json.dumps({"query": query, "num": 5})],
            capture_output=True, text=True, timeout=30
        )
        if r.returncode != 0:
            return []
        lines = r.stdout.strip().split('\n')
        json_str = None
        for i, line in enumerate(lines):
            if line.strip().startswith('['):
                json_str = '\n'.join(lines[i:])
                break
        if not json_str:
            return []
        results = json.loads(json_str)
        
        SKIP_DOMAIN = ['klipxtreme.com']
        all_imgs = []
        for res in results[:4]:
            url = res.get("url", "")
            if not url or any(d in url for d in SKIP_DOMAIN):
                continue
            imgs = scrape_url(url, model + "_ext")
            if imgs:
                all_imgs.extend(imgs)
            if len(all_imgs) >= 4:
                break
            time.sleep(0.5)
        
        seen = set()
        unique = []
        for img in all_imgs:
            norm = img.split('?')[0].rstrip('/')
            if norm not in seen:
                seen.add(norm)
                unique.append(img)
        return unique[:5]
    except Exception as e:
        print(f"    ERR: {e}")
        return []

# === MAIN ===
print("=== Phase 1: Klipxtreme products (search for full URLs) ===")
for model in MISSING_KLIP:
    print(f"  {model}...", end=" ", flush=True)
    # Try to find the full Klipxtreme URL
    kx_url = search_klipxtreme_url(model)
    if kx_url:
        print(f"(URL: {kx_url.split('/')[-1][:40]}...)", end=" ", flush=True)
        imgs = scrape_url(kx_url, model)
        if imgs:
            EXISTING[model] = imgs
            print(f"FOUND {len(imgs)} images")
        else:
            print("no product images on page")
    else:
        print("no Klipxtreme URL found")
    time.sleep(0.5)

print("\n=== Phase 2: Targus/HP/Dell products ===")
for model, search_name in OTHER:
    print(f"  {model} ({search_name})...", end=" ", flush=True)
    imgs = search_and_scrape_generic(search_name + " buy", model)
    if imgs:
        EXISTING[model] = imgs
        print(f"FOUND {len(imgs)} images")
    else:
        print("no images found")
    time.sleep(0.5)

# Save
with open("/home/z/my-project/scripts/all_product_images.json", "w") as f:
    json.dump(EXISTING, f, indent=2)

print(f"\n=== FINAL: {len(EXISTING)}/24 models have images ===")
for model, imgs in sorted(EXISTING.items()):
    print(f"  {model}: {len(imgs)} images")

missing = [m for m in ["KNS-214BL","KNS-215","KNS-420","KNS-330","KNC-041","KNC-025",
    "KNB-406GR","KNB-416","KNB-577","KNB-582","KNB-426BL","KNB-456","KNB-895",
    "KNB-467KH","KNB-650BK","KLB-461","KNB-583","KNB-468",
    "TAS-119","TAS-217","HP-PP15","HP-RB15","DL-PS15","DL-EL15"] if m not in EXISTING]
if missing:
    print(f"\nStill missing: {missing}")
