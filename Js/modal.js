document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const productContainer = document.getElementById("books-container");

    searchInput.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();
        const allProducts = productContainer.querySelectorAll(".book"); // Hər dəfə yenilənən məhsulları al

        allProducts.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            if (productName.includes(searchText)) {
                product.style.display = "block"; // Tapılan məhsulu göstər
            } else {
                product.style.display = "none"; // Uyğun olmayanları gizlət
            }
        });
    });
});

// document.addEventListener("DOMContentLoaded", () => {
//     const modal = document.getElementById("productModal");
//     const modalImg = document.getElementById("modalImg");
//     const modalTitle = document.getElementById("modalTitle");
//     const modalAuthor = document.getElementById("modalAuthor");
//     const closeModal = document.querySelector(".close");

//     // Məhsulları dinamik olaraq götür
//     document.getElementById("products").addEventListener("click", (e) => {
//         if (e.target.closest(".product")) {
//             const product = e.target.closest(".product");
//             const imgSrc = product.querySelector("img").src;
//             const title = product.querySelector("h3").textContent;
//             const author = product.querySelector("p") ? product.querySelector("p").textContent : "";

//             modalImg.src = imgSrc;
//             modalTitle.textContent = title;
//             modalAuthor.textContent = author;

//             modal.style.display = "flex";
//         }
//     });

//     // Modalı bağlamaq üçün
//     closeModal.addEventListener("click", () => {
//         modal.style.display = "none";
//     });

//     // Modalı ekrandan kənara klik edəndə bağla
//     window.addEventListener("click", (e) => {
//         if (e.target === modal) {
//             modal.style.display = "none";
//         }
//     });
// });


// document.addEventListener("DOMContentLoaded", () => {
//     const modal = document.getElementById("productModal");
//     const closeModal = document.querySelector(".close");
//     const goToCart = document.getElementById("goToCart");
//     const continueShopping = document.getElementById("continueShopping");

//     // Məhsulları dinamik olaraq götür
//     document.getElementById("products").addEventListener("click", (e) => {
//         if (e.target.closest(".product")) {
//             const product = e.target.closest(".product");
//             const imgSrc = product.querySelector("img").src;
//             const title = product.querySelector("h3").textContent;
//             const author = product.querySelector("p") ? product.querySelector("p").textContent : "";

//             document.getElementById("modalImg").src = imgSrc;
//             document.getElementById("modalTitle").textContent = title;
//             document.getElementById("modalAuthor").textContent = author;

//             modal.style.display = "flex";
//         }
//     });

//     // Modalı bağlamaq üçün
//     closeModal.addEventListener("click", () => {
//         modal.style.display = "none";
//     });

//     // Modalı ekrandan kənara klik edəndə bağla
//     window.addEventListener("click", (e) => {
//         if (e.target === modal) {
//             modal.style.display = "none";
//         }
//     });

//     // "Səbətə Get" düyməsi -> səbət səhifəsinə yönləndirəcək
//     goToCart.addEventListener("click", () => {
//         window.location.href = "cart.html"; // Səbət səhifəniz varsa, buraya keçid edin
//     });

//     // "Alış-verişə Davam Et" düyməsi -> modalı bağlayacaq
//     continueShopping.addEventListener("click", () => {
//         modal.style.display = "none";
//     });
// });