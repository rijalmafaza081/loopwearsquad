// Sample Products Data - Range 100-300 ribu
const products = [
    {
        id: 1,
        name: "Urban T-Shirt",
        category: "men",
        price: 129000,
        image: "https://picsum.photos/id/101/500/500",
        description: "Comfortable urban t-shirt"
    },
    {
        id: 2,
        name: "Oversized Hoodie",
        category: "men",
        price: 249000,
        image: "https://picsum.photos/id/102/500/500",
        description: "Cozy oversized hoodie"
    },
    {
        id: 3,
        name: "Streetwear Jacket",
        category: "men",
        price: 299000,
        image: "https://picsum.photos/id/103/500/500",
        description: "Stylish streetwear jacket"
    },
    {
        id: 4,
        name: "Premium Jeans",
        category: "men",
        price: 199000,
        image: "https://picsum.photos/id/104/500/500",
        description: "Premium quality jeans"
    },
    {
        id: 5,
        name: "Floral Dress",
        category: "women",
        price: 189000,
        image: "https://picsum.photos/id/201/500/500",
        description: "Elegant floral dress"
    },
    {
        id: 6,
        name: "Yoga Leggings",
        category: "women",
        price: 149000,
        image: "https://picsum.photos/id/202/500/500",
        description: "Comfortable yoga leggings"
    },
    {
        id: 7,
        name: "Silk Blouse",
        category: "women",
        price: 229000,
        image: "https://picsum.photos/id/203/500/500",
        description: "Luxurious silk blouse"
    },
    {
        id: 8,
        name: "Denim Skirt",
        category: "women",
        price: 159000,
        image: "https://picsum.photos/id/204/500/500",
        description: "Classic denim skirt"
    },
    {
        id: 9,
        name: "Leather Belt",
        category: "accessories",
        price: 179000,
        image: "https://picsum.photos/id/301/500/500",
        description: "Genuine leather belt"
    },
    {
        id: 10,
        name: "Stylish Sunglasses",
        category: "accessories",
        price: 249000,
        image: "https://picsum.photos/id/302/500/500",
        description: "Trendy sunglasses"
    },
    {
        id: 11,
        name: "Leather Wallet",
        category: "accessories",
        price: 199000,
        image: "https://picsum.photos/id/303/500/500",
        description: "Genuine leather wallet"
    },
    {
        id: 12,
        name: "Canvas Cap",
        category: "accessories",
        price: 129000,
        image: "https://picsum.photos/id/304/500/500",
        description: "Classic canvas cap"
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
