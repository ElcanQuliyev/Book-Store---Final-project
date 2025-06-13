document.addEventListener("DOMContentLoaded", () => {
    // İstifadəçi login olub-olmadığını yoxla
    if (window.location.pathname.includes("main.html") && localStorage.getItem("loggedIn") !== "true") {
        alert("Xahiş olunur, əvvəlcə giriş edin!");
        window.location.href = "login.html";
        return;
    }

    // İstifadəçi adını göstərmək
    const userItems = document.querySelectorAll(".user-item");
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (isLoggedIn && savedUser?.username) {
        userItems.forEach(item => {
            item.textContent = ` ${savedUser.username}`;
        });
    }

    // Çıxış funksiyası
    document.querySelectorAll(".logout-btn").forEach(button => {
        button.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("userName");
            window.location.href = "login.html";
        });
    });

    // Səbət göstəricisi
    const cartCount = document.querySelectorAll("#cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartCount.forEach(el => {
        el.textContent = cart.length;
    });

    // Kitabları yüklə
    async function fetchBooks() {
        const url = "./data.json";
        const container = document.getElementById("books-container");
        const nextButton = document.getElementById("next");
        const prevButton = document.getElementById("prev");

        try {
            nextButton.style.display = "none";
            prevButton.style.display = "none";

            const response = await fetch(url);
            const data = await response.json();
            displayBooks(data);

            nextButton.style.display = "block";
            prevButton.style.display = "block";
        } catch (error) {
            console.error("Xəta baş verdi:", error);
        }
    }

    function displayBooks(books) {
        const container = document.getElementById("books-container");
        const nextButton = document.getElementById("next");
        const prevButton = document.getElementById("prev");

        container.innerHTML = "";

        books.forEach(book => {
            const title = book.title || "Başlıq yoxdur";
            const author = book.author || "Müəllif yoxdur";
            const price = book.price ? `${book.price} AZN` : "Qiymət yoxdur";
            const thumbnail = book.image || "https://via.placeholder.com/128x192";

            const bookElement = document.createElement("div");
            bookElement.classList.add("book");
            bookElement.innerHTML = `
                <img src="${thumbnail}" alt="${title}">
                <h3>${title}</h3>
                <p><strong>Müəllif:</strong> ${author}</p>
                <span>${price}</span>
                <button class="add-to-cart" onclick="addToCart('${thumbnail}', '${title}', '${book.price}')">
                    Səbətə əlavə et <i class="fa-solid fa-basket-shopping"></i>
                </button>
            `;

            container.appendChild(bookElement);
        });

        nextButton.addEventListener("click", () => {
            container.style.scrollBehavior = "smooth";
            container.scrollLeft += 1000;
        });

        prevButton.addEventListener("click", () => {
            container.style.scrollBehavior = "smooth";
            container.scrollLeft -= 1000;
        });
    }

    // Səbətə əlavə funksiyası
    window.addToCart = (thumbnail, title, price) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ thumbnail, title, price });
        localStorage.setItem("cart", JSON.stringify(cart));
    
        // Hamısına yenilə:
        document.querySelectorAll("#cart-count").forEach(el => {
            el.textContent = cart.length;
        });
    };

    fetchBooks();
});
