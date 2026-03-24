/* 
========================================
PRODUCT DATA STRUCTURE
========================================

We are creating a products array.
This acts like our database (since no backend allowed).

Each product is an OBJECT.
All objects are stored inside an ARRAY.

Why?
Because:
- We can loop through array
- Filter it
- Sort it
- Search inside it
- Dynamically display products
*/

const products = [

  {
    id: 1, // Unique ID (important for cart & wishlist)
    name: "Urban Travel Backpack",
    category: "Travel", // Used for filtering
    price: 59.99,
    originalPrice: 79.99, // For showing discount
    image: "https://payne-demo.myshopify.com/cdn/shop/products/10_daed5f76-755e-4d9d-ac19-5afea83e4fdb_large.jpg?v=1606710616", // Main image
    images: [
      "images/products/bag1.png",
      "images/products/bag1-2.png"
    ], // For product detail gallery
    description: "Premium waterproof backpack perfect for travel and daily use.",
    rating: 4.5, // Used for star display
    reviewCount: 120,
    inStock: true,
    sizes: ["Standard"],
    colors: ["Black", "Red"]
    // variants: [
    //   {
    //     color: "Black",
    //     image: "https://payne-demo.myshopify.com/cdn/shop/products/10_daed5f76-755e-4d9d-ac19-5afea83e4fdb_large.jpg?v=1606710616",
    //     price: 59.99
    //   },
    //   {
    //     color: "Red",
    //     image: "images/products/bag1.png",
    //     price: 64.99
    //   }
    // ]
  },

  {
    id: 2,
    name: "Laptop Backpack Pro",
    category: "Office",
    price: 69.99,
    originalPrice: 89.99,
    image: "https://payne-demo.myshopify.com/cdn/shop/products/6_f98801ee-0ade-4f30-ae76-fddd3d82cb30_large.jpg?v=1636260067",
    images: [
      "images/products/bag2.png",
      "images/products/bag2-2.png"
    ],
    description: "Secure laptop backpack with USB charging port.",
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    sizes: ["15 inch", "17 inch"],
    colors: ["Gray", "Black"]
  },
  {
    id: 2,
    name: "Laptop Backpack Pro",
    category: "Office",
    price: 69.99,
    originalPrice: 89.99,
    image: "images/products/bag2.png",
    images: [
      "images/products/bag2.png",
      "images/products/bag2-2.png"
    ],
    description: "Secure laptop backpack with USB charging port.",
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    sizes: ["15 inch", "17 inch"],
    colors: ["Gray", "Black"]
  },
  {
    id: 2,
    name: "Laptop Backpack Pro",
    category: "Office",
    price: 69.99,
    originalPrice: 89.99,
    image: "images/products/bag2.png",
    images: [
      "images/products/bag2.png",
      "images/products/bag2-2.png"
    ],
    description: "Secure laptop backpack with USB charging port.",
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    sizes: ["15 inch", "17 inch"],
    colors: ["Gray", "Black"]
  },
  {
    id: 2,
    name: "Laptop Backpack Pro",
    category: "Office",
    price: 69.99,
    originalPrice: 89.99,
    image: "images/products/bag2.png",
    images: [
      "images/products/bag2.png",
      "images/products/bag2-2.png"
    ],
    description: "Secure laptop backpack with USB charging port.",
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    sizes: ["15 inch", "17 inch"],
    colors: ["Gray", "Black"]
  },
  {
    id: 2,
    name: "Laptop Backpack Pro",
    category: "Office",
    price: 69.99,
    originalPrice: 89.99,
    image: "images/products/bag2.png",
    images: [
      "images/products/bag2.png",
      "images/products/bag2-2.png"
    ],
    description: "Secure laptop backpack with USB charging port.",
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    sizes: ["15 inch", "17 inch"],
    colors: ["Gray", "Black"]
  },
  {
    id: 2,
    name: "Laptop Backpack Pro",
    category: "Office",
    price: 69.99,
    originalPrice: 89.99,
    image: "images/products/bag2.png",
    images: [
      "images/products/bag2.png",
      "images/products/bag2-2.png"
    ],
    description: "Secure laptop backpack with USB charging port.",
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    sizes: ["15 inch", "17 inch"],
    colors: ["Gray", "Black"]
  },
  {
    id: 2,
    name: "Laptop Backpack Pro",
    category: "Office",
    price: 69.99,
    originalPrice: 89.99,
    image: "images/products/bag2.png",
    images: [
      "images/products/bag2.png",
      "images/products/bag2-2.png"
    ],
    description: "Secure laptop backpack with USB charging port.",
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    sizes: ["15 inch", "17 inch"],
    colors: ["Gray", "Black"]
  },

  // Add minimum 8 products total
  // For now add dummy structure, later you can duplicate and modify

];



/*
========================================
CATEGORIES DATA STRUCTURE
========================================

We create a categories array.
Each category is an object.

This allows:
- Dynamic rendering
- Filtering products later
- Scalable structure
*/

const categories = [
  {
    id: 1,
    name: "Travel",
    image: "images/categories/travel.jpg"
  },
  {
    id: 2,
    name: "Office",
    image: "images/categories/office.jpg"
  },
  {
    id: 3,
    name: "Hiking",
    image: "images/categories/hiking.jpg"
  },
  {
    id: 4,
    name: "School",
    image: "images/categories/school.jpg"
  }
];