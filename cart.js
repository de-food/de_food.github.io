//  Пример данных о товарах (замените на вашу реальную базу данных)
const products = [
  { id: 1, name: 'Футболка', price: 2500 },
  { id: 2, name: 'Шорты', price: 1800 },
  { id: 3, name: 'Кепка', price: 1200 }
];

// Функция для добавления товара в корзину (вызывается, когда пользователь добавляет товар)
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {}; // Получаем корзину из localStorage, если есть

  if (cart[productId]) {
    cart[productId].quantity++; // Если товар уже есть, увеличиваем количество
  } else {
    const product = products.find(p => p.id === productId); // Находим информацию о товаре
    if (product) {
      cart[productId] = {
        product: product,
        quantity: 1
      };
    } else {
      console.error('Товар с ID ' + productId + ' не найден');
      return; // Прерываем выполнение, если товар не найден
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину в localStorage
  updateCartDisplay(); // Обновляем отображение корзины
}


function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (cart[productId]) {
        delete cart[productId];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}


// Функция для изменения количества товара
function changeQuantity(productId, quantityChange) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (cart[productId]) {
        cart[productId].quantity += quantityChange;

        if (cart[productId].quantity <= 0) {
            delete cart[productId]; // Удаляем товар, если количество стало меньше или равно нулю
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}


// Функция для отображения корзины на странице
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    let totalItems = 0;
    let totalPrice = 0;

    // Очищаем список перед обновлением
    cartItemsElement.innerHTML = '';

    for (const productId in cart) {
        if (cart.hasOwnProperty(productId)) {
            const item = cart[productId];
            const product = item.product;

            totalItems += item.quantity;
            totalPrice += product.price * item.quantity;

            const listItem = document.createElement('li');
            listItem.innerHTML = 
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
            ;
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

// Пример вызова addToCart() (это должно быть связано с кнопкой добавления на странице товара)
//  Например: <button onclick="addToCart(1)">Добавить футболку</button>

