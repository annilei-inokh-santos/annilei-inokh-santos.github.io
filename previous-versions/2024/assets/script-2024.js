// ─── Global Click Effect for Entire Page ─────────────────

class GlobalClickEffect {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.clickStars = [];
    this.width = 0;
    this.height = 0;
    this.animationId = null;
    
    this.init();
  }
  
  init() {
    this.createCanvas();
    this.setupEventListeners();
    this.addStarsToHeroText();
    this.addHeroBackgroundStars();
    this.setupDesktopNavigation();
    this.setupMobileSnackbar();
    this.setupCoinFlipEffect();
    this.animate();
  }
  
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'globalClickCanvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d');
    this.resize();
  }
  
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.addHeroBackgroundStars();
  }
  
  setupDesktopNavigation() {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;
    
    const sectionGroups = document.querySelectorAll('.section-group');
    const navHeadings = document.querySelectorAll('.nav-heading');
    
    if (sectionGroups.length === 0) return;
    
    // Function to show a specific group
    const showGroup = (groupName) => {
      sectionGroups.forEach(group => {
        if (group.getAttribute('data-group') === groupName) {
          group.classList.add('active-group');
        } else {
          group.classList.remove('active-group');
        }
      });
    };
    
    // Show About group by default
    showGroup('about');
    
    // Handle navigation heading clicks
    navHeadings.forEach(heading => {
      heading.addEventListener('click', (e) => {
        e.stopPropagation();
        const category = heading.getAttribute('data-category');
        if (category) {
          showGroup(category);
        }
      });
    });
    
    // Handle dropdown link clicks - prevent default scroll
    const dropdownLinks = document.querySelectorAll('.nav-links a');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('data-category');
        if (category) {
          showGroup(category);
        }
      });
    });
  }
  
  setupMobileSnackbar() {
    const isMobile = window.innerWidth < 1024;
    
    // Remove existing snackbar if any
    const existingSnackbar = document.querySelector('.mobile-snackbar');
    if (existingSnackbar) existingSnackbar.remove();
    
    if (!isMobile) return;
    
    // Create mobile snackbar
    const snackbar = document.createElement('div');
    snackbar.className = 'mobile-snackbar';
    snackbar.innerHTML = `
      <div class="snackbar-item" data-group="about">
        <button class="snackbar-btn">
          <i class="fas fa-user-circle"></i>
          <span>About</span>
        </button>
        <div class="snackbar-dropdown">
          <a href="#about"><i class="fas fa-user"></i> Personal Info</a>
          <a href="#education"><i class="fas fa-graduation-cap"></i> Education</a>
          <a href="#skills"><i class="fas fa-code"></i> Skills & Tools</a>
          <a href="#group-org"><i class="fas fa-users"></i> Affiliations</a>
        </div>
      </div>
      <div class="snackbar-item" data-group="projects">
        <button class="snackbar-btn">
          <i class="fas fa-folder-open"></i>
          <span>Projects</span>
        </button>
        <div class="snackbar-dropdown">
          <a href="#personal-projects"><i class="fas fa-user-astronaut"></i> Personal</a>
          <a href="#school-projects"><i class="fas fa-school"></i> School</a>
        </div>
      </div>
      <div class="snackbar-item" data-group="message">
        <button class="snackbar-btn">
          <i class="fas fa-envelope"></i>
          <span>Message</span>
        </button>
        <div class="snackbar-dropdown">
          <a href="#feedback"><i class="fas fa-comment"></i> Contact Form</a>
          <a href="#socials"><i class="fas fa-share-alt"></i> Socials</a>
        </div>
      </div>
    `;
    document.body.appendChild(snackbar);
    
    // Handle dropdown toggles
    const snackbarItems = document.querySelectorAll('.snackbar-item');
    
    snackbarItems.forEach(item => {
      const btn = item.querySelector('.snackbar-btn');
      const dropdown = item.querySelector('.snackbar-dropdown');
      
      if (btn && dropdown) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          // Close other dropdowns
          snackbarItems.forEach(other => {
            if (other !== item && other.classList.contains('open')) {
              other.classList.remove('open');
            }
          });
          item.classList.toggle('open');
        });
      }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.snackbar-item')) {
        snackbarItems.forEach(item => {
          item.classList.remove('open');
        });
      }
    });
    
    // Handle dropdown link clicks for smooth scroll
    const dropdownLinks = document.querySelectorAll('.snackbar-dropdown a');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
        // Close dropdown after click
        const parent = link.closest('.snackbar-item');
        if (parent) {
          parent.classList.remove('open');
        }
      });
    });
  }
  
  setupCoinFlipEffect() {
    const flipCard = document.querySelector('.flip-card');
    if (!flipCard) return;
    
    let isFlipping = false;
    
    flipCard.addEventListener('click', (e) => {
      if (isFlipping) return;
      isFlipping = true;
      
      flipCard.style.transform = 'scale(0.95)';
      setTimeout(() => {
        flipCard.style.transform = '';
      }, 100);
      
      setTimeout(() => {
        isFlipping = false;
      }, 800);
    });
    
    flipCard.addEventListener('mouseenter', () => {
      flipCard.style.transform = 'scale(1.02)';
    });
    
    flipCard.addEventListener('mouseleave', () => {
      flipCard.style.transform = '';
    });
  }
  
  addHeroBackgroundStars() {
    const heroSection = document.querySelector('.header');
    if (!heroSection) return;
    
    const existingContainer = heroSection.querySelector('.hero-bg-stars');
    if (existingContainer) existingContainer.remove();
    
    const starContainer = document.createElement('div');
    starContainer.className = 'hero-bg-stars';
    heroSection.appendChild(starContainer);
    
    const starCount = Math.floor(Math.random() * 40) + 80;
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const sizeRand = Math.random();
      let sizeClass = '';
      if (sizeRand < 0.5) sizeClass = 'size-tiny';
      else if (sizeRand < 0.75) sizeClass = 'size-small';
      else if (sizeRand < 0.9) sizeClass = 'size-medium';
      else sizeClass = 'size-large';
      
      star.className = `hero-bg-star ${sizeClass}`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      const animationRand = Math.random();
      let animation = '';
      let duration = 0;
      
      if (animationRand < 0.33) {
        animation = 'twinkleFast';
        duration = Math.random() * 1.5 + 0.8;
      } else if (animationRand < 0.66) {
        animation = 'twinkleMedium';
        duration = Math.random() * 2.5 + 2;
      } else {
        animation = 'twinkleSlow';
        duration = Math.random() * 4 + 3;
      }
      
      star.style.animation = `${animation} ${duration}s ease-in-out infinite`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      
      if (Math.random() < 0.1) {
        star.classList.add('sparkle');
        star.style.backgroundColor = 'transparent';
        star.textContent = '✦';
      }
      
      starContainer.appendChild(star);
    }
    
    for (let i = 0; i < 12; i++) {
      const star = document.createElement('div');
      star.className = 'hero-bg-star size-medium';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animation = `twinklePulse ${Math.random() * 2 + 2}s ease-in-out infinite`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      starContainer.appendChild(star);
    }
  }
  
  addStarsToHeroText() {
    const textElement = document.querySelector('.glint-text');
    if (!textElement) return;
    
    const existingStars = textElement.querySelectorAll('.letter-star, .fa-star, .fa-star-half-alt');
    existingStars.forEach(star => star.remove());
    
    const starChars = ['★', '☆', '✦', '✧'];
    
    const starA = document.createElement('span');
    starA.className = 'letter-star';
    starA.textContent = starChars[Math.floor(Math.random() * starChars.length)];
    starA.style.position = 'absolute';
    textElement.appendChild(starA);
    
    const starI = document.createElement('span');
    starI.className = 'letter-star';
    starI.textContent = starChars[Math.floor(Math.random() * starChars.length)];
    starI.style.position = 'absolute';
    textElement.appendChild(starI);
    
    for (let i = 0; i < 6; i++) {
      const star = document.createElement('i');
      star.className = i % 3 === 0 ? 'fas fa-star-half-alt' : 'fas fa-star';
      textElement.appendChild(star);
    }
  }
  
  drawStarShape(ctx, x, y, size, rotation = 0, alpha = 1, isBodyClick = false) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    
    const points = 4;
    const outerRadius = size;
    const innerRadius = size * 0.35;
    
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI * 2) / (points * 2);
      const xPos = Math.cos(angle) * radius;
      const yPos = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(xPos, yPos);
      else ctx.lineTo(xPos, yPos);
    }
    
    ctx.closePath();
    
    if (isBodyClick) {
      ctx.fillStyle = `rgba(200, 200, 210, ${alpha * 0.8})`;
      ctx.fill();
      
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? size * 0.5 : size * 0.15;
        const angle = (i * Math.PI * 2) / (points * 2);
        const xPos = Math.cos(angle) * radius;
        const yPos = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(xPos, yPos);
        else ctx.lineTo(xPos, yPos);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(220, 220, 230, ${alpha * 0.7})`;
      ctx.fill();
    } else {
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
      
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? size * 0.5 : size * 0.15;
        const angle = (i * Math.PI * 2) / (points * 2);
        const xPos = Math.cos(angle) * radius;
        const yPos = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(xPos, yPos);
        else ctx.lineTo(xPos, yPos);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
      ctx.fill();
    }
    
    ctx.restore();
  }
  
  createClickBurst(x, y, isHeroClick = true) {
    const particleCount = isHeroClick ? 
      (Math.floor(Math.random() * 5) + 8) : 
      (Math.floor(Math.random() * 4) + 5);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = isHeroClick ? (Math.random() * 3.5 + 1.5) : (Math.random() * 2.5 + 1);
      const size = isHeroClick ? (Math.random() * 5 + 3) : (Math.random() * 4 + 2);
      
      this.clickStars.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        size: size,
        originalSize: size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        isHeroClick: isHeroClick
      });
    }
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      // Reinitialize navigation on resize
      setTimeout(() => {
        this.setupDesktopNavigation();
        this.setupMobileSnackbar();
      }, 100);
    });
    
    document.body.addEventListener('click', (e) => {
      const heroSection = document.querySelector('.header');
      const isHeroClick = heroSection && heroSection.contains(e.target);
      this.createClickBurst(e.clientX, e.clientY, isHeroClick);
    });
  }
  
  drawClickStars() {
    for (let i = this.clickStars.length - 1; i >= 0; i--) {
      const p = this.clickStars[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.025;
      p.rotation += p.rotationSpeed;
      
      if (p.life <= 0 || p.x < -100 || p.x > this.width + 100 || 
          p.y < -100 || p.y > this.height + 100) {
        this.clickStars.splice(i, 1);
        continue;
      }
      
      const currentSize = p.size * p.life;
      const alpha = p.life * 0.8;
      
      this.drawStarShape(this.ctx, p.x, p.y, currentSize, p.rotation, alpha, !p.isHeroClick);
      
      if (p.life > 0.5) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, currentSize * 1.3, 0, Math.PI * 2);
        this.ctx.fillStyle = p.isHeroClick ? 
          `rgba(255, 255, 255, ${alpha * 0.2})` : 
          `rgba(180, 180, 190, ${alpha * 0.15})`;
        this.ctx.fill();
      }
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawClickStars();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.canvas) this.canvas.remove();
    const starContainer = document.querySelector('.hero-bg-stars');
    if (starContainer) starContainer.remove();
    const snackbar = document.querySelector('.mobile-snackbar');
    if (snackbar) snackbar.remove();
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const globalEffect = new GlobalClickEffect();
  window.addEventListener('beforeunload', () => globalEffect.destroy());
});