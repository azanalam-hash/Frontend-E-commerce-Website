// get product id from URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

// find product
const product = products.find(p => p.id === productId);

// set text
document.getElementById("productTitle").textContent = product.name;
document.getElementById("productPrice").textContent = "$" + product.price;
document.getElementById("productDesc").textContent = product.description;
document.getElementById("productRating").textContent = "⭐ " + product.rating;

// main image
const mainImage = document.getElementById("mainImage");
mainImage.src = product.image;

const thumbnails = document.getElementById("thumbnails");

product.images.forEach(img => {

  thumbnails.innerHTML += `<img src="${img}" class="thumb">`;

});

document.querySelectorAll(".thumb").forEach(img => {

  img.addEventListener("click", () => {
    mainImage.src = img.src;
  });

});

document.getElementById("addToCart").addEventListener("click", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === productId);

  if(existing){
    existing.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity: quantity
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // 🔥 connect with your previous system
  updateCartBadge();
  loadCartItems();
  showToast("Added to cart ✅");

});

document.getElementById("addToCart").addEventListener("click", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === productId);

  if(existing){
    existing.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity: quantity
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // 🔥 connect with your previous system
  updateCartBadge();
  loadCartItems();
  showToast("Added to cart ✅");

});

const relatedContainer = document.getElementById("relatedProducts");

const related = products.filter(p =>
  p.category === product.category && p.id !== product.id
);

related.slice(0,4).forEach(p => {

  relatedContainer.innerHTML += `
    <div class="product-card">
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <p>$${p.price}</p>

      <button onclick="goToProduct(${p.id})">View</button>
    </div>
  `;

});

function goToProduct(id){
  window.location.href = `product-detail.html?id=${id}`;
}