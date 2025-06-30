let slideIndex = 1;
let autoIndex = 0;
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("data_Slider.json")
        .then((res) => res.json())
        .then((data) => {
            const container = document.getElementById("slideshow");
            const dotsContainer = document.getElementById("dots");

            data.forEach((item, index) => {
                // Slayd div
                const slide = document.createElement("div");
                slide.className = "mySlides fade";

                // Şəkil
                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.title;
                img.style.width = "100%";
                slide.appendChild(img);

                // Kliklənəndə modal açılsın
                img.onclick = () => openModal(item);

                // Slaydları əlavə et
                container.appendChild(slide);
            });

            // JSON yüklənib bitəndən sonra göstər
            showSlides(slideIndex);
            autoSlides();
        })
        .catch((err) => console.error("JSON yüklənmədi:", err));
});


// Slider funksiyaları
function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}

function autoSlides() {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    autoIndex++;
    if (autoIndex > slides.length) autoIndex = 1;

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[autoIndex - 1].style.display = "block";
    dots[autoIndex - 1].classList.add("active");

    setTimeout(autoSlides, 3000);
}

// MODAL funksionallığı
const modal = document.getElementById("productModal2");
const modalImg = document.getElementById("modalImg2");
const modalTitle = document.getElementById("modalTitle2");
const modalAuthor = document.getElementById("modalAuthor2");
const closeBtn = document.querySelector(".close3");
const addToCartBtn = document.getElementById("addToCart2");
const goToCartBtn = document.getElementById("goToCart2");
const continueShoppingBtn = document.getElementById("continueShopping2");

function openModal(book) {
    modal.style.display = "flex";
    modalImg.src = book.image;
    modalTitle.textContent = book.title;
    modalAuthor.textContent = `Müəllif: ${book.author}`;

    // Əvvəlcə yalnız "Səbətə əlavə et" görünsün
    addToCartBtn.style.display = "inline-block";
    goToCartBtn.style.display = "none";
    continueShoppingBtn.style.display = "none";

    addToCartBtn.onclick = () => {
        cart.push(book); // istəsən localStorage-a da əlavə edə bilərsən
        addToCartBtn.style.display = "none";
        goToCartBtn.style.display = "inline-block";
        continueShoppingBtn.style.display = "inline-block";
    };
}

// Modalı bağla
closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Səbətə yönləndir
goToCartBtn.onclick = () => {
    window.location.href = "cart.html";
};

// Sadəcə modal bağla
continueShoppingBtn.onclick = () => {
    modal.style.display = "none";
};