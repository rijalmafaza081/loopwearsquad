/* ============================================================
   LoopWearSquad — Product Detail Page (product.html)
   ============================================================ */

let currentProduct = null;
let selectedColor = "";
let selectedSize = "";
let selectedQty = 1;

function initProductPage() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    if (!slug) {
        document.getElementById("productDetail").innerHTML =
            '<p class="not-found">Produk tidak ditemukan. <a href="index.html">Kembali ke shop</a></p>';
        return;
    }

    const product = getProductBySlug(slug);
    if (!product) {
        document.getElementById("productDetail").innerHTML =
            '<p class="not-found">Produk tidak ditemukan. <a href="index.html">Kembali ke shop</a></p>';
        return;
    }
    currentProduct = product;
    selectedColor = product.colors[0] || "";
    selectedSize = product.sizes[0] || "";
    selectedQty = 1;

    // Meta
    document.title = `${product.name} — LoopWearSquad`;
    document.getElementById("pageTitle").textContent = `${product.name} — LoopWearSquad`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", product.shortDescription);

    // Breadcrumbs
    document.getElementById("bcCategory").textContent = product.category;
    document.getElementById("bcCategory").href = `index.html#products`;
    document.getElementById("bcName").textContent = product.name;

    // Image
    const img = document.getElementById("pdImage");
    img.src = product.image;
    img.alt = product.name;
    img.onerror = () => {
        img.src = `https://via.placeholder.com/600?text=${encodeURIComponent(product.name)}`;
    };

    // Info
    document.getElementById("pdCategory").textContent = product.category;
    document.getElementById("pdName").textContent = product.name;
    document.getElementById("pdShort").textContent = product.shortDescription;
    document.getElementById("pdMaterial").textContent = product.material;
    document.getElementById("pdCatMeta").textContent = product.category;
    document.getElementById("pdSku").textContent = `LWS-${String(product.id).padStart(3, "0")}`;
    document.getElementById("pdDescription").textContent = product.description;

    // Price
    const discount = getDiscountPercent(product);
    document.getElementById("pdOriginal").textContent = product.originalPrice
        ? formatRupiah(product.originalPrice)
        : "";
    document.getElementById("pdPrice").textContent = formatRupiah(product.price);
    document.getElementById("pdDiscount").textContent = discount > 0 ? `-${discount}%` : "";

    // Details list
    const details = document.getElementById("pdDetails");
    details.innerHTML = product.details.map(d => `<li>${d}</li>`).join("");

    // Colors
    const colorsEl = document.getElementById("pdColors");
    colorsEl.innerHTML = product.colors
        .map(
            c => `
        <button class="color-swatch${c === selectedColor ? " active" : ""}"
                style="background:${COLOR_HEX[c] || "#ccc"}"
                title="${c}"
                onclick="selectColor('${c}')"
                aria-label="Warna ${c}">
            <span class="swatch-check"><i class="fas fa-check"></i></span>
        </button>
    `
        )
        .join("");
    document.getElementById("pdColorLabel").textContent = `Warna: ${selectedColor}`;

    // Sizes
    const sizesEl = document.getElementById("pdSizes");
    sizesEl.innerHTML = product.sizes
        .map(
            s => `
        <button class="size-pill${s === selectedSize ? " active" : ""}"
                onclick="selectSize('${s}')">${s}</button>
    `
        )
        .join("");
    document.getElementById("pdSizeLabel").textContent = `Ukuran: ${selectedSize}`;

    // Qty
    updateQtyDisplay();
    document.getElementById("qtyMinus").addEventListener("click", () => changeQty(-1));
    document.getElementById("qtyPlus").addEventListener("click", () => changeQty(1));

    // Size chart detail
    const scContainer = document.getElementById("sizeChartDetailContainer");
    if (scContainer) scContainer.innerHTML = renderSizeGuide(product.category);

    // Related
    const related = getRelatedProducts(product, 4);
    const relGrid = document.getElementById("relatedGrid");
    if (relGrid) relGrid.innerHTML = related.map(renderProductCard).join("");

    // Share
    document.getElementById("shareWa").addEventListener("click", () => {
        const url = window.location.href;
        const text = `Cek ${product.name} di LoopWearSquad: ${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
        gaEvent("share", { method: "whatsapp", content_type: "product", item_id: String(product.id) });
    });
    document.getElementById("shareCopy").addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            showNotification("Link produk disalin!");
        } catch {
            showNotification("Gagal menyalin link.");
        }
        gaEvent("share", { method: "copy_link", content_type: "product", item_id: String(product.id) });
    });

    // GA view_item
    gaEvent("view_item", {
        currency: "IDR",
        value: product.price,
        items: [
            {
                item_id: String(product.id),
                item_name: product.name,
                item_category: product.category,
                price: product.price
            }
        ]
    });
}

function selectColor(c) {
    selectedColor = c;
    document.querySelectorAll("#pdColors .color-swatch").forEach(el => {
        el.classList.toggle("active", el.title === c);
    });
    document.getElementById("pdColorLabel").textContent = `Warna: ${c}`;
}

function selectSize(s) {
    selectedSize = s;
    document.querySelectorAll("#pdSizes .size-pill").forEach(el => {
        el.classList.toggle("active", el.textContent === s);
    });
    document.getElementById("pdSizeLabel").textContent = `Ukuran: ${s}`;
}

function changeQty(delta) {
    selectedQty = Math.max(1, Math.min(10, selectedQty + delta));
    updateQtyDisplay();
}

function updateQtyDisplay() {
    document.getElementById("qtyValue").textContent = selectedQty;
}

function addCurrentToCart() {
    if (!currentProduct) return;
    addToCart(currentProduct.id, selectedColor, selectedSize, selectedQty);
}

document.addEventListener("DOMContentLoaded", initProductPage);
