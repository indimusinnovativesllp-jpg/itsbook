/* ============================================================
   MARGINALIA — Page rendering & interactions
   ============================================================ */

const money = (n) => `$${n.toFixed(2)}`;

/* ---------- Header: mobile nav toggle ---------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector("[data-nav-toggle]");
  if (toggle) {
    toggle.addEventListener("click", () => header.classList.toggle("is-open"));
  }

  // search box (works from any page, sends user to shop.html?q=...)
  const form = document.querySelector("[data-search-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = form.querySelector("input").value.trim();
      window.location.href = `shop.html${q ? "?q=" + encodeURIComponent(q) : ""}`;
    });
  }
}

/* ---------- Book markup builders ---------- */
function bookCoverInner(book) {
  return `
    ${book.tag ? `<span class="book-tag">${book.tag}</span>` : ""}
    <p class="cover-author">${book.author}</p>
    <div class="rule"></div>
    <h3>${book.title}</h3>
  `;
}

function renderBookCard(book) {
  return `
    <article class="book-card">
      <div class="book-cover spine-${book.spine}" onclick="openModal(${book.id})" role="button" tabindex="0"
           onkeydown="if(event.key==='Enter')openModal(${book.id})">
        ${bookCoverInner(book)}
      </div>
      <div class="book-info">
        <span class="genre-label">${book.genre}</span>
        <a href="#" class="title-link" onclick="openModal(${book.id});return false;">${book.title}</a>
        <span class="author">by ${book.author}</span>
        <span class="rating">★ ${book.rating.toFixed(1)}</span>
        <div class="price-row">
          <span class="price">${money(book.price)}</span>
          <button class="add-btn" title="Add to cart" aria-label="Add ${book.title} to cart"
                  onclick="addToCart(${book.id});flashAdded(this)">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
              <path d="M12 5v14M5 12h14" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

function flashAdded(btn) {
  const original = btn.innerHTML;
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M5 12l5 5L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  btn.disabled = true;
  setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 900);
}

function renderShelfSpine(book) {
  const sizeClass = book.id % 3 === 0 ? "tall" : book.id % 3 === 1 ? "" : "short";
  return `
    <div class="spine ${sizeClass} spine-${book.spine}" onclick="openModal(${book.id})" role="button" tabindex="0"
         onkeydown="if(event.key==='Enter')openModal(${book.id})" title="${book.title}">
      <span>${book.title}</span>
    </div>
  `;
}

/* ---------- Home page ---------- */
function renderHome() {
  const shelf = document.querySelector("[data-shelf]");
  if (shelf) shelf.innerHTML = BOOKS.slice(0, 14).map(renderShelfSpine).join("");

  const featured = document.querySelector("[data-featured]");
  if (featured) {
    const picks = BOOKS.filter(b => b.tag === "Bestseller").slice(0, 4);
    featured.innerHTML = picks.map(renderBookCard).join("");
  }

  const newIn = document.querySelector("[data-new]");
  if (newIn) {
    const picks = BOOKS.filter(b => b.tag === "New").slice(0, 4);
    newIn.innerHTML = picks.map(renderBookCard).join("");
  }
}

/* ---------- Shop page ---------- */
let shopState = { genre: "All", query: "", sort: "featured" };

function initShop() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("q")) shopState.query = params.get("q");
  if (params.get("genre")) shopState.genre = params.get("genre");

  const chipRow = document.querySelector("[data-genre-chips]");
  if (chipRow) {
    const chips = ["All", ...GENRES].map(g =>
      `<button class="chip ${g === shopState.genre ? "is-active" : ""}" data-genre="${g}">${g}</button>`
    ).join("");
    chipRow.innerHTML = chips;
    chipRow.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-genre]");
      if (!btn) return;
      shopState.genre = btn.dataset.genre;
      chipRow.querySelectorAll(".chip").forEach(c => c.classList.toggle("is-active", c === btn));
      renderShop();
    });
  }

  const searchInput = document.querySelector("[data-shop-search]");
  if (searchInput) {
    searchInput.value = shopState.query;
    searchInput.addEventListener("input", () => {
      shopState.query = searchInput.value;
      renderShop();
    });
  }

  const sortSelect = document.querySelector("[data-sort]");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      shopState.sort = sortSelect.value;
      renderShop();
    });
  }

  renderShop();
}

function renderShop() {
  let list = BOOKS.filter(b => {
    const matchGenre = shopState.genre === "All" || b.genre === shopState.genre;
    const q = shopState.query.trim().toLowerCase();
    const matchQuery = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    return matchGenre && matchQuery;
  });

  if (shopState.sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (shopState.sort === "price-desc") list.sort((a, b) => b.price - a.price);
  if (shopState.sort === "rating") list.sort((a, b) => b.rating - a.rating);
  if (shopState.sort === "title") list.sort((a, b) => a.title.localeCompare(b.title));

  const grid = document.querySelector("[data-shop-grid]");
  const count = document.querySelector("[data-results-count]");
  if (count) count.textContent = `${list.length} book${list.length === 1 ? "" : "s"} found`;

  if (!grid) return;
  if (list.length === 0) {
    grid.innerHTML = "";
    grid.insertAdjacentHTML("afterend", `<div class="empty-state" data-empty>No books match your search. Try a different genre or keyword.</div>`);
  } else {
    document.querySelector("[data-empty]")?.remove();
    grid.innerHTML = list.map(renderBookCard).join("");
  }
}

/* ---------- Book detail modal ---------- */
function openModal(id) {
  const book = BOOKS.find(b => b.id === id);
  if (!book) return;
  const backdrop = document.querySelector("[data-modal-backdrop]");
  const content = document.querySelector("[data-modal-content]");
  content.innerHTML = `
    <div class="modal-cover spine-${book.spine}">
      ${bookCoverInner(book)}
    </div>
    <div class="modal-body">
      <span class="genre-label">${book.genre}</span>
      <h2>${book.title}</h2>
      <p class="muted">by ${book.author}</p>
      <div class="modal-meta">
        <span>★ ${book.rating.toFixed(1)} rating</span>
        <span>${book.pages} pages</span>
        ${book.tag ? `<span>${book.tag}</span>` : ""}
      </div>
      <p>${book.blurb}</p>
      <p class="price" style="font-size:1.4rem">${money(book.price)}</p>
      <div class="modal-actions">
        <div class="qty-control">
          <button type="button" onclick="stepModalQty(-1)" aria-label="Decrease quantity">−</button>
          <input type="text" inputmode="numeric" value="1" data-modal-qty readonly>
          <button type="button" onclick="stepModalQty(1)" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn btn-primary" onclick="addModalToCart(${book.id})">Add to cart</button>
      </div>
    </div>
  `;
  backdrop.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function stepModalQty(delta) {
  const input = document.querySelector("[data-modal-qty]");
  const next = Math.max(1, Number(input.value) + delta);
  input.value = next;
}

function addModalToCart(id) {
  const qty = Number(document.querySelector("[data-modal-qty]").value) || 1;
  addToCart(id, qty);
  closeModal();
}

function closeModal() {
  document.querySelector("[data-modal-backdrop]")?.classList.remove("is-open");
  document.body.style.overflow = "";
}

function initModal() {
  const backdrop = document.querySelector("[data-modal-backdrop]");
  if (!backdrop) return;
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/* ---------- Cart page ---------- */
function renderCartPage() {
  const container = document.querySelector("[data-cart-lines]");
  if (!container) return;
  const lines = cartLines();

  const layout = document.querySelector("[data-cart-layout]");
  const emptyState = document.querySelector("[data-cart-empty]");

  if (lines.length === 0) {
    layout.style.display = "none";
    emptyState.style.display = "block";
    return;
  }
  layout.style.display = "grid";
  emptyState.style.display = "none";

  container.innerHTML = lines.map(({ book, qty, lineTotal }) => `
    <div class="cart-line">
      <div class="mini-spine spine-${book.spine}">${book.title}</div>
      <div>
        <p class="line-title">${book.title}</p>
        <p class="line-author">by ${book.author}</p>
        <button class="remove-link" onclick="removeFromCart(${book.id});renderCartPage();">Remove</button>
      </div>
      <div class="qty-control">
        <button type="button" aria-label="Decrease quantity" onclick="setQuantity(${book.id}, ${qty - 1});renderCartPage();">−</button>
        <input type="text" value="${qty}" readonly>
        <button type="button" aria-label="Increase quantity" onclick="setQuantity(${book.id}, ${qty + 1});renderCartPage();">+</button>
      </div>
      <div class="line-total">${money(lineTotal)}</div>
    </div>
  `).join("");

  updateSummary();
}

function updateSummary() {
  const subtotal = cartSubtotal();
  const shipping = subtotal === 0 || subtotal >= 35 ? 0 : 4.99;
  const total = subtotal + shipping;

  const set = (sel, val) => { const el = document.querySelector(sel); if (el) el.textContent = val; };
  set("[data-subtotal]", money(subtotal));
  set("[data-shipping]", shipping === 0 ? "Free" : money(shipping));
  set("[data-total]", money(total));
}

/* ---------- Checkout page ---------- */
function renderCheckoutSummary() {
  const list = document.querySelector("[data-checkout-items]");
  if (!list) return;
  const lines = cartLines();

  if (lines.length === 0) {
    window.location.href = "shop.html";
    return;
  }

  list.innerHTML = lines.map(({ book, qty, lineTotal }) => `
    <div class="checkout-order-item">
      <span>${book.title} × ${qty}</span>
      <span>${money(lineTotal)}</span>
    </div>
  `).join("");

  updateSummary();
}

function initCheckoutForm() {
  const form = document.querySelector("[data-checkout-form]");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const orderNumber = "MG" + Math.floor(100000 + Math.random() * 899999);
    document.querySelector("[data-order-number]").textContent = orderNumber;
    document.querySelector("[data-checkout-form-wrap]").style.display = "none";
    document.querySelector("[data-confirm-panel]").style.display = "block";
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initModal();

  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "shop") initShop();
  if (page === "cart") renderCartPage();
  if (page === "checkout") { renderCheckoutSummary(); initCheckoutForm(); }
});
