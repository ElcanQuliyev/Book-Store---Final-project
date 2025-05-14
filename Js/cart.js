document.addEventListener("DOMContentLoaded", () => {
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");
    const clearCartBtn = document.getElementById("clear-cart");
    const verifyCartBtn = document.getElementById("verify-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCart();

    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            // Qiyməti rəqəm formatına çevir
            let price = 0;
            if (typeof item.price === "string") {
                price = parseFloat(item.price.toString().replace(/[^\d.]/g, ""));
            } else {
                price = item.price;
            }
            total += price;

            cartItem.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}">
                <p>${item.title} - ${price.toFixed(2)} AZN</p>
                <button class="remove-btn">❌ Sil</button>
            `;

            // Sil düyməsinə event əlavə et
            const removeBtn = cartItem.querySelector(".remove-btn");
            removeBtn.addEventListener("click", () => {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });

            cartList.appendChild(cartItem);
        });

        totalPrice.textContent = total.toFixed(2);
    }

    clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cart = [];
        updateCart();
    });

    verifyCartBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Səbət boşdur. Sifarişi təsdiqləmək üçün məhsul əlavə edin.");
            return;
        }

        alert("Uğurla sifariş alındı!");
        localStorage.removeItem("cart");
        cart = [];
        updateCart();
    });
});