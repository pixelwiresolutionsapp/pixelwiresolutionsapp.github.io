import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── Categories ───
const categories = [
  { name: 'Laptop Sleeves', slug: 'sleeve', icon: '🛡️', color: '#3b82f6', sortOrder: 0 },
  { name: 'Laptop Cases', slug: 'case', icon: '💼', color: '#d4a574', sortOrder: 1 },
  { name: 'Backpacks', slug: 'backpack', icon: '🎒', color: '#111827', sortOrder: 2 },
  { name: 'Handbags', slug: 'handbag', icon: '👜', color: '#7f1d1d', sortOrder: 3 },
  { name: 'Mice', slug: 'mouse', icon: '🖱️', color: '#111827', sortOrder: 4 },
  { name: 'Cameras', slug: 'camera', icon: '📷', color: '#1e40af', sortOrder: 5 },
  { name: 'Scanners', slug: 'scanner', icon: '📡', color: '#0f172a', sortOrder: 6 },
  { name: 'Tools', slug: 'tool', icon: '🔧', color: '#ea580c', sortOrder: 7 },
  { name: 'Automotive', slug: 'auto', icon: '🚗', color: '#15803d', sortOrder: 8 },
  { name: 'Hubs & Adapters', slug: 'hub', icon: '🔌', color: '#475569', sortOrder: 9 },
  { name: 'Mounts & Stands', slug: 'mount', icon: '🖥️', color: '#374151', sortOrder: 10 },
  { name: 'Printers', slug: 'printer', icon: '🖨️', color: '#1d4ed8', sortOrder: 11 },
  { name: 'Networking', slug: 'network', icon: '📶', color: '#7c3aed', sortOrder: 12 },
]

// ─── Brands ───
const brands = [
  { name: 'Klipxtreme', slug: 'klipxtreme' },
  { name: 'Targus', slug: 'targus' },
  { name: 'HP', slug: 'hp' },
  { name: 'Dell', slug: 'dell' },
  { name: 'HOMEFISH', slug: 'homefish' },
  { name: 'EZVIZ', slug: 'ezviz' },
  { name: 'Generic', slug: 'generic' },
  { name: 'ANENG', slug: 'aneng' },
  { name: 'XINHANGXIN', slug: 'xinhangxin' },
  { name: 'Bisoffice', slug: 'bisoffice' },
  { name: 'GLAABIT', slug: 'glaabit' },
  { name: 'Kebidumei', slug: 'kebidumei' },
]

// ─── Products (all 38 from the static site) ───
const products = [
  {
    name: 'Colours Reversible Laptop Sleeve', brand: 'Klipxtreme', model: 'KNS-214BL', price: 2431.91,
    category: 'sleeve', color: '#3b82f6', size: '14.1"',
    desc: 'Reversible 2-in-1 design sleeve with red zipper pulls.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-214BL-land.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-214BL-detalle-01.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-214BL-detalle-02.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-214BL-detalle-03.jpg',
    ],
  },
  {
    name: 'NeoActive Laptop Sleeve', brand: 'Klipxtreme', model: 'KNS-215', price: 3364.44,
    category: 'sleeve', color: '#374151', size: '15.6"',
    desc: 'Textured surface with enhanced shock absorption.',
    imgs: ['https://store.domainnetworks.ca/cdn/shop/files/51410.jpg'],
  },
  {
    name: 'SquarePro Laptop Sleeve', brand: 'Klipxtreme', model: 'KNS-420', price: 3839.85,
    category: 'sleeve', color: '#111827', size: '15.6"',
    desc: 'Minimalist rectangular design with smooth finish.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-landing-y-detalle-KNS-420-ppal.png',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-landing-y-detalle-KNS-420-GR.png',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-detalle-KNS-420-1.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-detalle-KNS-420-3.jpg',
    ],
  },
  {
    name: 'NeoShield Laptop Sleeve', brand: 'Klipxtreme', model: 'KNS-330', price: 5607.40,
    category: 'sleeve', color: '#4b5563', size: '15.6"',
    desc: 'Heavy-duty sleeve with reinforced corners and textured padding.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-330-land.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-330-detalle-03.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-330-detalle-01.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-330-detalle-04.jpg',
    ],
  },
  {
    name: 'Classic Go 15.6" Notebook Case', brand: 'Klipxtreme', model: 'KNC-041', price: 4626.11,
    category: 'case', color: '#d4a574', size: '15.6"',
    desc: 'Messenger bag style with buckle closures and shoulder strap.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-041_landing.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-041-detalle-1.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-041-detalle-2.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-041-detalle-3.jpg',
    ],
  },
  {
    name: 'Classic Essential 15.6" Laptop Case', brand: 'Klipxtreme', model: 'KNC-025', price: 4571.25,
    category: 'case', color: '#4b5563', size: '15.6"',
    desc: 'Slim profile briefcase with front organizer pocket.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-025-land.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-025-detalle-01.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-025-detalle-02.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-025-detalle-03.jpg',
    ],
  },
  {
    name: 'Grey Backpack Berna', brand: 'Klipxtreme', model: 'KNB-406GR', price: 5607.40,
    category: 'backpack', color: '#9ca3af', size: '15.6"',
    desc: 'Light grey backpack with padded shoulder straps.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/Fotos-landing-KNB-406GR.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/Fotos-detalle-KNB-406-1.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/Fotos-detalle-KNB-406-2.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/Fotos-detalle-KNB-406-3.jpg',
    ],
  },
  {
    name: 'Indigo Backpack', brand: 'Klipxtreme', model: 'KNB-416', price: 5973.10,
    category: 'backpack', color: '#3730a3', size: '15.6"',
    desc: 'Navy blue classic backpack with multiple compartments.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-416GR-landing.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-416-detalle-01.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-416-detalle-02.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-416-detalle-03.jpg',
    ],
  },
  {
    name: 'Stendal Backpack', brand: 'Klipxtreme', model: 'KNB-577', price: 5973.10,
    category: 'backpack', color: '#111827', size: '15.6"',
    desc: 'Sleek black design with matching accessory pouch.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-577BK-landing.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-577-detalle-1.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-577-detalle-2.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-577-detalle-3.jpg',
    ],
  },
  {
    name: 'Emblem Backpack', brand: 'Klipxtreme', model: 'KNB-582', price: 5973.10,
    category: 'backpack', color: '#1f2937', size: '15.6"',
    desc: 'Geometric diamond-patterned fabric, modern stylish design.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-582_land.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-582_dt_01.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-582_dt_02.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-582_dt_03.jpg',
    ],
  },
  {
    name: 'Monaco Backpack', brand: 'Klipxtreme', model: 'KNB-426BL', price: 6448.51,
    category: 'backpack', color: '#2563eb', size: '15.6"',
    desc: 'Casual everyday backpack with multiple zippered compartments.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-landing_Azul.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/Foto-banner-principalKNB-426(0).png',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-landing-y-detalle_01(1).jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-landing-y-detalle_02(1).jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-landing-y-detalle_03(1).jpg',
    ],
  },
  {
    name: 'Sport Backpack', brand: 'Targus', model: 'TAS-119', price: 6704.50,
    category: 'backpack', color: '#111827', size: '15.6"',
    desc: 'Athletic sporty design with breathable mesh backing.',
    imgs: [
      'https://us.targus.com/cdn/shop/files/TSB89104_MAIN1.jpg',
      'https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB89104US_Lifestyle_1_1.jpg',
      'https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB89104US_Lifestyle6_1.jpg',
      'https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB89104US_Lifestyle7_1_2.jpg',
    ],
  },
  {
    name: 'Octave III Backpack', brand: 'Targus', model: 'TBB65313GL', price: 6500,
    category: 'backpack', color: '#e5e7eb', size: '15-16"',
    desc: 'Targus Octave III 15-16 inch backpack in Papyrus/off-white - 22L capacity with padded laptop pocket, organizer & reflective accents.',
    imgs: [
      'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/62a0aac1d95a.jpg',
      'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/43c4f64cbbd3.jpg',
      'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1e38f157fa1f.jpg',
      'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5f3e4aa8ccbc.jpg',
    ],
  },
  {
    name: 'Aberdeen Backpack', brand: 'Klipxtreme', model: 'KNB-456', price: 6869.07,
    category: 'backpack', color: '#111827', size: '15.6"',
    desc: 'Structured business-casual backpack with accessory case.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-456BK.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-detalle-KNB-456-1(1).jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-detalle-KNB-456-2(1).jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-detalle-KNB-456-3(0).jpg',
    ],
  },
  {
    name: 'Bizman Backpack', brand: 'Klipxtreme', model: 'KNB-895', price: 7009.25,
    category: 'backpack', color: '#111827', size: '15.6"',
    desc: 'Professional executive style with extensive organization.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-895-banner-landing.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-895-banner-detalle-1.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-895-banner-detalle-2.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-895-banner-detalle-3.jpg',
    ],
  },
  {
    name: 'Intellect Essential Backpack', brand: 'Targus', model: 'TAS-217', price: 7009.25,
    category: 'backpack', color: '#111827', size: '15.6"',
    desc: 'Business-oriented design with clean lines.',
    imgs: [
      'https://us.targus.com/cdn/shop/files/TSB966GL-92_FRONT.jpg',
      'https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB966GL-92_MAIN2.jpg',
      'https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB966GL-92_BACK.jpg',
      'https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB966GL_PREMIUM_CAPACITY.jpg',
    ],
  },
  {
    name: 'Prelude Pro Laptop Backpack', brand: 'HP', model: 'HP-PP15', price: 7923.50,
    category: 'backpack', color: '#6b7280', size: '15.6"',
    desc: 'Modern minimalist design with sleek profile.',
    imgs: ['https://hp.widen.net/content/1xs4ybd3x4/webp/1xs4ybd3x4.png'],
  },
  {
    name: 'Khaki Bari Backpack', brand: 'Klipxtreme', model: 'KNB-467KH', price: 7710.18,
    category: 'backpack', color: '#a68a64', size: '15.6"',
    desc: 'Earth-tone casual outdoor backpack with accessory pouch.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-467-landing-detalle-RD-1.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-467-detalle-KH-2.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-467-detalle-KH-3.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-467-detalle-KH-4.jpg',
    ],
  },
  {
    name: 'XpandPack Backpack', brand: 'Klipxtreme', model: 'KNB-650BK', price: 7710.18,
    category: 'backpack', color: '#111827', size: '15.6"',
    desc: 'Expandable design with zippers to increase capacity.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-650BK_LAND.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-650BK-banner-top.png',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-650BK_DET_01.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-650BK_DET_02.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-650BK_DET_03.jpg',
    ],
  },
  {
    name: 'Capri Ladies Laptop Handbag', brand: 'Klipxtreme', model: 'KLB-461', price: 7710.18,
    category: 'handbag', color: '#7f1d1d', size: '15.6"',
    desc: 'Feminine tote/handbag with dual handles and matching clutch.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KLB-461GR-Landing.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KLB-461BG_Detalles_02(0).jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KLB-461BG_Detalles_03(0).jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KLB-461BG_Detalles_04(0).jpg',
    ],
  },
  {
    name: 'Pioneer Backpack', brand: 'Klipxtreme', model: 'KNB-583', price: 7301.81,
    category: 'backpack', color: '#111827', size: '15.6"',
    desc: 'Rugged durable design with multiple external pockets.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-583_land.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-583_det_01.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-583_det_02.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-583_det_03.jpg',
    ],
  },
  {
    name: 'Toscana Backpack', brand: 'Klipxtreme', model: 'KNB-468', price: 8533,
    category: 'backpack', color: '#92400e', size: '15.6"',
    desc: 'Premium leather-like finish, vintage-inspired design.',
    imgs: [
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-468-detalle-BL-1.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-468-detalle-BL-2.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-468-detalle-BL-3.jpg',
      'https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-468-detalle-BL-4.jpg',
    ],
  },
  {
    name: 'Renew Business 15.6" Laptop Bag', brand: 'HP', model: 'HP-RB15', price: 9630.10,
    category: 'case', color: '#d1d5db', size: '15.6"',
    desc: 'Eco-friendly construction using sustainable materials.',
    imgs: ['https://hp.widen.net/content/duud3on3mi/webp/duud3on3mi.png'],
  },
  {
    name: 'Pro Slim Briefcase', brand: 'Dell', model: 'DL-PS15', price: 9672.77,
    category: 'case', color: '#111827', size: '15"',
    desc: 'Ultra-slim professional briefcase with minimal bulk.',
    imgs: [
      'https://www.lambda-tek.com/componentshop/images/imgB49114594.jpg',
      'https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/5eb22808f531cd9b98e64cbc16462835/original.jpg',
      'https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/d50501730b93820f23f4e91f3d8b3ecf/original.jpg',
      'https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/d566328d967d690c98f06453d88964bc/original.jpg',
      'https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/f3a1cdec5bf8bb30c60728f0595c4a94/width(1200).jpg',
    ],
  },
  {
    name: 'Vertical Ergonomic Mouse', brand: 'HOMEFISH', model: 'HOMEFISH Vertical Mouse', price: 3500,
    category: 'mouse', color: '#111827', size: 'N/A',
    desc: 'Ergonomic vertical wireless optical mouse with 3 adjustable DPI levels (800/1200/1600).',
    imgs: [
      'https://pixelwiresolutionsapp.github.io/download/images/mouse-1.jpg',
      'https://pixelwiresolutionsapp.github.io/download/images/mouse-2.jpg',
      'https://pixelwiresolutionsapp.github.io/download/images/mouse-3.jpg',
    ],
  },
  {
    name: 'C8c Lite Kit 4MP', brand: 'EZVIZ', model: 'EZVIZ C8c Lite Kit 4MP', price: 25990,
    category: 'camera', color: '#1e40af', size: 'N/A',
    desc: '4MP indoor/outdoor surveillance camera kit with color night vision and pan & tilt.',
    imgs: [
      'https://pixelwiresolutionsapp.github.io/download/images/cam-1.png',
      'https://pixelwiresolutionsapp.github.io/download/images/cam-2.png',
      'https://pixelwiresolutionsapp.github.io/download/images/cam-3.png',
    ],
  },
  {
    name: '2D Barcode Scanner X11', brand: 'Generic', model: 'X11-Black', price: 7800,
    category: 'scanner', color: '#0f172a', size: 'N/A',
    desc: 'Desktop omnidirectional 2D barcode scanner - reads 1D, 2D, QR, Data Matrix & PDF417 codes automatically.',
    imgs: [
      'https://pixelwiresolutionsapp.github.io/download/images/scanner-1.jpg',
      'https://pixelwiresolutionsapp.github.io/download/images/scanner-2.jpg',
      'https://pixelwiresolutionsapp.github.io/download/images/scanner-3.jpg',
      'https://pixelwiresolutionsapp.github.io/download/images/scanner-4.jpg',
      'https://pixelwiresolutionsapp.github.io/download/images/scanner-5.jpg',
      'https://pixelwiresolutionsapp.github.io/download/images/scanner-6.jpg',
      'https://pixelwiresolutionsapp.github.io/download/images/scanner-7.jpg',
    ],
  },
  {
    name: 'Non-Contact Voltage Tester Pen B15', brand: 'ANENG', model: 'ANENG B15', price: 3980,
    category: 'tool', color: '#ea580c', size: 'N/A',
    desc: 'Non-contact induction voltage tester pen (24V~250V AC) with dual LED indicators and built-in flashlight.',
    imgs: [
      'https://pixelwiresolutionsapp.github.io/download/images/volt-1.jpg',
      'https://pixelwiresolutionsapp.github.io/download/images/volt-2.jpg',
    ],
  },
  {
    name: 'Intelligent Pulse Repair Charger', brand: 'XINHANGXIN', model: 'XINHANGXIN Pulse Charger', price: 9500,
    category: 'tool', color: '#1e293b', size: 'N/A',
    desc: '12V/24V automatic smart battery charger with pulse repair mode - revives sulfated car, truck & motorcycle batteries.',
    imgs: [
      'https://pixelwiresolutionsapp.github.io/download/images/charger-3.jpg',
      'https://pixelwiresolutionsapp.github.io/download/images/charger-2.jpg',
      'https://pixelwiresolutionsapp.github.io/download/images/charger-1.jpg',
    ],
  },
  {
    name: '10PCS Precision Pick and Hook Set', brand: 'Generic', model: '10PCS Pick & Hook Set', price: 3800,
    category: 'auto', color: '#15803d', size: 'N/A',
    desc: '10-piece precision pick & hook set for removing oil seals, O-rings, gaskets & cotter pins in automotive work.',
    imgs: ['https://pixelwiresolutionsapp.github.io/download/images/pick-1.jpg'],
  },
  {
    name: 'Eco Loop Essential Backpack', brand: 'Dell', model: 'DL-EL15', price: 9740,
    category: 'backpack', color: '#111827', size: '15.6"',
    desc: 'Environmentally friendly with Eco Loop materials.',
    imgs: [
      'https://i5.walmartimages.com/seo/Dell-Backpack-14-16-Black_73e72394-17f6-4138-a95d-21141480471f.d5dbc49cb95fc3f27e7f8c8c99e1693c.jpeg',
      'https://i5.walmartimages.com/asr/2f629e66-82b4-4f6e-bf14-e68f94c40704.fbea6b3ab08c92257dedeeed035bd407.jpeg',
      'https://i5.walmartimages.com/asr/65e3fb23-570b-4fb7-b271-23d89fc37236.37d34e1dd25c7467ee28d7b720668e71.jpeg',
      'https://i5.walmartimages.com/asr/1617167f-31f2-47f9-8d5c-2878592dc0a7.3cf54ce390b8f150814faacd94d44fce.jpeg',
    ],
  },
  {
    name: 'USB-C Hub 8-in-1', brand: 'Generic', model: 'USB C Hub 8in1', price: 5000,
    category: 'hub', color: '#475569', size: 'N/A',
    desc: '8-in-1 USB-C hub with 4K HDMI, RJ45 Ethernet, SD/TF card reader, USB-A ports and PD charging.',
    imgs: [
      'https://pixelwiresolutionsapp.github.io/download/images/usb-hub-1.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/usb-hub-2.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/usb-hub-3.jpeg',
    ],
  },
  {
    name: 'Screen Storage Rack', brand: 'Generic', model: 'Screen Storage Rack Large', price: 1800,
    category: 'mount', color: '#1f2937', size: '26x11.5cm',
    desc: 'Large storage rack that sits on top of monitors or TVs to hold wireless routers, set-top boxes and small devices.',
    imgs: ['https://pixelwiresolutionsapp.github.io/download/images/rack-1.jpeg'],
  },
  {
    name: 'Foldable Tablet Stand', brand: 'Generic', model: 'Foldable Tablet & Phone Stand', price: 2800,
    category: 'mount', color: '#374151', size: 'N/A',
    desc: 'Universal foldable desktop stand for tablets and phones - adjustable multi-angle with articulated hinges.',
    imgs: [
      'https://pixelwiresolutionsapp.github.io/download/images/stand-1.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/stand-2.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/stand-3.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/stand-4.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/stand-5.jpeg',
    ],
  },
  {
    name: 'USB 3.0 Gigabit Ethernet Adapter', brand: 'GLAABIT', model: 'GLAABIT USB 3.0 Ethernet', price: 2500,
    category: 'hub', color: '#1e293b', size: 'N/A',
    desc: 'USB 3.0 Gigabit Ethernet LAN adapter - plug into any USB port for wired network connectivity up to 1000Mbps.',
    imgs: [
      'https://pixelwiresolutionsapp.github.io/download/images/ethernet-1.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/ethernet-2.jpeg',
    ],
  },
  {
    name: 'Laptop Stand', brand: 'Generic', model: 'Folding Laptop Stand', price: 3500,
    category: 'mount', color: '#374151', size: 'N/A',
    desc: 'X-shaped folding laptop stand with ventilation slots - elevates laptop for better airflow and ergonomic typing angle.',
    imgs: [
      'https://pixelwiresolutionsapp.github.io/download/images/laptop-stand-1.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/laptop-stand-2.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/laptop-stand-3.jpeg',
    ],
  },
  {
    name: 'Portable Mini Thermal Printer', brand: 'Bisoffice', model: 'Bisoffice Thermal Printer 58mm', price: 8000,
    category: 'printer', color: '#1d4ed8', size: '58mm (2 inch)',
    desc: 'Portable mini thermal receipt printer - prints receipts, tickets, labels and bills via USB and wireless connection.',
    imgs: [
      'https://pixelwiresolutionsapp.github.io/download/images/printer-1.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/printer-2.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/printer-3.jpeg',
    ],
  },
  {
    name: 'WiFi Range Extender', brand: 'Kebidumei', model: 'Kebidumei WiFi Repeater', price: 5500,
    category: 'network', color: '#7c3aed', size: 'N/A',
    desc: 'Dual-band WiFi range extender/repeater with 4 antennas - extends wireless coverage up to 1200Mbps on 5GHz and 300Mbps on 2.4GHz.',
    imgs: [
      'https://pixelwiresolutionsapp.github.io/download/images/wifi-ext-1.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/wifi-ext-2.jpeg',
      'https://pixelwiresolutionsapp.github.io/download/images/wifi-ext-3.jpeg',
    ],
  },
]

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function seed() {
  console.log('🌱 Seeding database...')

  // Seed categories
  console.log('Creating categories...')
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    })
  }
  console.log(`✅ ${categories.length} categories`)

  // Seed brands
  console.log('Creating brands...')
  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    })
  }
  console.log(`✅ ${brands.length} brands`)

  // Seed products
  console.log('Creating products...')
  const catMap = await prisma.category.findMany()
  const brandMap = await prisma.brand.findMany()

  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    const cat = catMap.find(c => c.slug === p.category)!
    const brand = brandMap.find(b => b.slug === slugify(p.brand))!
    const slug = slugify(p.name)

    const product = await prisma.product.upsert({
      where: { slug },
      update: {
        name: p.name,
        model: p.model,
        price: p.price,
        description: p.desc,
        size: p.size,
        color: p.color,
        categoryId: cat.id,
        brandId: brand.id,
        sortOrder: i,
      },
      create: {
        name: p.name,
        slug,
        model: p.model,
        price: p.price,
        description: p.desc,
        size: p.size,
        color: p.color,
        categoryId: cat.id,
        brandId: brand.id,
        sortOrder: i,
      },
    })

    // Seed images
    await prisma.productImage.deleteMany({ where: { productId: product.id } })
    for (let j = 0; j < p.imgs.length; j++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: p.imgs[j],
          alt: p.name,
          sortOrder: j,
          isPrimary: j === 0,
        },
      })
    }
  }
  console.log(`✅ ${products.length} products with images`)

  // Seed site settings
  const settings = [
    { key: 'site_name', value: 'PixelWire Solutions' },
    { key: 'whatsapp_number', value: '18765551234' },
    { key: 'currency', value: 'JMD' },
    { key: 'delivery_kgn_cost', value: '1500' },
    { key: 'delivery_parish_cost', value: '3000' },
  ]
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    })
  }
  console.log(`✅ ${settings.length} site settings`)

  console.log('🎉 Seed complete!')
}

seed()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
