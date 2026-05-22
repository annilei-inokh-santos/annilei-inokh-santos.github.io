/* ============================================================
   GIF-BUTTON.JS — GIF Fallback Logic
   ============================================================ */

(function() {
  function setupGifButton() {
    const gifButton = document.getElementById('gifBtn');
    if (!gifButton) return;
    
    const img = gifButton.querySelector('.gif-img');
    const icon = gifButton.querySelector('.fallback-icon');
    if (!img) return;
    
    const GIF_SRC = '../assets/delorean.gif';
    
    // Mark button as failed — hides img, reveals fontawesome icon
    function markFailed() {
      gifButton.classList.add('image-failed');
    }
    
    // Test GIF on load
    const testGif = new Image();
    testGif.onload = () => { img.src = GIF_SRC; };
    testGif.onerror = markFailed;
    testGif.src = GIF_SRC;
    
    img.onerror = markFailed;
  }
  
  setupGifButton();
})();