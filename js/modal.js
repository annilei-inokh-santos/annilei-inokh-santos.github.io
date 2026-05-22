/* ============================================================
   MODAL.JS — Modal Open/Close + Carousel + Time Circuit Panel Data
   ============================================================ */

(function() {
  const modal = document.getElementById('carouselModal');
  const closeBtn = document.querySelector('.close-btn');
  const carouselTrack = document.getElementById('carouselTrack');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const gifBtn = document.getElementById('gifBtn');
  
  let currentIndex = 2;
  let cards = [];
  let lastSelectedIndex = 0;
  let lastSelectedVersion = null;
  let lastSelectedMonth = null;
  let lastSelectedDay = null;
  let lastSelectedYear = null;
  
  // Initialize cards after DOM is ready
  function initCards() {
    cards = document.querySelectorAll('.carousel-card');
  }
  
  /**
   * Updates the present time with real-time date
   */
  function updatePresentTime() {
    const now = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[now.getMonth()];
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear();
    
    const presentMonthEl = document.getElementById('presentMonth');
    const presentDayEl = document.getElementById('presentDay');
    const presentYearEl = document.getElementById('presentYear');
    
    if (presentMonthEl) presentMonthEl.textContent = month;
    if (presentDayEl) presentDayEl.textContent = day;
    if (presentYearEl) presentYearEl.textContent = year;
  }
  
  /**
   * Updates the last time departed with previously selected portfolio
   */
  function updateLastDeparted() {
    const lastMonthEl = document.getElementById('lastMonth');
    const lastDayEl = document.getElementById('lastDay');
    const lastYearEl = document.getElementById('lastYear');
    
    if (lastSelectedMonth && lastSelectedDay && lastSelectedYear) {
      if (lastMonthEl) lastMonthEl.textContent = lastSelectedMonth;
      if (lastDayEl) lastDayEl.textContent = lastSelectedDay;
      if (lastYearEl) lastYearEl.textContent = lastSelectedYear;
    }
  }
  
  // Load last visited portfolio from localStorage
  function loadLastVisitedPortfolio() {
    const savedVersion = localStorage.getItem('lastVisitedPortfolio');
    if (savedVersion && cards.length > 0) {
      for (let i = 0; i < cards.length; i++) {
        const version = cards[i].getAttribute('data-version');
        if (version === savedVersion) {
          currentIndex = i;
          lastSelectedVersion = savedVersion;
          lastSelectedMonth = cards[i].getAttribute('data-created-month') || '---';
          lastSelectedDay = cards[i].getAttribute('data-created-day') || '--';
          lastSelectedYear = cards[i].getAttribute('data-created-year') || '----';
          lastSelectedIndex = i;
          break;
        }
      }
    }
  }
  
  // Save last visited portfolio to localStorage
  function saveLastVisitedPortfolio(version, month, day, year) {
    localStorage.setItem('lastVisitedPortfolio', version);
    localStorage.setItem('lastVisitedMonth', month);
    localStorage.setItem('lastVisitedDay', day);
    localStorage.setItem('lastVisitedYear', year);
  }
  
  function getCardWidth() {
    if (!cards.length) return 300;
    const card = cards[0];
    const rect = card.getBoundingClientRect();
    const marginLeft = parseFloat(getComputedStyle(card).marginLeft) || 0;
    const marginRight = parseFloat(getComputedStyle(card).marginRight) || 0;
    return rect.width + marginLeft + marginRight;
  }
  
  function updateCarouselPosition() {
    if (!carouselTrack || !cards.length) return;
    
    const cardWidth = getCardWidth();
    const newPosition = -(currentIndex * cardWidth);
    carouselTrack.style.transform = `translateX(${newPosition}px)`;
  }
  
  function updateCarousel() {
    updateCarouselPosition();
    const currentCard = cards[currentIndex];
    if (currentCard) {
      const destMonth = currentCard.getAttribute('data-created-month') || '---';
      const destDay = currentCard.getAttribute('data-created-day') || '--';
      const destYear = currentCard.getAttribute('data-created-year') || '----';
      
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
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }
  
  // Store the pending navigation data
  let pendingNavigation = null;
  
  /**
   * Opens portfolio version with time travel animation
   */
  function openPortfolioVersion(version, month, day, year) {
    const portfolioUrls = {
      'v1': './previous-versions/2020.html',
      'v2': './previous-versions/2021-v1.html',
      'v3': './previous-versions/2021-v2.html',
      'v4': './previous-versions/2024.html'
    };
    
    // Save to localStorage
    saveLastVisitedPortfolio(version, month, day, year);
    
    // Update last departed tracking
    lastSelectedVersion = version;
    lastSelectedMonth = month;
    lastSelectedDay = day;
    lastSelectedYear = year;
    lastSelectedIndex = currentIndex;
    
    updateLastDeparted();
    
    // Get the URL
    const url = portfolioUrls[version];
    
    if (url && url !== 'https://portfolio-v1.example.com') {
      // Store navigation data for after animation
      pendingNavigation = () => {
        window.open(url, '_blank');
      };
      
      // Create destination object for time travel
      const destination = {
        month: month,
        day: day,
        year: year
      };
      
      // Trigger time travel animation
      if (typeof timeTravel !== 'undefined' && timeTravel.travelToTime) {
        timeTravel.travelToTime(destination, () => {
          if (pendingNavigation) {
            pendingNavigation();
            pendingNavigation = null;
          }
        });
      } else if (pendingNavigation) {
        pendingNavigation();
        pendingNavigation = null;
      }
    } else {
      console.log(`Portfolio ${version} - Replace with actual URL`);
      if (url) {
        window.open(url, '_blank');
      }
    }
  }
  
  function openModal() {
    if (modal) {
      modal.classList.add('modal--visible');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      updatePresentTime();
      loadLastVisitedPortfolio();
      updateCarousel();
      updateLastDeparted();
      setTimeout(() => {
        updateCarousel();
      }, 10);
    }
  }
  
  function closeModal() {
    if (modal) {
      modal.classList.remove('modal--visible');
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
  }
  
  // Initialize carousel
  function initCarousel() {
    initCards();
    if (cards.length > 0) {
      const savedVersion = localStorage.getItem('lastVisitedPortfolio');
      if (savedVersion) {
        for (let i = 0; i < cards.length; i++) {
          const version = cards[i].getAttribute('data-version');
          if (version === savedVersion) {
            currentIndex = i;
            lastSelectedVersion = savedVersion;
            lastSelectedMonth = localStorage.getItem('lastVisitedMonth') || cards[i].getAttribute('data-created-month') || '---';
            lastSelectedDay = localStorage.getItem('lastVisitedDay') || cards[i].getAttribute('data-created-day') || '--';
            lastSelectedYear = localStorage.getItem('lastVisitedYear') || cards[i].getAttribute('data-created-year') || '----';
            lastSelectedIndex = i;
            break;
          }
        }
      } else {
        const initialCard = cards[currentIndex];
        if (initialCard) {
          lastSelectedVersion = initialCard.getAttribute('data-version') || `v${currentIndex + 1}`;
          lastSelectedMonth = initialCard.getAttribute('data-created-month') || '---';
          lastSelectedDay = initialCard.getAttribute('data-created-day') || '--';
          lastSelectedYear = initialCard.getAttribute('data-created-year') || '----';
          lastSelectedIndex = currentIndex;
        }
      }
      
      cards.forEach((card) => {
        card.addEventListener('click', (e) => {
          e.stopPropagation();
          const version = card.getAttribute('data-version');
          const month = card.getAttribute('data-created-month') || '---';
          const day = card.getAttribute('data-created-day') || '--';
          const year = card.getAttribute('data-created-year') || '----';
          if (version) {
            closeModal();
            openPortfolioVersion(version, month, day, year);
          }
        });
      });
      
      updateCarousel();
      updatePresentTime();
      updateLastDeparted();
    }
  }
  
  // Event listeners
  if (gifBtn) {
    gifBtn.addEventListener('click', openModal);
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (leftArrow) {
    leftArrow.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      prevSlide();
    });
  }
  
  if (rightArrow) {
    rightArrow.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      nextSlide();
    });
  }
  
  // Handle window resize for responsive carousel
  window.addEventListener('resize', () => {
    if (modal && modal.classList.contains('modal--visible')) {
      updateCarousel();
    }
  });
  
  // Update present time every second (only if modal is open)
  let presentTimeInterval;
  function startPresentTimeUpdates() {
    if (presentTimeInterval) clearInterval(presentTimeInterval);
    presentTimeInterval = setInterval(() => {
      if (modal && modal.classList.contains('modal--visible')) {
        updatePresentTime();
      }
    }, 1000);
  }
  
  // Initialize
  initCarousel();
  startPresentTimeUpdates();
})();