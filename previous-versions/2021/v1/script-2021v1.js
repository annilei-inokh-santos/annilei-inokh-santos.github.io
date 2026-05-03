// ============================================
// DOM CONTENT LOADED - INITIALIZE ALL FUNCTIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav a:not(.logo)');
    const mobileNavLinks = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        // Update desktop nav links
        desktopNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Update mobile bottom nav links
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();
    
    // ============================================
    // CAROUSEL CONTINUOUS SCROLL (ensures smooth loop)
    // ============================================
    const carouselTrack = document.getElementById('skillsCarouselTrack');
    
    if (carouselTrack) {
        // Pause animation on user interaction
        carouselTrack.addEventListener('mouseenter', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('mouseleave', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
        
        // For touch devices
        carouselTrack.addEventListener('touchstart', () => {
            carouselTrack.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('touchend', () => {
            carouselTrack.style.animationPlayState = 'running';
        });
    }
});