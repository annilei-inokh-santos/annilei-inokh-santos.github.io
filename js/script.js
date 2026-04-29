/* ============================================================
   SCRIPT.JS — Annilei Inokh C. Santos Portfolio
   ============================================================ */


/* ============================================================
   1. SELECTORS
   ============================================================ */
const siteEl       = document.getElementById('site');
const modeBtn      = document.getElementById('modeBtn');
const modeIcon     = document.getElementById('modeIcon');
const modeTxt      = document.getElementById('modeTxt');
const orbContainer = document.getElementById('orbContainer');
const interactiveOrb = document.getElementById('interactiveOrb');
const navLinks     = document.querySelectorAll('.nav-r a[href^="#"]');
const gifBtn       = document.getElementById('gifBtn');
const modal        = document.getElementById('carouselModal');
const closeBtn     = document.querySelector('.close-btn');
const carouselTrack = document.getElementById('carouselTrack');
const leftArrow    = document.querySelector('.left-arrow');
const rightArrow   = document.querySelector('.right-arrow');
const bottomRect   = document.getElementById('bottomRectangle');


/* ============================================================
   2. THEME STATE — Read from localStorage
   ============================================================ */
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
if (modeTxt)  modeTxt.textContent  = dark ? 'light' : 'dark';


/* ============================================================
   3. FUNCTIONS
   ============================================================ */

/**
 * Inject the CSS animation rule for floating orbs.
 * This is done in JS to keep the dynamic keyframe alongside
 * the logic that uses it.
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
 * to the #orbContainer element. Each orb slowly drifts around
 * the viewport in a loop.
 */
function createOrbs() {
  const colors = [
    'radial-gradient(circle at 30% 40%, var(--orb1), transparent 70%)',
    'radial-gradient(circle at 70% 60%, var(--orb2), transparent 70%)',
    'radial-gradient(circle at 50% 80%, var(--orb3), transparent 70%)'
  ];

  for (let i = 0; i < 3; i++) {
    const orb = document.createElement('div');
    orb.className = 'orb';
    orb.style.background = colors[i];
    orb.style.width  = (300 + Math.random() * 200) + 'px';
    orb.style.height = orb.style.width;
    orb.style.left   = (Math.random() * 100) + '%';
    orb.style.top    = (Math.random() * 100) + '%';
    orbContainer.appendChild(orb);

    let x  = parseFloat(orb.style.left);
    let y  = parseFloat(orb.style.top);
    let dx = (Math.random() - 0.5) * 0.5;
    let dy = (Math.random() - 0.5) * 0.5;

    const intervalId = setInterval(function () {
      x += dx;
      y += dy;
      if (x < -20) x = 120;
      if (x > 120) x = -20;
      if (y < -20) y = 120;
      if (y > 120) y = -20;
      orb.style.left = x + '%';
      orb.style.top  = y + '%';
    }, 3000);
    
    // Store interval ID for potential cleanup
    orb.setAttribute('data-interval-id', intervalId);
  }
}

/**
 * Updates the interactive orb's gradient colors to match
 * the current dark/light theme.
 */
function updateOrbColor() {
  if (!interactiveOrb) return;
  if (dark) {
    interactiveOrb.style.background =
      'radial-gradient(circle at center, rgba(165,200,240,0.4), rgba(100,80,200,0.2) 70%, transparent)';
  } else {
    interactiveOrb.style.background =
      'radial-gradient(circle at center, rgba(74,111,165,0.3), rgba(124,58,237,0.15) 70%, transparent)';
  }
}

/**
 * FIX: Binds the #interactiveOrb to the mouse cursor with throttling
 * to prevent excessive performance issues.
 */
let rafId = null;
let lastX = 0, lastY = 0;

function setupInteractiveOrb() {
  updateOrbColor();

  document.addEventListener('mousemove', function (e) {
    if (!interactiveOrb) return;
    
    // Throttle with requestAnimationFrame to prevent excessive updates
    if (rafId) return;
    
    lastX = e.clientX;
    lastY = e.clientY;
    
    rafId = requestAnimationFrame(() => {
      interactiveOrb.style.transform = 'translate(' + (lastX - 150) + 'px, ' + (lastY - 150) + 'px)';
      rafId = null;
    });
  });
}

/**
 * Toggles between dark and light themes, updates the button
 * label/icon, refreshes the orb color, and persists the
 * preference to localStorage.
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
  if (modeTxt)  modeTxt.textContent  = dark ? 'light' : 'dark';

  updateOrbColor();

  localStorage.setItem('portfolioTheme', dark ? 'dark' : 'light');
}

/**
 * Smoothly scrolls the page to a target Y position over a
 * given duration using a cubic ease-in-out curve.
 * @param {number} targetY   - Destination scroll position in px.
 * @param {number} duration  - Animation duration in ms.
 */
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const diff   = targetY - startY;
  if (diff === 0) return;

  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed  = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// Variables for tracking last selected portfolio
let lastSelectedIndex = 0;
let lastSelectedVersion = null;
let lastSelectedMonth = null;
let lastSelectedDay = null;
let lastSelectedYear = null;
let currentIndex = 2;
let cards = [];

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

/* ============================================================
   4. CAROUSEL FUNCTIONALITY - PORTFOLIO VERSIONS (SINGLE CARD)
   ============================================================ */
const trackContainer = document.querySelector('.carousel-track-container');

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

// Card click handlers - opens actual portfolio version
function openPortfolioVersion(version, month, day, year) {
  const portfolioUrls = {
    'v1': 'https://portfolio-v1.example.com',
    'v2': 'https://portfolio-v2.example.com',
    'v3': 'https://portfolio-v3.example.com',
    'v4': 'https://portfolio-v4.example.com',
    'v5': 'https://portfolio-v5.example.com'
  };
  
  saveLastVisitedPortfolio(version, month, day, year);
  
  lastSelectedVersion = version;
  lastSelectedMonth = month;
  lastSelectedDay = day;
  lastSelectedYear = year;
  lastSelectedIndex = currentIndex;
  
  updateLastDeparted();
  
  const url = portfolioUrls[version];
  if (url && url !== 'https://portfolio-v1.example.com') {
    window.open(url, '_blank');
  } else {
    console.log(`Portfolio ${version} - Replace with actual URL`);
  }
}

/* ============================================================
   5. MODAL / POPUP FUNCTIONALITY
   ============================================================ */
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

// Initialize carousel after cards are defined
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

// GIF Button click event
if (gifBtn) {
  gifBtn.addEventListener('click', openModal);
}

// Close button event
if (closeBtn) {
  closeBtn.addEventListener('click', closeModal);
}

// Arrow button events - Fixed with addEventListener
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

// Update present time every second (real-time) - only update if modal is open
let presentTimeInterval;
function startPresentTimeUpdates() {
  if (presentTimeInterval) clearInterval(presentTimeInterval);
  presentTimeInterval = setInterval(() => {
    if (modal && modal.classList.contains('modal--visible')) {
      updatePresentTime();
    }
  }, 1000);
}

/* ============================================================
   6. INITIALISATION
   ============================================================ */
injectOrbAnimation();
createOrbs();
setupInteractiveOrb();
initCarousel();
startPresentTimeUpdates();


/* ============================================================
   7. EVENT LISTENERS
   ============================================================ */

// Theme toggle button
if (modeBtn) {
  modeBtn.addEventListener('click', toggleMode);
}

// JS-driven smooth scroll for nav anchor links
navLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const id     = this.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    smoothScrollTo(top, 700);
  });
});

/* ============================================================
   8. GIF BUTTON IMAGE FALLBACK HANDLER WITH THEME SUPPORT
   ============================================================ */
function setupGifButtonFallback() {
  const gifButton = document.getElementById('gifBtn');
  if (!gifButton) return;
  
  function updateIconColors() {
    const icon = gifButton.querySelector('.fallback-icon');
    if (!icon) return;
    
    const isDark = document.getElementById('site').classList.contains('dark');
    
    if (isDark) {
      icon.setAttribute('colors', 'primary:#b8d4ff,secondary:#d4c8ff');
    } else {
      icon.setAttribute('colors', 'primary:#6b4e8a,secondary:#4a6fa5');
    }
  }
  
  const testImg = new Image();
  
  testImg.onerror = function() {
    gifButton.classList.add('image-failed');
    updateIconColors();
  };
  
  testImg.onload = function() {
    gifButton.classList.remove('image-failed');
  };
  
  testImg.src = '../assets/delorean-static.png';
  
  let gifTested = false;
  gifButton.addEventListener('mouseenter', function() {
    if (!gifTested) {
      const testGif = new Image();
      testGif.onerror = function() {
        gifButton.classList.add('image-failed');
        updateIconColors();
      };
      testGif.src = '../assets/delorean.gif';
      gifTested = true;
    }
  });
  
  const modeBtn = document.getElementById('modeBtn');
  if (modeBtn) {
    modeBtn.addEventListener('click', function() {
      setTimeout(updateIconColors, 50);
    });
  }
}

setupGifButtonFallback();

/* ============================================================
   9. CLICK SPARKLE EFFECT - 4-Pointed Star Shimmer on click (Theme Compatible)
   ============================================================ */

function createSparkle(x, y) {
  const isDark = document.getElementById('site').classList.contains('dark');
  
  const darkColors = ['#b8d4ff', '#d4c8ff', '#ffffff', '#7aa2f7', '#a875b8'];
  const lightColors = ['#4a6fa5', '#8b5e9e', '#3d3522', '#6b4e8a', '#9b7bb5'];
  const colors = isDark ? darkColors : lightColors;
  
  const sparkleContainer = document.createElement('div');
  sparkleContainer.style.position = 'fixed';
  sparkleContainer.style.left = x + 'px';
  sparkleContainer.style.top = y + 'px';
  sparkleContainer.style.width = '0';
  sparkleContainer.style.height = '0';
  sparkleContainer.style.pointerEvents = 'none';
  sparkleContainer.style.zIndex = '9999';
  document.body.appendChild(sparkleContainer);
  
  const particleCount = 8;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const angle = (Math.PI * 2 * i) / particleCount;
    const distance = 40 + Math.random() * 60;
    
    const starSize = 12 + Math.random() * 8;
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", starSize);
    svg.setAttribute("height", starSize);
    svg.setAttribute("viewBox", "-10 -10 20 20");
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    svg.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
    
    const path = document.createElementNS(svgNS, "path");
    const innerRadius = 3;
    const outerRadius = 8;
    const points = 4;
    let pathData = "";
    
    for (let p = 0; p < points * 2; p++) {
      const radius = p % 2 === 0 ? outerRadius : innerRadius;
      const pAngle = (Math.PI * 2 * p) / (points * 2) - Math.PI / 4;
      const px = radius * Math.cos(pAngle);
      const py = radius * Math.sin(pAngle);
      pathData += (p === 0 ? "M" : "L") + px + "," + py;
    }
    pathData += "Z";
    
    path.setAttribute("d", pathData);
    path.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);
    path.setAttribute("stroke", isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)");
    path.setAttribute("stroke-width", "0.5");
    
    svg.appendChild(path);
    particle.appendChild(svg);
    
    particle.style.position = 'absolute';
    particle.style.left = '0';
    particle.style.top = '0';
    particle.style.pointerEvents = 'none';
    
    sparkleContainer.appendChild(particle);
    
    const startX = 0;
    const startY = 0;
    const endX = Math.cos(angle) * distance + (Math.random() - 0.5) * 15;
    const endY = Math.sin(angle) * distance + (Math.random() - 0.5) * 15;
    
    let startTime = null;
    const duration = 500 + Math.random() * 200;
    const startRotate = Math.random() * 360;
    const endRotate = startRotate + (Math.random() * 360 - 180);
    
    function animateParticle(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentX = startX + (endX * easeOut);
      const currentY = startY + (endY * easeOut);
      const currentScale = 1 - (progress * 0.7);
      const currentOpacity = 1 - (progress * 1.1);
      const currentRotate = startRotate + (endRotate - startRotate) * easeOut;
      
      particle.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) scale(${currentScale})`;
      particle.style.opacity = currentOpacity;
      svg.style.transform = `rotate(${currentRotate}deg)`;
      
      if (progress < 1) {
        requestAnimationFrame(animateParticle);
      } else {
        particle.remove();
      }
    }
    
    requestAnimationFrame(animateParticle);
  }
  
  for (let i = 0; i < 5; i++) {
    const miniStar = document.createElement('div');
    const starSize = 6 + Math.random() * 6;
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", starSize);
    svg.setAttribute("height", starSize);
    svg.setAttribute("viewBox", "-10 -10 20 20");
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    svg.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
    
    const path = document.createElementNS(svgNS, "path");
    const innerRadius = 2;
    const outerRadius = 6;
    const points = 4;
    let pathData = "";
    
    for (let p = 0; p < points * 2; p++) {
      const radius = p % 2 === 0 ? outerRadius : innerRadius;
      const pAngle = (Math.PI * 2 * p) / (points * 2) - Math.PI / 4;
      const px = radius * Math.cos(pAngle);
      const py = radius * Math.sin(pAngle);
      pathData += (p === 0 ? "M" : "L") + px + "," + py;
    }
    pathData += "Z";
    
    path.setAttribute("d", pathData);
    path.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);
    svg.appendChild(path);
    miniStar.appendChild(svg);
    miniStar.style.position = 'absolute';
    miniStar.style.left = '0';
    miniStar.style.top = '0';
    sparkleContainer.appendChild(miniStar);
    
    let startTime = null;
    const duration = 300;
    const endX = (Math.random() - 0.5) * 30;
    const endY = (Math.random() - 0.5) * 30;
    
    function animateMini(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentX = endX * easeOut;
      const currentY = endY * easeOut;
      const currentOpacity = 1 - progress;
      
      miniStar.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) scale(${1 - progress * 0.5})`;
      miniStar.style.opacity = currentOpacity;
      
      if (progress < 1) {
        requestAnimationFrame(animateMini);
      } else {
        miniStar.remove();
      }
    }
    
    requestAnimationFrame(animateMini);
  }
  
  setTimeout(() => {
    sparkleContainer.remove();
  }, 800);
}

document.addEventListener('click', function(e) {
  createSparkle(e.clientX, e.clientY);
});