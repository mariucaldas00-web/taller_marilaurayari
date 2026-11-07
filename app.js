// Base de datos de productos con imágenes reales y precios en Pesos Colombianos (COP)
const products = [
    { id: 1, name: "Leche Entera Alquería (Pack x12)", category: "frescos", price: 48500, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Queso Fresco Bloque (2kg)", category: "frescos", price: 34000, image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Arroz Diana (Saco 25kg)", category: "abarrotes", price: 98000, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Aceite Vegetal Premier (Bidón 3L)", category: "abarrotes", price: 42000, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80" },
    { id: 5, name: "Agua Cristal (Pack x24 botellas)", category: "bebidas", price: 26000, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=500&q=80" },
    { id: 6, name: "Bebida Energizante (Pack x12)", category: "bebidas", price: 55000, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80" }
];

// Cargar carrito desde localStorage o iniciar vacío
let cart = JSON.parse(localStorage.getItem('clickfood_cart')) || [];

// Elementos del DOM
const productsGrid = document.getElementById('products-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const trackingContent = document.getElementById('tracking-content');
const filterButtons = document.querySelectorAll('.filter-btn');

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupFilters();
    updateCartUI(); // Carga visual del carrito guardado
    
    checkoutBtn.addEventListener('click', processCheckout);
});

// Función para formatear números a pesos colombianos (COP)
function formatCOP(value) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
}

// Renderizar productos en pantalla con imágenes
function renderProducts(itemsToRender) {
    productsGrid.innerHTML = '';
    itemsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">${formatCOP(product.price)}</div>
                <button class="btn-primary" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-plus"></i> Agregar al Pedido
                </button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Filtrar por categorías
function setupFilters() {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const filter = e.target.getAttribute('data-filter');
            if (filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filter);
                renderProducts(filtered);
            }
        });
    });
}

// Agregar producto al carrito y guardar en localStorage
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCartToStorage();
    updateCartUI();
}

// Guardar en el almacenamiento del navegador
function saveCartToStorage() {
    localStorage.setItem('clickfood_cart', JSON.stringify(cart));
}

// Actualizar interfaz del carrito
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart">El carrito está vacío.</p>`;
        cartCount.textContent = '0';
        cartSubtotal.textContent = formatCOP(0);
        cartTotal.textContent = formatCOP(0);
        checkoutBtn.disabled = true;
        return;
    }

    let totalItems = 0;
    let subtotal = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        subtotal += item.price * item.quantity;

        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item';
        itemRow.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>${formatCOP(item.price)} x ${item.quantity}</small>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background:none; border:none; color:red; cursor:pointer;">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    cartCount.textContent = totalItems;
    cartSubtotal.textContent = formatCOP(subtotal);
    cartTotal.textContent = formatCOP(subtotal);
    checkoutBtn.disabled = false;
}

// Remover del carrito y actualizar almacenamiento
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
}

// Procesar pedido y activar rastreo simulado
function processCheckout() {
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = "Procesando...";

    setTimeout(() => {
        alert("¡Pedido realizado con éxito por el equipo de logística!");
        startTrackingSimulation();
        cart = [];
        saveCartToStorage();
        updateCartUI();
        checkoutBtn.textContent = "Realizar Pedido";
    }, 1000);
}

// Simular el rastreo y agilización de entrega
function startTrackingSimulation() {
    trackingContent.innerHTML = `
        <div class="tracking-active">
            <div class="status-badge" id="status-text">📦 Pedido confirmado en bodega</div>
            <div class="progress-bar-container">
                <div class="progress-bar" id="progress-bar" style="width: 15%;"></div>
            </div>
            <div class="driver-info">
                <i class="fa-solid fa-id-card-clip"></i> Repartidor asignado: <strong>Carlos Ruiz</strong><br>
                <i class="fa-solid fa-truck"></i> Vehículo: Furgón Refrigerado #04
            </div>
        </div>
    `;

    const progressBar = document.getElementById('progress-bar');
    const statusText = document.getElementById('status-text');

    setTimeout(() => {
        progressBar.style.width = "50%";
        statusText.textContent = "🚚 En ruta hacia su supermercado";
    }, 3000);

    setTimeout(() => {
        progressBar.style.width = "90%";
        statusText.textContent = "📍 Cerca del punto de entrega";
    }, 6000);

    setTimeout(() => {
        progressBar.style.width = "100%";
        statusText.textContent = "✅ ¡Pedido Entregado con Éxito!";
        statusText.style.background = "#D1E7DD";
        statusText.style.color = "#0F5132";
    }, 9000);
}