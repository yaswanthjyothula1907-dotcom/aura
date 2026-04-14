import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "velours-noir",
    name: "'Velours Noir'",
    price: 2450,
    originalPrice: 3100,
    badge: "SALE",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    category: "Bags",
    description:
      "Evening Bag — Discover the pinnacle of artisanal craftsmanship and modern elegance.",
    currency: "₹",
  },
  {
    id: "orbital",
    name: "'Orbital'",
    price: 8900,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    category: "Jewellery",
    description:
      "Diamond Earrings — Discover the pinnacle of artisanal craftsmanship and modern elegance.",
    currency: "₹",
  },
  {
    id: "luna",
    name: "'Luna'",
    price: 580,
    originalPrice: 720,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
    category: "Scarves",
    description:
      "Silk Scarf — Discover the pinnacle of artisanal craftsmanship and modern elegance.",
    currency: "₹",
  },
  {
    id: "aeterna-watch",
    name: "'Aeterna'",
    price: 14200,
    badge: "EXCLUSIVE",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
    category: "Watches",
    description:
      "Wristwatch — Discover the pinnacle of artisanal craftsmanship and modern elegance.",
    currency: "₹",
  },
  {
    id: "soleil",
    name: "'Soleil'",
    price: 3750,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    category: "Shoes",
    description:
      "Platform Heels — Discover the pinnacle of artisanal craftsmanship and modern elegance.",
    currency: "₹",
  },
  {
    id: "mirage",
    name: "'Mirage'",
    price: 1290,
    originalPrice: 1680,
    badge: "SALE",
    image:
      "https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=600&q=80",
    category: "Accessories",
    description:
      "Chain Belt — Discover the pinnacle of artisanal craftsmanship and modern elegance.",
    currency: "₹",
  },
  {
    id: "celeste",
    name: "'Celeste'",
    price: 6400,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
    category: "Jewellery",
    description:
      "Sapphire Necklace — Discover the pinnacle of artisanal craftsmanship and modern elegance.",
    currency: "₹",
  },
  {
    id: "noir-clutch",
    name: "'Noir'",
    price: 1875,
    image:
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    category: "Bags",
    description:
      "Satin Clutch — Discover the pinnacle of artisanal craftsmanship and modern elegance.",
    currency: "₹",
  },
];

export const featuredProduct = products[3];
