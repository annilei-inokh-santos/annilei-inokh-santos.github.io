/* ============================================================
   SPARKLE.JS — Click Sparkle Effect
   ============================================================ */

(function() {
  function createSparkle(x, y) {
    const siteEl = document.getElementById('site');
    const isDark = siteEl ? siteEl.classList.contains('dark') : true;
    
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
})();