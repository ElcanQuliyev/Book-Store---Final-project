document.addEventListener("DOMContentLoaded", () => {
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");
    const clearCartBtn = document.getElementById("clear-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCart();

    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.title} - ${item.price} AZN</p>
                <button onclick="removeFromCart(${index})">❌ Sil</button>
            `;
            cartList.appendChild(cartItem);
            total += item.price;
        });

        totalPrice.textContent = total.toFixed(2);
    }

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    };

    clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cart = [];
        updateCart();
    });
});
