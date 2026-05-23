/* ============================================================
   THEME.JS — Theme Toggle + localStorage + Scrollbar Colors
   ============================================================ */

(function() {
  const siteEl = document.getElementById('site');
  const modeBtn = document.getElementById('modeBtn');
  const modeIcon = document.getElementById('modeIcon');
  const modeTxt = document.getElementById('modeTxt');
  
  // Read from localStorage
  const savedMode = localStorage.getItem('portfolioTheme');
  let dark = savedMode !== null ? savedMode === 'dark' : true;
  
  // Function to update scrollbar colors based on theme
  function updateScrollbarColors(isDark) {
    let styleId = 'dynamic-scrollbar-styles';
    let existingStyle = document.getElementById(styleId);
    if (existingStyle) existingStyle.remove();
    
    const style = document.createElement('style');
    style.id = styleId;
    
    if (isDark) {
      // Dark mode colors - violet/purple accent
      style.textContent = `
        ::-webkit-scrollbar-track {
          background: #090b11 !important;
        }
        ::-webkit-scrollbar-thumb {
          background: #d4c8ff !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #b8d4ff !important;
        }
        * {
          scrollbar-color: #d4c8ff #090b11 !important;
        }
      `;
    } else {
      // Light mode colors - blue accent
      style.textContent = `
        ::-webkit-scrollbar-track {
          background: #fdf7e8 !important;
        }
        ::-webkit-scrollbar-thumb {
          background: #7b8a9e !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #9b7bb5 !important;
        }
        * {
          scrollbar-color: #7b8a9e #fdf7e8 !important;
        }
      `;
    }
    
    document.head.appendChild(style);
  }
  
  // Apply theme on load
  if (dark) {
    siteEl.classList.add('dark');
    siteEl.classList.remove('light');
  } else {
    siteEl.classList.add('light');
    siteEl.classList.remove('dark');
  }
  
  if (modeIcon) modeIcon.textContent = dark ? '☀' : '☾';
  if (modeTxt) modeTxt.textContent = dark ? 'light' : 'dark';
  
  // Apply scrollbar colors on initial load
  updateScrollbarColors(dark);
  
  /**
   * Toggles between dark and light themes, updates the button
   * label/icon, persists preference, and updates scrollbar colors.
   */
  function toggleMode() {
    dark = !dark;
    
    if (dark) {
      siteEl.classList.add('dark');
      siteEl.classList.remove('light');
    } else {
      siteEl.classList.add('light');
      siteEl.classList.remove('dark');
    }
    
    if (modeIcon) modeIcon.textContent = dark ? '☀' : '☾';
    if (modeTxt) modeTxt.textContent = dark ? 'light' : 'dark';
    
    localStorage.setItem('portfolioTheme', dark ? 'dark' : 'light');
    
    // Update scrollbar colors dynamically
    updateScrollbarColors(dark);
    
    // Dispatch event for other modules to react to theme change
    const themeChangeEvent = new CustomEvent('themeChanged', { detail: { dark } });
    document.dispatchEvent(themeChangeEvent);
  }
  
  // Event listener
  if (modeBtn) {
    modeBtn.addEventListener('click', toggleMode);
  }
})();