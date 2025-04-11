document.addEventListener("DOMContentLoaded", () => {
    // 🔍 SEARCH HİSSƏSİ – dəyişilməyib
    const searchInput = document.getElementById("search");
    const productContainer = document.getElementById("books-container");

    searchInput?.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();
        const allProducts = productContainer.querySelectorAll(".book");

        allProducts.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            product.style.display = productName.includes(searchText) ? "block" : "none";
        });
    });

    const modal = document.getElementById("productModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalAuthor = document.getElementById("modalAuthor");
    const closeModal = document.querySelector(".close");
    const goToCart = document.getElementById("goToCart");
    const continueShopping = document.getElementById("continueShopping");

    // Modalı yalnız add-to-cart class-ı olan düyməyə klik ediləndə aç
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const product = e.target.closest(".book"); // <-- "book" class-ı səndə var
            if (product) {
                const imgSrc = product.querySelector("img")?.src;
                const title = product.querySelector("h3")?.textContent;
                const author = product.querySelector("p")?.textContent || "";

                modalImg.src = imgSrc;
                modalTitle.textContent = title;
                modalAuthor.textContent = author;

                modal.style.display = "flex";
            }
        }
    });

    // Modalı bağlama
    closeModal?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    goToCart?.addEventListener("click", () => {
        window.location.href = "cart.html";
    });

    continueShopping?.addEventListener("click", () => {
        modal.style.display = "none";
    });
});