(function() {
    // Hero background carousel
    var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-carousel .carousel-slide'));
    if (!slides.length) return;

    var nextBtn = document.getElementById('carouselNext');
    var prevBtn = document.getElementById('carouselPrev');
    var current = 0;
    var autoMs = 5000;
    var timerId = null;

    function setActive(index) {
        slides.forEach(function(slide, i) {
            if (i === index) {
                slide.classList.add('is-active');
            } else {
                slide.classList.remove('is-active');
            }
        });
    }

    function showNext() {
        current = (current + 1) % slides.length;
        setActive(current);
    }

    function showPrev() {
        current = (current - 1 + slides.length) % slides.length;
        setActive(current);
    }

    function startAuto() {
        stopAuto();
        timerId = window.setInterval(showNext, autoMs);
    }

    function stopAuto() {
        if (timerId) {
            window.clearInterval(timerId);
            timerId = null;
        }
    }

    // Init
    setActive(current);
    startAuto();

    // Controls
    if (nextBtn) nextBtn.addEventListener('click', function() { showNext(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', function() { showPrev(); startAuto(); });

    // Pause on hover over hero
    var hero = document.getElementById('hero') || document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', stopAuto);
        hero.addEventListener('mouseleave', startAuto);
    }

    // Make hero overlap main-content paddings and touch header
    function adjustHeroGutters() {
        var main = document.querySelector('.main-content');
        if (!main || !hero) return;
        var cs = window.getComputedStyle(main);
        var pL = parseFloat(cs.paddingLeft) || 0;
        var pR = parseFloat(cs.paddingRight) || 0;
        var pT = parseFloat(cs.paddingTop) || 0;

        var extraWidth = pL + pR;
        hero.style.marginLeft = (-pL) + 'px';
        hero.style.marginRight = (-pR) + 'px';
        hero.style.width = 'calc(100% + ' + extraWidth + 'px)';
        hero.style.marginTop = (-pT) + 'px';
    }

    adjustHeroGutters();
    window.addEventListener('resize', adjustHeroGutters);
})();

