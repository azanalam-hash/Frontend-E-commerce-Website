/* load thumbnails */
product.images.forEach(img => {

  document.getElementById("thumbnails").innerHTML += `
    <img src="${img}" class="thumb">
  `;

});

/* change main image */
document.querySelectorAll(".thumb").forEach(img => {

  img.addEventListener("click", () => {
    document.getElementById("mainImage").src = img.src;
  });

});

let qty = 1;

document.getElementById("increase").onclick = () => {
  qty++;
  document.getElementById("qty").textContent = qty;
};

document.getElementById("decrease").onclick = () => {
  if(qty > 1){
    qty--;
    document.getElementById("qty").textContent = qty;
  }
};

let qty = 1;

document.getElementById("increase").onclick = () => {
  qty++;
  document.getElementById("qty").textContent = qty;
};

document.getElementById("decrease").onclick = () => {
  if(qty > 1){
    qty--;
    document.getElementById("qty").textContent = qty;
  }
};