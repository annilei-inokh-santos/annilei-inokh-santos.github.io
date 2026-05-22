/* ============================================================
   ORB.JS — Orb Creation + Interactive Orb
   ============================================================ */

(function() {
  const orbContainer = document.getElementById('orbContainer');
  const interactiveOrb = document.getElementById('interactiveOrb');
  
  /**
   * Inject the CSS animation rule for floating orbs.
   */
  function injectOrbAnimation() {
    if (!document.getElementById('orbAnimStyles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'orbAnimStyles';
      styleSheet.textContent = `
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(20px, -20px) scale(1.05); }
        }
        .orb { transition: left 3s linear, top 3s linear; }
      `;
      document.head.appendChild(styleSheet);
    }
  }
  
  /**
   * Creates three animated background orbs and appends them
   * to the #orbContainer element.
   */
  function createOrbs() {
    if (!orbContainer) return;
    
    const siteEl = document.getElementById('site');
    const isDark = siteEl ? siteEl.classList.contains('dark') : true;
    
    const colors = [
      'radial-gradient(circle at 30% 40%, var(--orb1), transparent 70%)',
      'radial-gradient(circle at 70% 60%, var(--orb2), transparent 70%)',
      'radial-gradient(circle at 50% 80%, var(--orb3), transparent 70%)'
    ];
    
    for (let i = 0; i < 3; i++) {
      const orb = document.createElement('div');
      orb.className = 'orb';
      orb.style.background = colors[i];
      orb.style.width = (300 + Math.random() * 200) + 'px';
      orb.style.height = orb.style.width;
      orb.style.left = (Math.random() * 100) + '%';
      orb.style.top = (Math.random() * 100) + '%';
      orbContainer.appendChild(orb);
      
      let x = parseFloat(orb.style.left);
      let y = parseFloat(orb.style.top);
      let dx = (Math.random() - 0.5) * 0.5;
      let dy = (Math.random() - 0.5) * 0.5;
      
      const intervalId = setInterval(function() {
        x += dx;
        y += dy;
        if (x < -20) x = 120;
        if (x > 120) x = -20;
        if (y < -20) y = 120;
        if (y > 120) y = -20;
        orb.style.left = x + '%';
        orb.style.top = y + '%';
      }, 3000);
      
      orb.setAttribute('data-interval-id', intervalId);
    }
  }
  
  /**
   * Updates the interactive orb's gradient colors to match
   * the current dark/light theme.
   */
  function updateOrbColor() {
    if (!interactiveOrb) return;
    
    const siteEl = document.getElementById('site');
    const isDark = siteEl ? siteEl.classList.contains('dark') : true;
    
    if (isDark) {
      interactiveOrb.style.background =
        'radial-gradient(circle at center, rgba(165,200,240,0.4), rgba(100,80,200,0.2) 70%, transparent)';
    } else {
      interactiveOrb.style.background =
        'radial-gradient(circle at center, rgba(74,111,165,0.3), rgba(124,58,237,0.15) 70%, transparent)';
    }
  }
  
  /**
   * Binds the #interactiveOrb to the mouse cursor with throttling.
   */
  let rafId = null;
  let lastX = 0, lastY = 0;
  
  function setupInteractiveOrb() {
    if (!interactiveOrb) return;
    
    updateOrbColor();
    
    document.addEventListener('mousemove', function(e) {
      if (rafId) return;
      
      lastX = e.clientX;
      lastY = e.clientY;
      
      rafId = requestAnimationFrame(() => {
        interactiveOrb.style.transform = 'translate(' + (lastX - 150) + 'px, ' + (lastY - 150) + 'px)';
        rafId = null;
      });
    });
  }
  
  // Listen for theme changes to update orb color
  document.addEventListener('themeChanged', function(e) {
    updateOrbColor();
  });
  
  // Initialize
  injectOrbAnimation();
  createOrbs();
  setupInteractiveOrb();
})();