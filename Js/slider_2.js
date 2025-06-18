// Səbət göstəricisi
const cartCount = document.querySelectorAll("#cart-count");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartCount.forEach(el => {
    el.textContent = cart.length;
});

// Kitabları yüklə
async function fetchBooks() {
    const url = "./data_2.json";
    const container_2 = document.getElementById("books-container_2");
    const nextButton_2 = document.getElementById("next_2");
    const prevButton_2 = document.getElementById("prev_2");

    try {
        nextButton_2.style.display = "none";
        prevButton_2.style.display = "none";

        const response = await fetch(url);
        const data = await response.json();
        displayBooks(data);

        nextButton_2.style.display = "block";
        prevButton_2.style.display = "block";
    } catch (error) {
        console.error("Xəta baş verdi:", error);
    }
}

function displayBooks(books) {
    const container_2 = document.getElementById("books-container_2");
    const nextButton_2 = document.getElementById("next_2");
    const prevButton_2 = document.getElementById("prev_2");

    container_2.innerHTML = "";

    books.forEach(book => {
        const title = book.title || "Başlıq yoxdur";
        const author = book.author || "Müəllif yoxdur";
        const price = book.price ? `${book.price} AZN` : "Qiymət yoxdur";
        const thumbnail = book.image || "https://via.placeholder.com/128x192";

        const bookElement = document.createElement("div");
        bookElement.classList.add("book_2");
        bookElement.innerHTML = `
             <img src="${thumbnail}" alt="${title}">
             <h3>${title}</h3>
             <p><strong>Müəllif:</strong> ${author}</p>
             <span>${price}</span>
             <button class="add-to-cart" onclick="addToCart('${thumbnail}', '${title}', '${book.price}')">
                 Səbətə əlavə et <i class="fa-solid fa-basket-shopping"></i>
             </button>
         `;

        container_2.appendChild(bookElement);
    });

    nextButton_2.addEventListener("click", () => {
        container_2.style.scrollBehavior = "smooth";
        container_2.scrollLeft += 1000;
    });

    prevButton_2.addEventListener("click", () => {
        container_2.style.scrollBehavior = "smooth";
        container_2.scrollLeft -= 1000;
    });
}

// Səbətə əlavə funksiyası
window.addToCart = (thumbnail, title, price) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ thumbnail, title, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    // Hamısına yenilə:
    document.querySelectorAll("#cart-count").forEach(el => {
        el.textContent = cart.length;
    });
};

fetchBooks();
;
