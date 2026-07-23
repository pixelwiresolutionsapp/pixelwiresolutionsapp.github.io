#!/bin/bash
# Batch 1: Products 1-8 (Klipxtreme sleeves + cases)
OUTDIR="/home/z/my-project/scripts/img_results"
mkdir -p "$OUTDIR"

# Product 1: KNS-214BL Colours Reversible Laptop Sleeve
z-ai image-search -q "Klipxtreme KNS-214BL colours reversible laptop sleeve" -c 3 --no-rank --gl us -o "$OUTDIR/KNS-214BL.json" &

# Product 2: KNS-215 NeoActive Laptop Sleeve
z-ai image-search -q "Klipxtreme KNS-215 NeoActive laptop sleeve" -c 3 --no-rank --gl us -o "$OUTDIR/KNS-215.json" &

# Product 3: KNS-420 SquarePro Laptop Sleeve
z-ai image-search -q "Klipxtreme KNS-420 SquarePro laptop sleeve" -c 3 --no-rank --gl us -o "$OUTDIR/KNS-420.json" &

# Product 4: KNS-330 NeoShield Laptop Sleeve
z-ai image-search -q "Klipxtreme KNS-330 NeoShield laptop sleeve" -c 3 --no-rank --gl us -o "$OUTDIR/KNS-330.json" &

# Product 5: KNC-041 Classic Go Notebook Case
z-ai image-search -q "Klipxtreme KNC-041 classic go notebook case" -c 3 --no-rank --gl us -o "$OUTDIR/KNC-041.json" &

# Product 6: KNC-025 Classic Essential Laptop Case
z-ai image-search -q "Klipxtreme KNC-025 classic essential laptop case" -c 3 --no-rank --gl us -o "$OUTDIR/KNC-025.json" &

# Product 7: KNB-406GR Grey Backpack Berna
z-ai image-search -q "Klipxtreme KNB-406GR grey backpack Berna" -c 3 --no-rank --gl us -o "$OUTDIR/KNB-406GR.json" &

# Product 8: KNB-416 Indigo Backpack
z-ai image-search -q "Klipxtreme KNB-416 indigo backpack" -c 3 --no-rank --gl us -o "$OUTDIR/KNB-416.json" &

wait
echo "Batch 1 complete"
for f in "$OUTDIR"/KNS-214BL.json "$OUTDIR"/KNS-215.json "$OUTDIR"/KNS-420.json "$OUTDIR"/KNS-330.json "$OUTDIR"/KNC-041.json "$OUTDIR"/KNC-025.json "$OUTDIR"/KNB-406GR.json "$OUTDIR"/KNB-416.json; do
  echo "=== $(basename $f) ==="
  python3 -c "import json; d=json.load(open('$f')); print(f'success={d.get(\"success\")}, count={d.get(\"count\",0)}'); [print(r['original_url']) for r in d.get('results',[])]"
done
