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