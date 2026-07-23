#!/bin/bash
OUTDIR="/home/z/my-project/scripts/img_results"
mkdir -p "$OUTDIR"

search_one() {
  local query="$1"
  local outfile="$2"
  echo "Searching: $query"
  z-ai image-search -q "$query" -c 3 --no-rank --gl us -o "$outfile" 2>/dev/null
  if [ $? -eq 0 ]; then
    local count=$(python3 -c "import json; d=json.load(open('$outfile')); print(len(d.get('results',[])))")
    echo "  -> $count images found"
  else
    echo "  -> FAILED (rate limit?)"
  fi
  sleep 15
}

search_one "Klipxtreme KNS-215 NeoActive laptop sleeve 15.6 inch" "$OUTDIR/KNS-215.json"
search_one "Klipxtreme KNB-650BK XpandPack expandable backpack" "$OUTDIR/KNB-650BK.json"
search_one "Targus TSB89104US sport 15.6 laptop backpack black" "$OUTDIR/TAS-119.json"
search_one "Targus Intellect Essential 15.6 laptop backpack black" "$OUTDIR/TAS-217.json"
search_one "HP Prelude Pro 15.6 laptop backpack gray" "$OUTDIR/HP-PP15.json"
search_one "HP Renew Business 15.6 laptop bag eco" "$OUTDIR/HP-RB15.json"
search_one "Dell Pro Slim 15 inch briefcase laptop bag" "$OUTDIR/DL-PS15.json"
search_one "Dell Eco Loop Essential 15.6 laptop backpack" "$OUTDIR/DL-EL15.json"

echo ""
echo "=== ALL SEARCHES COMPLETE ==="
echo ""
for f in "$OUTDIR"/KNS-215.json "$OUTDIR"/KNB-650BK.json "$OUTDIR"/TAS-119.json "$OUTDIR"/TAS-217.json "$OUTDIR"/HP-PP15.json "$OUTDIR"/HP-RB15.json "$OUTDIR"/DL-PS15.json "$OUTDIR"/DL-EL15.json; do
  echo "=== $(basename $f) ==="
  python3 -c "import json; d=json.load(open('$f')); print(f'success={d.get(\"success\")}, count={len(d.get(\"results\",[]))}'); [print('  '+r['original_url']) for r in d.get('results',[])]"
done