
/* =====================================
   ONE PIECE IMAGE COLLECTION
===================================== */

const images = [
    {
        title: "Straw Hat Pirates",
        category: "crew",
        type: "Crew",
        src: "https://wallpapercg.com/media/ts_2x/35182.webp"
    },
    {
        title: "Monkey D. Luffy",
        category: "luffy",
        type: "Captain",
        src: "https://wallpapercg.com/media/ts_2x/34580.webp"
    },
    {
        title: "The Straw Hat Crew",
        category: "crew",
        type: "Crew",
        src: "https://wallpapercg.com/media/ts_2x/33103.webp"
    },
    {
        title: "Luffy & Trafalgar Law",
        category: "others",
        type: "Allies",
        src: "https://wallpapercg.com/media/ts_2x/29919.webp"
    },
    {
        title: "Roronoa Zoro",
        category: "zoro",
        type: "Swordsman",
        src: "https://wallpapercg.com/media/ts_2x/24218.webp"
    },
    {
        title: "Gear 5 Luffy",
        category: "luffy",
        type: "Sun God Nika",
        src: "https://wallpapercg.com/media/ts_2x/15645.webp"
    },
    {
        title: "One Piece Characters",
        category: "crew",
        type: "The Legends",
        src: "https://wallpapercg.com/media/ts_2x/29652.webp"
    },
    {
        title: "Franky",
        category: "others",
        type: "Cyborg",
        src: "https://wallpapercg.com/media/ts_2x/24231.webp"
    },
    {
        title: "The New World",
        category: "crew",
        type: "Adventure",
        src: "https://wallpapercg.com/media/ts_2x/23624.webp"
    },
    {
        title: "Trafalgar Law",
        category: "others",
        type: "Surgeon of Death",
        src: "https://wallpapercg.com/media/ts_2x/21638.webp"
    },
    {
        title: "Straw Hat Legends",
        category: "crew",
        type: "The Crew",
        src: "https://wallpapercg.com/media/ts_2x/20297.webp"
    }
];


/* =====================================
   SELECT HTML ELEMENTS
===================================== */

const galleryGrid = document.getElementById("galleryGrid");

const filterButtons = document.querySelectorAll(".filter-btn");

const imageCount = document.getElementById("imageCount");

const emptyMessage = document.getElementById("emptyMessage");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxCategory = document.getElementById("lightboxCategory");

const lightboxCounter = document.getElementById("lightboxCounter");

const closeBtn = document.getElementById("closeBtn");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");


/* =====================================
   GALLERY STATE
===================================== */

let currentImages = [...images];

let currentIndex = 0;


/* =====================================
   DISPLAY GALLERY IMAGES
===================================== */

function displayImages(imageList) {

    galleryGrid.innerHTML = "";

    imageCount.textContent = imageList.length;

    emptyMessage.style.display =
        imageList.length === 0 ? "block" : "none";

    imageList.forEach((image, index) => {

        const card = document.createElement("div");

        card.classList.add("gallery-card");

        card.style.animationDelay = `${index * 0.06}s`;

        const img = document.createElement("img");

        img.src = image.src;

        img.alt = image.title;

        img.loading = "lazy";

        const info = document.createElement("div");

        info.classList.add("card-info");

        const title = document.createElement("h3");

        title.textContent = image.title;

        const category = document.createElement("p");

        category.textContent = image.type;

        info.appendChild(title);

        info.appendChild(category);

        const viewIcon = document.createElement("div");

        viewIcon.classList.add("view-icon");

        viewIcon.textContent = "↗";

        card.appendChild(img);

        card.appendChild(info);

        card.appendChild(viewIcon);

        card.addEventListener("click", () => {

            openLightbox(index);

        });

        galleryGrid.appendChild(card);

    });

}


/* =====================================
   FILTER IMAGES BY CATEGORY
===================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        // Add active class to clicked button

        button.classList.add("active");

        const selectedCategory = button.dataset.filter;

        // Filter images

        if (selectedCategory === "all") {

            currentImages = [...images];

        } else {

            currentImages = images.filter(image => {

                return image.category === selectedCategory;

            });

        }

        // Update gallery

        displayImages(currentImages);

    });

});


/* =====================================
   OPEN LIGHTBOX
===================================== */

function openLightbox(index) {

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =====================================
   UPDATE LIGHTBOX CONTENT
===================================== */

function updateLightbox() {

    const image = currentImages[currentIndex];

    lightboxImage.src = image.src;

    lightboxImage.alt = image.title;

    lightboxTitle.textContent = image.title;

    lightboxCategory.textContent = image.type;

    lightboxCounter.textContent =
        `${currentIndex + 1} / ${currentImages.length}`;

}


/* =====================================
   CLOSE LIGHTBOX
===================================== */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


/* =====================================
   NEXT IMAGE
===================================== */

function nextImage() {

    currentIndex++;

    if (currentIndex >= currentImages.length) {

        currentIndex = 0;

    }

    updateLightbox();

}


/* =====================================
   PREVIOUS IMAGE
===================================== */

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = currentImages.length - 1;

    }

    updateLightbox();

}


/* =====================================
   BUTTON EVENTS
===================================== */

closeBtn.addEventListener("click", closeLightbox);

nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", previousImage);


/* =====================================
   CLOSE ON BACKGROUND CLICK
===================================== */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* =====================================
   KEYBOARD NAVIGATION
===================================== */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {

        return;

    }

    if (event.key === "ArrowRight") {

        nextImage();

    }

    if (event.key === "ArrowLeft") {

        previousImage();

    }

    if (event.key === "Escape") {

        closeLightbox();

    }

});


/* =====================================
   INITIALIZE GALLERY
===================================== */

displayImages(images);
