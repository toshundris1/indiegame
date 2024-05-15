function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let item = cart.find(item => item.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        let name = btn.getAttribute('data-name');
        let price = btn.getAttribute('data-price');
        let image = btn.getAttribute('data-image');

        addToCart(name, price, image);
    });
});

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let cartItem = document.getElementById('cartItem');

    cartItem.innerHTML = '';

    let totalCost = 0;

    cart.forEach(item => {
        totalCost += item.price * item.quantity;
        cartItem.innerHTML += `
            <div class="cell">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p id="z">${item.name}</p>
                    <p>Цена: ${item.price} Руб</p>
                    <p>Количество: ${item.quantity}</p>
                </div>
                <button class="remove-from-cart-btn" data-name="${item.name}">
                    <img id="cart" src="images/RemoveFromCart.png" alt="Remove from Cart">
                </button>
            </div>
        `;
    });

    if (cart.length > 0) {
        cartItem.innerHTML += `<p>Общая стоимость: ${totalCost} Руб</p>`;
    } else {
        cartItem.innerHTML = '<p>Корзина пуста</p>';
    }

    document.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            let name = btn.getAttribute('data-name');

            removeFromCart(name);
        });
    });
}

function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let item = cart.find(item => item.name === name);

    if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== name);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
}

displayCart();
