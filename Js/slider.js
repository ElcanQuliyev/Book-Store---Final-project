document.addEventListener("DOMContentLoaded", () => {
  let slideIndex = 0;
  let autoSlideInterval;

  const modal = document.getElementById("productModal2");
  const modalImg = document.getElementById("modalImg2");
  const modalTitle = document.getElementById("modalTitle2");
  const modalAuthor = document.getElementById("modalAuthor2");
  const closeBtn = document.querySelector(".close3");

  fetch("data_Slider.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("slideshow");

      data.forEach(item => {
        const slide = document.createElement("div");
        slide.className = "mySlides fade";

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.title;
        img.style.width = "100%";
        img.addEventListener("click", () => {
          modalImg.src = item.image;
          modalTitle.textContent = item.title;
          modalAuthor.textContent = `Müəllif: ${item.author}`;
          modal.style.display = "flex";
        });

        slide.appendChild(img);
        container.appendChild(slide);
      });

      showSlides(slideIndex);
      autoSlideInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
      }, 3000);
    });

  // Modal bağla
  closeBtn.addEventListener("click", () => modal.style.display = "none");

  // Modalı arxa fona klikləyəndə bağla
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Prev / Next düymələri
  window.plusSlides = function (n) {
    clearInterval(autoSlideInterval); // Auto-slidenin qarşısını al
    slideIndex += n;
    showSlides(slideIndex);
    autoSlideInterval = setInterval(() => {
      slideIndex++;
      showSlides(slideIndex);
    }, 3000);
  };

  window.currentSlide = function (n) {
    clearInterval(autoSlideInterval);
    slideIndex = n - 1;
    showSlides(slideIndex);
    autoSlideInterval = setInterval(() => {
      slideIndex++;
      showSlides(slideIndex);
    }, 3000);
  };

  function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) return;

    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    Array.from(slides).forEach(slide => slide.style.display = "none");
    slides[slideIndex].style.display = "block";
  }
});