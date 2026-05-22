/* ============================================================
   SCROLL.JS — Smooth Scroll + Fixed Nav Shadow Effect
   ============================================================ */

(function() {
  const navLinks = document.querySelectorAll('.nav-r a[href^="#"]');
  const nav = document.querySelector('nav');
  
  function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    if (diff === 0) return;
    
    let startTime = null;
    
    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    
    requestAnimationFrame(step);
  }
  
  // Add shadow to navbar when scrolled
  function handleNavScroll() {
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }
  }
  
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();
  
  // Smooth scroll with offset for fixed nav
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      // Get the navbar height dynamically
      const navHeight = nav ? nav.offsetHeight : 75;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      smoothScrollTo(top, 700);
    });
  });
})();