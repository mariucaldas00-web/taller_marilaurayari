// Exactamente 8 productos con sus respectivas imágenes y precios colombianos
const productos = [
    {
        id: 1,
        nombre: "Leche Entera Alquería (Pack x12)",
        categoria: "frescos",
        precio: 48500,
        imagen: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        nombre: "Queso Fresco Bloque (2kg)",
        categoria: "frescos",
        precio: 34000,
        imagen: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        nombre: "Arroz Diana (Saco 25kg)",
        categoria: "abarrotes",
        precio: 98000,
        imagen: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        nombre: "Aceite Vegetal Premier 3000ml",
        categoria: "abarrotes",
        precio: 34200,
        imagen: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        nombre: "Café Sello Rojo (500g)",
        categoria: "abarrotes",
        precio: 18900,
        imagen: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        nombre: "Panela Redonda x 4 Unidades",
        categoria: "abarrotes",
        precio: 6500,
        imagen: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        nombre: "Jugo Hit Hit Tropical (Pack x6)",
        categoria: "bebidas",
        precio: 14500,
        imagen: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        nombre: "Gaseosa Postobón Colombiana 2.5L",
        categoria: "bebidas",
        precio: 7200,
        imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80"
    }
];

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    renderizarCatalogo(productos);
});

function renderizarCatalogo(lista) {
    const contenedor = document.getElementById("catalogo");
    contenedor.innerHTML = "";

    lista.forEach(prod => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("product-card");
        tarjeta.innerHTML = `
            <div>
                <img src="${prod.imagen}" alt="${prod.nombre}" class="product-img">
                <div class="product-info">
                    <h4 class="product-title">${prod.nombre}</h4>
                    <p class="product-price">$ ${prod.precio.toLocaleString('es-CO')}</p>
                </div>
            </div>
            <button class="btn-add" onclick="agregarAlCarrito(${prod.id})">
                <i class="fa-solid fa-plus"></i> Agregar al Pedido
            </button>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function filtrar(categoria, boton) {
    document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('activo'));
    boton.classList.add('activo');

    if (categoria === 'todos') {
        renderizarCatalogo(productos);
    } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        renderizarCatalogo(filtrados);
    }
}

function agregarAlCarrito(id) {
    const prod = productos.find(p => p.id === id);
    const itemEnCarrito = carrito.find(p => p.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...prod, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const contenedor = document.getElementById("cart-items");
    const countBadge = document.getElementById("cart-count");
    const subtotalSpan = document.getElementById("cart-subtotal");
    const totalSpan = document.getElementById("cart-total");
    const btnCheckout = document.querySelector(".btn-checkout");

    contenedor.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = `<p class="empty-cart">El carrito está vacío.</p>`;
        btnCheckout.classList.remove("activo");
    } else {
        carrito.forEach(item => {
            total += item.precio * item.cantidad;
            totalItems += item.cantidad;

            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <span>${item.nombre} (x${item.cantidad})</span>
                <strong>$ ${(item.precio * item.cantidad).toLocaleString('es-CO')}</strong>
            `;
            contenedor.appendChild(div);
        });
        btnCheckout.classList.add("activo");
    }

    countBadge.textContent = totalItems;
    subtotalSpan.textContent = `$ ${total.toLocaleString('es-CO')}`;
    totalSpan.textContent = `$ ${total.toLocaleString('es-CO')}`;
}

function toggleCart() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function procesarPedido() {
    if (carrito.length === 0) {
        alert("Agrega al menos un producto a tu pedido.");
        return;
    }
    alert("¡Pedido realizado con éxito en ClickFood! El sistema ha registrado tu compra y va en camino.");
    carrito = [];
    actualizarCarrito();
}