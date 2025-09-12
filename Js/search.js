document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const checkboxes = document.querySelectorAll(".input-value");
    const productContainer = document.getElementById("books-container");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    const notFoundMessage = document.createElement("div");
    notFoundMessage.textContent = "Belə bir kitab tapılmadı.";
    notFoundMessage.style.color = "#34495E";
    notFoundMessage.style.fontWeight = "700";
    notFoundMessage.style.fontSize = "24px";
    notFoundMessage.style.marginTop = "20px";
    notFoundMessage.style.display = "none";
    productContainer.parentElement.appendChild(notFoundMessage);

    function filterBooks() {
        const searchText = searchInput?.value.toLowerCase() || "";
        const selectedCategories = Array.from(checkboxes)
            .filter(ch => ch.checked)
            .map(ch => ch.value);

        const allProducts = productContainer.querySelectorAll(".book");
        let found = 0;

        allProducts.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            const productCategory = product.getAttribute("data-category");

            const matchesSearch = productName.includes(searchText);
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(productCategory);

            if (matchesSearch && matchesCategory) {
                product.style.display = "block";
                found++;
            } else {
                product.style.display = "none";
            }
        });

        if (found === 0) {
            notFoundMessage.style.display = "block";
            prevButton.style.display = "none";
            nextButton.style.display = "none";
        } else {
            notFoundMessage.style.display = "none";
            prevButton.style.display = "none";
            nextButton.style.display = "block";
        }
    }

    searchInput?.addEventListener("input", filterBooks);
    checkboxes.forEach(ch => ch.addEventListener("change", filterBooks));
});