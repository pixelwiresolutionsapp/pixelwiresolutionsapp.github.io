#!/bin/bash
BASE="https://klip-xtreme-frontend.s3.amazonaws.com/media/img"

declare -A MODELS
MODELS[KNS-215]="KNS-215-land.jpg KNS-215_landing.jpg KNS-215_land.jpg KNS-215.jpg KNS-215-01.jpg"
MODELS[KNS-420]="fotos-landing-y-detalle-KNS-420-ppal.png fotos-landing-y-detalle-KNS-420-GR.png fotos-detalle-KNS-420-1.jpg fotos-detalle-KNS-420-3.jpg KNS-420-land.jpg"
MODELS[KNB-406GR]="Fotos-landing-KNB-406GR.jpg Fotos-detalle-KNB-406-1.jpg Fotos-detalle-KNB-406-2.jpg Fotos-detalle-KNB-406-3.jpg KNB-406GR-land.jpg"
MODELS[KNB-577]="KNB-577BK-landing.jpg KNB-577-detalle-1.jpg KNB-577-detalle-2.jpg KNB-577-detalle-3.jpg KNB-577-land.jpg"
MODELS[KNB-582]="knb-582_land.jpg knb-582_dt_01.jpg knb-582_dt_02.jpg knb-582_dt_03.jpg KNB-582-land.jpg"
MODELS[KNB-456]="KNB-456BK.jpg fotos-detalle-KNB-456-1(1).jpg fotos-detalle-KNB-456-2(1).jpg fotos-detalle-KNB-456-3(0).jpg"
MODELS[KNB-895]="KNB-895-banner-landing.jpg KNB-895-banner-detalle-1.jpg KNB-895-banner-detalle-2.jpg KNB-895-banner-detalle-3.jpg"
MODELS[KNB-467KH]="KNB-467-landing-detalle-RD-1.jpg KNB-467-detalle-KH-2.jpg KNB-467-detalle-KH-3.jpg KNB-467-detalle-KH-4.jpg"
MODELS[KNB-650BK]="KNB-650BK_LAND.jpg KNB-650BK-banner-top.png KNB-650BK_DET_01.jpg KNB-650BK_DET_02.jpg KNB-650BK_DET_03.jpg"
MODELS[KNB-583]="knb-583_land.jpg knb-583_det_01.jpg knb-583_det_02.jpg knb-583_det_03.jpg"
MODELS[KNB-468]="KNB-468-detalle-BL-1.jpg KNB-468-detalle-BL-2.jpg KNB-468-detalle-BL-3.jpg KNB-468-detalle-BL-4.jpg KNB-468-land.jpg"
MODELS[KLB-461]="KLB-461GR-Landing.jpg KLB-461BG_Detalles_02(0).jpg KLB-461BG_Detalles_03(0).jpg KLB-461BG_Detalles_04(0).jpg"
MODELS[KNB-426BL]="fotos-landing_Azul.jpg Foto-banner-principalKNB-426(0).png fotos-landing-y-detalle_01(1).jpg fotos-landing-y-detalle_02(1).jpg fotos-landing-y-detalle_03(1).jpg"

for model in "${!MODELS[@]}"; do
  for file in ${MODELS[$model]}; do
    url="${BASE}/${file}"
    code=$(curl -s -o /dev/null -w '%{http_code}' "$url" --max-time 10)
    if [ "$code" = "200" ]; then
      echo "OK [$model] $url"
    fi
  done
done

# Verify existing URLs already in the HTML
echo "=== VERIFYING EXISTING ==="
EXISTING=(
"KNS-214BL:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-214BL-land.jpg"
"KNS-214BL:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-214BL-detalle-01.jpg"
"KNS-214BL:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-214BL-detalle-02.jpg"
"KNS-214BL:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-214BL-detalle-03.jpg"
"KNS-330:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-330-land.jpg"
"KNS-330:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-330-detalle-03.jpg"
"KNS-330:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-330-detalle-01.jpg"
"KNS-330:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-330-detalle-04.jpg"
"KNC-041:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-041_landing.jpg"
"KNC-041:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-041-detalle-1.jpg"
"KNC-041:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-041-detalle-2.jpg"
"KNC-041:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-041-detalle-3.jpg"
"KNC-025:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-025-land.jpg"
"KNC-025:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-025-detalle-01.jpg"
"KNC-025:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-025-detalle-02.jpg"
"KNC-025:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-025-detalle-03.jpg"
"KNB-416:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-416GR-landing.jpg"
"KNB-416:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-416-detalle-01.jpg"
"KNB-416:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-416-detalle-02.jpg"
"KNB-416:https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-416-detalle-03.jpg"
"KNS-215:https://store.domainnetworks.ca/cdn/shop/files/51410.jpg"
"Targus-TAS119:https://us.targus.com/cdn/shop/files/TSB89104_MAIN1.jpg"
"Targus-TAS119:https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB89104US_Lifestyle_1_1.jpg"
"Targus-TAS119:https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB89104US_Lifestyle6_1.jpg"
"Targus-TAS119:https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB89104US_Lifestyle7_1_2.jpg"
"Targus-TAS217:https://us.targus.com/cdn/shop/files/TSB966GL-92_FRONT.jpg"
"Targus-TAS217:https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB966GL-92_MAIN2.jpg"
"Targus-TAS217:https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB966GL-92_BACK.jpg"
"Targus-TAS217:https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB966GL_PREMIUM_CAPACITY.jpg"
"HP-PP15:https://hp.widen.net/content/1xs4ybd3x4/webp/1xs4ybd3x4.png"
"HP-RB15:https://hp.widen.net/content/duud3on3mi/webp/duud3on3mi.png"
"Dell-PS15:https://www.lambda-tek.com/componentshop/images/imgB49114594.jpg"
"Dell-PS15:https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/5eb22808f531cd9b98e64cbc16462835/original.jpg"
"Dell-PS15:https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/d50501730b93820f23f4e91f3d8b3ecf/original.jpg"
"Dell-PS15:https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/d566328d967d690c98f06453d88964bc/original.jpg"
"Dell-PS15:https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/f3a1cdec5bf8bb30c60728f0595c4a94/width(1200).jpg"
"Dell-EL15:https://i5.walmartimages.com/seo/Dell-Backpack-14-16-Black_73e72394-17f6-4138-a95d-21141480471f.d5dbc49cb95fc3f27e7f8c8c99e1693c.jpeg"
"Dell-EL15:https://i5.walmartimages.com/asr/2f629e66-82b4-4f6e-bf14-e68f94c40704.fbea6b3ab08c92257dedeeed035bd407.jpeg"
"Dell-EL15:https://i5.walmartimages.com/asr/65e3fb23-570b-4fb7-b271-23d89fc37236.37d34e1dd25c7467ee28d7b720668e71.jpeg"
"Dell-EL15:https://i5.walmartimages.com/asr/1617167f-31f2-47f9-8d5c-2878592dc0a7.3cf54ce390b8f150814faacd94d44fce.jpeg"
)

for item in "${EXISTING[@]}"; do
  IFS=':' read -r model url <<< "$item"
  code=$(curl -s -o /dev/null -w '%{http_code}' "$url" --max-time 10 -L)
  if [ "$code" = "200" ]; then
    echo "OK [$model] $url"
  else
    echo "FAIL [$model] HTTP $code $url"
  fi
done

# Try additional patterns for KNS-215
echo "=== KNS-215 EXTRA ==="
for ext in jpg png jpeg; do
  for suffix in "" "-land" "_land" "-landing" "_landing" "-01" "-1" "-detalle-01" "-main" "-ppal"; do
    url="${BASE}/KNS-215${suffix}.${ext}"
    code=$(curl -s -o /dev/null -w '%{http_code}' "$url" --max-time 8)
    if [ "$code" = "200" ]; then
      echo "OK [KNS-215] $url"
    fi
  done
done
