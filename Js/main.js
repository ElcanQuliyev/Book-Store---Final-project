document.addEventListener("DOMContentLoaded", () => {
    const isMainPage = window.location.pathname.includes("main.html");

    // Əgər login olunmayıbsa və main.html-dədirsə → login səhifəsinə yönləndir
    if (isMainPage && localStorage.getItem("loggedIn") !== "true") {
        alert("Xahiş olunur, əvvəlcə giriş edin!");
        window.location.href = "login.html";
        return;
    }

    // Login və logout düymələri
    const loginLinks = document.querySelectorAll(".login-btn");
    const logoutBtns = document.querySelectorAll(".logout-btn");
    const userItems = document.querySelectorAll(".user-item");

    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (isLoggedIn) {
        // Qeydiyyat linklərini gizlət
        loginLinks.forEach(link => link.style.display = "none");
        // Logout düymələrini göstər
        logoutBtns.forEach(btn => btn.style.display = "block");

        // İstifadəçi adını göstər
        if (savedUser?.username) {
            userItems.forEach(item => {
                item.textContent = ` ${savedUser.username}`;
            });
        }
    } else {
        loginLinks.forEach(link => link.style.display = "block");
        logoutBtns.forEach(btn => btn.style.display = "none");
    }

    // Çıxış funksiyası
    logoutBtns.forEach(button => {
        button.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("user");
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
            // Slider düymələrinin görsənməsi
            if (isMainPage) {
                if (nextButton) nextButton.style.display = "block";
                if (prevButton) prevButton.style.display = "block";
            } else {
                if (nextButton) nextButton.style.display = "none";
                if (prevButton) prevButton.style.display = "none";
            }

            const response = await fetch(url);
            const data = await response.json();
            displayBooks(data, isMainPage);
        } catch (error) {
            console.error("Xəta baş verdi:", error);
        }
    }

    function displayBooks(books, enableButtons) {
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
            bookElement.setAttribute("data-category", book.category);
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
        
        if (enableButtons && nextButton && prevButton) {
            prevButton.style.display = "none";
            nextButton.style.display = "block";

            nextButton.addEventListener("click", () => {
                container.scrollBy({ left: 200, behavior: "smooth" });
            });

            prevButton.addEventListener("click", () => {
                container.scrollBy({ left: -200, behavior: "smooth" });
            });

            container.addEventListener("scroll", () => {
                const maxScrollLeft = container.scrollWidth - container.clientWidth;

                prevButton.style.display = container.scrollLeft > 0 ? "block" : "none";
                nextButton.style.display = container.scrollLeft >= maxScrollLeft ? "none" : "block";
            });
        }
    }

    // Səbətə əlavə funksiyası
    window.addToCart = (image, title, price) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ image, title, price });
        localStorage.setItem("cart", JSON.stringify(cart));

        document.querySelectorAll("#cart-count").forEach(el => {
            el.textContent = cart.length;
        });
    };

    fetchBooks();
});