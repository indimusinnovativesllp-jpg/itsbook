/* ============================================================
   MARGINALIA — Cart logic
   The cart lives in the browser's localStorage, so it is saved
   between visits but only on this one device/browser.
   ============================================================ */

const CART_KEY = "marginalia_cart";

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : {};
  // shape: { "1": 2, "5": 1 }  ->  bookId: quantity
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
}

function setQuantity(id, qty) {
  const cart = getCart();
  if (qty <= 0) {
    delete cart[id];
  } else {
    cart[id] = qty;
  }
  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function cartItemCount() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, q) => sum + q, 0);
}

function cartLines() {
  const cart = getCart();
  return Object.entries(cart)
    .map(([id, qty]) => {
      const book = BOOKS.find(b => b.id === Number(id));
      if (!book) return null;
      return { book, qty, lineTotal: book.price * qty };
    })
    .filter(Boolean);
}

function cartSubtotal() {
  return cartLines().reduce((sum, line) => sum + line.lineTotal, 0);
}

function updateCartBadge() {
  const badge = document.querySelector("[data-cart-badge]");
  if (!badge) return;
  const count = cartItemCount();
  badge.textContent = count;
  badge.classList.toggle("is-hidden", count === 0);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
