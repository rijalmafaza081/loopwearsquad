// Sample Products Data
const products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        category: "men",
        price: 89000,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        description: "Comfortable classic t-shirt"
    },
    {
        id: 2,
        name: "Denim Jacket",
        category: "men",
        price: 349000,
        image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop",
        description: "Stylish denim jacket"
    },
    {
        id: 3,
        name: "Women Hoodie",
        category: "women",
        price: 199000,
        image: "https://images.unsplash.com/photo-1556821552-5ff63b1b0e59?w=400&h=400&fit=crop",
        description: "Cozy women hoodie"
    },
    {
        id: 4,
        name: "Summer Dress",
        category: "women",
        price: 249000,
        image: "https://images.unsplash.com/photo-1595777712802-14158a84b64a?w=400&h=400&fit=crop",
        description: "Light summer dress"
    },
    {
        id: 5,
        name: "Casual Shorts",
        category: "men",
        price: 129000,
        image: "https://images.unsplash.com/photo-1555082891-6c27db76f739?w=400&h=400&fit=crop",
        description: "Perfect casual shorts"
    },
    {
        id: 6,
        name: "Sunglasses",
        category: "accessories",
        price: 299000,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        description: "Trendy sunglasses"
    },
    {
        id: 7,
        name: "Fashion Belt",
        category: "accessories",
        price: 79000,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        description: "Stylish leather belt"
    },
    {
        id: 8,
        name: "Women Jeans",
        category: "women",
        price: 199000,
        image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop",
        description: "Premium quality jeans"
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

// Format Rupiah
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Render Products
function renderProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    const filtered = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    productsGrid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400?text=${encodeURIComponent(product.name)}'">
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatRupiah(product.price)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    updateCartDisplay();
    
    // Show feedback
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Update Cart Display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
        cartTotal.textContent = formatRupiah(0);
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80?text=${encodeURIComponent(item.name)}'">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatRupiah(item.price)}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
    
    cartTotal.textContent = formatRupiah(total);
}

// Toggle Cart Sidebar
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

// Checkout via WhatsApp
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Build order message
    let message = '*📦 LoopWearSquad Order*\n\n';
    message += '*Items:*\n';
    
    let total = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `• ${item.name} x${item.quantity} = ${formatRupiah(subtotal)}\n`;
    });
    
    message += `\n*Total: ${formatRupiah(total)}*\n`;
    message += `\nPlease confirm this order. Thank you!`;
    
    // Ganti dengan nomor WhatsApp Anda
    const whatsappNumber = '6285748234562';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #25D366;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Filter Products
document.addEventListener('DOMContentLoaded', function() {
    // Initial render
    renderProducts();
    updateCartCount();
    updateCartDisplay();
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.dataset.category;
            renderProducts(currentFilter);
        });
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
