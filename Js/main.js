document.addEventListener("DOMContentLoaded", () => {
    // İstifadəçi login olub-olmadığını yoxla
    if (window.location.pathname.includes("main.html") && localStorage.getItem("loggedIn") !== "true") {
        alert("Xahiş olunur, əvvəlcə giriş edin!");
        window.location.href = "login.html";
        return;
    }

    // İstifadəçi adını göstərmək
    const userItem = document.querySelector(".user-item");
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (userItem && isLoggedIn && savedUser?.username) {
        userItem.textContent = ` ${savedUser.username}`;
    }

    // Çıxış funksiyası
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            alert("Sistemdən çıxış etdiniz.");
            window.location.href = "login.html";
        });
    }

    // Səbət göstəricisi
    const cartCount = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length;

    // Slaydlar
    let slideIndex = 1;
    let autoIndex = 0;

    showSlides(slideIndex);
    autoSlides();

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    function autoSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        autoIndex++;
        if (autoIndex > slides.length) { autoIndex = 1 }

        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[autoIndex - 1].style.display = "block";
        dots[autoIndex - 1].className += " active";

        setTimeout(autoSlides, 3000);
    }

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
        cartCount.textContent = cart.length;
    };

    fetchBooks();
});
