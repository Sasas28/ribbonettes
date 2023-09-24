let shop = document.querySelector('#shop');
let modal = document.querySelector('.modal-content');
let cartItems = document.querySelector('.table-body');
let cartCount = document.querySelector('#cart-counter');

let cart = [];
let count = 1;

function generateShop() {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, img } = x;
        return `
        <div id=${id} class="col card-container">
            <div class="card">
            <img src=${img} class="img-fluid" width="300px">
            <div class="card-body">
                <h5 class="card-title mb-0">${name}</h5>
                <p class="card-text">&#8369;<span>${price}</span></p>
                <button onclick="generateModal(${id})" class="btn btn-success fs-6" data-bs-toggle="modal" data-bs-target="#exampleModal">Add to cart</button>
            </div>
            </div>
        </div>
        `;
    }).join(""));
};

generateShop();

function generateModal(cards) {
    let searchInData = shopItemsData.find((x) => x.id === cards);
    let { name, img, price } = searchInData;
    modal.innerHTML = `
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <div class="modal-img-container mb-1">
        <img id="modal-img" class="img-fluid" src=${img} alt="">
        </div>
        <div class="modal-qty-container">
        <i onclick="decrement()" class="bi bi-dash-circle-fill" style="font-size: 2rem; color: red;"></i>
        <div id="quantity" class="quantity"></div>
        <i onclick="increment()" class="bi bi-plus-circle-fill" style="font-size: 2rem; color: green;"></i>
        </div>
        <p id="modal-price" class="modal-price mb-0">&#8369;${price}</p>
    </div>
    <div class="modal-footer">
        <button onclick="addToCart(${cards}, '${name}', ${price}, '${img}')" type="button" class="btn btn-primary" data-bs-dismiss="modal">Proceed</button>
    </div>
    `;
};

function increment() {
    let quantity = document.querySelector('#quantity');
    count++;
    quantity.textContent = count;
};

