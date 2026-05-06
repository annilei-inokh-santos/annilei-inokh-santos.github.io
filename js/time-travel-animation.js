/* ============================================================
   TIME-TRAVEL-ANIMATION.JS — Complete Working Version (Dark Theme Only)
   ============================================================ */

class TimeTravelAnimation {
  constructor() {
    this.overlay = null;
    this.isAnimating = false;
    this.callback = null;
    this.destinationData = null;
    this.tempTimeCircuit = null;
  }

  /**
   * Initialize the time travel animation system
   */
  init() {
    this.createOverlayElements();
    this.setupThemeObserver();
  }

  /**
   * Watch for theme changes - Only for warp effects, time circuit is hardcoded
   */
  setupThemeObserver() {
    const siteEl = document.getElementById('site');
    if (!siteEl) return;
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          if (this.overlay && !this.overlay.classList.contains('active')) {
            this.applyWarpTheme();
          }
        }
      });
    });
    
    observer.observe(siteEl, { attributes: true });
  }

  /**
   * Apply theme colors ONLY to warp effects (time circuit is hardcoded dark)
   */
  applyWarpTheme() {
    const siteEl = document.getElementById('site');
    const isDark = siteEl ? siteEl.classList.contains('dark') : true;
    
    if (this.overlay) {
      if (!isDark) {
        // Light mode warp effects only - time circuit stays dark
        this.overlay.classList.add('light-theme');
        this.overlay.classList.remove('dark-theme');
      } else {
        this.overlay.classList.add('dark-theme');
        this.overlay.classList.remove('light-theme');
      }
    }
  }

  /**
   * Create overlay elements for effects
   */
  createOverlayElements() {
    if (document.querySelector('.time-travel-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'time-travel-overlay';
    overlay.innerHTML = `
      <div class="warp-container">
        <div class="warp-tunnel"></div>
      </div>
      <div class="dramatic-blur"></div>
      <div class="warp-speed-lines"></div>
      <div class="particle-streaks"></div>
      <div class="center-burst"></div>
      <div class="flux-dramatic">
        <div class="flux-core"></div>
        <div class="flux-rings ring-1"></div>
        <div class="flux-rings ring-2"></div>
        <div class="flux-rings ring-3"></div>
      </div>
      <div class="time-circuit-animation" id="timeCircuitAnimation">
        <div class="time-circuit-wrapper">
          <!-- Destination Time -->
          <div class="circuit-time-container destination">
            <div class="circuit-header">DESTINATION TIME</div>
            <div class="circuit-time-wrapper">
              <div class="circuit-time-item">
                <div class="circuit-time-label">MONTH</div>
                <div class="circuit-time-box" data-ghost="MMM">
                  <div class="circuit-time-value" id="animDestMonth">---</div>
                </div>
              </div>
              <div class="circuit-time-item">
                <div class="circuit-time-label">DAY</div>
                <div class="circuit-time-box" data-ghost="88">
                  <div class="circuit-time-value" id="animDestDay">--</div>
                </div>
              </div>
              <div class="circuit-time-item">
                <div class="circuit-time-label">YEAR</div>
                <div class="circuit-time-box" data-ghost="8888">
                  <div class="circuit-time-value" id="animDestYear">----</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Present Time -->
          <div class="circuit-time-container present">
            <div class="circuit-header">PRESENT TIME</div>
            <div class="circuit-time-wrapper">
              <div class="circuit-time-item">
                <div class="circuit-time-label">MONTH</div>
                <div class="circuit-time-box" data-ghost="MMM">
                  <div class="circuit-time-value" id="animPresentMonth">---</div>
                </div>
              </div>
              <div class="circuit-time-item">
                <div class="circuit-time-label">DAY</div>
                <div class="circuit-time-box" data-ghost="88">
                  <div class="circuit-time-value" id="animPresentDay">--</div>
                </div>
              </div>
              <div class="circuit-time-item">
                <div class="circuit-time-label">YEAR</div>
                <div class="circuit-time-box" data-ghost="8888">
                  <div class="circuit-time-value" id="animPresentYear">----</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Last Departed -->
          <div class="circuit-time-container last">
            <div class="circuit-header">LAST TIME DEPARTED</div>
            <div class="circuit-time-wrapper">
              <div class="circuit-time-item">
                <div class="circuit-time-label">MONTH</div>
                <div class="circuit-time-box" data-ghost="MMM">
                  <div class="circuit-time-value" id="animLastMonth">---</div>
                </div>
              </div>
              <div class="circuit-time-item">
                <div class="circuit-time-label">DAY</div>
                <div class="circuit-time-box" data-ghost="88">
                  <div class="circuit-time-value" id="animLastDay">--</div>
                </div>
              </div>
              <div class="circuit-time-item">
                <div class="circuit-time-label">YEAR</div>
                <div class="circuit-time-box" data-ghost="8888">
                  <div class="circuit-time-value" id="animLastYear">----</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Status Row -->
        <div class="circuit-status-row">
          <div class="circuit-status-item">FLUX CAPACITOR: <span id="animFluxStatus">INITIALIZING</span></div>
          <div class="circuit-status-item">1.21 GW: <span id="animGWStatus">0%</span></div>
        </div>
      </div>
      <div class="dramatic-text" id="dramaticTravelText"></div>
    `;
    document.body.appendChild(overlay);
    this.overlay = overlay;
    
    this.applyWarpTheme();
  }

  /**
   * Show and animate the time circuit display
   */
  showTimeCircuit(destination, currentPresent, currentLast) {
    const circuitEl = document.getElementById('timeCircuitAnimation');
    if (!circuitEl) return;
    
    // Update destination time
    const destMonthEl = document.getElementById('animDestMonth');
    const destDayEl = document.getElementById('animDestDay');
    const destYearEl = document.getElementById('animDestYear');
    if (destMonthEl) destMonthEl.textContent = destination.month;
    if (destDayEl) destDayEl.textContent = destination.day;
    if (destYearEl) destYearEl.textContent = destination.year;
    
    // Update present time
    const presentMonthEl = document.getElementById('animPresentMonth');
    const presentDayEl = document.getElementById('animPresentDay');
    const presentYearEl = document.getElementById('animPresentYear');
    if (presentMonthEl && currentPresent) {
      presentMonthEl.textContent = currentPresent.month;
      presentDayEl.textContent = currentPresent.day;
      presentYearEl.textContent = currentPresent.year;
    }
    
    // Update last departed
    const lastMonthEl = document.getElementById('animLastMonth');
    const lastDayEl = document.getElementById('animLastDay');
    const lastYearEl = document.getElementById('animLastYear');
    if (lastMonthEl && currentLast) {
      lastMonthEl.textContent = currentLast.month;
      lastDayEl.textContent = currentLast.day;
      lastYearEl.textContent = currentLast.year;
    }
    
    // Fast animation - 0.5 seconds
    circuitEl.style.display = 'block';
    circuitEl.style.animation = 'circuitMorphIn 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards';
  }

  /**
   * Update flux and GW status with animation
   */
  updateCircuitStatus() {
    const fluxStatusEl = document.getElementById('animFluxStatus');
    const gwStatusEl = document.getElementById('animGWStatus');
    
    let gwPercent = 0;
    const fluxMessages = ['INITIALIZING', 'CHARGING', 'ACTIVE', 'READY', 'TIME TRAVEL!'];
    let msgIndex = 0;
    
    const statusInterval = setInterval(() => {
      if (gwPercent < 100) {
        gwPercent += Math.random() * 15 + 5;
        if (gwPercent > 100) gwPercent = 100;
        if (gwStatusEl) {
          gwStatusEl.textContent = `${Math.floor(gwPercent)}%`;
          gwStatusEl.style.animation = 'statusFlash 0.2s ease-in-out';
          setTimeout(() => {
            if (gwStatusEl) gwStatusEl.style.animation = '';
          }, 200);
        }
      }
      
      if (fluxStatusEl && msgIndex < fluxMessages.length) {
        fluxStatusEl.textContent = fluxMessages[msgIndex];
        fluxStatusEl.style.animation = 'statusFlash 0.3s ease-in-out';
        setTimeout(() => {
          if (fluxStatusEl) fluxStatusEl.style.animation = '';
        }, 300);
        msgIndex++;
      }
      
      if (gwPercent >= 100 && msgIndex >= fluxMessages.length) {
        clearInterval(statusInterval);
      }
    }, 250);
    
    return statusInterval;
  }

  /**
   * Hide time circuit
   */
  hideTimeCircuit() {
    const circuitEl = document.getElementById('timeCircuitAnimation');
    if (circuitEl) {
      circuitEl.style.animation = 'circuitMorphOut 0.4s ease-out forwards';
      setTimeout(() => {
        circuitEl.style.display = 'none';
      }, 400);
    }
  }

  /**
   * Create intense warp speed lines originating from center
   */
  createWarpLines() {
    const container = this.overlay.querySelector('.warp-speed-lines');
    if (!container) return;

    container.innerHTML = '';
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Horizontal left lines
    for (let i = 0; i < 30; i++) {
      const line = document.createElement('div');
      line.className = 'warp-line-left';
      const delay = Math.random() * 0.5;
      const yOffset = (Math.random() - 0.5) * height;
      const speedVariation = 0.4 + Math.random() * 0.6;
      line.style.animationDelay = `${delay}s`;
      line.style.animationDuration = `${speedVariation}s`;
      line.style.top = `calc(50% + ${yOffset}px)`;
      line.style.height = (2 + Math.random() * 8) + 'px';
      line.style.opacity = 0.3 + Math.random() * 0.7;
      container.appendChild(line);
    }
    
    // Horizontal right lines
    for (let i = 0; i < 30; i++) {
      const line = document.createElement('div');
      line.className = 'warp-line-right';
      const delay = Math.random() * 0.5;
      const yOffset = (Math.random() - 0.5) * height;
      const speedVariation = 0.4 + Math.random() * 0.6;
      line.style.animationDelay = `${delay}s`;
      line.style.animationDuration = `${speedVariation}s`;
      line.style.top = `calc(50% + ${yOffset}px)`;
      line.style.height = (2 + Math.random() * 8) + 'px';
      line.style.opacity = 0.3 + Math.random() * 0.7;
      container.appendChild(line);
    }
    
    // Vertical top lines
    for (let i = 0; i < 25; i++) {
      const line = document.createElement('div');
      line.className = 'warp-line-top';
      const delay = Math.random() * 0.5;
      const xOffset = (Math.random() - 0.5) * width;
      const speedVariation = 0.4 + Math.random() * 0.6;
      line.style.animationDelay = `${delay}s`;
      line.style.animationDuration = `${speedVariation}s`;
      line.style.left = `calc(50% + ${xOffset}px)`;
      line.style.width = (2 + Math.random() * 8) + 'px';
      line.style.opacity = 0.3 + Math.random() * 0.7;
      container.appendChild(line);
    }
    
    // Vertical bottom lines
    for (let i = 0; i < 25; i++) {
      const line = document.createElement('div');
      line.className = 'warp-line-bottom';
      const delay = Math.random() * 0.5;
      const xOffset = (Math.random() - 0.5) * width;
      const speedVariation = 0.4 + Math.random() * 0.6;
      line.style.animationDelay = `${delay}s`;
      line.style.animationDuration = `${speedVariation}s`;
      line.style.left = `calc(50% + ${xOffset}px)`;
      line.style.width = (2 + Math.random() * 8) + 'px';
      line.style.opacity = 0.3 + Math.random() * 0.7;
      container.appendChild(line);
    }
    
    // Diagonal lines
    const diagonalDirections = ['diag-tl', 'diag-tr', 'diag-bl', 'diag-br'];
    for (let i = 0; i < 60; i++) {
      const direction = diagonalDirections[Math.floor(Math.random() * 4)];
      const line = document.createElement('div');
      line.className = `warp-line-${direction}`;
      const delay = Math.random() * 0.6;
      const speedVariation = 0.3 + Math.random() * 0.5;
      line.style.animationDelay = `${delay}s`;
      line.style.animationDuration = `${speedVariation}s`;
      line.style.opacity = 0.4 + Math.random() * 0.6;
      container.appendChild(line);
    }
  }

  /**
   * Create particle streaks
   */
  createParticleStreaks() {
    const container = this.overlay.querySelector('.particle-streaks');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 80; i++) {
      const streak = document.createElement('div');
      streak.className = 'streak';
      
      const topPos = Math.random() * 100;
      const delay = Math.random() * 0.8;
      const duration = 0.3 + Math.random() * 0.4;
      const width = 80 + Math.random() * 150;
      
      streak.style.top = topPos + '%';
      streak.style.animationDelay = `${delay}s`;
      streak.style.animationDuration = `${duration}s`;
      streak.style.width = width + 'px';
      streak.style.height = (2 + Math.random() * 4) + 'px';
      streak.style.opacity = 0.4 + Math.random() * 0.6;
      
      container.appendChild(streak);
    }
  }

  /**
   * Get current present time
   */
  getCurrentPresentTime() {
    const now = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return {
      month: months[now.getMonth()],
      day: now.getDate().toString().padStart(2, '0'),
      year: now.getFullYear()
    };
  }

  /**
   * Get current last departed time from original circuit
   */
  getCurrentLastDeparted() {
    const lastMonthEl = document.getElementById('lastMonth');
    const lastDayEl = document.getElementById('lastDay');
    const lastYearEl = document.getElementById('lastYear');
    
    return {
      month: lastMonthEl ? lastMonthEl.textContent : '---',
      day: lastDayEl ? lastDayEl.textContent : '--',
      year: lastYearEl ? lastYearEl.textContent : '----'
    };
  }

  /**
   * Update original time circuit destination
   */
  updateOriginalDestination(destination) {
    const destMonthEl = document.getElementById('destinationMonth');
    const destDayEl = document.getElementById('destinationDay');
    const destYearEl = document.getElementById('destinationYear');
    const lastMonthEl = document.getElementById('lastMonth');
    const lastDayEl = document.getElementById('lastDay');
    const lastYearEl = document.getElementById('lastYear');
    
    const currentMonth = destMonthEl ? destMonthEl.textContent : '---';
    const currentDay = destDayEl ? destDayEl.textContent : '--';
    const currentYear = destYearEl ? destYearEl.textContent : '----';
    
    if (lastMonthEl) lastMonthEl.textContent = currentMonth;
    if (lastDayEl) lastDayEl.textContent = currentDay;
    if (lastYearEl) lastYearEl.textContent = currentYear;
    
    if (destMonthEl) destMonthEl.textContent = destination.month;
    if (destDayEl) destDayEl.textContent = destination.day;
    if (destYearEl) destYearEl.textContent = destination.year;
  }

  /**
   * Animate dramatic text
   */
  async animateDramaticText(destination) {
    const textEl = document.getElementById('dramaticTravelText');
    if (!textEl) return;
    
    const sequences = [
      `⚡ FLUX CAPACITOR CHARGING ⚡`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `DESTINATION: ${destination.month} ${destination.day}, ${destination.year}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `⚡ 1.21 GIGAWATTS! ⚡`,
      `══════════════════════════`,
      `✦ TIME TRAVEL INITIATED ✦`
    ];
    
    for (let i = 0; i < sequences.length; i++) {
      textEl.textContent = sequences[i];
      await this.delay(350);
    }
    
    await this.delay(500);
    textEl.style.opacity = '0';
  }

  /**
   * Create dramatic flash
   */
  createDramaticFlash() {
    const flash = document.createElement('div');
    flash.className = 'dramatic-flash';
    this.overlay.appendChild(flash);
    
    setTimeout(() => {
      if (flash && flash.remove) flash.remove();
    }, 600);
  }

  /**
   * Main time travel animation
   */
  async travelToTime(destination, callback) {
    if (this.isAnimating) {
      console.log('Time travel already in progress');
      return;
    }
    
    this.isAnimating = true;
    this.callback = callback;
    this.destinationData = destination;
    
    const currentPresent = this.getCurrentPresentTime();
    const currentLast = this.getCurrentLastDeparted();
    
    const siteElement = document.getElementById('site');
    if (siteElement) {
      siteElement.classList.add('warp-shake');
    }
    
    this.overlay.classList.add('active');
    this.applyWarpTheme();
    
    try {
      this.createWarpLines();
      this.createParticleStreaks();
      this.showTimeCircuit(destination, currentPresent, currentLast);
      
      const statusInterval = this.updateCircuitStatus();
      
      await this.delay(300);
      this.createDramaticFlash();
      await this.animateDramaticText(destination);
      this.updateOriginalDestination(destination);
      this.createDramaticFlash();
      this.hideTimeCircuit();
      
      clearInterval(statusInterval);
      await this.delay(300);
      
    } catch (error) {
      console.error('Animation error:', error);
    }
    
    if (this.callback) {
      this.callback();
    }
    
    setTimeout(() => {
      this.cleanup();
    }, 500);
  }
  
  /**
   * Helper delay
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Clean up
   */
  cleanup() {
    if (!this.overlay) return;
    
    const siteElement = document.getElementById('site');
    if (siteElement) {
      siteElement.classList.remove('warp-shake');
    }
    
    this.overlay.classList.remove('active');
    
    const warpLines = this.overlay.querySelector('.warp-speed-lines');
    const streaks = this.overlay.querySelector('.particle-streaks');
    const textEl = document.getElementById('dramaticTravelText');
    const circuitEl = document.getElementById('timeCircuitAnimation');
    
    if (warpLines) warpLines.innerHTML = '';
    if (streaks) streaks.innerHTML = '';
    if (textEl) {
      textEl.textContent = '';
      textEl.style.opacity = '0';
    }
    if (circuitEl) {
      circuitEl.style.display = 'none';
      circuitEl.style.animation = '';
    }
    
    this.isAnimating = false;
    this.callback = null;
    this.destinationData = null;
  }
}

// Create global instance
const timeTravel = new TimeTravelAnimation();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  timeTravel.init();
});