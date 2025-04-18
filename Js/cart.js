document.addEventListener("DOMContentLoaded", () => {
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");
    const clearCartBtn = document.getElementById("clear-cart");
    const verifyCartBtn = document.getElementById("verify-cart");
    const cartCount = document.getElementById("total-price");  // Sayğac üçün HTML elementi
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCart();

    // Səbəti yeniləmək üçün funksiyanı təyin edirik
    function updateCart() {
        cartList.innerHTML = ""; // Səbəti təmizləyirik
        let total = 0;  // Ümumi qiymət

        // Səbətdəki hər bir məhsulu əlavə edirik
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}">
                <p>${item.title} - ${item.price} AZN</p>
                <button onclick="removeFromCart(${index})">❌ Sil</button>
            `;
            cartList.appendChild(cartItem);

            // Məhsulun qiymətini sayıya çeviririk və toplam qiymətə əlavə edirik
            total += parseFloat(item.price.replace(" AZN", ""));
        });

        totalPrice.textContent = total.toFixed(2); // Ümumi qiyməti göstəririk
        cartCount.textContent = cart.length; // Sayğacı yeniləyirik
    }

    // Məhsulu səbətdən silmək
    window.removeFromCart = (index) => {
        cart.splice(index, 1); // Məhsulu səbətdən silirik
        localStorage.setItem("cart", JSON.stringify(cart)); // Yenilənmiş səbəti localStorage-da saxlayırıq
        updateCart(); // Ümumi qiyməti yeniləyirik
    };

    // Səbəti tamamilə təmizləmək
    clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        cart = [];
        cartCount.textContent = 0; // Sayğacı sıfırlayırıq
        updateCart(); // Ümumi qiyməti yeniləyirik
    });

    verifyCartBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Səbət boşdur. Sifarişi təsdiqləmək üçün məhsul əlavə edin.");
            return;
        }

        alert("Uğurla sifariş alındı!");

        // Səbəti təmizlə
        localStorage.removeItem("cart");
        cart = [];
        cartCount.textContent = 0;
        updateCart();
    });
});


