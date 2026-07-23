#!/bin/bash
# Batch 2: Products 9-16 (Klipxtreme backpacks + Targus)
OUTDIR="/home/z/my-project/scripts/img_results"
mkdir -p "$OUTDIR"

# Product 9: KNB-577 Stendal Backpack
z-ai image-search -q "Klipxtreme KNB-577 Stendal backpack black" -c 3 --no-rank --gl us -o "$OUTDIR/KNB-577.json" &

# Product 10: KNB-582 Emblem Backpack
z-ai image-search -q "Klipxtreme KNB-582 Emblem backpack" -c 3 --no-rank --gl us -o "$OUTDIR/KNB-582.json" &

# Product 11: KNB-426BL Monaco Backpack
z-ai image-search -q "Klipxtreme KNB-426BL Monaco backpack blue" -c 3 --no-rank --gl us -o "$OUTDIR/KNB-426BL.json" &

# Product 12: TAS-119 Targus Sport Backpack
z-ai image-search -q "Targus TAS-119 sport laptop backpack" -c 3 --no-rank --gl us -o "$OUTDIR/TAS-119.json" &

# Product 13: KNB-456 Aberdeen Backpack
z-ai image-search -q "Klipxtreme KNB-456 Aberdeen backpack" -c 3 --no-rank --gl us -o "$OUTDIR/KNB-456.json" &

# Product 14: KNB-895 Bizman Backpack
z-ai image-search -q "Klipxtreme KNB-895 Bizman backpack" -c 3 --no-rank --gl us -o "$OUTDIR/KNB-895.json" &

# Product 15: TAS-217 Targus Intellect Essential
z-ai image-search -q "Targus TAS-217 Intellect Essential backpack" -c 3 --no-rank --gl us -o "$OUTDIR/TAS-217.json" &

# Product 16: HP-PP15 Prelude Pro Laptop Backpack
z-ai image-search -q "HP Prelude Pro laptop backpack 15.6" -c 3 --no-rank --gl us -o "$OUTDIR/HP-PP15.json" &

wait
echo "Batch 2 complete"
for f in "$OUTDIR"/KNB-577.json "$OUTDIR"/KNB-582.json "$OUTDIR"/KNB-426BL.json "$OUTDIR"/TAS-119.json "$OUTDIR"/KNB-456.json "$OUTDIR"/KNB-895.json "$OUTDIR"/TAS-217.json "$OUTDIR"/HP-PP15.json; do
  echo "=== $(basename $f) ==="
  python3 -c "import json; d=json.load(open('$f')); print(f'success={d.get(\"success\")}, count={d.get(\"count\",0)}'); [print(r['original_url']) for r in d.get('results',[])]"
done