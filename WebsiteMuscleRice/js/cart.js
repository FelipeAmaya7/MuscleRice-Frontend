/**
 * MUSCLERICE — SHOPPING CART SYSTEM
 * Lógica en Vanilla JS para Añadir, Eliminar y Modificar Cantidades en el Carrito.
 */

// ── STATE MANAGEMENT ──
let cart = JSON.parse(localStorage.getItem('mr-cart')) || [];

// ── CONSTANTS ──
const SHIPPING_FEE = 5000; // Flat shipping fee in COP ($5.000)

// ── HELPERS ──
/**
 * Formatea un número como moneda colombiana (ej. $95.000)
 * @param {number} value 
 * @returns {string}
 */
function formatCurrency(value) {
    return '$' + new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

/**
 * Guarda el carrito actual en el localStorage
 */
function saveCartToStorage() {
    localStorage.setItem('mr-cart', JSON.stringify(cart));
}

/**
 * Actualiza los contadores y totales del carrito en los encabezados (header)
 */
function updateCartTotals() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const countElements = document.querySelectorAll('.cart-count');
    const priceElements = document.querySelectorAll('.cart-price');

    countElements.forEach(el => {
        el.textContent = totalCount;
    });

    priceElements.forEach(el => {
        el.textContent = formatCurrency(totalPrice);
    });
}

/**
 * Ejecuta una micro-interacción visual (brinco/escala) sobre el icono del carrito del header
 */
function triggerHeaderCartBump() {
    const headerCartLink = document.querySelector('.header-cart a');
    if (headerCartLink) {
        headerCartLink.classList.add('cart-bump');
        // Remove class when animation finishes so it can trigger again on next add
        headerCartLink.addEventListener('animationend', () => {
            headerCartLink.classList.remove('cart-bump');
        }, { once: true });
    }
}

// ── ADD TO CART (addToCart) ──
/**
 * Añade un producto al carrito y ejecuta animaciones
 * @param {Object} product - Objeto con {id, name, price, image}
 * @param {HTMLButtonElement} button - Botón que disparó la acción
 */
function addToCart(product, button) {
    // Buscar si ya existe en el carrito
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    // Persistir
    saveCartToStorage();

    // Actualizar Header
    updateCartTotals();

    // Animación en el Header
    triggerHeaderCartBump();

    // Micro-interacción en el botón
    if (button) {
        const originalContent = button.innerHTML;
        button.classList.add('added');
        button.disabled = true;
        
        // Cambiar contenido por el mensaje de éxito
        button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            ¡Añadido! 💪
        `;

        // Revertir estado después de 1.5s
        setTimeout(() => {
            button.classList.remove('added');
            button.innerHTML = originalContent;
            button.disabled = false;
        }, 1500);
    }
}

// ── REMOVE & QUANTITY MANAGEMENT (Cart Page) ──
/**
 * Modifica la cantidad de un artículo en el carrito
 * @param {string} id - ID del producto
 * @param {number} delta - Variación en cantidad (+1 o -1)
 */
function changeQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        const itemEl = document.querySelector(`.item[data-id="${id}"]`);
        removeCartItem(id, itemEl);
    } else {
        saveCartToStorage();
        updateCartTotals();
        renderCartPage();
    }
}

/**
 * Elimina un producto por completo aplicando una animación de salida
 * @param {string} id - ID del producto
 * @param {HTMLElement} itemEl - Nodo HTML del producto en la vista
 */
function removeCartItem(id, itemEl) {
    // 1. Quitar del arreglo
    cart = cart.filter(item => item.id !== id);
    saveCartToStorage();

    // 2. Animación de salida (CSS transition)
    if (itemEl) {
        itemEl.classList.add('fade-out');
        
        // Esperar a que termine la animación de fade-out y colapso de altura
        itemEl.addEventListener('transitionend', function() {
            itemEl.remove();
            updateCartTotals();
            renderCartPage();
        }, { once: true });
    } else {
        updateCartTotals();
        renderCartPage();
    }
}

/**
 * Renderiza dinámicamente la página de carrito (carrito.html)
 */
function renderCartPage() {
    const wrapper = document.getElementById('cart-content-wrapper');
    const emptyState = document.getElementById('cart-empty-state');
    const itemsList = document.getElementById('cart-items-list');

    // Si no estamos en la página del carrito, terminar
    if (!itemsList) return;

    if (cart.length === 0) {
        // Mostrar vista vacía
        if (wrapper) wrapper.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    // Mostrar contenido del carrito
    if (wrapper) wrapper.style.display = 'block';
    if (emptyState) emptyState.style.display = 'none';

    // Guardar el scroll actual para evitar saltos bruscos
    const scrollPos = window.scrollY;

    // Renderizar productos
    itemsList.innerHTML = '';
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'item';
        itemEl.dataset.id = item.id;
        
        itemEl.innerHTML = `
            <img src="${item.image}" class="product-img" alt="${item.name}">

            <div class="item-info">
                <h3>${item.name}</h3>

                <div class="cantidad-controls">
                    <button class="btn-qty-minus" aria-label="Disminuir cantidad">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="btn-qty-plus" aria-label="Aumentar cantidad">+</button>
                </div>
            </div>

            <div class="precio">${formatCurrency(item.price * item.quantity)}</div>
            <button class="btn-eliminar" aria-label="Eliminar producto de compra">Eliminar</button>
        `;
        itemsList.appendChild(itemEl);
    });

    // Restaurar scroll
    window.scrollTo(0, scrollPos);

    // Calcular y renderizar Resumen
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + SHIPPING_FEE;

    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (totalEl) totalEl.textContent = formatCurrency(total);
}

// ── DOM LIFECYCLE ──
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar totales del header al cargar
    updateCartTotals();

    // 1. Delegar e inicializar Event Listeners de "Añadir al carrito" (.elite-add-cart)
    const addCartBtns = document.querySelectorAll('.elite-add-cart');
    addCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.elite-product-card');
            if (!card) return;

            const id = card.id || card.getAttribute('data-id') || 'product-' + Math.random().toString(36).substr(2, 9);
            const name = card.querySelector('.elite-product-name').textContent.trim();
            
            // Parsear precio (quitando caracteres no numéricos)
            const priceText = card.querySelector('.elite-product-price').textContent;
            const price = parseInt(priceText.replace(/\D/g, '')) || 0;
            
            // Obtener imagen
            const imgEl = card.querySelector('.elite-product-img');
            const image = imgEl ? imgEl.getAttribute('src') : 'img/default.jpg';

            addToCart({ id, name, price, image }, btn);
        });
    });

    // 2. Delegar Event Listeners en la lista de items del carrito (carrito.html)
    const itemsList = document.getElementById('cart-items-list');
    if (itemsList) {
        itemsList.addEventListener('click', (e) => {
            const itemEl = e.target.closest('.item');
            if (!itemEl) return;
            
            const id = itemEl.dataset.id;

            if (e.target.classList.contains('btn-qty-plus')) {
                changeQuantity(id, 1);
            } else if (e.target.classList.contains('btn-qty-minus')) {
                changeQuantity(id, -1);
            } else if (e.target.classList.contains('btn-eliminar')) {
                removeCartItem(id, itemEl);
            }
        });

        // Primera renderización en el checkout
        renderCartPage();
    }
});
