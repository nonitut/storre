document.addEventListener("DOMContentLoaded", function() {
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce(function(sum, item) {
    return sum + item.quantity;
  }, 0);
  document.getElementById('cart-count').textContent = totalItems;
}

function addToCart(id, name, price, image) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(function(item) {
    return item.id === id;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

document.querySelectorAll('.add-to-cart').forEach(function(button) {
  button.addEventListener('click', function(event) {
    const card = event.target.closest('.product-card');
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price);
    const image = card.dataset.image;

    addToCart(id, name, price, image);
  });
});

function loadCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function renderCart() {
  const cart = loadCart();
  const cartItemsDiv = document.getElementById('cart-items');
  const totalPriceDiv = document.getElementById('total-price');

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Корзина пуста</p>';
    totalPriceDiv.textContent = '';
    return;
  }

  let total = 0;
  let html = '<div>';

  cart.forEach(function(item) {
    total += item.price * item.quantity;
    html += `
      <div>
        <img src="${item.image}" alt="${item.name}" style="width: 50px;">
        <strong>${item.name}</strong> — 
        <div class="cart-controls">
          <button class="decrease" data-id="${item.id}">-</button>
          <input type="text" value="${item.quantity}" readonly>
          <button class="increase" data-id="${item.id}">+</button>
        </div>
        x ${item.price}₽
        = ${item.price * item.quantity}₽
        <button class="remove" data-id="${item.id}">Удалить</button>
      </div>`;
  });

  html += '</div>';
  cartItemsDiv.innerHTML = html;
  totalPriceDiv.textContent = `Итого: ${total}₽`;

  document.querySelectorAll('.remove').forEach(function(button) {
    button.addEventListener('click', function(event) {
      const id = button.dataset.id;
      removeItemFromCart(id);
    });
  });

  document.querySelectorAll('.increase').forEach(function(button) {
    button.addEventListener('click', function(event) {
      const id = button.dataset.id;
      updateItemQuantity(id, 1);
    });
  });

  document.querySelectorAll('.decrease').forEach(function(button) {
    button.addEventListener('click', function(event) {
      const id = button.dataset.id;
      updateItemQuantity(id, -1);
    });
  });
}

function removeItemFromCart(id) {
  const cart = loadCart();
  const updatedCart = cart.filter(function(item) {
    return item.id !== id;
  });
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  renderCart();
  updateCartCount();
}

function updateItemQuantity(id, change) {
  const cart = loadCart();
  const item = cart.find(function(item) {
    return item.id === id;
  });

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      removeItemFromCart(id);
      return;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

// Обновление корзины на странице корзины
renderCart();

// Обновляем количество товаров в корзине на других страницах
updateCartCount();

// Открытие/закрытие корзины
document.getElementById('cart-button').addEventListener('click', function() {
  document.getElementById('cart-sidebar').classList.toggle('show');
});

document.getElementById('close-cart').addEventListener('click', function() {
  document.getElementById('cart-sidebar').classList.remove('show');
});


});
