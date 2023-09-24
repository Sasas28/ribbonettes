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
  console.log(product.name);
  const modalContainer = document.getElementById('modal-content');
  console.log(modalContainer);
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
        <i onclick="decrement()" class="bi bi-dash-circle-fill" style="font-size: 2rem; color: red;"></i>
        <div id="quantity" class="quantity"></div>
        <i onclick="increment()" class="bi bi-plus-circle-fill" style="font-size: 2rem; color: green;"></i>
      </div>
      <p id="modal-price" class="modal-price mb-0">&#8369;${product.price}</p>
    </div>
    <div class="modal-footer">
      <button onclick="addToCart()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Proceed</button>
    </div>
  `;
}

renderProductList()