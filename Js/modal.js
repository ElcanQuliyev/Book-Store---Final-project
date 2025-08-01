document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const productContainer = document.getElementById("books-container");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    const isMainPage = window.location.pathname.includes("main.html"); // ✅ ƏLAVƏ EDİLDİ

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

    const notFoundMessage = document.createElement("div");
    notFoundMessage.textContent = "Belə bir kitab tapılmadı.";
    notFoundMessage.style.color = "black";
    notFoundMessage.style.fontSize = "24px";
    notFoundMessage.style.marginTop = "20px";
    notFoundMessage.style.display = "none";
    productContainer.parentElement.appendChild(notFoundMessage);

    searchInput?.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();
        const allProducts = productContainer.querySelectorAll(".book");
        let found = 0;

        allProducts.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            if (productName.includes(searchText)) {
                product.style.display = "block";
                found++;
            } else {
                product.style.display = "none";
            }
        });

        if (found === 0) {
            notFoundMessage.style.display = "block";
            if (isMainPage) {
                prevButton.style.display = "none";
                nextButton.style.display = "none";
            }
        } else {
            notFoundMessage.style.display = "none";
            if (isMainPage) {
                prevButton.style.display = "block";
                nextButton.style.display = "block";
            }
        }
    });

    // Add-to-cart modal
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const product = e.target.closest(".book");
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

        // Şəkil kliklənəndə açılan modal
        if (e.target.tagName === "IMG" && e.target.closest(".book")) {
            const product = e.target.closest(".book");
            const imgSrc = product.querySelector("img")?.src;
            const title = product.querySelector("h3")?.textContent;
            const author = product.querySelector("p")?.textContent || "";

            imageModalImg.src = imgSrc;
            imageModalTitle.textContent = title;
            imageModalAuthor.textContent = author;

            imageModal.style.display = "flex";
        }
    });

    // Modalları bağlama
    closeModal?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    closeModal2?.addEventListener("click", () => {
        imageModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
        if (e.target === imageModal) {
            imageModal.style.display = "none";
        }
    });

    goToCart?.addEventListener("click", () => {
        window.location.href = "cart.html";
    });

    continueShopping?.addEventListener("click", () => {
        modal.style.display = "none";
    });
});