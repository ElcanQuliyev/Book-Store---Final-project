const cartCount = document.getElementById("cart-count");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cartCount.textContent = cart.length;

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


async function fetchBooks() {
    const url = `https://www.googleapis.com/books/v1/volumes?q=javascript&key=${API_KEY}`;

    try {
        nextButton.style.display = "none";
        prevButton.style.display = "none";
        const response = await fetch(url);
        const data = await response.json();
        displayBooks(data.items); // Kitabları HTML-ə göndər
        nextButton.style.display = "block";
        prevButton.style.display = "block";
    } catch (error) {
        console.error("Xəta baş verdi:", error);
    }
}

// Kitabları HTML-ə əlavə edən funksiya
function displayBooks(books) {
    const container = document.getElementById("books-container");
    container.innerHTML = "";

    books.forEach(book => {
        const bookInfo = book.volumeInfo;
        const title = bookInfo.title || "Başlıq yoxdur";
        const authors = bookInfo.authors ? bookInfo.authors.join(", ") : "Müəllif yoxdur";
        const price = book.saleInfo?.retailPrice?.amount ? `${book.saleInfo.retailPrice.amount} AZN` : "Satışda yoxdur";
        const thumbnail = bookInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192"; // Əgər şəkil yoxdursa, default şəkil qoy

        // Yeni kitab elementi yaradılır
        const bookElement = document.createElement("div");
        bookElement.classList.add("book"); // Stil üçün class əlavə et
        bookElement.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <h3>${title}</h3>
            <p><strong>Müəllif:</strong> ${authors}</p>
            <span>${price} AZN</span>
            <button class="add-to-cart" onclick="addToCart('${thumbnail}', '${title}', '${price ? price.replace(' AZN', '') : '0'}')">Səbətə əlavə et <i class="fa-solid fa-basket-shopping"></i></button>
        `;

        container.appendChild(bookElement); // HTML-ə əlavə et
    });

    nextButton.addEventListener("click", () => {
        container.style.scrollBehavior = "smooth";
        container.scrollLeft += 1000;
    });

    prevButton.addEventListener("click", () => {
        container.style.scrollBehavior = "smooth";
        container.scrollLeft -= 1000;
    });
}

window.addToCart = (thumbnail, title, price) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Ən son səbəti götür
    cart.push({ thumbnail, title, price });
    localStorage.setItem("cart", JSON.stringify(cart)); // LocalStorage-a yaz
    cartCount.textContent = cart.length; // Sayğacı yenilə
};


// Sayt açılan kimi kitabları yüklə
fetchBooks();

