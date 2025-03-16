// JavaScript для добавления класса 'loaded' после загрузки страницы
document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll("section");
  sections.forEach(section => {
    section.classList.add("loaded");
  });
});
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formMessages = document.getElementById('form-messages');

form.addEventListener('submit', function(e) {
  let isValid = true;

  if (nameInput.value.trim() === '') {
    isValid = false;
    nameInput.classList.add('error'); // Добавляем класс для подсветки ошибки
  } else {
    nameInput.classList.remove('error');
  }

  if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
    isValid = false;
    emailInput.classList.add('error');
  } else {
    emailInput.classList.remove('error');
  }

  if (messageInput.value.trim() === '') {
    isValid = false;
    messageInput.classList.add('error');
  } else {
    messageInput.classList.remove('error');
  }

  if (!isValid) {
    e.preventDefault(); // Предотвращаем отправку формы, если есть ошибки
    formMessages.textContent = 'Пожалуйста, заполните все обязательные поля корректно.';
  } else {
    formMessages.textContent = ''; // Очищаем сообщение об ошибке, если все в порядке
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

let cart = []; // Массив для хранения товаров в корзине
let cartTotal = 0; // Итоговая сумма

// Функция для добавления товара в корзину
function addItemToCart(name, price) {
  cart.push({ name: name, price: price });
  cartTotal += parseFloat(price);

  // Обновляем отображение корзины
  updateCartDisplay();
}

// Функция для обновления отображения корзины
function updateCartDisplay() {
  cartItemsList.innerHTML = ''; // Очищаем список

  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - ${item.price} руб.`;
    cartItemsList.appendChild(listItem);
  });

  cartTotalElement.textContent = cartTotal;
}

// Обработчик клика на кнопку "В корзину"
addToCartButtons.forEach(button => {
  button.addEventListener('click', function() {
    const name = this.dataset.name;
    const price = this.dataset.price;

    addItemToCart(name, price);

    // Добавляем класс для анимации
    this.classList.add('added-to-cart');

    // Удаляем класс после завершения анимации
    setTimeout(() => {
      this.classList.remove('added-to-cart');
    }, 500);
  });
});
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

let cart = [];
let cartTotal = 0;

function addItemToCart(name, price) {
  // Проверяем, есть ли товар уже в корзине
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    // Если товар уже есть, увеличиваем количество
    existingItem.quantity++;
  } else {
    // Если товара нет, добавляем его в корзину
    cart.push({ name: name, price: price, quantity: 1 });
  }

  cartTotal += parseFloat(price);
  updateCartDisplay();
}

function removeItemFromCart(name, price) {
    cart = cart.filter(item => item.name !== name);
    cartTotal -= parseFloat(price);
    updateCartDisplay()
}

function updateCartDisplay() {
  cartItemsList.innerHTML = '';

  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${item.name} - ${item.price} руб. (Кол-во: ${item.quantity})
                           <button class="remove-from-cart" data-name="${item.name}" data-price="${item.price}">Удалить</button>`; // Кнопка "Удалить"
    cartItemsList.appendChild(listItem);
  });

  cartTotalElement.textContent = cartTotal;

    // Add event listeners to remove buttons after they are added to the DOM
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = this.dataset.price;
            removeItemFromCart(name, price);
        });
    });
}

addToCartButtons.forEach(button => {
  button.addEventListener('click', function() {
    const name = this.dataset.name;
    const price = this.dataset.price;

    addItemToCart(name, price);

    this.classList.add('added-to-cart');
    setTimeout(() => {
      this.classList.remove('added-to-cart');
    }, 500);
  });
});
// java.js
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Получаем корзину из localStorage при загрузке страницы
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = 0;

// Функция для пересчета общей суммы
function calculateCartTotal() {
    cartTotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
}

// Инициализация общей суммы при загрузке страницы
calculateCartTotal();

// Обновляем отображение корзины при загрузке страницы
updateCartDisplay();

function addItemToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    calculateCartTotal();
    updateCartDisplay();
    saveCartToLocalStorage();
}

function removeItemFromCart(name, price) {
    const itemToRemove = cart.find(item => item.name === name);
    if (itemToRemove) {
        cartTotal -= (parseFloat(price) * itemToRemove.quantity);
    }
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
    saveCartToLocalStorage();
}


function updateCartDisplay() {
    cartItemsList.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - ${item.price} руб. (Кол-во: ${item.quantity})
                               <button class="remove-from-cart" data-name="${item.name}" data-price="${item.price}">Удалить</button>`;
        cartItemsList.appendChild(listItem);
    });

    cartTotalElement.textContent = cartTotal;

    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = this.dataset.price;
            removeItemFromCart(name, price);
        });
    });
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const name = this.dataset.name;
        const price = this.dataset.price;

        addItemToCart(name, price);

        this.classList.add('added-to-cart');
        setTimeout(() => {
            this.classList.remove('added-to-cart');
        }, 500);
    });
});
// js/app.js

// ... (Ваш существующий код корзины) ...

function updateCartDisplay() {
    cartItemsList.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - ${item.price} руб.
                               (Кол-во: <input type="number" class="item-quantity" data-name="${item.name}" value="${item.quantity}" min="1">)
                               <button class="remove-from-cart" data-name="${item.name}">Удалить</button>`;
        cartItemsList.appendChild(listItem);
    });

    cartTotalElement.textContent = cartTotal;

    // Обработчики для удаления товаров
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            removeItemFromCart(name);
        });
    });

    // Обработчики для изменения количества
    const quantityInputs = document.querySelectorAll('.item-quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const name = this.dataset.name;
            const newQuantity = parseInt(this.value);
            if (newQuantity > 0) {
                updateItemQuantity(name, newQuantity);
            } else {
                // Если количество меньше 1, удаляем товар из корзины
                removeItemFromCart(name);
            }
        });
    });
}

function updateItemQuantity(name, quantity) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity = quantity;
        calculateCartTotal();
        updateCartDisplay();
        saveCartToLocalStorage();
    }
}

function removeItemFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    calculateCartTotal();
    updateCartDisplay();
    saveCartToLocalStorage();
}

// ... (Ваш существующий код для добавления в корзину и сохранения в localStorage) ...
    const showButton = document.getElementById('show-button');
    const hiddenElement = document.getElementById('hidden-element');

    showButton.addEventListener('click', () => {
      hiddenElement.style.display = 'block'; // Сначала делаем элемент видимым
      hiddenElement.style.opacity = 0; // Делаем элемент прозрачным
      let opacity = 0;

      function fadeIn() {
        opacity += 0.02; // Увеличиваем прозрачность
        hiddenElement.style.opacity = opacity;

        if (opacity < 1) {
          requestAnimationFrame(fadeIn); // Вызываем функцию снова, пока не достигнем полной видимости
        }
      }

      requestAnimationFrame(fadeIn); // Запускаем анимацию
    });
// Функция для добавления товара в корзину
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  if (cart[productId]) {
    cart[productId].quantity++;
  } else {
    const product = products.find(p => p.id === productId);
    if (product) {
      cart[productId] = {
        product: product,
        quantity: 1
      };
    } else {
      console.error('Товар с ID ' + productId + ' не найден');
      return;
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

//Пример вызова функции:
// <button onclick="addToCart(1)">Добавить товар 1 в корзину</button>
function updateCartDisplay() {
  const cartItemsElement = document.getElementById('cart-items');
  const totalItemsElement = document.getElementById('total-items');
  const totalPriceElement = document.getElementById('total-price');
  const emptyCartMessage = document.getElementById('empty-cart-message');

  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  let totalItems = 0;
  let totalPrice = 0;

  cartItemsElement.innerHTML = ''; // Очищаем список перед обновлением

  for (const productId in cart) {
    if (cart.hasOwnProperty(productId)) {
      const item = cart[productId];
      const product = item.product;

      totalItems += item.quantity;
      totalPrice += product.price * item.quantity;

      const listItem = document.createElement('li');
      listItem.innerHTML = `
          <div class="item-info">
              <span>${product.name}</span>
              <span>Цена: ${product.price} ₽</span>
          </div>
          <div class="quantity-controls">
              <button onclick="changeQuantity(${product.id}, -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="changeQuantity(${product.id}, 1)">+</button>
              <button onclick="removeFromCart(${product.id})">Удалить</button>
          </div>
      `;
      cartItemsElement.appendChild(listItem);
    }
  }

  totalItemsElement.textContent = totalItems;
  totalPriceElement.textContent = totalPrice.toFixed(2);

  if (totalItems === 0) {
    emptyCartMessage.style.display = 'block';
  } else {
    emptyCartMessage.style.display = 'none';
  }
}

// Вызываем функцию обновления корзины при загрузке страницы
updateCartDisplay();
function changeQuantity(productId, quantityChange) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  if (cart[productId]) {
    cart[productId].quantity += quantityChange;

    if (cart[productId].quantity <= 0) {
      delete cart[productId];
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }
}
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  if (cart[productId]) {
    delete cart[productId];

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }
}
        // cart.js
        document.addEventListener('DOMContentLoaded', () => {
          const cartItemsList = document.getElementById('cart-items');
          const cartTotalElement = document.getElementById('cart-total');
          let cart = JSON.parse(localStorage.getItem('cart')) || [];

          function updateCart() {
            cartItemsList.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
              const li = document.createElement('li');
              li.textContent = `${item.name} - ${item.price} руб.`;
              const removeButton = document.createElement('button');
              removeButton.textContent = 'Удалить';
              removeButton.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
                saveCart();
              });
              li.appendChild(removeButton);
              cartItemsList.appendChild(li);
              total += parseFloat(item.price);
            });
            cartTotalElement.textContent = total.toFixed(2);
          }

          function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
          }

          // Обработчики кнопок "В корзину" (пример)
          document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
              const name = button.dataset.name;
              const price = button.dataset.price;
              cart.push({ name: name, price: price });
              updateCart();
              saveCart();
            });
          });

          updateCart(); // Инициализация при загрузке страницы
        });
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsList.textContent = 'Корзина пуста';
            checkoutButton.style.display = 'none'; // Скрываем кнопку "Оформить заказ", если корзина пуста
        } else {
            checkoutButton.style.display = 'block'; // Показываем кнопку, если в корзине есть товары
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `${item.name} - ${item.price} руб. (Кол-во: <input type="number" class="item-quantity" data-index="${index}" value="${item.quantity}" min="1">) <button class="remove-from-cart" data-index="${index}">Удалить</button>`;
                cartItemsList.appendChild(li);
                total += parseFloat(item.price) * item.quantity;
            });
        }

        cartTotalElement.textContent = total.toFixed(2);
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Обработчики событий
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const name = event.target.dataset.name;
            const price = event.target.dataset.price;

            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: name, price: price, quantity: 1 });
            }

            updateCart();
            saveCart();
        } else if (event.target.classList.contains('remove-from-cart')) {
            const index = parseInt(event.target.dataset.index);
            cart.splice(index, 1);
            updateCart();
            saveCart();
        }
    });

    document.addEventListener('change', (event) => {
        if (event.target.classList.contains('item-quantity')) {
            const index = parseInt(event.target.dataset.index);
            const newQuantity = parseInt(event.target.value);

            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
            } else {
                cart.splice(index, 1);
            }

            updateCart();
            saveCart();
        }
    });

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            // Перенаправляем на страницу оформления заказа
            window.location.href = 'checkout.html'; // Замените на ваш URL
        });
    }

    updateCart(); // Инициализация при загрузке страницы
});

