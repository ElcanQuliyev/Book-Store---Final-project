document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const checkboxes = document.querySelectorAll(".input-value");
    const productContainer2 = document.getElementById("books-container_2");
    const prevButton2 = document.getElementById("prev_2");
    const nextButton2 = document.getElementById("next_2");

    const isMainPage = window.location.pathname.includes("main.html");

    const notFoundMessage2 = document.createElement("div");
    notFoundMessage2.textContent = "Belə bir kitab tapılmadı.";
    notFoundMessage2.style.color = "#34495E";
    notFoundMessage2.style.fontWeight = "700";
    notFoundMessage2.style.fontSize = "24px";
    notFoundMessage2.style.marginTop = "20px";
    notFoundMessage2.style.display = "none";
    productContainer2.parentElement.appendChild(notFoundMessage2);

    function filterBooks2() {
        const searchText = searchInput?.value.toLowerCase() || "";
        const selectedCategories = Array.from(checkboxes)
            .filter(ch => ch.checked)
            .map(ch => ch.value);

        const allProducts2 = productContainer2.querySelectorAll(".book_2");
        let found2 = 0;

        allProducts2.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            const productCategory = product.getAttribute("data-category");

            const matchesSearch = productName.includes(searchText);
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(productCategory);

            if (matchesSearch && matchesCategory) {
                product.style.display = "block";
                found2++;
            } else {
                product.style.display = "none";
            }
        });

        if (found2 === 0) {
            notFoundMessage2.style.display = "block";
            prevButton2.style.display = "none";
            nextButton2.style.display = "none";
        } else {
            notFoundMessage2.style.display = "none";
            prevButton2.style.display = "none";
            nextButton2.style.display = found2 > 0 ? "block" : "none";
        }
    }

    // Event-lər
    searchInput?.addEventListener("input", filterBooks2);
    checkboxes.forEach(ch => ch.addEventListener("change", filterBooks2));
});