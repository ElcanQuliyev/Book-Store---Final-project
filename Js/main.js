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
        loginLinks.forEach(link => link.style.display = "none");
        logoutBtns.forEach(btn => btn.style.display = "block");
        if (savedUser?.username) userItems.forEach(item => item.textContent = ` ${savedUser.username}`);
    } else {
        loginLinks.forEach(link => link.style.display = "block");
        logoutBtns.forEach(btn => btn.style.display = "none");
    }

    logoutBtns.forEach(button => {
        button.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            window.location.href = "login.html";
        });
    });

    // ✅ Həmişə localStorage-dan oxuyacaq
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        document.querySelectorAll("#cart-count").forEach(el => el.textContent = count);
    }

    // ✅ Səbətə əlavə funksiyası
    window.addToCart = (image, title, price) => {
        price = parseFloat(price);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({ image, title, price, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    };

    // ✅ səhifə açılarkən səbət sayını göstər
    updateCartCount();

    // ✅ səhifəyə geri qayıdanda və ya səhifə fokuslandıqda yenilə
    window.addEventListener("pageshow", () => updateCartCount());
    window.addEventListener("focus", () => updateCartCount());

    // Kitabları yüklə
    async function fetchBooks() {
        const url = "./data.json";
        const container = document.getElementById("books-container");
        const nextButton = document.getElementById("next");
        const prevButton = document.getElementById("prev");

        try {
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

        if (!container) return;

        container.innerHTML = "";

        books.forEach(book => {
            const title = book.title || "Başlıq yoxdur";
            const author = book.author || "Müəllif yoxdur";
            const price = book.price || 0;
            const image = book.image || "https://via.placeholder.com/128x192";

            const bookElement = document.createElement("div");
            bookElement.classList.add("book");
            bookElement.setAttribute("data-category", book.category);
            bookElement.innerHTML = `
                <img src="${image}" alt="${title}">
                <h3>${title}</h3>
                <p><strong>Müəllif:</strong> ${author}</p>
                <span>${price} AZN</span>
                <h4 class="description" style="display:none;">${book.description || "Haqqında məlumat yoxdur"}</h4>
                <button class="add-to-cart">Səbətə əlavə et <i class="fa-solid fa-basket-shopping"></i></button>
            `;

            const addBtn = bookElement.querySelector(".add-to-cart");
            addBtn.addEventListener("click", () => {
                window.addToCart(image, title, price);
            });

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

    fetchBooks();
});