document.addEventListener("DOMContentLoaded", () => {
    const isMainPage = window.location.pathname.includes("main.html");

    // Login yoxlaması
    if (isMainPage && localStorage.getItem("loggedIn") !== "true") {
        alert("Xahiş olunur, əvvəlcə giriş edin!");
        window.location.href = "login.html";
        return;
    }

    const loginLinks = document.querySelectorAll(".login-btn");
    const logoutBtns = document.querySelectorAll(".logout-btn");
    const userItems = document.querySelectorAll(".user-item");
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (isLoggedIn) {
        loginLinks.forEach(link => link.style.display = "none");
        logoutBtns.forEach(btn => btn.style.display = "block");
        if (savedUser?.username) {
            userItems.forEach(item => item.textContent = ` ${savedUser.username}`);
        }
    } else {
        loginLinks.forEach(link => link.style.display = "block");
        logoutBtns.forEach(btn => btn.style.display = "none");
    }

    logoutBtns.forEach(button => {
        button.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
    });

    // Cart count göstərilməsi
    const cartCountElements = document.querySelectorAll("#cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCountElements.forEach(el => el.textContent = totalItems);
    }
    updateCartCount();

    // Kitabları yüklə
    async function fetchBooks() {
        const url = "./data.json";
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayBooks(data);
        } catch (error) {
            console.error("Xəta baş verdi:", error);
        }
    }

    function displayBooks(books) {
        const container = document.getElementById("books-container");
        if (!container) return;
        container.innerHTML = "";

        books.forEach(book => {
            const title = book.title || "Başlıq yoxdur";
            const author = book.author || "Müəllif yoxdur";
            const price = book.price || 0;
            const image = book.image || "https://via.placeholder.com/128x192";

            const bookElement = document.createElement("div");
            bookElement.classList.add("book");
            bookElement.innerHTML = `
                <img src="${image}" alt="${title}">
                <h3>${title}</h3>
                <p><strong>Müəllif:</strong> ${author}</p>
                <span>${price} AZN</span>
                <button class="add-to-cart">Səbətə əlavə et <i class="fa-solid fa-basket-shopping"></i></button>
            `;
            container.appendChild(bookElement);

            const addBtn = bookElement.querySelector(".add-to-cart");
            addBtn.addEventListener("click", () => {
                addToCart({ image, title, price });
            });
        });
    }

    // Cart-a əlavə funksiyası
    function addToCart(book) {
        const existingItem = cart.find(item => item.title === book.title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...book, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    fetchBooks();
});