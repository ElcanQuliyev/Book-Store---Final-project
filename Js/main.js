document.addEventListener("DOMContentLoaded", () => {
    const isMainPage = window.location.pathname.includes("main.html");

    // İstifadəçi login olub-olmadığını yoxla
    if (isMainPage && localStorage.getItem("loggedIn") !== "true") {
        alert("Xahiş olunur, əvvəlcə giriş edin!");
        window.location.href = "login.html";
        return;
    }

    // Qeydiyyat linkini gizlətmək (əgər login olunubsa)
    const registerLink = document.getElementById("login");
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (isLoggedIn && registerLink) {
        registerLink.style.display = "none";
    }

    // İstifadəçi adını göstərmək
    const userItems = document.querySelectorAll(".user-item");
    const savedUser = JSON.parse(localStorage.getItem("user"));

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
            // Yalnız main.html üçün göstər
            if (isMainPage) {
                if (nextButton) nextButton.style.display = "block";
                if (prevButton) prevButton.style.display = "block";
            } else {
                if (nextButton) nextButton.style.display = "none";
                if (prevButton) prevButton.style.display = "none";
            }

            const response = await fetch(url);
            const data = await response.json();
            displayBooks(data);
        } catch (error) {
            console.error("Xəta baş verdi:", error);
        }
    }

    function displayBooks(books) {
        const container = document.getElementById("books-container");
        const nextButton = document.getElementById("next");
        const prevButton = document.getElementById("prev");

        if (!container) {
            console.warn("books-container tapılmadı!");
            return;
        }

        container.innerHTML = "";

        books.forEach(book => {
            const title = book.title || "Başlıq yoxdur";
            const author = book.author || "Müəllif yoxdur";
            const price = book.price ? `${book.price} AZN` : "Qiymət yoxdur";
            const image = book.image || "https://via.placeholder.com/128x192";

            const bookElement = document.createElement("div");
            bookElement.classList.add("book");
            bookElement.innerHTML = `
                <img src="${image}" alt="${title}">
                <h3>${title}</h3>
                <p><strong>Müəllif:</strong> ${author}</p>
                <span>${price}</span>
                <button class="add-to-cart" onclick="addToCart('${image}', '${title}', '${book.price}')">
                    Səbətə əlavə et <i class="fa-solid fa-basket-shopping"></i>
                </button>
            `;

            container.appendChild(bookElement);
        });

        // Slider düymələri yalnız main.html üçün aktiv olsun
        if (isMainPage) {
            if (nextButton) {
                nextButton.addEventListener("click", () => {
                    container.style.scrollBehavior = "smooth";
                    container.scrollLeft += 950;
                });
            }

            if (prevButton) {
                prevButton.addEventListener("click", () => {
                    container.style.scrollBehavior = "smooth";
                    container.scrollLeft -= 950;
                });
            }
        }
    }

    // Səbətə əlavə funksiyası
    window.addToCart = (image, title, price) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ image, title, price });
        localStorage.setItem("cart", JSON.stringify(cart));

        // Səbət sayı yenilə
        document.querySelectorAll("#cart-count").forEach(el => {
            el.textContent = cart.length;
        });
    };

    fetchBooks();
});