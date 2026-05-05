// ============================================
// DOM CONTENT LOADED - INITIALIZE ALL FUNCTIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // CAROUSEL CONTINUOUS SCROLL
    // ============================================
    const carouselTrack = document.getElementById('skillsCarouselTrack');
    
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('mouseleave', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
        
        carouselTrack.addEventListener('touchstart', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('touchend', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
    }

    // ============================================
    // LOADING SCREEN
    // ============================================
    const loadingOverlay = document.getElementById('loadingOverlay');

    if (loadingOverlay) {
        loadingOverlay.classList.remove('show');
    }

    const projectLink = document.querySelector('.project-card-link');

    function triggerLoading(e) {
        const href = projectLink.getAttribute('href');
        
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;
        
        if (href && !href.startsWith('http') && !href.startsWith('https://') && !href.startsWith('//')) {
            e.preventDefault();
            
            if (loadingOverlay) {
                loadingOverlay.classList.add('show');
            }
            
            setTimeout(() => {
                window.location.href = href;
            }, 1500);
        }
    }

    if (projectLink) {
        projectLink.addEventListener('click', triggerLoading);
        projectLink.addEventListener('touchstart', triggerLoading, { passive: false });
    }

});