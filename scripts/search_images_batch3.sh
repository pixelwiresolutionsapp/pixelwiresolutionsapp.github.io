#!/bin/bash
# Batch 3: Products 17-24 (Klipxtreme handbag + premium + HP + Dell)
OUTDIR="/home/z/my-project/scripts/img_results"
mkdir -p "$OUTDIR"

# Product 17: KNB-467KH Khaki Bari Backpack
z-ai image-search -q "Klipxtreme KNB-467KH khaki Bari backpack" -c 3 --no-rank --gl us -o "$OUTDIR/KNB-467KH.json" &

# Product 18: KNB-650BK XpandPack Backpack
z-ai image-search -q "Klipxtreme KNB-650BK XpandPack expandable backpack" -c 3 --no-rank --gl us -o "$OUTDIR/KNB-650BK.json" &

# Product 19: KLB-461 Capri Ladies Laptop Handbag
z-ai image-search -q "Klipxtreme KLB-461 Capri ladies laptop handbag" -c 3 --no-rank --gl us -o "$OUTDIR/KLB-461.json" &

# Product 20: KNB-583 Pioneer Backpack
z-ai image-search -q "Klipxtreme KNB-583 Pioneer backpack" -c 3 --no-rank --gl us -o "$OUTDIR/KNB-583.json" &

# Product 21: KNB-468 Toscana Backpack
z-ai image-search -q "Klipxtreme KNB-468 Toscana leather backpack" -c 3 --no-rank --gl us -o "$OUTDIR/KNB-468.json" &

# Product 22: HP-RB15 Renew Business Laptop Bag
z-ai image-search -q "HP Renew Business 15.6 laptop bag RB15" -c 3 --no-rank --gl us -o "$OUTDIR/HP-RB15.json" &

# Product 23: DL-PS15 Dell Pro Slim Briefcase
z-ai image-search -q "Dell Pro Slim 15 briefcase laptop bag" -c 3 --no-rank --gl us -o "$OUTDIR/DL-PS15.json" &

# Product 24: DL-EL15 Dell Eco Loop Essential Backpack
z-ai image-search -q "Dell Eco Loop Essential 15.6 laptop backpack" -c 3 --no-rank --gl us -o "$OUTDIR/DL-EL15.json" &

wait
echo "Batch 3 complete"
for f in "$OUTDIR"/KNB-467KH.json "$OUTDIR"/KNB-650BK.json "$OUTDIR"/KLB-461.json "$OUTDIR"/KNB-583.json "$OUTDIR"/KNB-468.json "$OUTDIR"/HP-RB15.json "$OUTDIR"/DL-PS15.json "$OUTDIR"/DL-EL15.json; do
  echo "=== $(basename $f) ==="
  python3 -c "import json; d=json.load(open('$f')); print(f'success={d.get(\"success\")}, count={d.get(\"count\",0)}'); [print(r['original_url']) for r in d.get('results',[])]"
done
