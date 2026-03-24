/* ============================= */
/* PRODUCT LISTING LOGIC */
/* ============================= */


// container where products will appear
const container = document.getElementById("productsContainer");


// number of products initially visible
let visibleProducts = 8;


// copy of products array
// this allows filtering without losing original data
let filteredProducts = [...products];



/* ============================= */
/* FUNCTION: renderProducts */
/* This function shows products */
/* ============================= */

function renderProducts(){

// clear container before rendering
container.innerHTML = "";

// show only visible products
filteredProducts
.slice(0,visibleProducts)
.forEach(product=>{


container.innerHTML += `
<div class="product-card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>$${product.price}</p>

<p class="rating">⭐ ${product.rating}</p>

<button class="add-to-cart" data-id="${product.id}">
Add to Cart
</button>

</div>
`;

});

}

/* ============================= */
/* CATEGORY FILTER */
/* ============================= */

const categoryCheckboxes =
document.querySelectorAll(".category-filter");

categoryCheckboxes.forEach(box=>{

box.addEventListener("change",()=>{

// get checked categories
const selected =
[...categoryCheckboxes]
.filter(c=>c.checked)
.map(c=>c.value);


// if none selected show all
if(selected.length===0){
filteredProducts=[...products];
}

// otherwise filter
else{

filteredProducts=products.filter(product=>
selected.includes(product.category)
);

}

renderProducts();

});

});

/* ============================= */
/* PRICE FILTER */
/* ============================= */

const minPrice=document.getElementById("minPrice");
const maxPrice=document.getElementById("maxPrice");

function applyPriceFilter(){

const min=parseFloat(minPrice.value)||0;
const max=parseFloat(maxPrice.value)||Infinity;

filteredProducts=products.filter(product=>
product.price>=min && product.price<=max
);

renderProducts();

}

minPrice.addEventListener("input",applyPriceFilter);
maxPrice.addEventListener("input",applyPriceFilter);


/* ============================= */
/* SORT PRODUCTS */
/* ============================= */

const sortSelect=document.getElementById("sortProducts");

sortSelect.addEventListener("change",()=>{

const value=sortSelect.value;

if(value==="low-high"){
filteredProducts.sort((a,b)=>a.price-b.price);
}

if(value==="high-low"){
filteredProducts.sort((a,b)=>b.price-a.price);
}

if(value==="name"){
filteredProducts.sort((a,b)=>
a.name.localeCompare(b.name)
);
}

if(value==="rating"){
filteredProducts.sort((a,b)=>b.rating-a.rating);
}

renderProducts();

});


/* ============================= */
/* SEARCH PRODUCTS */
/* ============================= */

const productSearch=document.getElementById("productSearch");

productSearch.addEventListener("input",()=>{

const value=productSearch.value.toLowerCase();

filteredProducts=products.filter(product=>
product.name.toLowerCase().includes(value)
);

renderProducts();

});

/* show products when page loads */
renderProducts();


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
