const searchInput = document.getElementById('product-search');
const cartIcon = document.getElementById('cart-icon');

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
        <i onclick="decreaseQuantity()" class="bi bi-dash-circle-fill" style="font-size: 1rem; color: red;"></i>
        <span id="quantity" class="quantity">1</span>
        <i onclick="increaseQuantity()" class="bi bi-plus-circle-fill" style="font-size: 1rem; color: green;"></i>
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
  const priceInput = document.getElementById('modal-price');

  const price = parseInt(priceInput.textContent.slice(1));
  const quantity = parseInt(quantityInput.textContent);
  const amount = price * quantity;
  const selectedProduct = shopItemsData.find(product => product.name === document.getElementById('exampleModalLabel').textContent);

  if (!isNaN(quantity) && quantity > 0) {
      const existingCartItemIndex = cart.findIndex(item => item.name === selectedProduct.name);

      if (existingCartItemIndex !== -1) {
          // If the product already exists in the cart, accumulate the quantity
          cart[existingCartItemIndex].quantity += quantity;
          cart[existingCartItemIndex].amount += amount;
      } else {
          selectedProduct.quantity = quantity; // Set quantity
          selectedProduct.amount = amount;
          cart.push(selectedProduct);
      }
  }
  
  countItem()
  // Update the cart display
  renderCart()
}

function countItem() {
  const cartCounter = document.getElementById('cart-counter');
  let countItem = cart.reduce((total, item) => total + item.quantity, 0);
  cartCounter.textContent = countItem;
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
        <img class="rounded" src=${item.img} alt="" width="60px">
        <p>${item.name}</p>
      </th>
      <td>${item.price}</td>
      <td>
        <i onclick="decreaseCartItemQuantity(${item.id})" class="bi bi-dash-circle-fill" style="font-size: 1rem; color: red;"></i>
        <span>${item.quantity}</span>
        <i onclick="increaseCartItemQuantity(${item.id})" class="bi bi-plus-circle-fill" style="font-size: 1rem; color: green;"></i>
      </td>
      <td id="amount">${cleanOutput(item.amount.toFixed(2))}</td>
      <td class="p-0">
        <i onclick="removeCartItem(${item.id})" class="bi bi-trash-fill" style="color: red;"></i>
      </td>
      `;
      cartItems.appendChild(cartItem);
  });

  cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  cartTotalElement.textContent = cleanOutput(cartTotal.toFixed(2));
}

function cleanOutput (output) {
	let output_string = output.toString();
	let decimal = output_string.split(".")[1];
	output_string = output_string.split(".")[0];
	let output_array = output_string.split("");
	
	if (output_array.length > 3) {
		for (let i = output_array.length - 3; i > 0; i -= 3) {
			output_array.splice(i, 0, ",");
		}
	}

	if (decimal) {
		output_array.push(".");
		output_array.push(decimal);
	}

	return output_array.join("");
}

function increaseCartItemQuantity(itemId) {
  const item = cart.find(product => product.id === itemId);
  if (item) {
      item.quantity++;
      item.amount += parseInt(item.price);
      countItem()
      renderCart(); // Update the cart display
  }
}

function decreaseCartItemQuantity(itemId) {
  const item = cart.find(product => product.id === itemId);
  if (item && item.quantity > 1) {
      item.quantity--;
      item.amount -= parseInt(item.price);
      countItem()
      renderCart(); // Update the cart display
  }
}

function removeCartItem(itemId) {
  const itemIndex = cart.findIndex(product => product.id === itemId);
  if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      countItem();
      renderCart(); 
      checkCartEmpty();
  }
}

function handleSearchInput() {
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

function checkCartEmpty() {
  console.log(cart)
  if (cart.length === 0) {
    document.getElementById('message').classList.remove('d-none')
    document.getElementById('table').style.display = "none";
  } else {
    document.getElementById('message').classList.add('d-none')
    document.getElementById('table').style.display = "block";
  } 
}

renderProductList()
cartIcon.addEventListener('click', checkCartEmpty)
searchInput.addEventListener('input', handleSearchInput);