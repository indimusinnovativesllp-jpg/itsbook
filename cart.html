/* ============================================================
   MARGINALIA — Page rendering & interactions
   ============================================================ */

const money = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const FREE_SHIPPING_THRESHOLD = 699;
const SHIPPING_FEE = 59;
const PUBLISHER_NAME = "Marginalia Press";

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
    <span class="cover-watermark">${genreIconSVG(book.icon)}</span>
    <p class="cover-author">${book.author}</p>
    <div class="rule"></div>
    <h3>${book.title}</h3>
  `;
}

/* Pricing: bestsellers and new arrivals show a struck-through MRP + % off,
   matching the "flat 50% off" promo banner without discounting everything. */
function priceInfo(book) {
  const hasDiscount = book.tag === "Bestseller" || book.tag === "New";
  if (!hasDiscount) return { mrp: null, discountPct: 0 };
  const mrp = Math.round((book.price * 1.18) / 10) * 10;
  const discountPct = Math.round((1 - book.price / mrp) * 100);
  return { mrp, discountPct };
}

function priceRowHTML(book) {
  const { mrp, discountPct } = priceInfo(book);
  if (!mrp) return `<span class="price">${money(book.price)}</span>`;
  return `
    <span class="price">${money(book.price)}</span>
    <span class="mrp">${money(mrp)}</span>
    <span class="discount-pill">${t("percent_off", { d: discountPct })}</span>
  `;
}

function renderBookCard(book) {
  return `
    <article class="book-card">
      <a class="book-cover spine-${book.spine}" href="book.html?id=${book.id}" aria-label="${book.title}">
        ${bookCoverInner(book)}
      </a>
      <div class="book-info">
        <span class="genre-label">${genreLabel(book.genre)}</span>
        <a href="book.html?id=${book.id}" class="title-link">${book.title}</a>
        <span class="author">by ${book.author}</span>
        <span class="rating">★ ${book.rating.toFixed(1)}</span>
        <div class="price-row">
          <span class="price-group">${priceRowHTML(book)}</span>
          <button class="add-btn" title="${t("add_to_cart_btn")}" aria-label="${t("add_to_cart_btn")}: ${book.title}"
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
    <a class="spine ${sizeClass} spine-${book.spine}" href="book.html?id=${book.id}" title="${book.title}">
      <span>${book.title}</span>
    </a>
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

/* ---------- Book detail page ---------- */
function reviewCount(book) {
  return 32 + ((book.id * 47) % 300);
}

function fakeIsbn(book) {
  const block = String(8000 + book.id * 37).slice(0, 4);
  return `978-93-${block}-${String(10 + book.id).padStart(2, "0")}-${book.id % 10}`;
}

function publishYear(book) {
  return 2022 + (book.id % 4);
}

function relatedBooks(book) {
  let list = BOOKS.filter(b => b.genre === book.genre && b.id !== book.id);
  if (list.length < 4) {
    const extra = BOOKS.filter(b => b.id !== book.id && !list.includes(b) && b.tag === "Bestseller");
    list = list.concat(extra);
  }
  return list.slice(0, 4);
}

function renderBookDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const book = BOOKS.find(b => b.id === id);
  const wrap = document.querySelector("[data-book-detail]");
  if (!book || !wrap) {
    window.location.href = "shop.html";
    return;
  }

  document.title = `${book.title} — Marginalia`;

  const crumb = document.querySelector("[data-breadcrumb]");
  if (crumb) {
    crumb.innerHTML = `
      <a href="index.html" data-i18n="breadcrumb_home">Home</a>
      <span>/</span>
      <a href="shop.html" data-i18n="nav_shop">Shop</a>
      <span>/</span>
      <a href="shop.html?genre=${encodeURIComponent(book.genre)}">${genreLabel(book.genre)}</a>
      <span>/</span>
      <span class="current">${book.title}</span>
    `;
    crumb.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.getAttribute("data-i18n")); });
  }

  wrap.innerHTML = `
    <div class="pd-cover-col">
      <div class="book-cover pd-cover spine-${book.spine}">
        ${bookCoverInner(book)}
      </div>
    </div>
    <div class="pd-info-col">
      <span class="genre-label">${genreLabel(book.genre)}</span>
      <h1>${book.title}</h1>
      <p class="pd-author">by ${book.author}</p>
      <div class="pd-rating-row">
        <span class="rating">★ ${book.rating.toFixed(1)}</span>
        <span class="muted">(${t("reviews_suffix", { n: reviewCount(book) })})</span>
      </div>
      <div class="pd-price-row">${priceRowHTML(book)}</div>
      <p class="pd-blurb">${book.blurb}</p>

      <div class="pd-buy-row">
        <div class="qty-control">
          <button type="button" onclick="stepPdQty(-1)" aria-label="Decrease quantity">−</button>
          <input type="text" inputmode="numeric" value="1" data-pd-qty readonly>
          <button type="button" onclick="stepPdQty(1)" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn btn-primary" onclick="pdAddToCart(${book.id})">${t("add_to_cart_btn")}</button>
        <button class="btn btn-gold" onclick="pdBuyNow(${book.id})">${t("buy_now_btn")}</button>
      </div>

      <div class="delivery-box">
        <h3>${t("delivery_heading")}</h3>
        <div class="delivery-input-row">
          <input type="text" inputmode="numeric" maxlength="6" data-pincode-input placeholder="${t("delivery_placeholder")}">
          <button type="button" class="btn btn-outline" onclick="checkDelivery()">${t("delivery_check_btn")}</button>
        </div>
        <p class="delivery-result" data-delivery-result></p>
        <ul class="trust-list">
          <li>${t("free_delivery_note")}</li>
          <li>${t("dispatch_note")}</li>
          <li>${t("return_policy_note")}</li>
        </ul>
      </div>
    </div>
    <div class="pd-details-col">
      <h2>${t("about_heading")}</h2>
      <p>${book.blurb}</p>
      <h2>${t("details_heading")}</h2>
      <table class="spec-table">
        <tr><th>${t("publisher_label")}</th><td>${PUBLISHER_NAME}</td></tr>
        <tr><th>${t("language_label")}</th><td>English</td></tr>
        <tr><th>${t("pages_suffix")}</th><td>${book.pages}</td></tr>
        <tr><th>${t("isbn_label")}</th><td>${fakeIsbn(book)}</td></tr>
        <tr><th>${t("published_label")}</th><td>${publishYear(book)}</td></tr>
      </table>
    </div>
  `;

  const related = document.querySelector("[data-related]");
  if (related) related.innerHTML = relatedBooks(book).map(renderBookCard).join("");

  initScrollReveal();
}

function stepPdQty(delta) {
  const input = document.querySelector("[data-pd-qty]");
  const next = Math.max(1, Number(input.value) + delta);
  input.value = next;
}

function pdAddToCart(id) {
  const qty = Number(document.querySelector("[data-pd-qty]").value) || 1;
  addToCart(id, qty);
  const btn = document.querySelector(".pd-buy-row .btn-primary");
  if (btn) flashAdded(btn);
}

function pdBuyNow(id) {
  const qty = Number(document.querySelector("[data-pd-qty]").value) || 1;
  addToCart(id, qty);
  window.location.href = "checkout.html";
}

function checkDelivery() {
  const input = document.querySelector("[data-pincode-input]");
  const result = document.querySelector("[data-delivery-result]");
  const pin = input.value.trim();
  if (!/^\d{6}$/.test(pin)) {
    result.textContent = t("delivery_invalid");
    result.classList.add("is-error");
    return;
  }
  result.classList.remove("is-error");
  const from = new Date();
  from.setDate(from.getDate() + 3);
  const to = new Date();
  to.setDate(to.getDate() + 6);
  const fmt = (d) => d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
  result.textContent = t("delivery_result", { date: `${fmt(from)} – ${fmt(to)}`, pincode: pin });
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
      <a class="mini-spine spine-${book.spine}" href="book.html?id=${book.id}">${book.title}</a>
      <div>
        <a class="line-title" href="book.html?id=${book.id}">${book.title}</a>
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
  const targets = document.querySelectorAll(".reveal:not(.is-visible)");
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

  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "shop") initShop();
  if (page === "book") renderBookDetail();
  if (page === "cart") renderCartPage();
  if (page === "checkout") { renderCheckoutSummary(); initCheckoutForm(); }

  initScrollReveal();
});
