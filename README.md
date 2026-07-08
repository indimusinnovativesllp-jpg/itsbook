# Marginalia — an online bookstore

A polished, mobile-friendly e-commerce website for selling books, priced in
**Indian Rupees (₹)**. No coding framework, no build step — just plain HTML,
CSS and JavaScript, so it's easy to read, edit, and host for free on
**GitHub Pages**.

## What's new in this version

- **Fixed a real bug**: clicking a book used to open a popup with most of
  the space blank. The cause was a CSS grid that only had one box to put
  content in, so the layout collapsed into a narrow strip and left the rest
  empty. Rather than patch the popup, it's replaced with something better
  (see next point).
- **Every book now has its own full page** (`book.html?id=…`), the way
  Amazon or Flipkart product pages work — instead of a small popup. It has
  a large cover, price with delivery estimate, a PIN code delivery
  checker, trust badges (free delivery / dispatch time / returns), full
  book details (publisher, language, pages, ISBN, year), and a "You might
  also like" row of related titles. Clicking any book cover or title
  anywhere on the site takes you there.
- **Discount pricing** — Bestseller and New titles now show a struck-through
  original price and a "% off" badge, on both the cards and the product
  page, echoing the "50% off" banner instead of just being decorative text.
- **Redesigned hero** with a two-column layout, an illustrated "open book"
  graphic, and soft entrance animations.
- **A scrolling promo bar** ("New arrivals", "50% off", "Free shipping")
  that loops non-stop at the top of every page — pauses on hover, and
  respects visitors who've asked their device to reduce motion.
- **Kids' Corner** — a dedicated, playfully-colored homepage section and
  shop filter for children's picture books.
- **Language switcher** in the header — English, हिंदी (Hindi) and
  മലയാളം (Malayalam). It translates all the site's own text (navigation,
  buttons, headings, forms, the new product page). Book titles/authors/
  descriptions stay in English, the same way most multi-language stores
  keep product copy in one language to start.
- **All prices in ₹**, formatted the Indian way (`₹1,299`), with free
  shipping over ₹699.
- Hover/scroll animations: cards lift and catch a light "shine" on hover,
  sections fade up into view as you scroll, add-to-cart has a little
  confirmation animation.
- Book covers are illustrated in CSS (colored "spines" with a genre icon,
  a large watermark icon, and a glossy highlight) rather than photos. See
  **"About the book images"** below for why, and how to swap in real cover
  photos later.

## What's inside

```
marginalia/
├── index.html        Home page (hero + shelf + Kids' Corner + featured books)
├── shop.html          Full catalog with search, filters, sorting
├── book.html            Product detail page (?id=…) — cover, price, delivery, related books
├── cart.html           Shopping cart
├── checkout.html   Checkout form + order confirmation
├── css/
│   └── style.css        All styling (colors, fonts, layout, animations, mobile rules)
├── js/
│   ├── data.js            The list of books — edit this to add/remove books
│   ├── cart.js             Shopping cart logic (saved in the browser)
│   ├── i18n.js               Language switcher text + logic
│   └── main.js            Page behaviour (search, filters, product page, forms)
└── README.md
```

### How the "store" works right now

- The cart is saved in the visitor's browser (`localStorage`), so it stays
  there between visits on the same device, but isn't shared between devices.
- Checkout collects shipping + card details and shows an order confirmation,
  but **no real payment is taken** — there's no backend yet. This is normal
  for a first version. See "Taking real payments" below for the next step.

### About the book images

You asked for book images — here's the honest tradeoff I made and why.
I couldn't use real book cover photos, because these 24 books are invented
for the demo (no real covers exist), and I avoided hot-linking random stock
photos from the internet because those links can break or get blocked
without warning, which would leave your live site with broken images and
no easy way for a beginner to spot why. So each cover is drawn in CSS/SVG
instead — reliable, loads instantly, and never breaks.

**When you have real book photos** (your own product photography, or
covers you have the rights to use), swapping them in is straightforward:
1. Create an `images/` folder in the project and add your photo files there
   (e.g. `images/glass-orchard.jpg`).
2. In `js/data.js`, add a line to the relevant book object, e.g.
   `cover: "images/glass-orchard.jpg"`.
3. Ask me (or edit `js/main.js`) to swap the `.book-cover` div for an
   `<img src="{book.cover}">` when a `cover` field is present, falling back
   to the illustrated style when it isn't.

I'm glad to do that swap for you once you have real photos to upload.

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
   (`index.html`, `shop.html`, `book.html`, `cart.html`, `checkout.html`,
   the `css` folder, the `js` folder, and `README.md`).
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
  directly; it's plain HTML. If the text you're changing also appears in
  Hindi/Malayalam, update the matching entry in `js/i18n.js` too, or the
  English fallback will show through when someone switches language.
- **Change shipping price/threshold** → open `js/main.js`, edit the two
  constants near the top of the file: `FREE_SHIPPING_THRESHOLD` (currently
  ₹699) and `SHIPPING_FEE` (currently ₹59).
- **Add another language** → open `js/i18n.js`, copy the whole `hi: { ... }`
  block, translate each value, give the block a new two-letter key (e.g.
  `ta` for Tamil), then add a matching `<option value="ta">தமிழ்</option>`
  to the language `<select>` in all four HTML pages.
- **Change the marquee/promo messages** → open `js/i18n.js` and edit
  `marquee_1` through `marquee_4` (in all three language blocks).

After any edit, just re-upload the changed file(s) to GitHub (drag and drop
into the repo, or use GitHub Desktop) — GitHub Pages updates automatically
within a minute or two.

---

## 4. Taking real payments (next step, optional)

This version is a fully working front-end store — browsing, cart, checkout
UI — but it can't charge a real card, because that requires a server. When
you're ready, the easiest beginner-friendly options for an India-based shop
are:

- **Razorpay Payment Pages** or **Instamojo** — create a "Buy" link for
  each book (or a bundle) on their site, and link your "Add to cart"
  buttons to it. Built for Indian UPI/cards/netbanking, no backend coding
  required.
- **Stripe Payment Links** — similar idea, more common outside India.
- **Snipcart** or **Shopify Buy Button** — services designed to bolt a real
  shopping cart + payments onto a plain HTML site like this one.
- A custom backend (Node.js + Razorpay/Stripe API) — the flexible but more
  advanced route, worth doing once you're comfortable with the basics above.

Feel free to come back and ask for help wiring any of these up once you're
ready — the current cart and checkout pages are built so it's straightforward
to plug a real payment step in later.

---

## 5. Good next questions to ask if you want to keep building

- "Add a wishlist / save-for-later feature"
- "Add product reviews to the book detail popup"
- "Add pagination so the shop page doesn't show all books at once"
- "Connect Razorpay Payment Pages to the checkout button"
- "Add a fourth language (e.g. Tamil or Telugu) to the language switcher"
- "Swap in real book cover photos once I have them"

Have fun with it — and happy selling. 📚
