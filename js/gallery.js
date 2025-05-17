document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const galleryPopup = document.getElementById('gallery-popup');
    const galleryPopupImage = galleryPopup.querySelector('.popup-image');
    const galleryImageDescription = galleryPopup.querySelector('.image-description');
    const galleryCloseBtn = galleryPopup.querySelector('.close-btn');
    const galleryPrevArrow = galleryPopup.querySelector('.gallery-prev-arrow');
    const galleryNextArrow = galleryPopup.querySelector('.gallery-next-arrow');

    let currentImageIndex = 0;
    const images = Array.from(galleryImages);

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            updateGalleryPopup();
            galleryPopup.classList.add('active');
        });
    });

    galleryCloseBtn.addEventListener('click', closeGalleryPopup);
    galleryPopup.addEventListener('click', (e) => {
        if (e.target === galleryPopup) {
            closeGalleryPopup();
        }
    });

    galleryPrevArrow.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateGalleryPopup();
        }
    });

    galleryNextArrow.addEventListener('click', () => {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateGalleryPopup();
        }
    });

    function updateGalleryPopup() {
        const currentImage = images[currentImageIndex];
        galleryPopupImage.src = currentImage.src;
        galleryPopupImage.alt = currentImage.alt;
        galleryImageDescription.textContent = currentImage.alt;

        galleryPrevArrow.classList.toggle('hidden', currentImageIndex === 0);
        galleryNextArrow.classList.toggle('hidden', currentImageIndex === images.length - 1);
    }

    function closeGalleryPopup() {
        galleryPopup.classList.remove('active');
    }

    document.addEventListener('keydown', (e) => {
        if (!galleryPopup.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeGalleryPopup();
        } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
            currentImageIndex--;
            updateGalleryPopup();
        } else if (e.key === 'ArrowRight' && currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateGalleryPopup();
        }
    });
});