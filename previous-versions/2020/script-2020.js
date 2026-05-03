// Wait for DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // MODAL FUNCTIONALITY - No outside click close
  // ============================================
  
  // Get modal elements with null checks
  const modal = document.getElementById("contactPopup");
  const btn = document.getElementById("contactBtn");
  const closeBtn = document.querySelector(".popup-close");
  
  // Check if elements exist before adding event listeners
  if (btn && modal) {
    // Open modal when button is clicked
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  }
  
  if (closeBtn && modal) {
    // Close modal ONLY when X is clicked
    closeBtn.addEventListener('click', function() {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }
  
  if (modal) {
    // Close modal with Escape key only
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.style.display === "block") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }
  
  // ============================================
  // SIMPLE SMOOTH SCROLL - NO ACTIVE STATE
  // ============================================
  
  // Get all navigation links
  const navLinks = document.querySelectorAll(".nav-links a");
  
  // Function to handle click on navigation links
  function handleNavClick(event) {
    event.preventDefault();
    
    // Get the target section id from href
    const targetId = this.getAttribute("href").substring(1);
    let targetSection = null;
    let customOffset = 70;
    
    // Special handling for home - target the version-notice
    if (targetId === "home") {
      targetSection = document.querySelector(".version-notice");
      customOffset = 70;
    } 
    // Special handling for skills
    else if (targetId === "skills") {
      targetSection = document.getElementById(targetId);
      customOffset = 80;
    }
    else {
      targetSection = document.getElementById(targetId);
      customOffset = 70;
    }
    
    if (targetSection) {
      // Calculate offset for better positioning (accounting for fixed navbar)
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - customOffset;
      
      // Smooth scroll to the section with offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }
  
  // Add click event listeners to all navigation links
  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener("click", handleNavClick);
    });
  }

  // ============================================
  // PAGE TRANSITION FOR PROJECT LINK
  // ============================================
  
  const transitionOverlay = document.getElementById("pageTransition");
  const projectLink = document.querySelector(".image-link-wrapper");
  
  if (projectLink && transitionOverlay) {
    projectLink.addEventListener("click", function(e) {
      e.preventDefault();
      const targetUrl = this.getAttribute("href");
      
      // Show transition overlay
      transitionOverlay.classList.add("active");
      
      // Wait for FULL animation to complete (1.5s + buffer)
      setTimeout(function() {
        window.location.href = targetUrl;
      }, 1700);
    });
  }
  
});