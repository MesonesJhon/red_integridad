document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevButton = document.getElementById('carouselPrev');
    const nextButton = document.getElementById('carouselNext');
    let currentSlide = 0;
    let autoPlayInterval;
    
    function updateCarousel() {
        // Actualizar slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('is-active', index === currentSlide);
        });
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
        resetAutoPlay();
    }
    
    function goToNext() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }
    
    function goToPrevious() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(goToNext, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Event listeners
    prevButton.addEventListener('click', goToPrevious);
    nextButton.addEventListener('click', goToNext);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Pausar carrusel al hacer hover
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    hero.addEventListener('mouseleave', startAutoPlay);
    
    // Iniciar carrusel
    startAutoPlay();
});