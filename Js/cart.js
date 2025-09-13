document.addEventListener("DOMContentLoaded", () => {
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");
    const clearCartBtn = document.getElementById("clear-cart");
    const verifyCartBtn = document.getElementById("verify-cart");

    // Popup elementləri
    const orderPopup = document.getElementById("orderPopup");
    const popupClose = document.getElementById("popupClose");
    const popupBooks = document.getElementById("popupBooks");
    const popupOk = document.getElementById("popupOk");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCart();

    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            // Qiyməti number şəklinə sal
            let price = typeof item.price === "string" ? parseFloat(item.price.replace(/[^\d.]/g, "")) : item.price;

            // Əgər quantity yoxdursa 1 qoy
            if (!item.quantity) item.quantity = 1;

            total += price * item.quantity;

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <p>${item.title} - ${price.toFixed(2)} AZN</p>

                <div class="counter-container">
                    <button class="counter-button decrease">-</button>
                    <input type="number" class="counter-display" value="${item.quantity}" readonly>
                    <button class="counter-button increase">+</button>
                </div>

                <button class="remove-btn">❌ Sil</button>
            `;

            // Sil düyməsi
            const removeBtn = cartItem.querySelector(".remove-btn");
            removeBtn.addEventListener("click", () => {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });

            // "+" düyməsi
            const increaseBtn = cartItem.querySelector(".increase");
            const counterDisplay = cartItem.querySelector(".counter-display");
            increaseBtn.addEventListener("click", () => {
                item.quantity += 1;
                counterDisplay.value = item.quantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });

            // "-" düyməsi (minimum 1)
            const decreaseBtn = cartItem.querySelector(".decrease");
            decreaseBtn.addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    counterDisplay.value = item.quantity;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCart();
                }
            });

            cartList.appendChild(cartItem);
        });

        totalPrice.textContent = total.toFixed(2);
        updateCartCount();
    }

    // Cart count yeniləmək
    function updateCartCount() {
        const cartCountElements = document.querySelectorAll("#cart-count");
        let count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElements.forEach(el => el.textContent = count);
    }

    // Səbəti təmizləmək
    clearCartBtn.addEventListener("click", () => {
        cart = [];
        localStorage.removeItem("cart");
        updateCart();
    });

    // Səbəti təsdiqləmək
    verifyCartBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Səbət boşdur. Sifarişi təsdiqləmək üçün məhsul əlavə edin.");
            return;
        }

        popupBooks.innerHTML = "";

        cart.forEach(item => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <p>${item.title} x ${item.quantity}</p>
            `;
            popupBooks.appendChild(bookDiv);
        });

        orderPopup.style.display = "flex";
    });

    popupClose.addEventListener("click", () => {
        orderPopup.style.display = "none";
    });

    popupOk.addEventListener("click", () => {
        orderPopup.style.display = "none";
        cart = [];
        localStorage.removeItem("cart");
        updateCart();
    });
});
