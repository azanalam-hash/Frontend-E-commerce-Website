/* =========================================
MOBILE NAVBAR TOGGLE
========================================= */

// get hamburger button
const hamburger = document.getElementById("hamburger");

// get menu
const navMenu = document.getElementById("navMenu");

// toggle menu on click
hamburger.addEventListener("click", () => {

  // add/remove active class
  navMenu.classList.toggle("active");

});


/* =========================================
MOBILE DROPDOWN TOGGLE
========================================= */

// select dropdown parent
const dropdown = document.querySelector(".dropdown");

// toggle dropdown on click (mobile)
dropdown.addEventListener("click", () => {

  dropdown.classList.toggle("active");

});


// Hero Section 



const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let currentIndex = 0;
let interval;

// Create dots dynamically
slides.forEach((_, index) => {
  const dot = document.createElement("span");
  if (index === 0) dot.classList.add("active-dot");

  dot.addEventListener("click", () => {
    goToSlide(index);
  });

  dotsContainer.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll(".dots span").forEach(dot =>
    dot.classList.remove("active-dot")
  );
  document.querySelectorAll(".dots span")[currentIndex].classList.add("active-dot");
}

function goToSlide(index) {
  currentIndex = index;
  slider.style.transform = `translateX(-${currentIndex * 115}%)`;
  updateDots();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  goToSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  goToSlide(currentIndex);
}

// nextBtn.addEventListener("click", nextSlide);
// prevBtn.addEventListener("click", prevSlide);

// Auto-play
function startAutoPlay() {
  interval = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
  clearInterval(interval);
}

slider.addEventListener("mouseover", stopAutoPlay);
slider.addEventListener("mouseout", startAutoPlay);

startAutoPlay();





/*
========================================
DYNAMIC FEATURED PRODUCTS LOADING
========================================

We will:
1. Select the container
2. Loop through products array
3. Create HTML for each product
4. Insert into DOM

We only show first 8 products for homepage.
*/

const featuredContainer = document.getElementById("featuredProducts");

/*
Function: loadFeaturedProducts()
Purpose:
- Dynamically display first 8 products on homepage
- This avoids hardcoding HTML
- Makes it scalable
*/

function loadFeaturedProducts() {

  // Clear container before inserting (important if reloading)
  featuredContainer.innerHTML = "";

  // Slice first 8 products from array
  const featured = products.slice(0, 8);

  // Loop through products
  featured.forEach(product => {

    // Create product card HTML using template literals
    const productHTML = `
      <div class="product-card">

        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        <p>
          <span class="price">$${product.price}</span>
          <span class="old-price">$${product.originalPrice}</span>
        </p>

        <button class="add-to-cart" data-id="${product.id}">
          Add to Cart
        </button>

      </div>
    `;

    // Insert into container
    featuredContainer.innerHTML += productHTML;
  });
}

// Call function when page loads
loadFeaturedProducts();





/*
========================================
DYNAMIC CATEGORY LOADING
========================================

We:
1. Select category container
2. Loop through categories array
3. Insert cards dynamically
*/

const categoryContainer = document.getElementById("categoryContainer");

function loadCategories() {

  categoryContainer.innerHTML = "";

  categories.forEach(category => {

    const categoryHTML = `
      <div class="category-card">
        <img src="${category.image}" alt="${category.name}">
        <h3>${category.name}</h3>
      </div>
    `;

    categoryContainer.innerHTML += categoryHTML;
  });
}

loadCategories();



/*
========================================
CART BADGE UPDATE FUNCTION
========================================

Purpose:
- Get cart from localStorage
- Count total quantity
- Update badge number

This runs on every page load
*/

/* ========================================
UPDATE CART BADGE COUNT
======================================== */

function updateCartBadge(){

  // get cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // calculate total quantity
  const total = cart.reduce((sum,item)=>{
    return sum + item.quantity;
  },0);

  // update badge UI
  document.getElementById("cartCount").textContent = total;
}

// Run when page loads
updateCartBadge();





/*
========================================
LIVE SEARCH FUNCTIONALITY
========================================

We:
1. Listen to input typing
2. Filter products array
3. Reload featured section with filtered products
*/

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

  const searchValue = this.value.toLowerCase();

  // Filter products by name
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue)
  );

  // Clear container
  featuredContainer.innerHTML = "";

  // Show filtered products
  filteredProducts.forEach(product => {

    const productHTML = `
      <div class="product-card">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>
          <span class="price">$${product.price}</span>
        </p>
      </div>
    `;

    featuredContainer.innerHTML += productHTML;
  });

});



/*
========================================
CART DRAWER OPEN & CLOSE
========================================
*/

const cartIcon = document.querySelector(".cart-icon");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

// Open cart when cart icon clicked
cartIcon.addEventListener("click", () => {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
  loadCartItems(); // Load items every time it opens
});

// Close cart
function closeCartDrawer() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}

closeCart.addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);



/* ========================================
ADD TO CART FUNCTIONALITY (CORE LOGIC)
======================================== */

document.addEventListener("click", function(e){

  // check if clicked element is "Add to Cart" button
  if(e.target.classList.contains("add-to-cart")){

    // get product id from button data attribute
    const productId = parseInt(e.target.dataset.id);

    // get existing cart from localStorage
    // if no cart exists, use empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    /*
    cart structure example:
    [
      { id: 1, quantity: 2 },
      { id: 3, quantity: 1 }
    ]
    */

    // check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);

    if(existingItem){

      // if product already exists → increase quantity
      existingItem.quantity += 1;

    } else {

      // if product not in cart → add new item
      cart.push({
        id: productId,
        quantity: 1
      });

    }

    // save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // update cart badge count
    updateCartBadge();

    // reload cart drawer items
    loadCartItems();

    // optional: show success message
    showToast("Item added to cart ✅");

  }

});


/* ========================================
LOAD CART ITEMS INTO DRAWER
======================================== */

function loadCartItems(){

  const container = document.getElementById("cartItems");
  const subtotalElement = document.getElementById("cartSubtotal");

  // get cart
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  container.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item=>{

    // find full product data using id
    const product = products.find(p => p.id === item.id);

    if(!product) return;

    // calculate subtotal
    subtotal += product.price * item.quantity;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${product.image}">
        <div>
          <h4>${product.name}</h4>
          <p>$${product.price} x ${item.quantity}</p>
        </div>
      </div>
    `;
  });

  subtotalElement.textContent = subtotal.toFixed(2);
}


