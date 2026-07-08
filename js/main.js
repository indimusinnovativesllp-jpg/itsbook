/* ============================================================
   MARGINALIA — Page rendering & interactions
   ============================================================ */

const money = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const FREE_SHIPPING_THRESHOLD = 699;
const SHIPPING_FEE = 59;

/* ---------- Header: mobile nav toggle + search ---------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector("[data-nav-toggle]");
  if (toggle) {
    toggle.addEventListener("click", () => header.classList.toggle("is-open"));
  }

  const form = document.querySelector("[data-search-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = form.querySelector("input").value.trim();
      window.location.href = `shop.html${q ? "?q=" + encodeURIComponent(q) : ""}`;
    });
  }
}

/* ---------- Genre icon badges ---------- */
function genreIconSVG(icon) {
  const icons = {
    fiction: `<path d="M4 19V5a2 2 0 012-2h14v16H6a2 2 0 00-2 2z"/><path d="M20 22H6a2 2 0 010-4h14"/>`,
    mystery: `<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" stroke-linecap="round"/>`,
    scifi: `<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>`,
    fantasy: `<path d="M12 2l2.5 7H22l-6 4.5L18.5 21 12 16.5 5.5 21 8 13.5 2 9h7.5z"/>`,
    romance: `<path d="M12 21s-7.2-4.4-9.6-8.6C.6 8.4 3 4.2 7 4.2c2 0 3.5 1.1 5 3.1 1.5-2 3-3.1 5-3.1 4 0 6.4 4.2 4.6 8.2C19.2 16.6 12 21 12 21z"/>`,
    nonfiction: `<path d="M9 18h6M10 21h4M12 3a6 6 0 00-3 11c1 .8 1 1.5 1 2h4c0-.5 0-1.2 1-2a6 6 0 00-3-11z"/>`,
    kids: `<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>`,
  };
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[icon] || icons.fiction}</svg>`;
}

/* ---------- Book markup builders ---------- */
function bookCoverInner(book) {
  return `
    ${book.tag ? `<span class="book-tag">${book.tag}</span>` : ""}
    <span class="cover-icon">${genreIconSVG(book.icon)}</span>
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
        <span class="genre-label">${genreLabel(book.genre)}</span>
        <a href="#" class="title-link" onclick="openModal(${book.id});return false;">${book.title}</a>
        <span class="author">by ${book.author}</span>
        <span class="rating">★ ${book.rating.toFixed(1)}</span>
        <div class="price-row">
          <span class="price">${money(book.price)}</span>
          <button class="add-btn" title="${t("modal_add_to_cart")}" aria-label="${t("modal_add_to_cart")}: ${book.title}"
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
  btn.classList.add("is-added");
  setTimeout(() => { btn.innerHTML = original; btn.disabled = false; btn.classList.remove("is-added"); }, 900);
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

  const kids = document.querySelector("[data-kids]");
  if (kids) {
    const picks = BOOKS.filter(b => b.genre === "Children").slice(0, 5);
    kids.innerHTML = picks.map(renderBookCard).join("");
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
      `<button class="chip ${g === shopState.genre ? "is-active" : ""}" data-genre="${g}">${g === "All" ? t("chip_all") : genreLabel(g)}</button>`
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
  if (count) count.textContent = t("results_count", { n: list.length });

  if (!grid) return;
  if (list.length === 0) {
    grid.innerHTML = "";
    grid.insertAdjacentHTML("afterend", `<div class="empty-state" data-empty>${t("empty_results")}</div>`);
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
      <span class="genre-label">${genreLabel(book.genre)}</span>
      <h2>${book.title}</h2>
      <p class="muted">by ${book.author}</p>
      <div class="modal-meta">
        <span>★ ${book.rating.toFixed(1)}</span>
        <span>${book.pages} ${t("pages_suffix")}</span>
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
        <button class="btn btn-primary" onclick="addModalToCart(${book.id})">${t("modal_add_to_cart")}</button>
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
        <button class="remove-link" onclick="removeFromCart(${book.id});renderCartPage();">${t("remove_label")}</button>
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
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const set = (sel, val) => { const el = document.querySelector(sel); if (el) el.textContent = val; };
  set("[data-subtotal]", money(subtotal));
  set("[data-shipping]", shipping === 0 ? t("free_label") : money(shipping));
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
    const orderEl = document.querySelector("[data-order-number]");
    if (orderEl) orderEl.textContent = orderNumber;
    const note = document.querySelector("[data-confirm-note]");
    if (note) note.textContent = t("confirm_note", { orderNumber });
    document.querySelector("[data-checkout-form-wrap]").style.display = "none";
    document.querySelector("[data-confirm-panel]").style.display = "block";
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  targets.forEach(el => observer.observe(el));
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

  initScrollReveal();
});
