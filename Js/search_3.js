document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const checkboxes = document.querySelectorAll(".input-value");
    const productContainer3 = document.getElementById("books-container_3");

    const prevButton_3 = document.getElementById("prev_3");
    const nextButton_3 = document.getElementById("next_3");
    if (prevButton_3) prevButton_3.style.display = "none";
    if (nextButton_3) nextButton_3.style.display = "none";

    let notFoundMessage3 = productContainer3.parentElement.querySelector(".not-found-3");
    if (!notFoundMessage3) {
        notFoundMessage3 = document.createElement("div");
        notFoundMessage3.classList.add("not-found-3");
        notFoundMessage3.textContent = "Belə bir kitab tapılmadı.";
        notFoundMessage3.style.color = "#34495E";
        notFoundMessage3.style.fontWeight = "700";
        notFoundMessage3.style.fontSize = "24px";
        notFoundMessage3.style.marginTop = "20px";
        notFoundMessage3.style.display = "none";
        productContainer3.parentElement.appendChild(notFoundMessage3);
    }

    function filterBooks3() {
        const searchText = searchInput?.value.toLowerCase() || "";
        const selectedCategories = Array.from(checkboxes)
            .filter(ch => ch.checked)
            .map(ch => ch.value);

        const allProducts3 = productContainer3.querySelectorAll(".book_3");
        let found3 = 0;

        allProducts3.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            const productCategory = product.getAttribute("data-category");

            const matchesSearch = productName.includes(searchText);
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(productCategory);

            if (matchesSearch && matchesCategory) {
                product.style.display = "block";
                found3++;
            } else {
                product.style.display = "none";
            }
        });

        notFoundMessage3.style.display = found3 === 0 ? "block" : "none";
    }

    searchInput?.addEventListener("input", filterBooks3);
    checkboxes.forEach(ch => ch.addEventListener("change", filterBooks3));
});