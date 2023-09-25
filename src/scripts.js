let cart = [];
let cartTotal = 0.00;

function renderProductList() {
  const productList = document.getElementById('shop');
  productList.innerHTML = '';
  
  shopItemsData.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'col card-container';
    productCard.innerHTML =  `
      <div class="card">
        <img src=${product.img} class="img-fluid" width="300px">
        <div class="card-body">
          <h5 class="card-title mb-0">${product.name}</h5>
          <p class="card-text">&#8369;<span>${product.price}</span></p>
          <button onclick="openModal(${shopItemsData.indexOf(product)})" class="btn btn-success fs-6" data-bs-toggle="modal" data-bs-target="#exampleModal">Add to cart</button>
        </div>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

function openModal(productIndex) {
  const product = shopItemsData[productIndex];
  const modalContainer = document.getElementById('modal-content');
  modalContainer.innerHTML = `
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">${product.name}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="modal-img-container mb-1">
        <img id="modal-img" class="img-fluid" src=${product.img} alt="">
      </div>
      <div class="modal-qty-container">
        <i onclick="decreaseQuantity()" class="bi bi-dash-circle-fill" style="font-size: 2rem; color: red;"></i>
        <span id="quantity" class="quantity">1</span>
        <i onclick="increaseQuantity()" class="bi bi-plus-circle-fill" style="font-size: 2rem; color: green;"></i>
      </div>
      <p id="modal-price" class="modal-price mb-0">&#8369;${product.price}</p>
    </div>
    <div class="modal-footer">
      <button onclick="updateCart()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Proceed</button>
    </div>
  `;
}

function increaseQuantity() {
  const quantitySpan = document.getElementById('quantity');
  let quantity = parseInt(quantitySpan.textContent);
  quantity = isNaN(quantity) ? 1 : quantity + 1;
  quantitySpan.textContent = quantity;
}

function decreaseQuantity() {
  const quantitySpan = document.getElementById('quantity');
  let quantity = parseInt(quantitySpan.textContent);
  quantity = isNaN(quantity) ? 1 : Math.max(1, quantity - 1);
  quantitySpan.textContent = quantity;
}

function updateCart() {
  const quantityInput = document.getElementById('quantity');
  const quantity = parseInt(quantityInput.textContent);
  const selectedProduct = shopItemsData.find(product => product.name === document.getElementById('exampleModalLabel').textContent);

  if (!isNaN(quantity) && quantity > 0) {
      const existingCartItemIndex = cart.findIndex(item => item.name === selectedProduct.name);

      if (existingCartItemIndex !== -1) {
          // If the product already exists in the cart, accumulate the quantity
          cart[existingCartItemIndex].quantity += quantity;
      } else {
          selectedProduct.quantity = quantity; // Set quantity
          cart.push(selectedProduct);
      }
  }

  // Update the cart display
  renderCart()
}

function renderCart() {
  const cartItems = document.getElementById('table-body');
  const cartTotalElement = document.getElementById('cart-total');

  // Clear the cart
  cartItems.innerHTML = '';

  // Iterate through the cart
  cart.forEach(item => {
      const cartItem = document.createElement('tr');
      cartItem.innerHTML = `
      <th scope="row">
        <img class="rounded" src=${item.img} alt="" width="65px">
      </th>
      <td>${item.name}</td>
      <td>
        <i onclick="decreaseCartItemQuantity(${item.id})" class="bi bi-dash-circle-fill" style="color: red;"></i>
        <span>${item.quantity}</span>
        <i onclick="increaseCartItemQuantity(${item.id})" class="bi bi-plus-circle-fill" style="color: green;"></i>
      </td>
      <td>&#8369; ${item.price}</td>
      `;
      cartItems.appendChild(cartItem);
  });

  // Calculate and display the total sum
  cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  cartTotalElement.textContent = cartTotal.toFixed(2);
}

function increaseCartItemQuantity(itemId) {
  const item = cart.find(product => product.id === itemId);
  if (item) {
      item.quantity++;
      renderCart(); // Update the cart display
  }
}

function decreaseCartItemQuantity(itemId) {
  const item = cart.find(product => product.id === itemId);
  if (item && item.quantity > 1) {
      item.quantity--;
      renderCart(); // Update the cart display
  }
}

function handleSearchInput() {
  const searchInput = document.getElementById('product-search');
  const searchQuery = searchInput.value;
  renderProductList(searchQuery);
}

function renderProductList(searchQuery = '') {
  const productList = document.getElementById('shop');
  productList.innerHTML = '';

  const filteredProducts = shopItemsData.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'col card-container';
    productCard.innerHTML =  `
      <div class="card">
        <img src=${product.img} class="img-fluid" width="300px">
        <div class="card-body">
          <h5 class="card-title mb-0">${product.name}</h5>
          <p class="card-text">&#8369;<span>${product.price}</span></p>
          <button onclick="openModal(${shopItemsData.indexOf(product)})" class="btn btn-success fs-6" data-bs-toggle="modal" data-bs-target="#exampleModal">Add to cart</button>
        </div>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

renderProductList()

document.getElementById('product-search').addEventListener('input', handleSearchInput);