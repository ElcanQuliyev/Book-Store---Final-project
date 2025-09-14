document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const checkboxes = document.querySelectorAll(".input-value");
    const productContainer4 = document.getElementById("books-container_4");

    const prevButton4 = document.getElementById("prev_4");
    const nextButton4 = document.getElementById("next_4");
    if (prevButton4) prevButton4.style.display = "none";
    if (nextButton4) nextButton4.style.display = "none";

    let notFoundMessage4 = productContainer4.parentElement.querySelector(".not-found-4");
    if (!notFoundMessage4) {
        notFoundMessage4 = document.createElement("div");
        notFoundMessage4.classList.add("not-found-4"); 
        notFoundMessage4.textContent = "Belə bir kitab tapılmadı.";
        notFoundMessage4.style.color = "#34495E";
        notFoundMessage4.style.fontWeight = "700";
        notFoundMessage4.style.fontSize = "24px";
        notFoundMessage4.style.marginTop = "20px";
        notFoundMessage4.style.display = "none";
        productContainer4.parentElement.appendChild(notFoundMessage4);
    }

    function filterBooks4() {
        const searchText = searchInput?.value.toLowerCase() || "";
        const selectedCategories = Array.from(checkboxes)
            .filter(ch => ch.checked)
            .map(ch => ch.value);

        const allProducts4 = productContainer4.querySelectorAll(".book_4");
        let found4 = 0;

        allProducts4.forEach(product => {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            const productCategory = product.getAttribute("data-category");

            const matchesSearch = productName.includes(searchText);
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(productCategory);

            if (matchesSearch && matchesCategory) {
                product.style.display = "flex"; 
                found4++;
            } else {
                product.style.display = "none";
            }
        });

        notFoundMessage4.style.display = found4 === 0 ? "block" : "none";
    }

    searchInput?.addEventListener("input", filterBooks4);
    checkboxes.forEach(ch => ch.addEventListener("change", filterBooks4));
});