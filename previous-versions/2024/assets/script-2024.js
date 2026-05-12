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
    this.animate();
  }
  
  createCanvas() {
    // Create a canvas that covers the entire viewport
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
  }
  
  addStarsToHeroText() {
    const textElement = document.querySelector('.glint-text');
    if (!textElement) return;
    
    const existingStars = textElement.querySelectorAll('.letter-star, .fa-star, .fa-star-half-alt');
    existingStars.forEach(star => star.remove());
    
    // Add 2 yellow stars for A and I
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
    
    // Add 8 background white stars
    for (let i = 0; i < 8; i++) {
      const star = document.createElement('i');
      if (i % 3 === 0) {
        star.className = 'fas fa-star-half-alt';
      } else {
        star.className = 'fas fa-star';
      }
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
      // Off-white / silver for body section
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
      // Pure white for hero section
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
        x: x,
        y: y,
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
    window.addEventListener('resize', () => this.resize());
    
    // Listen for clicks on the entire document
    document.body.addEventListener('click', (e) => {
      const heroSection = document.querySelector('.header');
      const isHeroClick = heroSection && heroSection.contains(e.target);
      
      // Get click coordinates relative to viewport
      const x = e.clientX;
      const y = e.clientY;
      
      this.createClickBurst(x, y, isHeroClick);
      
      // NO FLASH EFFECT - removed entirely
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
      
      // Outer glow
      if (p.life > 0.5) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, currentSize * 1.3, 0, Math.PI * 2);
        if (p.isHeroClick) {
          this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.2})`;
        } else {
          this.ctx.fillStyle = `rgba(180, 180, 190, ${alpha * 0.15})`;
        }
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
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas) {
      this.canvas.remove();
    }
  }
}

// ─── Smooth scroll ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const start = window.pageYOffset;
    const delta = target.getBoundingClientRect().top - 50;
    const duration = 1300;
    let startTime = null;

    const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const step = ts => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      window.scrollTo(0, start + delta * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
});

// Initialize global click effect
document.addEventListener('DOMContentLoaded', () => {
  const globalEffect = new GlobalClickEffect();
  window.addEventListener('beforeunload', () => globalEffect.destroy());
});