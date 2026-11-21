/* ============================================================
   LoopWearSquad — Katalog Produk (shared: index.html + product.html)
   ============================================================ */

const PROMO = {
  active: true,
  percent: 20,
  label: "LAUNCHING PROMO",
  // Countdown berakhir (ISO). Update berkala.
  endsAt: "2026-11-30T23:59:59+07:00",
  freeShippingMin: 500000
};

const CATEGORIES = [
  { id: "kaos", name: "Kaos" },
  { id: "hoodie", name: "Hoodie" },
  { id: "knitwear", name: "Knitwear" }
];

const COLOR_HEX = {
  Hitam: "#1c1c1c",
  Putih: "#f5f5f2",
  Krem: "#e3d5bd",
  Sage: "#9aa88f",
  Navy: "#22304f",
  Charcoal: "#3a3a3a"
};

/* Size chart — ukuran badan (cm) */
const SIZE_CHART = {
  kaos: {
    note: "Body measurement dalam cm, toleransi ±2cm. Ukur badan, bukan garment.",
    columns: ["Ukuran", "Lebar Dada", "Panjang", "Lengan", "Bahu", "Pinggang"],
    rows: [
      ["S", "50", "68", "20", "44", "50"],
      ["M", "53", "70", "21", "46", "53"],
      ["L", "56", "72", "22", "48", "56"],
      ["XL", "59", "74", "23", "50", "59"]
    ]
  },
  hoodie: {
    note: "Body measurement dalam cm, toleransi ±2cm. Diukur dari bahu sampai bawah hem.",
    columns: ["Ukuran", "Lebar Dada", "Panjang", "Lengan", "Bahu", "Pinggang"],
    rows: [
      ["M", "55", "70", "23", "48", "54"],
      ["L", "58", "72", "24", "50", "57"],
      ["XL", "61", "74", "25", "52", "60"],
      ["XXL", "64", "76", "26", "54", "63"]
    ]
  },
  knitwear: {
    note: "Body measurement dalam cm, toleransi ±2cm. Knitwear punya stretch ±3cm.",
    columns: ["Ukuran", "Lebar Dada", "Panjang", "Lengan", "Bahu", "Pinggang"],
    rows: [
      ["S", "48", "62", "19", "42", "46"],
      ["M", "51", "64", "20", "44", "49"],
      ["L", "54", "66", "21", "46", "52"],
      ["XL", "57", "68", "22", "48", "55"]
    ]
  }
};

const products = [
  /* ---------------- K A O S ---------------- */
  {
    id: 1,
    slug: "loop-tee-classic",
    name: "Loop Tee Classic",
    category: "kaos",
    price: 219000,
    originalPrice: 274000,
    image: "images/kaos.jpg",
    shortDescription: "Crew neck tee basic dengan potongan regular fit.",
    description:
      "Loop Tee Classic adalah tee fondasi yang kami produksi dalam jumlah besar. Bahan katun combed 30s yang lembut di kulit, tidak mudah deformed, dan aman dipakai seharian. Potongan regular fit dengan bahu slightly drop untuk tampilan yang natural.",
    details: [
      "Katun combed 30s, 180 gsm",
      "Regular fit dengan bahu sedikit drop",
      "Ribbing collar 2 cm (tahan melar)",
      "Jahitan chainstitch di bagian bawah",
      "Label woven LoopWearSquad"
    ],
    material: "100% Katun Combed 30s",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Hitam", "Putih"],
    badge: "BEST SELLER"
  },
  {
    id: 2,
    slug: "weave-boxy-tee",
    name: "Weave Boxy Tee",
    category: "kaos",
    price: 229000,
    originalPrice: 286000,
    image: "images/kaos.jpg",
    shortDescription: "Boxy fit dengan tekstur rajut weave yang khas.",
    description:
      "Weave Boxy Tee dibeboxy dengan tekstur rajut weave yang memberi kesan premium. Bahu turun dan badan lebih longgar dari tee biasa. Cocok dipadukan dengan celana relaxed atau cargo.",
    details: [
      "Katun rajut tekstur weave, 200 gsm",
      "Boxy fit, bahu turun 3 cm",
      "Lengan pendek dengan opening 2 cm",
      "Hem melengkung di bagian belakang",
      "Pre-shrunk — tidak menyusut setelah dicuci"
    ],
    material: "Katun Rajut (Textured Weave)",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Hitam", "Krem"],
    badge: "BARU"
  },
  {
    id: 3,
    slug: "squad-graphic-tee",
    name: "Squad Graphic Tee",
    category: "kaos",
    price: 239000,
    originalPrice: 299000,
    image: "images/kaos.jpg",
    shortDescription: "Graphic print front dengan warna tahan lama.",
    description:
      "Squad Graphic Tee memakai teknik plastisol print resolusi tinggi supaya motif tidak retak atau pudar setelah beberapa kali cuci. Dicetak di sisi depan dengan layer lembut yang tetap nyaman dipakai.",
    details: [
      "Katun combed 24s, 170 gsm",
      "Plastisol print resolusi tinggi",
      "Motif tidak retak, tahan 30+ kali cuci",
      "Regular fit",
      "Dicetak di Yogyakarta"
    ],
    material: "100% Katun Combed 24s",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Hitam", "Putih"],
    badge: null
  },
  {
    id: 4,
    slug: "oversized-heavy-tee",
    name: "Oversized Heavy Tee",
    category: "kaos",
    price: 249000,
    originalPrice: 311000,
    image: "images/kaos.jpg",
    shortDescription: "Heavyweight 260 gsm dengan potongan oversize penuh.",
    description:
      "Oversized Heavy Tee dibuat dari katun 260 gsm yang terasa solid dan jatuh. Potongan oversize penuh dengan bahu turun drastis dan lengan panjang. Favorit untuk layering.",
    details: [
      "Katun heavyweight 260 gsm",
      "Oversize fit penuh, bahu turun 5 cm",
      "Lengan panjang dengan ribbing cuff",
      "Body double-stitch di seluruh sisi",
      "Tahan bentuk setelah 50+ kali cuci"
    ],
    material: "100% Katun Heavyweight 260gsm",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Hitam", "Sage"],
    badge: "LIMITED"
  },

  /* ---------------- H O O D I E ---------------- */
  {
    id: 5,
    slug: "everyday-hoodie",
    name: "Everyday Hoodie",
    category: "hoodie",
    price: 269000,
    originalPrice: 336000,
    image: "images/hoodie.jpg",
    shortDescription: "Fleece-brushed hoodie untuk pemakaian harian.",
    description:
      "Everyday Hoodie memakai fleece 280 gsm yang di-brush di bagian dalam, jadi hangat tanpa berat. Hoodie tanpa tudung, dua kancing, dan kanguru pocket. Warna netral yang gampang dipadukan.",
    details: [
      "Fleece cotton 280 gsm, brushed inner",
      "Tanpa tudung, 2 kancing depan",
      "Kanguru pocket dengan jahitan bartack",
      "Ribbing hem dan cuff 2 cm",
      "Hangat tanpa terlalu tebal"
    ],
    material: "Cotton Fleece Brushed 280gsm",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Hitam", "Putih"],
    badge: "BEST SELLER"
  },
  {
    id: 6,
    slug: "loop-zip-hoodie",
    name: "Loop Zip Hoodie",
    category: "hoodie",
    price: 279000,
    originalPrice: 349000,
    image: "images/hoodie.jpg",
    shortDescription: "Full zip dengan detail strap loop khas Loop.",
    description:
      "Loop Zip Hoodie adalah hoodie full zip dengan detail strap loop kecil di bagian dada. Resleting YKK yang halus, dan bagian dalam diberi bord LIGHT. Mantel yang versatile untuk cooler hari.",
    details: [
      "Fleece cotton 300 gsm",
      "Resleting YKK full zip",
      "Detail strap loop branding di dada",
      "Bord LoopWearSquad di dalam",
      "Kantong samping dengan ziper tersembunyi"
    ],
    material: "Cotton Fleece 300gsm",
    sizes: ["M", "L", "XL"],
    colors: ["Hitam"],
    badge: null
  },
  {
    id: 7,
    slug: "squad-pullover-hoodie",
    name: "Squad Pullover Hoodie",
    category: "hoodie",
    price: 289000,
    originalPrice: 361000,
    image: "images/hoodie.jpg",
    shortDescription: "Classic pullover dengan tudung dan ribbing tebal.",
    description:
      "Squad Pullover Hoodie adalah model klasik dengan tudung bertali dan ribbing tebal di hem serta cuff. Bahannya adem dan tebal sehingga aman untuk dipakai windy.",
    details: [
      "Fleece cotton 300 gsm",
      "Tudung 2 lapis dengan tali katun",
      "Ribbing 2x2 cm pada hem dan cuff",
      "Regular fit",
      "Kanguru pocket"
    ],
    material: "Cotton Fleece 300gsm",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Hitam", "Krem"],
    badge: null
  },
  {
    id: 8,
    slug: "weave-boxy-hoodie",
    name: "Weave Boxy Hoodie",
    category: "hoodie",
    price: 299000,
    originalPrice: 374000,
    image: "images/hoodie.jpg",
    shortDescription: "Boxy textured hoodie, loose fit dan heavy.",
    description:
      "Weave Boxy Hoodie menggabungkan tekstur weave dengan potongan boxy. Badan lebih longgar dantebal, cocok jadi outer layer. Ribbing pada cuff dibuat ekstra tebal supaya tidak melar cepat.",
    details: [
      "Textured fleece 320 gsm",
      "Boxy fit, bahu turun 4 cm",
      "Ribbing cuff 3 cm (anti melar)",
      "Tudung dengan lining kontras",
      "Hem melengkung belakang"
    ],
    material: "Textured Fleece 320gsm",
    sizes: ["M", "L", "XL"],
    colors: ["Hitam"],
    badge: "LIMITED"
  },

  /* ---------------- K N I T W E A R ---------------- */
  {
    id: 9,
    slug: "loop-knit-vest",
    name: "Loop Knit Vest",
    category: "knitwear",
    price: 239000,
    originalPrice: 299000,
    image: "images/knitwear.jpg",
    shortDescription: "Knit vest tanpa lengan dengan detail loop rajut.",
    description:
      "Loop Knit Vest dibuat dari rajut chunky yang hangat dan structured. Tanpa lengan, jadi gampang dik layering di atas kaus atau kemeja. Detail rajut berbentuk loop di bagian kerah.",
    details: [
      "Acrylic-cotton chunky knit",
      "Tanpa lengan, layering friendly",
      "Rajut loop detail di kerah",
      "Slight stretch, structured knit",
      "Tahan shape setelah dipakai"
    ],
    material: "Acrylic-Cotton Chunky Knit",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Hitam", "Krem"],
    badge: null
  },
  {
    id: 10,
    slug: "weave-knit-sweater",
    name: "Weave Knit Sweater",
    category: "knitwear",
    price: 279000,
    originalPrice: 349000,
    image: "images/knitwear.jpg",
    shortDescription: "Textured knit sweater dengan pola anyaman.",
    description:
      "Weave Knit Sweater punya pola anyaman tekstur yang elegan dengan rajut basic. Lengan panjang dengan ribbing cuff, dan warnanya netral untuk daily wear.",
    details: [
      "Acrylic-cotton textured knit",
      "Pola anyaman di badan dan lengan",
      "Ribbing cuff dan hem 2 cm",
      "Regular fit",
      "Tahan berbentuk meski sering dipakai"
    ],
    material: "Acrylic-Cotton Textured Knit",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Hitam", "Putih"],
    badge: "BARU"
  },
  {
    id: 11,
    slug: "cable-knit-pullover",
    name: "Cable Knit Pullover",
    category: "knitwear",
    price: 289000,
    originalPrice: 361000,
    image: "images/knitwear.jpg",
    shortDescription: "Cable knit klasik dengan motif kepang.",
    description:
      "Cable Knit Pullover memakai motif kepang (cable) yang klasik, rajur rapat dan tebal. Neckline ribbing tinggi dan hem yang sedikit lebih panjang. Item yang paling hangat di koleksi knitwear kami.",
    details: [
      "Acrylic-cotton cable knit, tebal",
      "Motif kepang (cable) klasik",
      "Neckline ribbing tinggi",
      "Hem lebih panjang 4 cm",
      "Paling hangat di koleksi knitwear"
    ],
    material: "Acrylic-Cotton Cable Knit",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Hitam", "Krem"],
    badge: "BEST SELLER"
  },
  {
    id: 12,
    slug: "squad-cardigan",
    name: "Squad Cardigan",
    category: "knitwear",
    price: 299000,
    originalPrice: 374000,
    image: "images/knitwear.jpg",
    shortDescription: "Cardigan dengan kancing depan dan kantong patch.",
    description:
      "Squad Cardigan adalah knitwear open-front dengan kancing depan penuh dan dua kantong patch. Bisa dipakai sebagai sweater atau outer lapisan. Rajut cukup tebal untuk menahan suhu dingin.",
    details: [
      "Acrylic-cotton knit, 2 ply",
      "Kancing depan penuh (5 buah)",
      "2 kantong patch depan",
      "Open front, cocok dilayer",
      "Ribbing hem dan cuff"
    ],
    material: "Acrylic-Cotton Knit 2-Ply",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Hitam", "Krem"],
    badge: "LIMITED"
  }
];

/* ---------- Helpers ---------- */
const PRODUCT_MAP = Object.fromEntries(products.map(p => [p.id, p]));
const PRODUCT_BY_SLUG = Object.fromEntries(products.map(p => [p.slug, p]));

function getDiscountPercent(product) {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0;
  return Math.round((1 - product.price / product.originalPrice) * 100);
}

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(amount);
}

function getProductById(id) {
  return PRODUCT_MAP[Number(id)];
}

function getProductBySlug(slug) {
  return PRODUCT_BY_SLUG[slug];
}

function getRelatedProducts(product, limit = 4) {
  const same = products.filter(p => p.category === product.category && p.id !== product.id);
  const other = products.filter(p => p.category !== product.category);
  return [...same, ...other].slice(0, limit);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { products, PROMO, CATEGORIES, SIZE_CHART, COLOR_HEX };
}
