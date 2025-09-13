document.addEventListener("DOMContentLoaded", () => {
    const isMainPage = window.location.pathname.includes("main.html");

    // Səbət göstəricisi
    const cartCount = document.querySelectorAll("#cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.forEach(el => el.textContent = cart.length);

    // Modal dəyişənləri
    const modal = document.getElementById("productModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalAuthor = document.getElementById("modalAuthor");
    const closeModal = document.querySelector(".close");
    const goToCart = document.getElementById("goToCart");
    const continueShopping = document.getElementById("continueShopping");

    const imageModal = document.getElementById("imageModal");
    const imageModalImg = document.getElementById("imageModalImg");
    const imageModalTitle = document.getElementById("imageModalTitle");
    const imageModalAuthor = document.getElementById("imageModalAuthor");
    const closeModal2 = document.querySelector(".close2");

    // Kitabları yüklə
    async function fetchBooks() {
        const url = "./data_2.json";
        const container_2 = document.getElementById("books-container_2");
        const nextButton_2 = document.getElementById("next_2");
        const prevButton_2 = document.getElementById("prev_2");

        try {
            if (!isMainPage) {
                if (nextButton_2) nextButton_2.style.display = "none";
                if (prevButton_2) prevButton_2.style.display = "none";
            }

            const response = await fetch(url);
            const data = await response.json();
            displayBooks(data, isMainPage);
        } catch (error) {
            console.error("Xəta baş verdi:", error);
        }
    }

    function displayBooks(books, enableButtons) {
        const container_2 = document.getElementById("books-container_2");
        const nextButton_2 = document.getElementById("next_2");
        const prevButton_2 = document.getElementById("prev_2");

        container_2.innerHTML = "";

        books.forEach(book => {
            const title = book.title || "Başlıq yoxdur";
            const author = book.author || "Müəllif yoxdur";
            const price = book.price ? `${book.price} AZN` : "Qiymət yoxdur";
            const image = book.image || "https://via.placeholder.com/128x192";

            const bookElement = document.createElement("div");
            bookElement.classList.add("book_2");
            bookElement.setAttribute("data-category", book.category);
            bookElement.innerHTML = `
                <img src="${image}" alt="${title}">
                <h3>${title}</h3>
                <p><strong>Müəllif:</strong> ${author}</p>
                <span>${price}</span>
                <h4 class="description" style="display:none;">${book.description || "Haqqında məlumat yoxdur"}</h4>
                <button class="add-to-cart" onclick="addToCart('${image}', '${title}', '${book.price}')">
                    Səbətə əlavə et <i class="fa-solid fa-basket-shopping"></i>
                </button>
            `;

            container_2.appendChild(bookElement);
        });

        if (enableButtons && nextButton_2 && prevButton_2) {
            // Başlanğıcda prev gizli
            prevButton_2.style.display = "none";
            nextButton_2.style.display = "block";

            nextButton_2.addEventListener("click", () => {
                container_2.scrollBy({ left: 200, behavior: "smooth" });
            });

            prevButton_2.addEventListener("click", () => {
                container_2.scrollBy({ left: -200, behavior: "smooth" });
            });

            // Scroll eventində prev/next düymələri idarə et
            container_2.addEventListener("scroll", () => {
                const maxScrollLeft = container_2.scrollWidth - container_2.clientWidth;

                // Əvvəlcə prev gizli olmalıdır
                prevButton_2.style.display = container_2.scrollLeft > 0 ? "block" : "none";
                nextButton_2.style.display = container_2.scrollLeft >= maxScrollLeft ? "none" : "block";
            });
        }
    }

    // Səbətə əlavə funksiyası
    window.addToCart = (image, title, price) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ image, title, price });
        localStorage.setItem("cart", JSON.stringify(cart));

        document.querySelectorAll("#cart-count").forEach(el => el.textContent = cart.length);

        // Modal göstər
        modalImg.src = image;
        modalTitle.textContent = title;
        modalAuthor.textContent = "";
        modal.style.display = "flex";
    };

    // Modal eventləri
    document.body.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG" && e.target.closest(".book_2")) {
            const product = e.target.closest(".book_2");
            const imgSrc = product.querySelector("img")?.src;
            const title = product.querySelector("h3")?.textContent;
            const author = product.querySelector("p")?.textContent || "";
            const description = product.querySelector(".description")?.textContent || "Haqqında məlumat yoxdur";

            imageModalImg.src = imgSrc;
            imageModalTitle.textContent = title;
            imageModalAuthor.textContent = author;

            let descEl = imageModal.querySelector("#imageModalDescription");
            if (!descEl) {
                descEl = document.createElement("h4");
                descEl.id = "imageModalDescription";
                imageModalAuthor.insertAdjacentElement("afterend", descEl);
            }
            descEl.textContent = description;

            imageModal.style.display = "flex";
        }
    });

    closeModal?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    closeModal2?.addEventListener("click", () => {
        imageModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
        if (e.target === imageModal) imageModal.style.display = "none";
    });

    goToCart?.addEventListener("click", () => {
        window.location.href = "cart.html";
    });

    continueShopping?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    fetchBooks();
});