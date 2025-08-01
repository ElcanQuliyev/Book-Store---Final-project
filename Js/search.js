document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const productContainer2 = document.getElementById("books-container_2");
    const prevButton2 = document.getElementById("prev_2");
    const nextButton2 = document.getElementById("next_2");

    const isMainPage = window.location.pathname.includes("main.html");

    const notFoundMessage2 = document.createElement("div");
    notFoundMessage2.textContent = "Belə bir kitab tapılmadı.";
    notFoundMessage2.style.color = "black";
    notFoundMessage2.style.fontSize = "24px";
    notFoundMessage2.style.marginTop = "20px";
    notFoundMessage2.style.display = "none";
    productContainer2.parentElement.appendChild(notFoundMessage2);

    searchInput?.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();
        const allProducts2 = productContainer2.querySelectorAll(".book_2");
        let found2 = 0;

        allProducts2.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            if (productName.includes(searchText)) {
                product.style.display = "block";
                found2++;
            } else {
                product.style.display = "none";
            }
        });

        if (found2 === 0) {
            notFoundMessage2.style.display = "block";
            if (isMainPage) {
                prevButton2.style.display = "none";
                nextButton2.style.display = "none";
            }
        } else {
            notFoundMessage2.style.display = "none";
            if (isMainPage) {
                prevButton2.style.display = "block";
                nextButton2.style.display = "block";
            }
        }
    });
});