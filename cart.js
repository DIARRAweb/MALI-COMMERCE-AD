// Charger panier depuis localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Ajouter produit au panier
function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " a été ajouté au panier !");
}

// Afficher le panier
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const clearBtnContainer = document.getElementById("clear-cart");

  if (!cartItems || !totalElement) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>Prix unitaire : ${item.price} FCFA</p>
        <p>
          Quantité : 
          <input type="number" min="1" value="${item.quantity}" 
            onchange="updateQuantity(${index}, this.value)">
        </p>
        <p>Total : ${itemTotal} FCFA</p>
      </div>
      <button onclick="removeFromCart(${index})">❌ Supprimer</button>
    `;

    cartItems.appendChild(div);
  });

  totalElement.textContent = "Total : " + total + " FCFA";

  // Afficher bouton "Vider le panier" si panier non vide
  if (clearBtnContainer) {
    clearBtnContainer.innerHTML = "";
    if (cart.length > 0) {
      const btn = document.createElement("button");
      btn.textContent = "🗑 Vider le panier";
      btn.onclick = clearCart;
      btn.style.background = "red";
      btn.style.color = "white";
      btn.style.padding = "10px";
      btn.style.border = "none";
      btn.style.borderRadius = "8px";
      btn.style.cursor = "pointer";
      btn.style.marginTop = "15px";
      clearBtnContainer.appendChild(btn);
    }
  }

  // Ajouter infos panier dans formulaire
  const form = document.getElementById("orderForm");
  if (form) {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "panier";
    hiddenInput.value = JSON.stringify(cart);
    form.appendChild(hiddenInput);
  }
}

// Modifier quantité
function updateQuantity(index, newQuantity) {
  newQuantity = parseInt(newQuantity);
  if (newQuantity <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = newQuantity;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Supprimer un produit
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Vider tout le panier
function clearCart() {
  if (confirm("Voulez-vous vraiment annuler tous les produits du panier ?")) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }
}

// Charger le panier à l'ouverture de panier.html
window.onload = displayCart;




