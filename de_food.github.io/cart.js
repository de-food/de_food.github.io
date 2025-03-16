document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    // Получаем корзину из localStorage или создаем пустой массив
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Функция обновления отображения корзины
    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsList.textContent = 'Корзина пуста';
            checkoutButton.style.display = 'none';
        } else {
            checkoutButton.style.display = 'inline-block'; // Show the button
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.price} руб. (Кол-во: ${item.quantity})`;
                cartItemsList.appendChild(li);
                total += item.price * item.quantity;
            });
        }

        cartTotalElement.textContent = total.toFixed(2);
    }

    // Функция сохранения корзины в localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Обработчик нажатия на кнопку "В корзину"
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const itemId = event.target.dataset.id;
            const itemName = event.target.dataset.name;
            const itemPrice = parseFloat(event.target.dataset.price);

            // Проверяем, есть ли товар уже в корзине
            const existingItem = cart.find(item => item.id === itemId);

            if (existingItem) {
                // Если товар уже есть, увеличиваем количество
                existingItem.quantity++;
            } else {
                // Если товара нет, добавляем его в корзину
                cart.push({
                    id: itemId,
                    name: itemName,
                    price: itemPrice,
                    quantity: 1
                });
            }

            updateCart();
            saveCart();
        }
    });

    // Обработчик нажатия на кнопку "Оформить заказ"
    checkoutButton.addEventListener('click', () => {
        // TODO: Реализовать переход на страницу оформления заказа
        alert('Переход на страницу оформления заказа (еще не реализовано)');
    });

    // Первоначальное отображение корзины
    updateCart();
});
