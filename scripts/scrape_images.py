#!/usr/bin/env python3
"""Scrape product images from Klipxtreme, Targus, HP, Dell pages."""
import json, re, subprocess, os, time

S3 = "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/"

# All Klipxtreme models from our products array
KLIPXTREME_MODELS = [
    ("KNS-214BL", "sleeve"),
    ("KNS-215", "sleeve"),
    ("KNS-420", "sleeve"),
    ("KNS-330", "sleeve"),
    ("KNC-041", "case"),
    ("KNC-025", "case"),
    ("KNB-406GR", "backpack"),
    ("KNB-416", "backpack"),
    ("KNB-577", "backpack"),
    ("KNB-582", "backpack"),
    ("KNB-426BL", "backpack"),
    ("KNB-456", "backpack"),
    ("KNB-895", "backpack"),
    ("KNB-467KH", "backpack"),
    ("KNB-650BK", "backpack"),
    ("KLB-461", "handbag"),
    ("KNB-583", "backpack"),
    ("KNB-468", "backpack"),
]

# Targus, HP, Dell models
OTHER_MODELS = [
    ("TAS-119", "Targus", "Sport Backpack"),
    ("TAS-217", "Targus", "Intellect Essential Backpack"),
    ("HP-PP15", "HP", "Prelude Pro Laptop Backpack"),
    ("HP-RB15", "HP", "Renew Business Laptop Bag"),
    ("DL-PS15", "Dell", "Pro Slim Briefcase"),
    ("DL-EL15", "Dell", "Eco Loop Essential Backpack"),
]

def scrape_klipxtreme_page(model):
    """Scrape a Klipxtreme product page and extract image URLs."""
    url = f"https://www.klipxtreme.com/st-products/internal/{model}"
    outpath = f"/home/z/my-project/scripts/kx_{model}.json"
    try:
        result = subprocess.run(
            ["z-ai", "function", "-n", "page_reader", "-a", json.dumps({"url": url}), "-o", outpath],
            capture_output=True, text=True, timeout=60
        )
        if result.returncode != 0:
            print(f"  FAIL scrape {model}: {result.stderr[:100]}")
            return []
        
        with open(outpath) as f:
            data = json.load(f)
        html = data.get("data", {}).get("html", "")
        
        # Extract all image URLs from S3
        imgs = re.findall(r'src=["\']([^"\'>]+\.(?:jpg|jpeg|png|webp))["\']', html, re.I)
        
        # Filter to product-relevant images (exclude icons, banners, logos)
        product_imgs = []
        for img in imgs:
            fname = os.path.basename(img).lower()
            # Skip icons, logos, banners, warranty, specs, dimensions
            if any(skip in fname for skip in ['icon-', 'logo', 'banner', 'warranty', 'specifications', 'dimensions', 'additional-information', 'max-load', 'screen-size', 'zippered', 'organizer', 'premium']):
                continue
            # Include main product shots, detail photos, lifestyle photos, renders
            if any(keep in img for keep in [S3]):
                product_imgs.append(img)
        
        # Deduplicate while preserving order
        seen = set()
        unique = []
        for img in product_imgs:
            # Normalize URL (remove trailing slashes, etc.)
            norm = img.split('?')[0]
            if norm not in seen:
                seen.add(norm)
                unique.append(img)
        
        return unique[:6]  # Max 6 images per product
    except Exception as e:
        print(f"  ERROR {model}: {e}")
        return []

def search_other_brand(brand, model, name):
    """Search for Targus/HP/Dell product images via web search + page reader."""
    try:
        # Search for the product page
        query = f"{brand} {model} {name}"
        result = subprocess.run(
            ["z-ai", "function", "-n", "web_search", "-a", json.dumps({"query": query, "num": 3})],
            capture_output=True, text=True, timeout=30
        )
        if result.returncode != 0:
            return []
        
        results = json.loads(result.stdout)
        imgs_found = []
        
        for r in results[:2]:  # Check top 2 results
            page_url = r.get("url", "")
            if not page_url:
                continue
            try:
                outpath = f"/home/z/my-project/scripts/other_{model}.json"
                pr = subprocess.run(
                    ["z-ai", "function", "-n", "page_reader", "-a", json.dumps({"url": page_url}), "-o", outpath],
                    capture_output=True, text=True, timeout=60
                )
                if pr.returncode != 0:
                    continue
                
                with open(outpath) as f:
                    data = json.load(f)
                html = data.get("data", {}).get("html", "")
                
                all_imgs = re.findall(r'src=["\']([^"\'>]+\.(?:jpg|jpeg|png|webp))["\']', html, re.I)
                
                # Filter: must be reasonably sized product images
                for img in all_imgs:
                    fname = os.path.basename(img).lower()
                    # Skip tiny icons, logos, UI elements
                    if any(skip in fname for skip in ['icon', 'logo', 'banner', 'sprite', 'pixel', '1x1', 'blank', 'placeholder', 'favicon', 'avatar']):
                        continue
                    if len(img) > 30:  # Reasonable URL length
                        imgs_found.append(img)
                
                if len(imgs_found) >= 3:
                    break
            except:
                continue
        
        # Deduplicate
        seen = set()
        unique = []
        for img in imgs_found:
            norm = img.split('?')[0]
            if norm not in seen:
                seen.add(norm)
                unique.append(img)
        
        return unique[:4]
    except Exception as e:
        print(f"  ERROR {model}: {e}")
        return []

# Main execution
all_images = {}

print("=== Scraping Klipxtreme product pages ===")
for model, cat in KLIPXTREME_MODELS:
    print(f"Scraping {model}...", end=" ", flush=True)
    imgs = scrape_klipxtreme_page(model)
    print(f"found {len(imgs)} images")
    all_images[model] = imgs
    time.sleep(0.5)  # Rate limiting

print("\n=== Searching Targus/HP/Dell products ===")
for model, brand, name in OTHER_MODELS:
    print(f"Searching {brand} {model}...", end=" ", flush=True)
    imgs = search_other_brand(brand, model, name)
    print(f"found {len(imgs)} images")
    all_images[model] = imgs
    time.sleep(1)

# Save results
with open("/home/z/my-project/scripts/all_product_images.json", "w") as f:
    json.dump(all_images, f, indent=2)

print(f"\n=== Done! Images saved to all_product_images.json ===")
print(f"Total models with images: {sum(1 for v in all_images.values() if v)}/{len(all_images)}")
