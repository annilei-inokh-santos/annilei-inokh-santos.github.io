/* ============================================================
   THEME.JS — Theme Toggle + localStorage
   ============================================================ */

(function() {
  const siteEl = document.getElementById('site');
  const modeBtn = document.getElementById('modeBtn');
  const modeIcon = document.getElementById('modeIcon');
  const modeTxt = document.getElementById('modeTxt');
  
  // Read from localStorage
  const savedMode = localStorage.getItem('portfolioTheme');
  let dark = savedMode !== null ? savedMode === 'dark' : true;
  
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
  
  /**
   * Toggles between dark and light themes, updates the button
   * label/icon, and persists the preference to localStorage.
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
    
    // Dispatch event for other modules to react to theme change
    const themeChangeEvent = new CustomEvent('themeChanged', { detail: { dark } });
    document.dispatchEvent(themeChangeEvent);
  }
  
  // Event listener
  if (modeBtn) {
    modeBtn.addEventListener('click', toggleMode);
  }
})();