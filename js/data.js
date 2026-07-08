/* ============================================================
   MARGINALIA — Book catalog
   Add a new book by copying an object below and giving it a
   new unique "id" (just increase the number by 1).
   ============================================================ */

const BOOKS = [
  { id: 1, title: "The Glass Orchard", author: "Wren Halloway", price: 14.99, genre: "Fiction", spine: "forest", rating: 4.6, pages: 312, tag: "Bestseller", blurb: "Three sisters return to their family orchard the summer it stops bearing fruit, and start digging up everything that was buried instead." },
  { id: 2, title: "A Quiet Kind of Loud", author: "Priya Anand", price: 12.50, genre: "Fiction", spine: "oxblood", rating: 4.4, pages: 288, tag: "New", blurb: "A shy radio engineer accidentally starts broadcasting her diary to an entire city." },
  { id: 3, title: "Nine Doors to Midnight", author: "Colton Reyes", price: 16.00, genre: "Mystery", spine: "navy", rating: 4.7, pages: 356, tag: "Bestseller", blurb: "A locked-room mystery set in a hotel where every door leads to a different hour of the same night." },
  { id: 4, title: "The Cartographer's Alibi", author: "Simone Okafor", price: 15.25, genre: "Mystery", spine: "olive", rating: 4.3, pages: 302, tag: "", blurb: "A mapmaker is the last person to see a missing village — and the only one who insists it never existed." },
  { id: 5, title: "Salt and Static", author: "Devon Marsh", price: 13.75, genre: "Mystery", spine: "charcoal", rating: 4.1, pages: 274, tag: "", blurb: "A coastal radio operator picks up a distress call from a ship that sank forty years ago." },
  { id: 6, title: "Ferrous Dawn", author: "Kai Nakamura", price: 18.99, genre: "Sci-Fi", spine: "plum", rating: 4.8, pages: 412, tag: "Bestseller", blurb: "The last blacksmith in a solar system of machines is asked to forge something that isn't a weapon." },
  { id: 7, title: "The Drift Between Stations", author: "Elin Vasko", price: 17.50, genre: "Sci-Fi", spine: "mustard", rating: 4.5, pages: 368, tag: "New", blurb: "A train conductor on a line between star systems starts losing passengers to platforms that shouldn't exist." },
  { id: 8, title: "Static Bloom", author: "Marcus Webb", price: 15.99, genre: "Sci-Fi", spine: "forest", rating: 4.2, pages: 296, tag: "", blurb: "Botanists discover a flower that only grows in zero gravity — and only blooms when someone nearby is lying." },
  { id: 9, title: "Everything We Left in June", author: "Naomi Castellanos", price: 13.25, genre: "Romance", spine: "oxblood", rating: 4.6, pages: 268, tag: "New", blurb: "Two co-owners of a failing bookshop have eleven months to save it, and about eleven years of unfinished business." },
  { id: 10, title: "The Long Way to Tuesday", author: "Ben Okonkwo", price: 12.99, genre: "Romance", spine: "navy", rating: 4.4, pages: 244, tag: "", blurb: "A courier who delivers letters by bicycle keeps ending up at the same door, one street too early." },
  { id: 11, title: "Marrow and Marigold", author: "Isla Fen", price: 16.50, genre: "Fantasy", spine: "plum", rating: 4.9, pages: 448, tag: "Bestseller", blurb: "A gardener discovers her greenhouse is the last door between the living world and the one underneath it." },
  { id: 12, title: "The Ninth Apprentice", author: "Tobias Lindqvist", price: 15.75, genre: "Fantasy", spine: "mustard", rating: 4.3, pages: 392, tag: "", blurb: "Eight apprentices before her have vanished from the tower. She is determined to be the first to leave on her own terms." },
  { id: 13, title: "Where the Rivers Keep Their Names", author: "Adaeze Nwosu", price: 17.99, genre: "Fantasy", spine: "olive", rating: 4.7, pages: 420, tag: "New", blurb: "A cartographer is hired to redraw a kingdom's rivers — and realizes the rivers have opinions about it." },
  { id: 14, title: "The Unhurried Kitchen", author: "Margaret Sole", price: 22.00, genre: "Nonfiction", spine: "forest", rating: 4.8, pages: 224, tag: "Bestseller", blurb: "A working chef's case for slowness, built around forty recipes designed to be interrupted." },
  { id: 15, title: "Borrowed Light", author: "Dr. Femi Adebayo", price: 19.50, genre: "Nonfiction", spine: "charcoal", rating: 4.5, pages: 288, tag: "", blurb: "An astrophysicist explains the universe using nothing but things you can find in a kitchen drawer." },
  { id: 16, title: "The Ledger of Small Repairs", author: "Hana Kobayashi", price: 18.25, genre: "Nonfiction", spine: "oxblood", rating: 4.6, pages: 256, tag: "New", blurb: "A furniture restorer's memoir about what fixing broken things teaches you about fixing yourself." },
  { id: 17, title: "The Paper Fox", author: "Yusuf Demir", price: 11.99, genre: "Children", spine: "mustard", rating: 4.9, pages: 48, tag: "Bestseller", blurb: "A fox made of origami sets out to find the hands that folded him, one gust of wind at a time." },
  { id: 18, title: "Bramble and the Very Long Nap", author: "Lucy Everhart", price: 10.99, genre: "Children", spine: "olive", rating: 4.7, pages: 40, tag: "", blurb: "A hedgehog tries every trick in the burrow to stay awake for spring — and misses the best part every time." },
  { id: 19, title: "The Boy Who Collected Thunder", author: "Rafael Duarte", price: 12.25, genre: "Children", spine: "navy", rating: 4.8, pages: 52, tag: "New", blurb: "A small boy with a very large jar sets out to catch a storm before it wakes his baby sister." },
  { id: 20, title: "Ash Wednesday People", author: "Colton Reyes", price: 16.75, genre: "Fiction", spine: "plum", rating: 4.2, pages: 334, tag: "", blurb: "Four strangers who survived the same accident meet once a year to compare the lives they didn't live." },
  { id: 21, title: "The Weight of Small Rooms", author: "Julia Marchetti", price: 14.50, genre: "Fiction", spine: "charcoal", rating: 4.4, pages: 298, tag: "", blurb: "An auctioneer of estate sales starts keeping one object from every house — and one story from every family." },
  { id: 22, title: "The Quiet Astronaut", author: "Mei Lin", price: 17.25, genre: "Sci-Fi", spine: "oxblood", rating: 4.6, pages: 340, tag: "", blurb: "The first person on Mars was never meant to be alone — until the rest of the crew stopped waking up." },
];

const GENRES = [...new Set(BOOKS.map(b => b.genre))].sort();
