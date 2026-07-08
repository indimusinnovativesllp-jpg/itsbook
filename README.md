# Marginalia — an online bookstore

A simple, mobile-friendly e-commerce website for selling books. No coding
framework, no build step — just plain HTML, CSS and JavaScript, so it's easy
to read, edit, and host for free on **GitHub Pages**.

## What's inside

```
marginalia/
├── index.html        Home page (hero + shelf + featured books)
├── shop.html          Full catalog with search, filters, sorting
├── cart.html           Shopping cart
├── checkout.html   Checkout form + order confirmation
├── css/
│   └── style.css        All styling (colors, fonts, layout, mobile rules)
├── js/
│   ├── data.js            The list of books — edit this to add/remove books
│   ├── cart.js             Shopping cart logic (saved in the browser)
│   └── main.js            Page behaviour (search, filters, modal, forms)
└── README.md
```

### How the "store" works right now

- The cart is saved in the visitor's browser (`localStorage`), so it stays
  there between visits on the same device, but isn't shared between devices.
- Checkout collects shipping + card details and shows an order confirmation,
  but **no real payment is taken** — there's no backend yet. This is normal
  for a first version. See "Taking real payments" below for the next step.

---

## 1. Try it on your computer first

1. Download/unzip this `marginalia` folder.
2. Double-click `index.html` — it opens in your browser and the whole site
   works (browsing, cart, checkout demo). No installation needed.

---

## 2. Put it on GitHub

If you're brand new to GitHub, here's the whole path, step by step.

### A. Create a GitHub account
Go to [github.com](https://github.com) and sign up if you haven't already.

### B. Create a new repository
1. Click the **+** icon (top right) → **New repository**.
2. Name it something like `marginalia-bookstore`.
3. Leave it **Public** (required for the free version of GitHub Pages).
4. Don't add a README/gitignore (you already have one) — just click
   **Create repository**.

### C. Upload your code
On the empty repository page, click **uploading an existing file**, then:
1. Drag in all the files and folders from this `marginalia` folder
   (`index.html`, `shop.html`, `cart.html`, `checkout.html`, the `css`
   folder, the `js` folder, and `README.md`).
2. Scroll down, click **Commit changes**.

*(If you later install [GitHub Desktop](https://desktop.github.com) or use
the `git` command line, you can push updates that way instead — but drag-and-drop
in the browser is perfectly fine to start.)*

### D. Turn on GitHub Pages
1. In your repository, go to **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
4. Wait about a minute, then refresh — GitHub shows you a live link like:
   `https://your-username.github.io/marginalia-bookstore/`

That link is your live website. Anyone can open it, on phone or computer.

---

## 3. Customize it

You don't need much coding knowledge to edit the basics:

- **Add or edit books** → open `js/data.js`. Copy one book object, paste it,
  give it a new unique `id`, and change the title/author/price/genre/etc.
  Available `genre` values you already have: Fiction, Mystery, Sci-Fi,
  Fantasy, Romance, Nonfiction, Children (you can add new genres too — they
  show up automatically as filter buttons on the shop page).
- **Change the shop name/colors** → open `css/style.css`, the very top
  section (`:root { ... }`) lists all the colors as named variables.
- **Change text on the home page** → open `index.html` and edit the text
  directly; it's plain HTML.
- **Change shipping price/threshold** → open `js/main.js`, search for
  `4.99` and `35` inside the `updateSummary()` function.

After any edit, just re-upload the changed file(s) to GitHub (drag and drop
into the repo, or use GitHub Desktop) — GitHub Pages updates automatically
within a minute or two.

---

## 4. Taking real payments (next step, optional)

This version is a fully working front-end store — browsing, cart, checkout
UI — but it can't charge a real card, because that requires a server. When
you're ready, the easiest beginner-friendly options are:

- **Stripe Payment Links** or **Gumroad** — create a "Buy" link for each
  book (or a bundle) on their site, and link your "Add to cart" buttons to
  it. No backend coding required.
- **Snipcart** or **Shopify Buy Button** — services designed to bolt a real
  shopping cart + payments onto a plain HTML site like this one.
- A custom backend (Node.js + Stripe API) — the flexible but more advanced
  route, worth doing once you're comfortable with the basics above.

Feel free to come back and ask for help wiring any of these up once you're
ready — the current cart and checkout pages are built so it's straightforward
to plug a real payment step in later.

---

## 5. Good next questions to ask if you want to keep building

- "Add a wishlist / save-for-later feature"
- "Add product reviews to the book detail popup"
- "Add pagination so the shop page doesn't show all books at once"
- "Connect Stripe Payment Links to the checkout button"

Have fun with it — and happy selling. 📚
