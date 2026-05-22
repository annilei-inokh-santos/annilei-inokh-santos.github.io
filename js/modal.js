/* ============================================================
   MODAL.JS — Modal Open/Close + Carousel + Time Circuit Panel Data
   NO BACKDROP CLOSE - Only close button works
   ============================================================ */

(function() {
  // Modal HTML Template
  const MODAL_TEMPLATE = `
    <div id="carouselModal" class="modal" role="dialog" aria-label="Portfolio version selector">
      <span class="close-btn" aria-label="Close">&times;</span>
      <div class="modal-inner">
        <!-- Carousel Section -->
        <div class="carousel-wrapper">
          <div class="carousel-container">
            <button class="carousel-arrow left-arrow" aria-label="Previous portfolio">&#10094;</button>
            <div class="carousel-track-container">
              <div class="carousel-track" id="carouselTrack">
                <!-- Carousel cards will be loaded dynamically from portfolio-versions.json -->
              </div>
            </div>
            <button class="carousel-arrow right-arrow" aria-label="Next portfolio">&#10095;</button>
          </div>
        </div>

        <!-- Time Circuit Panel -->
        <div class="bottom-rectangle" id="bottomRectangle">
          <div class="rectangle-content">
            <!-- Destination Time -->
            <div class="time-container destination-time">
              <div class="time-values-wrapper">
                <div class="time-item">
                  <div class="time-label">MONTH</div>
                  <div class="time-value-box month-box" data-ghost="MMM">
                    <div class="time-month" id="destinationMonth">---</div>
                  </div>
                </div>
                <div class="time-item">
                  <div class="time-label">DAY</div>
                  <div class="time-value-box day-box" data-ghost="88">
                    <div class="time-day" id="destinationDay">--</div>
                  </div>
                </div>
                <div class="time-item">
                  <div class="time-label">YEAR</div>
                  <div class="time-value-box year-box" data-ghost="8888">
                    <div class="time-year" id="destinationYear">----</div>
                  </div>
                </div>
              </div>
              <div class="time-header">DESTINATION TIME</div>
            </div>

            <!-- Present Time -->
            <div class="time-container present-time">
              <div class="time-values-wrapper">
                <div class="time-item">
                  <div class="time-label">MONTH</div>
                  <div class="time-value-box month-box" data-ghost="MMM">
                    <div class="time-month" id="presentMonth">---</div>
                  </div>
                </div>
                <div class="time-item">
                  <div class="time-label">DAY</div>
                  <div class="time-value-box day-box" data-ghost="88">
                    <div class="time-day" id="presentDay">--</div>
                  </div>
                </div>
                <div class="time-item">
                  <div class="time-label">YEAR</div>
                  <div class="time-value-box year-box" data-ghost="8888">
                    <div class="time-year" id="presentYear">----</div>
                  </div>
                </div>
              </div>
              <div class="time-header">PRESENT TIME</div>
            </div>

            <!-- Last Time Departed -->
            <div class="time-container last-departed">
              <div class="time-values-wrapper">
                <div class="time-item">
                  <div class="time-label">MONTH</div>
                  <div class="time-value-box month-box" data-ghost="MMM">
                    <div class="time-month" id="lastMonth">---</div>
                  </div>
                </div>
                <div class="time-item">
                  <div class="time-label">DAY</div>
                  <div class="time-value-box day-box" data-ghost="88">
                    <div class="time-day" id="lastDay">--</div>
                  </div>
                </div>
                <div class="time-item">
                  <div class="time-label">YEAR</div>
                  <div class="time-value-box year-box" data-ghost="8888">
                    <div class="time-year" id="lastYear">----</div>
                  </div>
                </div>
              </div>
              <div class="time-header">LAST TIME DEPARTED</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  let modal = null;
  let closeBtn = null;
  let leftArrow = null;
  let rightArrow = null;
  let currentIndex = 0;
  let cards = [];
  let versionsData = [];
  
  /**
   * Initialize modal by injecting HTML into DOM
   */
  function initModal() {
    // Check if modal already exists
    if (document.getElementById('carouselModal')) {
      modal = document.getElementById('carouselModal');
    } else {
      // Inject modal HTML
      document.body.insertAdjacentHTML('beforeend', MODAL_TEMPLATE);
      modal = document.getElementById('carouselModal');
    }
    
    // Get references to modal elements
    closeBtn = document.querySelector('.close-btn');
    leftArrow = document.querySelector('.left-arrow');
    rightArrow = document.querySelector('.right-arrow');
    
    // Setup event listeners
    setupModalEventListeners();
    
    console.log('Modal initialized');
  }
  
  /**
   * Setup modal event listeners
   * NOTE: No backdrop click listener - only close button closes the modal
   */
  function setupModalEventListeners() {
    // Only close button closes the modal
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    // Arrow navigation
    if (leftArrow) {
      leftArrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
      });
    }
    
    if (rightArrow) {
      rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
      });
    }
    
    // Close on escape key only (not on backdrop click)
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
    
    // IMPORTANT: No backdrop click listener - modal only closes via close button or ESC
  }
  
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
    
    // Get the actual card width including gap
    const card = cards[0];
    const cardWidth = card.offsetWidth;
    
    // Get gap based on screen size
    const isMobile = window.innerWidth <= 768;
    const gap = isMobile ? 12 : 20;
    
    // Calculate offset
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
    
    // Update destination time
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
    
    // Update active class
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
  
  // Listen for versions loaded event
  document.addEventListener('portfolioVersionsLoaded', (e) => {
    initCarouselWithVersions(e.detail);
  });
  
  // Check if already loaded
  if (window.PortfolioData && window.PortfolioData.getVersions) {
    const versions = window.PortfolioData.getVersions();
    if (versions && versions.versions) {
      initCarouselWithVersions(versions.versions);
    }
  }
  
  // Get GIF button and attach click handler
  const gifBtn = document.getElementById('gifBtn');
  if (gifBtn) {
    gifBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }
  
  // Update present time every second
  setInterval(() => {
    if (modal && modal.classList.contains('modal--visible')) {
      updatePresentTime();
    }
  }, 1000);
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (modal && modal.classList.contains('modal--visible')) {
      setTimeout(() => updateCarousel(), 50);
    }
  });
  
  // Initialize modal
  initModal();
  
  console.log('Modal module loaded - backdrop click disabled, only close button works');
})();