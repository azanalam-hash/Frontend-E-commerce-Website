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




/* =========================================
GLOBAL ELEMENTS (we will use these everywhere)
========================================= */

// cart icon in navbar
const cartIcon = document.querySelector(".cart-icon");

// cart drawer panel
const cartDrawer = document.getElementById("cartDrawer");

// overlay behind cart
const cartOverlay = document.getElementById("cartOverlay");

// close button inside cart
const closeCart = document.getElementById("closeCart");


/* =========================================
OPEN CART DRAWER
========================================= */

cartIcon.addEventListener("click", () => {

  // show drawer
  cartDrawer.classList.add("active");

  // show dark overlay
  cartOverlay.classList.add("active");

  // load latest cart data
  loadCartItems();

});


/* =========================================
CLOSE CART DRAWER
========================================= */

function closeCartDrawer(){

  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");

}

// close button click
closeCart.addEventListener("click", closeCartDrawer);

// clicking outside (overlay)
cartOverlay.addEventListener("click", closeCartDrawer);


/* =========================================
ADD TO CART SYSTEM
========================================= */

document.addEventListener("click", function(e){

  // check if Add to Cart button clicked
  if(e.target.classList.contains("add-to-cart")){

    // get product ID
    const productId = parseInt(e.target.dataset.id);

    // get cart from storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // check if product already exists
    const existingItem = cart.find(item => item.id === productId);

    if(existingItem){

      // increase quantity
      existingItem.quantity += 1;

    } else {

      // add new product
      cart.push({
        id: productId,
        quantity: 1
      });

    }

    // save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // update UI
    updateCartBadge();
    loadCartItems();

    // OPTIONAL: open cart automatically
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");

  }

});

/* =========================================
UPDATE CART COUNT (NAVBAR)
========================================= */

function updateCartBadge(){

  // get cart
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // calculate total quantity
  const total = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  // update UI
  document.getElementById("cartCount").textContent = total;

}

/* =========================================
UPDATE CART COUNT (NAVBAR)
========================================= */

function updateCartBadge(){

  // get cart
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // calculate total quantity
  const total = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  // update UI
  document.getElementById("cartCount").textContent = total;

}

/* =========================================
LOAD CART ITEMS INTO DRAWER
========================================= */

function loadCartItems(){

  const container = document.getElementById("cartItems");
  const subtotalElement = document.getElementById("cartSubtotal");

  // get cart
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // clear old content
  container.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {

    // get product full data from data.js
    const product = products.find(p => p.id === item.id);

    if(!product) return;

    // calculate subtotal
    subtotal += product.price * item.quantity;

    // render item
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

  // update subtotal
  subtotalElement.textContent = subtotal.toFixed(2);

}






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