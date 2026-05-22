/* ============================================================
   MODAL.JS — Modal Open/Close + Carousel + Time Circuit Panel Data with Animation
   ============================================================ */

(function() {
  const modal = document.getElementById('carouselModal');
  const closeBtn = document.querySelector('.close-btn');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const gifBtn = document.getElementById('gifBtn');
  
  let currentIndex = 0;
  let cards = [];
  let versionsData = [];
  
  function initCards() {
    cards = Array.from(document.querySelectorAll('.carousel-card'));
    console.log(`Found ${cards.length} carousel cards`);
    return cards.length;
  }
  
  function updatePresentTime() {
    const now = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    const presentMonth = document.getElementById('presentMonth');
    const presentDay = document.getElementById('presentDay');
    const presentYear = document.getElementById('presentYear');
    
    if (presentMonth) presentMonth.textContent = months[now.getMonth()];
    if (presentDay) presentDay.textContent = now.getDate().toString().padStart(2, '0');
    if (presentYear) presentYear.textContent = now.getFullYear();
  }
  
  function updateLastDeparted() {
    const lastMonth = localStorage.getItem('lastVisitedMonth');
    const lastDay = localStorage.getItem('lastVisitedDay');
    const lastYear = localStorage.getItem('lastVisitedYear');
    
    if (lastMonth && lastDay && lastYear) {
      const lastMonthEl = document.getElementById('lastMonth');
      const lastDayEl = document.getElementById('lastDay');
      const lastYearEl = document.getElementById('lastYear');
      if (lastMonthEl) lastMonthEl.textContent = lastMonth;
      if (lastDayEl) lastDayEl.textContent = lastDay;
      if (lastYearEl) lastYearEl.textContent = lastYear;
    }
  }
  
  function updateCarousel() {
    if (!cards.length) return;
    
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    
    const cardWidth = cards[0].offsetWidth;
    const gap = 20;
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
    
    const currentCard = cards[currentIndex];
    if (currentCard) {
      const destMonth = currentCard.dataset.createdMonth || '---';
      const destDay = currentCard.dataset.createdDay || '--';
      const destYear = currentCard.dataset.createdYear || '----';
      
      const destMonthEl = document.getElementById('destinationMonth');
      const destDayEl = document.getElementById('destinationDay');
      const destYearEl = document.getElementById('destinationYear');
      
      if (destMonthEl) destMonthEl.textContent = destMonth;
      if (destDayEl) destDayEl.textContent = destDay;
      if (destYearEl) destYearEl.textContent = destYear;
    }
    
    cards.forEach((card, index) => {
      if (index === currentIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }
  
  function nextSlide() {
    if (cards.length && currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  }
  
  function prevSlide() {
    if (cards.length && currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }
  
  function openModal() {
    if (!modal) return;
    
    modal.classList.add('modal--visible');
    document.body.style.overflow = 'hidden';
    
    initCards();
    updatePresentTime();
    updateLastDeparted();
    
    setTimeout(() => {
      updateCarousel();
    }, 100);
  }
  
  function closeModal() {
    if (modal) {
      modal.classList.remove('modal--visible');
      document.body.style.overflow = '';
    }
  }
  
  /**
   * Open portfolio version with time travel animation
   */
  function openPortfolioVersion(versionId, month, day, year, url) {
    // Save to localStorage
    localStorage.setItem('lastVisitedPortfolio', versionId);
    localStorage.setItem('lastVisitedMonth', month);
    localStorage.setItem('lastVisitedDay', day);
    localStorage.setItem('lastVisitedYear', year);
    
    // Create destination object for time travel
    const destination = {
      month: month,
      day: day,
      year: year
    };
    
    // Store navigation data for after animation
    let pendingNavigation = null;
    
    if (url && url !== '#') {
      pendingNavigation = () => {
        window.open(url, '_blank');
      };
    }
    
    // Trigger time travel animation if available
    if (typeof timeTravel !== 'undefined' && timeTravel.travelToTime) {
      timeTravel.travelToTime(destination, () => {
        if (pendingNavigation) {
          pendingNavigation();
        }
      });
    } else if (pendingNavigation) {
      // Fallback: direct navigation without animation
      pendingNavigation();
    } else {
      console.log(`Portfolio ${versionId} - No URL configured`);
    }
  }
  
  function setupCardHandlers() {
    cards.forEach(card => {
      card.removeEventListener('click', card._handler);
      card._handler = () => {
        const version = card.dataset.version;
        const month = card.dataset.createdMonth;
        const day = card.dataset.createdDay;
        const year = card.dataset.createdYear;
        const url = card.dataset.url;
        
        if (version) {
          closeModal();
          // Small delay to allow modal to close before animation starts
          setTimeout(() => {
            openPortfolioVersion(version, month, day, year, url);
          }, 100);
        }
      };
      card.addEventListener('click', card._handler);
    });
  }
  
  function initCarouselWithVersions(versions) {
    if (versions && versions.length > 0) {
      versionsData = versions;
      const cardCount = initCards();
      
      if (cardCount > 0) {
        setupCardHandlers();
        
        const savedVersion = localStorage.getItem('lastVisitedPortfolio');
        if (savedVersion) {
          const index = versionsData.findIndex(v => v.id === savedVersion);
          if (index !== -1) currentIndex = index;
        }
        
        setTimeout(() => updateCarousel(), 100);
      }
    }
  }
  
  // Event listeners
  document.addEventListener('portfolioVersionsLoaded', (e) => {
    initCarouselWithVersions(e.detail);
  });
  
  if (window.PortfolioData && window.PortfolioData.getVersions) {
    const versions = window.PortfolioData.getVersions();
    if (versions && versions.versions) {
      initCarouselWithVersions(versions.versions);
    }
  }
  
  if (gifBtn) {
    gifBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (leftArrow) leftArrow.addEventListener('click', (e) => { e.preventDefault(); prevSlide(); });
  if (rightArrow) rightArrow.addEventListener('click', (e) => { e.preventDefault(); nextSlide(); });
  
  window.addEventListener('resize', () => {
    if (modal && modal.classList.contains('modal--visible')) {
      updateCarousel();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('modal--visible')) {
      closeModal();
    }
    if (e.key === 'ArrowLeft' && modal && modal.classList.contains('modal--visible')) {
      prevSlide();
    }
    if (e.key === 'ArrowRight' && modal && modal.classList.contains('modal--visible')) {
      nextSlide();
    }
  });
  
  setInterval(() => {
    if (modal && modal.classList.contains('modal--visible')) {
      updatePresentTime();
    }
  }, 1000);
  
  console.log('Modal module loaded with time travel animation');
})();