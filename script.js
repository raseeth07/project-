// Initialize cart
let cart = {};
let cartCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Show the landing page initially
    document.getElementById('landing-page').style.display = 'block';

    // Handle navigation to products page
    document.getElementById('get-started-btn').addEventListener('click', () => {
        document.getElementById('landing-page').style.display = 'none';
        document.getElementById('products-page').style.display = 'block';
    });

    // Handle navigation to cart page
    document.getElementById('cart-link').addEventListener('click', () => {
        document.getElementById('products-page').style.display = 'none';
        document.getElementById('cart-page').style.display = 'block';
    });

    // Handle continue shopping
    document.getElementById('continue-shopping-btn').addEventListener('click', () => {
        document.getElementById('cart-page').style.display = 'none';
        document.getElementById('products-page').style.display = 'block';
    });

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.product');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.querySelector('p').textContent;
            const productPrice = parseFloat(productElement.querySelector('p + p').textContent.replace('$', ''));

            // Add or update product in cart
            if (!cart[productId]) {
                cart[productId] = { name: productName, price: productPrice, quantity: 0 };
            }
            cart[productId].quantity += 1;
            cartCount += 1;

            // Update cart icon
            document.getElementById('cart-count').textContent = cartCount;

            // Add item to shopping cart page
            updateCartPage();
        });
    });
});

function updateCartPage() {
    let totalItems = 0;
    let totalCost = 0;

    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous items

    for (let id in cart) {
        const item = cart[id];
        totalItems += item.quantity;
        totalCost += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'product';

        itemDiv.innerHTML = `
            <img src="plant${id}.jpg" alt="${item.name}">
            <p>${item.name}</p>
            <p>$${item.price.toFixed(2)}</p>
            <button class="increase-btn" data-id="${id}">+</button>
            <button class="decrease-btn" data-id="${id}">-</button>
            <button class="delete-btn" data-id="${id}">Delete</button>
            <p>Quantity: ${item.quantity}</p>
        `;

        cartItemsDiv.appendChild(itemDiv);
    }

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-cost').textContent = totalCost.toFixed(2);

    // Add event listeners for increase, decrease, and delete buttons
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            cart[productId].quantity += 1;
            cartCount += 1;
            updateCartPage();
        });
    });

    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            if (cart[productId].quantity > 1) {
                cart[productId].quantity -= 1;
                cartCount -= 1;
                updateCartPage();
            }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            cartCount -= cart[productId].quantity;
            delete cart[productId];
            updateCartPage();
        });
    });
}