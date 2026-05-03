// ============================================
// DOM CONTENT LOADED - INITIALIZE ALL FUNCTIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CONTACT FORM HANDLER
    // ============================================
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const contacts = document.getElementById('contacts')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            if (name.trim() === '' || email.trim() === '' || contacts.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields before sending.');
            } else {
                alert('Thank you for your message, ' + name + '! I will get back to you soon.\n\n(This is a demo form from my Jan 2021 portfolio.)');
                form.reset();
            }
        });
    }

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
});