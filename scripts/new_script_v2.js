var products = [
    { name: "Colours Reversible Laptop Sleeve", brand: "Klipxtreme", model: "KNS-214BL", price: 2431.91, category: "sleeve", color: "#3b82f6", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-214BL-land.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-214BL-detalle-01.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-214BL-detalle-02.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-214BL-detalle-03.jpg"], size: '14.1\"', desc: "Reversible 2-in-1 design sleeve with red zipper pulls." },
    { name: "NeoActive Laptop Sleeve", brand: "Klipxtreme", model: "KNS-215", price: 3364.44, category: "sleeve", color: "#374151", imgs: ["https://store.domainnetworks.ca/cdn/shop/files/51410.jpg"], size: '15.6\"', desc: "Textured surface with enhanced shock absorption." },
    { name: "SquarePro Laptop Sleeve", brand: "Klipxtreme", model: "KNS-420", price: 3839.85, category: "sleeve", color: "#111827", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-landing-y-detalle-KNS-420-ppal.png", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-landing-y-detalle-KNS-420-GR.png", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-detalle-KNS-420-1.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-detalle-KNS-420-3.jpg"], size: '15.6\"', desc: "Minimalist rectangular design with smooth finish." },
    { name: "NeoShield Laptop Sleeve", brand: "Klipxtreme", model: "KNS-330", price: 5607.40, category: "sleeve", color: "#4b5563", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-330-land.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-330-detalle-03.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-330-detalle-01.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNS-330-detalle-04.jpg"], size: '15.6\"', desc: "Heavy-duty sleeve with reinforced corners and textured padding." },
    { name: "Classic Go 15.6\" Notebook Case", brand: "Klipxtreme", model: "KNC-041", price: 4626.11, category: "case", color: "#d4a574", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-041_landing.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-041-detalle-1.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-041-detalle-2.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-041-detalle-3.jpg"], size: '15.6\"', desc: "Messenger bag style with buckle closures and shoulder strap." },
    { name: "Classic Essential 15.6\" Laptop Case", brand: "Klipxtreme", model: "KNC-025", price: 4571.25, category: "case", color: "#4b5563", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-025-land.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-025-detalle-01.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-025-detalle-02.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNC-025-detalle-03.jpg"], size: '15.6\"', desc: "Slim profile briefcase with front organizer pocket." },
    { name: "Grey Backpack Berna", brand: "Klipxtreme", model: "KNB-406GR", price: 5607.40, category: "backpack", color: "#9ca3af", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/Fotos-landing-KNB-406GR.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/Fotos-detalle-KNB-406-1.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/Fotos-detalle-KNB-406-2.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/Fotos-detalle-KNB-406-3.jpg"], size: '15.6\"', desc: "Light grey backpack with padded shoulder straps." },
    { name: "Indigo Backpack", brand: "Klipxtreme", model: "KNB-416", price: 5973.10, category: "backpack", color: "#3730a3", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-416GR-landing.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-416-detalle-01.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-416-detalle-02.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-416-detalle-03.jpg"], size: '15.6\"', desc: "Navy blue classic backpack with multiple compartments." },
    { name: "Stendal Backpack", brand: "Klipxtreme", model: "KNB-577", price: 5973.10, category: "backpack", color: "#111827", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-577BK-landing.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-577-detalle-1.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-577-detalle-2.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-577-detalle-3.jpg"], size: '15.6\"', desc: "Sleek black design with matching accessory pouch." },
    { name: "Emblem Backpack", brand: "Klipxtreme", model: "KNB-582", price: 5973.10, category: "backpack", color: "#1f2937", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-582_land.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-582_dt_01.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-582_dt_02.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-582_dt_03.jpg"], size: '15.6\"', desc: "Geometric diamond-patterned fabric, modern stylish design." },
    { name: "Monaco Backpack", brand: "Klipxtreme", model: "KNB-426BL", price: 6448.51, category: "backpack", color: "#2563eb", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-landing_Azul.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/Foto-banner-principalKNB-426(0).png", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-landing-y-detalle_01(1).jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-landing-y-detalle_02(1).jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-landing-y-detalle_03(1).jpg"], size: '15.6\"', desc: "Casual everyday backpack with multiple zippered compartments." },
    { name: "Sport Backpack", brand: "Targus", model: "TAS-119", price: 6704.50, category: "backpack", color: "#111827", imgs: ["https://us.targus.com/cdn/shop/files/TSB89104_MAIN1.jpg", "https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB89104US_Lifestyle_1_1.jpg", "https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB89104US_Lifestyle6_1.jpg", "https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB89104US_Lifestyle7_1_2.jpg"], size: '15.6\"', desc: "Athletic sporty design with breathable mesh backing." },
    { name: "Aberdeen Backpack", brand: "Klipxtreme", model: "KNB-456", price: 6869.07, category: "backpack", color: "#111827", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-456BK.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-detalle-KNB-456-1(1).jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-detalle-KNB-456-2(1).jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/fotos-detalle-KNB-456-3(0).jpg"], size: '15.6\"', desc: "Structured business-casual backpack with accessory case." },
    { name: "Bizman Backpack", brand: "Klipxtreme", model: "KNB-895", price: 7009.25, category: "backpack", color: "#111827", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-895-banner-landing.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-895-banner-detalle-1.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-895-banner-detalle-2.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-895-banner-detalle-3.jpg"], size: '15.6\"', desc: "Professional executive style with extensive organization." },
    { name: "Intellect Essential Backpack", brand: "Targus", model: "TAS-217", price: 7009.25, category: "backpack", color: "#111827", imgs: ["https://us.targus.com/cdn/shop/files/TSB966GL-92_FRONT.jpg", "https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB966GL-92_MAIN2.jpg", "https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB966GL-92_BACK.jpg", "https://cdn.shopify.com/s/files/1/0121/0014/1114/files/TSB966GL_PREMIUM_CAPACITY.jpg"], size: '15.6\"', desc: "Business-oriented design with clean lines." },
    { name: "Prelude Pro Laptop Backpack", brand: "HP", model: "HP-PP15", price: 7923.50, category: "backpack", color: "#6b7280", imgs: ["https://hp.widen.net/content/1xs4ybd3x4/webp/1xs4ybd3x4.png"], size: '15.6\"', desc: "Modern minimalist design with sleek profile." },
    { name: "Khaki Bari Backpack", brand: "Klipxtreme", model: "KNB-467KH", price: 7710.18, category: "backpack", color: "#a68a64", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-467-landing-detalle-RD-1.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-467-detalle-KH-2.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-467-detalle-KH-3.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-467-detalle-KH-4.jpg"], size: '15.6\"', desc: "Earth-tone casual outdoor backpack with accessory pouch." },
    { name: "XpandPack Backpack", brand: "Klipxtreme", model: "KNB-650BK", price: 7710.18, category: "backpack", color: "#111827", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-650BK_LAND.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-650BK-banner-top.png", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-650BK_DET_01.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-650BK_DET_02.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-650BK_DET_03.jpg"], size: '15.6\"', desc: "Expandable design with zippers to increase capacity." },
    { name: "Capri Ladies Laptop Handbag", brand: "Klipxtreme", model: "KLB-461", price: 7710.18, category: "handbag", color: "#7f1d1d", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KLB-461GR-Landing.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KLB-461BG_Detalles_02(0).jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KLB-461BG_Detalles_03(0).jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KLB-461BG_Detalles_04(0).jpg"], size: '15.6\"', desc: "Feminine tote/handbag with dual handles and matching clutch." },
    { name: "Pioneer Backpack", brand: "Klipxtreme", model: "KNB-583", price: 7301.81, category: "backpack", color: "#111827", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-583_land.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-583_det_01.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-583_det_02.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/knb-583_det_03.jpg"], size: '15.6\"', desc: "Rugged durable design with multiple external pockets." },
    { name: "Toscana Backpack", brand: "Klipxtreme", model: "KNB-468", price: 8533.00, category: "backpack", color: "#92400e", imgs: ["https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-468-detalle-BL-1.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-468-detalle-BL-2.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-468-detalle-BL-3.jpg", "https://klip-xtreme-frontend.s3.amazonaws.com/media/img/KNB-468-detalle-BL-4.jpg"], size: '15.6\"', desc: "Premium leather-like finish, vintage-inspired design." },
    { name: "Renew Business 15.6\" Laptop Bag", brand: "HP", model: "HP-RB15", price: 9630.10, category: "case", color: "#d1d5db", imgs: ["https://hp.widen.net/content/duud3on3mi/webp/duud3on3mi.png"], size: '15.6\"', desc: "Eco-friendly construction using sustainable materials." },
    { name: "Pro Slim Briefcase", brand: "Dell", model: "DL-PS15", price: 9672.77, category: "case", color: "#111827", imgs: ["https://www.lambda-tek.com/componentshop/images/imgB49114594.jpg", "https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/5eb22808f531cd9b98e64cbc16462835/original.jpg", "https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/d50501730b93820f23f4e91f3d8b3ecf/original.jpg", "https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/d566328d967d690c98f06453d88964bc/original.jpg", "https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/f3a1cdec5bf8bb30c60728f0595c4a94/width(1200).jpg"], size: '15\"', desc: "Ultra-slim professional briefcase with minimal bulk." },
    { name: "Eco Loop Essential Backpack", brand: "Dell", model: "DL-EL15", price: 9740.00, category: "backpack", color: "#111827", imgs: ["https://i5.walmartimages.com/seo/Dell-Backpack-14-16-Black_73e72394-17f6-4138-a95d-21141480471f.d5dbc49cb95fc3f27e7f8c8c99e1693c.jpeg", "https://i5.walmartimages.com/asr/2f629e66-82b4-4f6e-bf14-e68f94c40704.fbea6b3ab08c92257dedeeed035bd407.jpeg", "https://i5.walmartimages.com/asr/65e3fb23-570b-4fb7-b271-23d89fc37236.37d34e1dd25c7467ee28d7b720668e71.jpeg", "https://i5.walmartimages.com/asr/1617167f-31f2-47f9-8d5c-2878592dc0a7.3cf54ce390b8f150814faacd94d44fce.jpeg"], size: '15.6\"', desc: "Environmentally friendly with Eco Loop materials." }
  ];

  var productIndices = [];
  var selectedDelivery = "pickup";
  var selectedDeliveryCost = 0;
  var selectedPhone = "18767731193";
  var selectedChannel = "whatsapp";
  var currentProduct = null;
  var currentProductIndex = -1;
  var lastViewedIndex = 0;
  var lbProduct = null;
  var lbProductIndex = -1;
  var lbIndex = 0;
  var lbImages = [];
  var touchStartX = 0;
  var touchEndX = 0;

  function escAttr(s) {
    return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  function renderCards(filter) {
    filter = filter || "all";
    var grid = document.getElementById("productGrid");
    var filtered = filter === "all" ? products : products.filter(function(p) { return p.category === filter; });
    productIndices = [];
    for (var fi = 0; fi < filtered.length; fi++) {
      for (var pi = 0; pi < products.length; pi++) {
        if (products[pi] === filtered[fi]) { productIndices.push(pi); break; }
      }
    }
    var html = "";
    for (var i = 0; i < filtered.length; i++) {
      var p = filtered[i];
      var idx = productIndices[i];
      var imgs = Array.isArray(p.imgs) ? p.imgs : [p.img || ""];
      var safeName = escAttr(p.name);
      var safeBrand = escAttr(p.brand);
      var safeModel = escAttr(p.model);
      var safeDesc = escAttr(p.desc);
      var priceStr = "$" + p.price.toLocaleString("en-JM", {minimumFractionDigits:2});
      html += '<div class="card">';
      html += '<div class="card-img" style="background: linear-gradient(135deg, ' + p.color + '22, ' + p.color + '44); cursor:pointer;" onclick="openLightboxByIndex(' + idx + ')">';
      html += '<span class="brand-tag">' + safeBrand + '</span>';
      html += '<img src="' + escAttr(imgs[0]) + '" alt="' + safeName + '" loading="lazy" onerror="this.style.display=\'none\'" />';
      if (imgs.length > 1) {
        html += '<span class="photo-count" onclick="event.stopPropagation(); openLightboxByIndex(' + idx + ')">' + imgs.length + ' Photos</span>';
      }
      html += '<span class="price-tag">' + priceStr + '</span>';
      html += '</div>';
      html += '<div class="card-body">';
      html += '<span class="model">' + safeModel + '</span>';
      html += '<h3>' + safeName + '</h3>';
      html += '<p class="desc">' + safeDesc + '</p>';
      html += '<span class="size-info">💻 Fits ' + escAttr(p.size) + ' Laptop</span>';
      html += '<button class="buy-btn" onclick="event.stopPropagation(); openModalByIndex(' + idx + ')">';
      html += '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.768-6.262-2.064l-.438-.332-2.639.885.885-2.639-.332-.438A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>';
      html += ' Order via WhatsApp</button>';
      html += '</div></div>';
    }
    grid.innerHTML = html;
  }

  function openModalByIndex(idx) {
    var p = products[idx];
    if (!p) return;
    currentProduct = p;
    currentProductIndex = idx;
    lastViewedIndex = idx;
    document.getElementById("modalProduct").textContent = p.brand + " \u2014 " + p.name;
    document.getElementById("modalPrice").textContent = "$" + p.price.toLocaleString("en-JM", {minimumFractionDigits:2}) + " JMD";
    document.getElementById("custName").value = "";
    document.getElementById("custQty").value = "1";
    selectedDelivery = "pickup";
    selectedDeliveryCost = 0;
    document.querySelectorAll(".delivery-opt").forEach(function(d) { d.classList.remove("selected"); });
    document.querySelector('.delivery-opt[data-delivery="pickup"]').classList.add("selected");
    document.getElementById("modalOverlay").classList.add("open");
    selectedChannel = "whatsapp";
    document.querySelectorAll(".channel-tab").forEach(function(t) { t.classList.remove("selected"); });
    document.querySelector('.channel-tab[data-channel="whatsapp"]').classList.add("selected");
    document.getElementById("waPhoneSection").style.display = "block";
    document.getElementById("messengerInfo").style.display = "none";
    document.getElementById("igInfo").style.display = "none";
    document.getElementById("btnSend").innerHTML = "💬 Send on WhatsApp";
    var imgCount = getProductImages(p).length;
    document.getElementById("viewPhotosBtn").style.display = imgCount > 1 ? "block" : "none";
    setupShareLinks();
  }

  function openLightboxByIndex(idx) {
    var p = products[idx];
    if (!p) return;
    lastViewedIndex = idx;
    lbProduct = p;
    lbProductIndex = idx;
    var allImgs = getProductImages(p);
    lbImages = allImgs.filter(function(u) { return u && u.indexOf('http') === 0; });
    lbIndex = 0;
    renderLightbox();
    document.getElementById("lightboxOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    document.getElementById("modalOverlay").classList.remove("open");
    currentProduct = null;
    currentProductIndex = -1;
  }

  function selectPhone(el) {
    var opts = document.querySelectorAll(".phone-opt");
    for (var i = 0; i < opts.length; i++) opts[i].classList.remove("selected");
    el.classList.add("selected");
    selectedPhone = el.getAttribute("data-phone");
  }

  function selectDelivery(el) {
    var opts = document.querySelectorAll(".delivery-opt");
    for (var i = 0; i < opts.length; i++) opts[i].classList.remove("selected");
    el.classList.add("selected");
    selectedDelivery = el.getAttribute("data-delivery");
    var cost = el.getAttribute("data-cost");
    selectedDeliveryCost = cost === "courier" ? -1 : Number(cost);
  }

  function selectChannel(el) {
    var tabs = document.querySelectorAll(".channel-tab");
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove("selected");
    el.classList.add("selected");
    selectedChannel = el.getAttribute("data-channel");
    document.getElementById("waPhoneSection").style.display = selectedChannel === "whatsapp" ? "block" : "none";
    document.getElementById("messengerInfo").style.display = selectedChannel === "messenger" ? "block" : "none";
    document.getElementById("igInfo").style.display = selectedChannel === "instagram" ? "block" : "none";
    var btn = document.getElementById("btnSend");
    if (selectedChannel === "whatsapp") btn.innerHTML = "💬 Send on WhatsApp";
    else if (selectedChannel === "messenger") btn.innerHTML = "💬 Send on Messenger";
    else btn.innerHTML = "💬 Send on Instagram";
  }

  function getOrderMsg() {
    var name = document.getElementById("custName").value.trim();
    var qty = document.getElementById("custQty").value.trim();
    if (!name) { showToast("Please enter your name"); return null; }
    if (!qty || isNaN(qty) || Number(qty) < 1) { showToast("Please enter a valid quantity"); return null; }
    var p = currentProduct;
    var subtotal = p.price * Number(qty);
    var deliveryLabel = "Pickup (Free)";
    var deliveryLine = "";
    if (selectedDelivery === "round-town") {
      deliveryLabel = "Round Town Delivery";
      deliveryLine = "\n*Delivery:* $600.00 JMD\n";
    } else if (selectedDelivery === "outside-kingston") {
      deliveryLabel = "Outside Kingston (Knutsford/Doorway Courier)";
      deliveryLine = "\n*Delivery:* Via Knutsford or Doorway courier (rate quoted separately)\n";
    }
    var grandTotal = selectedDeliveryCost >= 0 ? subtotal + selectedDeliveryCost : subtotal;
    return {
      text: "*NEW BAG ORDER*\n\n" +
        "*Customer:* " + name + "\n" +
        "*Product:* " + p.brand + " " + p.name + "\n" +
        "*Model:* " + p.model + "\n" +
        "*Fits:* " + p.size + " Laptop\n" +
        "*Price:* $" + p.price.toLocaleString("en-JM",{minimumFractionDigits:2}) + " JMD\n" +
        "*Quantity:* " + qty + "\n" +
        "*Subtotal:* $" + subtotal.toLocaleString("en-JM",{minimumFractionDigits:2}) + " JMD\n" +
        deliveryLine +
        "*Delivery Method:* " + deliveryLabel + "\n" +
        (selectedDeliveryCost >= 0 ? "*Grand Total:* $" + grandTotal.toLocaleString("en-JM",{minimumFractionDigits:2}) + " JMD\n\n" : "*Grand Total:* To be quoted (courier rate)\n\n") +
        "Please confirm availability and payment details."
    };
  }

  function sendOrder() {
    var order = getOrderMsg();
    if (!order) return;
    var msg = encodeURIComponent(order.text);
    if (selectedChannel === "whatsapp") {
      window.open("https://wa.me/" + selectedPhone + "?text=" + msg, "_blank");
      showToast("Opening WhatsApp...");
    } else if (selectedChannel === "messenger") {
      window.open("https://m.me/pixelwiresolutions?ref=" + encodeURIComponent(order.text), "_blank");
      showToast("Opening Messenger...");
    } else if (selectedChannel === "instagram") {
      window.open("https://ig.me/m/pixelwiresolutions?text=" + msg, "_blank");
      showToast("Opening Instagram DM...");
    }
    closeModal();
  }

  function getProductImages(p) {
    return Array.isArray(p.imgs) ? p.imgs : [p.img || ""];
  }

  function closeLightbox() {
    document.getElementById("lightboxOverlay").classList.remove("open");
    document.body.style.overflow = "";
    lbProduct = null;
    lbProductIndex = -1;
  }

  function renderLightbox() {
    var img = document.getElementById("lbImg");
    img.onerror = function() {
      this.style.display = 'none';
      if (lbImages.length > 1) {
        var next = (lbIndex + 1) % lbImages.length;
        if (next !== lbIndex) { lbIndex = next; renderLightbox(); }
      }
    };
    img.src = lbImages[lbIndex];
    img.style.display = '';
    img.alt = lbProduct.name + ' - Photo ' + (lbIndex + 1);
    img.className = "";
    document.getElementById("lbTitle").textContent = lbProduct.brand + " " + lbProduct.name;
    document.getElementById("lbPrice").textContent = "$" + lbProduct.price.toLocaleString("en-JM", {minimumFractionDigits:2}) + " JMD";
    document.getElementById("lbCounter").textContent = (lbIndex + 1) + " / " + lbImages.length;
    document.getElementById("lbArrowLeft").style.display = lbImages.length > 1 ? "flex" : "none";
    document.getElementById("lbArrowRight").style.display = lbImages.length > 1 ? "flex" : "none";
    var dotsHtml = "";
    for (var i = 0; i < lbImages.length; i++) {
      dotsHtml += '<button class="dot' + (i === lbIndex ? ' active' : '') + '" onclick="lbGoTo(' + i + ')"></button>';
    }
    document.getElementById("lbDots").innerHTML = dotsHtml;
    document.getElementById("lbDots").style.display = lbImages.length > 1 ? "flex" : "none";
  }

  function lbGoTo(index) {
    if (index === lbIndex) return;
    var img = document.getElementById("lbImg");
    img.className = index > lbIndex ? "slide-left" : "slide-right";
    setTimeout(function() {
      lbIndex = index;
      renderLightbox();
      img.className = index > lbIndex ? "slide-right" : "slide-left";
      requestAnimationFrame(function() { img.className = ""; });
    }, 200);
  }

  function lbNext() {
    if (lbImages.length <= 1) return;
    lbGoTo((lbIndex + 1) % lbImages.length);
  }

  function lbPrev() {
    if (lbImages.length <= 1) return;
    lbGoTo((lbIndex - 1 + lbImages.length) % lbImages.length);
  }

  function orderFromLightbox() {
    var idx = lbProductIndex >= 0 ? lbProductIndex : lastViewedIndex;
    closeLightbox();
    openModalByIndex(idx);
  }

  document.getElementById("lbImgWrap").addEventListener("touchstart", function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});

  document.getElementById("lbImgWrap").addEventListener("touchend", function(e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) lbNext(); else lbPrev();
    }
  }, {passive: true});

  document.getElementById("lightboxOverlay").addEventListener("click", function(e) {
    if (e.target === e.currentTarget) closeLightbox();
  });

  document.addEventListener("keydown", function(e) {
    if (!document.getElementById("lightboxOverlay").classList.contains("open")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") lbNext();
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") lbPrev();
    else if (e.key === "Escape") closeLightbox();
  });

  function showToast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(function() { t.classList.remove("show"); }, 2500);
  }

  document.getElementById("filterBar").addEventListener("click", function(e) {
    if (!e.target.classList.contains("filter-btn")) return;
    var btns = document.querySelectorAll(".filter-btn");
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
    e.target.classList.add("active");
    renderCards(e.target.getAttribute("data-filter"));
  });

  document.getElementById("modalOverlay").addEventListener("click", function(e) {
    if (e.target === e.currentTarget) closeModal();
  });

  function setupShareLinks() {
    var p = currentProduct;
    if (!p) return;
    var shareText = encodeURIComponent(p.brand + " " + p.name + " (" + p.model + ") - $" + p.price.toLocaleString("en-JM",{minimumFractionDigits:2}) + " JMD. Order now at Pixel Wire Solutions!");
    var pageUrl = encodeURIComponent(window.location.href);
    document.getElementById("shareIG").href = "https://www.instagram.com/pixelwiresolutions";
    document.getElementById("shareFB").href = "https://www.facebook.com/sharer/sharer.php?u=" + pageUrl + "&quote=" + shareText;
  }

  function copyProductLink(e) {
    e.preventDefault();
    var p = currentProduct;
    if (!p) return;
    var text = p.brand + " " + p.name + " (" + p.model + ") - $" + p.price.toLocaleString("en-JM",{minimumFractionDigits:2}) + " JMD\nOrder at: " + window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() { showToast("Link copied to clipboard!"); });
    } else {
      showToast("Long-press to copy the link");
    }
  }

  renderCards();