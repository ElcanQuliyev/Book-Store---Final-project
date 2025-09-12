document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("books-container");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const isMainPage = window.location.pathname.includes("main.html");

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

    // Add-to-cart və şəkil klik modal
    document.body.addEventListener("click", (e) => {
        // Add-to-cart modal
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

    // Modal bağlama düymələri
    closeModal?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    closeModal2?.addEventListener("click", () => {
        imageModal.style.display = "none";
    });

    // Modal xaricinə kliklə bağlama
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
        if (e.target === imageModal) imageModal.style.display = "none";
    });

    // Səbətə yönləndirmə / continue shopping
    goToCart?.addEventListener("click", () => {
        window.location.href = "cart.html";
    });

    continueShopping?.addEventListener("click", () => {
        modal.style.display = "none";
    });
});