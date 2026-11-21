/* ============================================================
   LoopWearSquad — Shared Script (index.html + product.html)
   ============================================================ */

/* ---------- GA4 helpers ---------- */
function gaEvent(name, params = {}) {
    if (typeof gtag === "function") {
        gtag("event", name, params);
    }
}

/* ---------- Cart ---------- */
let cart = JSON.parse(localStorage.getItem("lws_cart")) || [];

function saveCart() {
    localStorage.setItem("lws_cart", JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((s, i) => s + i.quantity, 0);
    document.querySelectorAll(".cart-count").forEach(el => (el.textContent = count));
}

function cartTotal() {
    return cart.reduce((s, i) => s + i.price * i.quantity, 0);
}

function updateCartDisplay() {
    const items = document.getElementById("cartItems");
    const total = document.getElementById("cartTotal");
    const subtotal = document.getElementById("cartSubtotal");
    const freeship = document.getElementById("cartFreeShip");

    if (!items) return;

    if (cart.length === 0) {
        items.innerHTML = '<div class="empty-cart"><p>Keranjang kosong</p></div>';
        if (subtotal) subtotal.textContent = formatRupiah(0);
        if (total) total.textContent = formatRupiah(0);
        if (freeship) freeship.innerHTML = "";
        return;
    }

    const t = cartTotal();
    if (subtotal) subtotal.textContent = formatRupiah(t);
    if (total) total.textContent = formatRupiah(t);

    if (freeship) {
        const remain = Math.max(0, PROMO.freeShippingMin - t);
        freeship.innerHTML =
            remain > 0
                ? `<i class="fas fa-truck"></i> Tambah <strong>${formatRupiah(remain)}</strong> lagi untuk gratis ongkir`
                : `<i class="fas fa-check-circle"></i> Gratis ongkir aktif!`;
    }

    items.innerHTML = cart
        .map(
            item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80?text=${encodeURIComponent(item.name)}'">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-variant">${item.color || ""} ${item.size ? " / " + item.size : ""}</div>
                <div class="cart-item-price">${formatRupiah(item.price)}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateCartQty(${item.id}, -1, '${item.color||''}', '${item.size||''}')">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQty(${item.id}, 1, '${item.color||''}', '${item.size||''}')">+</button>
                </div>
                <button class="remove-item" onclick="removeCartItem(${item.id}, '${item.color||''}', '${item.size||''}')">Hapus</button>
            </div>
        </div>
    `
        )
        .join("");
}

function addToCart(productId, color, size, qty = 1) {
    const product = getProductById(productId);
    if (!product) return;
    const existing = cart.find(
        i => i.id === productId && i.color === (color || "") && i.size === (size || "")
    );
    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: color || "",
            size: size || "",
            quantity: qty
        });
    }
    saveCart();
    updateCartCount();
    updateCartDisplay();
    showNotification(`${product.name} ditambahkan ke keranjang!`);

    gaEvent("add_to_cart", {
        currency: "IDR",
        value: product.price * qty,
        items: [
            {
                item_id: String(product.id),
                item_name: product.name,
                item_category: product.category,
                item_variant: `${color || ""} / ${size || ""}`,
                price: product.price,
                quantity: qty
            }
        ]
    });
}

function updateCartQty(productId, change, color, size) {
    const item = cart.find(
        i => i.id === productId && i.color === color && i.size === size
    );
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        removeCartItem(productId, color, size);
    } else {
        saveCart();
        updateCartDisplay();
    }
}

function removeCartItem(productId, color, size) {
    cart = cart.filter(
        i => !(i.id === productId && i.color === color && i.size === size)
    );
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

function toggleCart() {
    const sb = document.getElementById("cartSidebar");
    const ov = document.getElementById("cartOverlay");
    if (!sb) return;
    const active = sb.classList.toggle("active");
    if (ov) ov.classList.toggle("active", active);
    if (active) updateCartDisplay();
}

/* ---------- Checkout ---------- */
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Keranjang kosong!");
        return;
    }
    let msg = "*\ud83d\udce6 LoopWearSquad Order*\n\n*Produk:*\n";
    let total = 0;
    cart.forEach(i => {
        const sub = i.price * i.quantity;
        total += sub;
        msg += `• ${i.name}${i.color ? " (" + i.color + ")" : ""}${i.size ? " [" + i.size + "]" : ""} x${i.quantity} = ${formatRupiah(sub)}\n`;
    });
    msg += `\n*Total: ${formatRupiah(total)}*\n\nMohon konfirmasi order ini. Terima kasih!`;
    const url = `https://wa.me/6285748234562?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    gaEvent("begin_checkout", {
        currency: "IDR",
        value: total,
        items: cart.map(i => ({
            item_id: String(i.id),
            item_name: i.name,
            item_variant: `${i.color || ""} / ${i.size || ""}`,
            price: i.price,
            quantity: i.quantity
        }))
    });
}

/* ---------- Notification ---------- */
function showNotification(message) {
    const n = document.createElement("div");
    n.className = "toast-notification";
    n.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(n);
    requestAnimationFrame(() => n.classList.add("show"));
    setTimeout(() => {
        n.classList.remove("show");
        setTimeout(() => n.remove(), 400);
    }, 3000);
}

/* ---------- Countdown ---------- */
function initCountdown() {
    const ends = new Date(PROMO.endsAt);
    const days = document.getElementById("cdDays");
    const hours = document.getElementById("cdHours");
    const mins = document.getElementById("cdMins");
    const secs = document.getElementById("cdSecs");
    if (!days) return;

    function tick() {
        const diff = ends - Date.now();
        if (diff <= 0) {
            [days, hours, mins, secs].forEach(el => (el.textContent = "00"));
            return;
        }
        const d = Math.floor(diff / 864e5);
        const h = Math.floor((diff % 864e5) / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        const s = Math.floor((diff % 6e4) / 1e3);
        days.textContent = String(d).padStart(2, "0");
        hours.textContent = String(h).padStart(2, "0");
        mins.textContent = String(m).padStart(2, "0");
        secs.textContent = String(s).padStart(2, "0");
    }
    tick();
    setInterval(tick, 1000);
}

/* ---------- Size Guide ---------- */
function renderSizeGuide(category) {
    const chart = SIZE_CHART[category];
    if (!chart) return "";
    let html = `<p class="size-note">${chart.note}</p>`;
    html += `<div class="size-table-wrap"><table class="size-table">`;
    html += `<thead><tr>${chart.columns.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>`;
    chart.rows.forEach(row => {
        html += `<tr>${row.map(c => `<td>${c}</td>`).join("")}</tr>`;
    });
    html += `</tbody></table></div>`;
    return html;
}

function initSizeGuide() {
    const container = document.getElementById("sizeGuideContainer");
    if (!container) return;
    const tabs = document.querySelectorAll("#sizeGuideTabs .size-tab");
    let active = "kaos";

    function show(cat) {
        active = cat;
        container.innerHTML = renderSizeGuide(cat);
        tabs.forEach(t => t.classList.toggle("active", t.dataset.cat === cat));
    }

    tabs.forEach(t => {
        t.addEventListener("click", () => show(t.dataset.cat));
    });
    show(active);
}

/* ---------- Product Cards (index) ---------- */
function renderProductCard(product) {
    const discount = getDiscountPercent(product);
    const badge = product.badge
        ? `<span class="product-badge">${product.badge}</span>`
        : "";
    const orig = product.originalPrice
        ? `<span class="product-original">${formatRupiah(product.originalPrice)}</span>`
        : "";
    const disc = discount > 0 ? `<span class="product-discount">-${discount}%</span>` : "";

    const colorDots = product.colors
        .map(c => `<span class="color-dot" style="background:${COLOR_HEX[c]||'#ccc'}" title="${c}"></span>`)
        .join("");

    return `
    <div class="product-card" data-id="${product.id}">
        <a href="product.html?slug=${product.slug}" class="product-card-link" aria-label="${product.name}">
            <div class="product-image-wrap">
                ${badge}
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy"
                     onerror="this.src='https://via.placeholder.com/400?text=${encodeURIComponent(product.name)}'">
            </div>
        </a>
        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-name"><a href="product.html?slug=${product.slug}">${product.name}</a></h3>
            <div class="product-price-row">
                ${orig}
                <span class="product-price">${formatRupiah(product.price)}</span>
                ${disc}
            </div>
            <div class="product-variants">
                <span class="variant-label">Warna:</span>
                <div class="color-dots">${colorDots}</div>
                <span class="variant-label">Ukuran:</span>
                <span class="size-list">${product.sizes.join(", ")}</span>
            </div>
            <button class="add-to-cart-btn" onclick="quickAdd(event, ${product.id})">
                <i class="fas fa-plus"></i> Tambah ke Keranjang
            </button>
        </div>
    </div>`;
}

function quickAdd(e, productId) {
    e.preventDefault();
    e.stopPropagation();
    const product = getProductById(productId);
    if (!product) return;
    addToCart(productId, product.colors[0], product.sizes[0], 1);
}

function renderProducts(filter = "all") {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;
    const filtered =
        filter === "all" ? products : products.filter(p => p.category === filter);
    grid.innerHTML = filtered.map(renderProductCard).join("");

    // GA view_item_list
    gaEvent("view_item_list", {
        item_list_name: filter === "all" ? "All Products" : filter,
        items: filtered.map((p, i) => ({
            item_id: String(p.id),
            item_name: p.name,
            item_category: p.category,
            price: p.price,
            index: i
        }))
    });
}

/* ---------- PWA Install ---------- */
let deferredPrompt = null;
function initPWA() {
    const btn = document.getElementById("installBtn");
    window.addEventListener("beforeinstallprompt", e => {
        e.preventDefault();
        deferredPrompt = e;
        if (btn) btn.classList.remove("hidden");
    });
    if (btn) {
        btn.addEventListener("click", async () => {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            gaEvent("pwa_install_prompt", { outcome });
            deferredPrompt = null;
            btn.classList.add("hidden");
        });
    }
    window.addEventListener("appinstalled", () => {
        deferredPrompt = null;
        if (btn) btn.classList.add("hidden");
        gaEvent("pwa_installed");
    });
}

/* ---------- Promo bar click ---------- */
function initPromoBar() {
    const bar = document.getElementById("promoBar");
    if (!bar) return;
    bar.addEventListener("click", () => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
        gaEvent("promo_banner_click", { label: "Launching Promo" });
    });
}

/* ---------- WhatsApp float click ---------- */
function initWhatsAppFloat() {
    const wa = document.getElementById("waFloat");
    if (!wa) return;
    wa.addEventListener("click", () => {
        gaEvent("contact_click", { method: "whatsapp" });
    });
}

/* ---------- Service Worker ---------- */
function initServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    if (window.location.protocol === "file:") return;
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(err => {
            console.warn("Service worker gagal didaftarkan:", err);
        });
    });
}

/* ---------- DOM Ready (shared) ---------- */
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    updateCartDisplay();
    initCountdown();
    initSizeGuide();
    initPWA();
    initPromoBar();
    initWhatsAppFloat();
    initServiceWorker();

    // Filters
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            renderProducts(this.dataset.category);
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Render products on home
    renderProducts("all");
});

/* ---------- CSS Animation (toast) ---------- */
const toastStyle = document.createElement("style");
toastStyle.textContent = `
.toast-notification{position:fixed;top:20px;right:20px;background:#25D366;color:#fff;padding:.8rem 1.2rem;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.2);z-index:3000;transform:translateX(120%);opacity:0;transition:transform .35s ease,opacity .35s ease;display:flex;align-items:center;gap:.5rem;font-weight:500}
.toast-notification.show{transform:translateX(0);opacity:1}
`;
document.head.appendChild(toastStyle);
