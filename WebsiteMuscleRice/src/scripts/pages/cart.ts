/**
 * ================================================================
 * cart.ts — Sistema de Carrito de Compras MuscleRice
 * ================================================================
 */

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

// ── STATE MANAGEMENT ──
let cart: CartItem[] = JSON.parse(localStorage.getItem('mr-cart') || '[]');

// ── CONSTANTS ──
const SHIPPING_FEE = 5000; // Flat shipping fee in COP ($5.000)

// ── HELPERS ──

/**
 * Formatea un número como moneda colombiana (ej. $95.000)
 */
function formatCurrency(value: number): string {
  return '$' + new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Guarda el carrito actual en el localStorage
 */
function saveCartToStorage(): void {
  localStorage.setItem('mr-cart', JSON.stringify(cart));
}

/**
 * Actualiza los contadores y totales del carrito en los encabezados (header)
 */
function updateCartTotals(): void {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const countElements = document.querySelectorAll('.cart-count');
  const priceElements = document.querySelectorAll('.cart-price');

  countElements.forEach(el => {
    el.textContent = totalCount.toString();
  });

  priceElements.forEach(el => {
    el.textContent = formatCurrency(totalPrice);
  });
}

/**
 * Ejecuta una micro-interacción visual (brinco/escala) sobre el icono del carrito del header
 */
function triggerHeaderCartBump(): void {
  const headerCartLink = document.querySelector('.header-cart a');
  if (headerCartLink) {
    headerCartLink.classList.add('cart-bump');
    headerCartLink.addEventListener('animationend', () => {
      headerCartLink.classList.remove('cart-bump');
    }, { once: true });
  }
}

// ── ADD TO CART (addToCart) ──

/**
 * Añade un producto al carrito y ejecuta animaciones
 */
function addToCart(product: Product, button?: HTMLButtonElement): void {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartTotals();
  triggerHeaderCartBump();

  if (button) {
    const originalContent = button.innerHTML;
    button.classList.add('added');
    button.disabled = true;

    button.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      ¡Añadido! 💪
    `;

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
 */
function changeQuantity(id: string, delta: number): void {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    const itemEl = document.querySelector(`.item[data-id="${id}"]`) as HTMLElement | null;
    removeCartItem(id, itemEl);
  } else {
    saveCartToStorage();
    updateCartTotals();
    renderCartPage();
  }
}

/**
 * Elimina un producto por completo aplicando una animación de salida
 */
function removeCartItem(id: string, itemEl?: HTMLElement | null): void {
  cart = cart.filter(item => item.id !== id);
  saveCartToStorage();

  if (itemEl) {
    itemEl.classList.add('fade-out');
    itemEl.addEventListener('transitionend', function () {
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
function renderCartPage(): void {
  const wrapper = document.getElementById('cart-content-wrapper');
  const emptyState = document.getElementById('cart-empty-state');
  const itemsList = document.getElementById('cart-items-list');

  if (!itemsList) return;

  if (cart.length === 0) {
    if (wrapper) wrapper.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (wrapper) wrapper.style.display = 'block';
  if (emptyState) emptyState.style.display = 'none';

  const scrollPos = window.scrollY;

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

  window.scrollTo(0, scrollPos);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + SHIPPING_FEE;

  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');

  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  if (totalEl) totalEl.textContent = formatCurrency(total);
}

// ── DOM LIFECYCLE ──
document.addEventListener('DOMContentLoaded', () => {
  updateCartTotals();

  // 1. Delegación e Event Listeners de "Añadir al carrito" (.btn-add-cart o .elite-add-cart)
  // Nota: Algunos productos en index.html usan .btn-add-cart y otros usan .elite-add-cart.
  // Vamos a soportar ambos selectores.
  
  // Para .elite-add-cart
  const eliteAddBtns = document.querySelectorAll('.elite-add-cart');
  eliteAddBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.elite-product-card') as HTMLElement | null;
      if (!card) return;

      const id = card.id || card.getAttribute('data-id') || 'product-' + Math.random().toString(36).substring(2, 11);
      const nameEl = card.querySelector('.elite-product-name');
      const priceEl = card.querySelector('.elite-product-price');
      const imgEl = card.querySelector('.elite-product-img');

      if (!nameEl || !priceEl) return;

      const name = nameEl.textContent?.trim() || '';
      const price = parseInt(priceEl.textContent?.replace(/\D/g, '') || '0') || 0;
      const image = imgEl ? imgEl.getAttribute('src') || 'img/default.jpg' : 'img/default.jpg';

      addToCart({ id, name, price, image }, btn as HTMLButtonElement);
    });
  });

  // Para .btn-add-cart (como los de index.html: Whey Protein, Creatina, etc.)
  const addCartBtns = document.querySelectorAll('.btn-add-cart');
  addCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card') as HTMLElement | null;
      if (!card) return;

      const nameEl = card.querySelector('.product-title');
      const priceEl = card.querySelector('.product-price');
      const imgEl = card.querySelector('.product-image');

      if (!nameEl || !priceEl) return;

      const name = nameEl.textContent?.trim() || '';
      const price = parseInt(priceEl.textContent?.replace(/\D/g, '') || '0') || 0;
      const image = imgEl ? imgEl.getAttribute('src') || 'img/default.jpg' : 'img/default.jpg';
      const id = 'product-' + name.replace(/\s+/g, '-').toLowerCase();

      addToCart({ id, name, price, image }, btn as HTMLButtonElement);
    });
  });

  // 2. Delegación en la lista de items del carrito (carrito.html)
  const itemsList = document.getElementById('cart-items-list');
  if (itemsList) {
    itemsList.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const itemEl = target.closest('.item') as HTMLElement | null;
      if (!itemEl) return;

      const id = itemEl.dataset.id;
      if (!id) return;

      if (target.classList.contains('btn-qty-plus')) {
        changeQuantity(id, 1);
      } else if (target.classList.contains('btn-qty-minus')) {
        changeQuantity(id, -1);
      } else if (target.classList.contains('btn-eliminar')) {
        removeCartItem(id, itemEl);
      }
    });

    renderCartPage();
  }
});

export {};
