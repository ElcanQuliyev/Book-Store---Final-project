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

            let price = 0;
            if (typeof item.price === "string") {
                price = parseFloat(item.price.toString().replace(/[^\d.]/g, ""));
            } else {
                price = item.price;
            }
            total += price;

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <p>${item.title} - ${price.toFixed(2)} AZN</p>
                <button class="remove-btn">❌ Sil</button>
            `;

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

        // Popup siyahısını təmizlə
        popupBooks.innerHTML = "";

        // Səbətdəki bütün kitabları popup-a əlavə et
        cart.forEach(item => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <p>${item.title}</p>
            `;
            popupBooks.appendChild(bookDiv);
        });

        // Popup göstər
        orderPopup.style.display = "flex";
    });

    popupClose.addEventListener("click", () => {
        orderPopup.style.display = "none";
    });

    popupOk.addEventListener("click", () => {
        orderPopup.style.display = "none";
        localStorage.removeItem("cart");
        cart = [];
        updateCart();
    });
});
