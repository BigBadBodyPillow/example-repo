let priceTotal = 0;

// get items from local storage and add them to cart
// i dont think this is necissary since i have the defer tag in the html haed
// so that loads the scripts after the dom elements anyways i think
document.addEventListener('DOMContentLoaded', () => {
  loadServiceWorker();
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  // if there are no items in the cart
  if (storedCartItems.length === 0) {
    emptyDisplay(); //  display empty cart message
  }
  // create html elements for each item in the cart
  // and update the price acordingly
  storedCartItems.forEach((product) => {
    cartConstructor(product.id, product.image, product.name, product.price);
    updatePriceTotal(product.price);
  });
});

// Save cart items to localStorage
function saveCartItems() {
  const cartItems = document.querySelectorAll('.cart-product');
  const cartItemsArray = Array.from(cartItems).map((item) => {
    return {
      id: item.id,
      image: item.querySelector('img').src,
      name: item.querySelector('h2').textContent,
      price: item.querySelector('span#cart-price').textContent,
    };
  });
  localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
  // local storage example:
  // cartItems:"[{
  // "id":"product2",
  // "image":"http://127.0.0.1:5500/task/assets/products/item2.webp",
  // "name":"Product 2",
  // "price":"78.60"
  // },
  // {
  // "id":"product1",
  // "image":"http://127.0.0.1:5500/task/assets/products/item1.webp",
  // "name":"Product 1",
  // "price":"64.23"
  // }]"
}

//  remove all elements from the cart
function clearCart() {
  const cartItems = document.querySelector('.cart-items');
  cartItems.innerHTML = '';
  priceTotal = 0;
  updatePriceTotal(priceTotal); // reset price
  emptyDisplay(); // show empty cart message
  localStorage.removeItem('cartItems');
}

// add items to cart
const products = document.querySelectorAll('#addToCart');
products.forEach((product) => {
  product.addEventListener('click', (event) => {
    // the purpose of temp is just to make things easier to read
    let temp = '';
    const productId = event.target.parentElement.id;
    const product = document.querySelector(`#${productId}`);

    // really really convoluted way of getting the path of the image
    temp = product.children[0].src; // link eg. http://127.0.0.1:5500/task/assets/products/item1.webp
    // temp = temp.split('http://127.0.0.1:5500/task/'); // eg. Array [ "", "assets/products/item1.webp" ]
    // temp = temp.pop(); // eg. assets/products/item1.webp
    const productImage = temp;

    // really convluted way of getting the content of the h2 (product name)
    temp = product.children[1]; // h2
    const productName = temp.textContent;

    // really convluted way of getting the content of the span (price)
    temp = product.children[2]; // p
    temp = temp.children[0]; // span
    temp = temp.textContent;
    const price = temp;

    cartConstructor(productId, productImage, productName, price); // create html element
    updatePriceTotal(price); // update price
    saveCartItems(); // save to local storage
  });
});

// i dont understand how this is worse than creating it with innerhtml
function cartConstructor(Id, ImageSource, Name, Price) {
  const cartItems = document.querySelector('.cart-items');
  //container
  const cartProductContainer = document.createElement('div');
  cartProductContainer.className = 'cart-product';
  cartProductContainer.id = Id;

  // image tag
  const cartProductImage = document.createElement('img');
  cartProductImage.src = ImageSource;
  cartProductImage.ariaLabel = `image of ${Name}`;
  cartProductContainer.appendChild(cartProductImage);

  // h2
  const cartProductH2 = document.createElement('h2');
  cartProductH2.textContent = Name;
  cartProductContainer.appendChild(cartProductH2);

  // span
  const cartProductP = document.createElement('p');
  cartProductP.textContent = 'Price : R ';
  const cartProductSpan = document.createElement('span');
  cartProductSpan.id = 'cart-price';
  cartProductSpan.textContent = Price;
  cartProductP.appendChild(cartProductSpan);
  cartProductContainer.appendChild(cartProductP);

  // button
  const cartProductButton = document.createElement('button');
  //   cartProductButton.id = 'removeFromCart';
  cartProductButton.setAttribute('onclick', 'removeFromCart(this)');
  cartProductButton.ariaLabel = `aria-label="remove ${Name} to cart"`;
  cartProductButton.textContent = '❌';
  cartProductContainer.appendChild(cartProductButton);

  // add to dom
  cartItems.appendChild(cartProductContainer);
  // remove empty cart message if it exists when an item is added to cart
  const emptyCart = document.querySelector('.empty-cart');
  if (emptyCart) {
    emptyCart.remove();
  }
}

// update the total price
function updatePriceTotal(Price) {
  const PriceDisplay = document.getElementById('total-price');
  priceTotal += parseFloat(Price);
  //round to 2 decimal places
  PriceDisplay.textContent = priceTotal.toFixed(2);
}

// remove from cart (local button from product in cart)
function removeFromCart(element) {
  // theres a slight bug? here that i have no idea how to fix
  // when you add multiple items to cart and remove them,
  // the price sometimes becomes "Total: R -0.00"

  // to replicate, add product1, product2, and product5 to the cart
  // then remove them...

  const cartItems = document.querySelector('.cart-items');
  let temp = '';
  temp = element.previousSibling; // p
  temp = temp.children[0]; // span
  productPrice = temp.textContent; // price

  // subtract price from total
  updatePriceTotal(-productPrice);

  //remove the elements parent (the entire product) from the cart
  cartItems.removeChild(element.parentElement);
  saveCartItems();
  if (cartItems.children.length === 0) {
    emptyDisplay();
  }
}

// display message when cart is empty
function emptyDisplay() {
  const cartIsAlreadyEmpty = document.querySelector('.empty-cart');
  if (cartIsAlreadyEmpty) {
    return;
  }
  const cartFooter = document.querySelector('.cart-footer');
  const p = document.createElement('p');
  p.className = 'empty-cart';
  p.textContent = 'Your cart is empty';

  cartFooter.appendChild(p);
}

// register service worker
function loadServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(showCookieNotification());
  }
}

function showCookieNotification() {
  const toast = document.getElementById('snackbar');

  // show toast
  toast.classList.add('show');

  // after 3 seconds remove the show class
  setTimeout(function () {
    // hide toast
    toast.classList.remove('show');
  }, 3000);
}
