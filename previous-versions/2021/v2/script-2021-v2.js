(function() {
  // ========== SINGLE PAGE APPLICATION WITH DIRECTIONAL TRANSITIONS ==========
  
  const heroSection = document.querySelector('.hero');
  const aicsTitle = document.getElementById('aicsTitle');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  const aboutLink = document.getElementById('aboutLink');
  const skillsLink = document.getElementById('skillsLink');
  const contactLink = document.getElementById('contactLink');
  
  // Section elements
  const aboutSection = document.getElementById('aboutSection');
  const skillsSection = document.getElementById('skillsSection');
  const contactSection = document.getElementById('contactSection');
  const allSections = {
    about: aboutSection,
    skills: skillsSection,
    contact: contactSection
  };
  
  // Section order for direction detection
  const sectionOrder = ['about', 'skills', 'contact'];
  let currentSection = 'about';
  
  // Function to remove all animation classes
  function removeAnimationClasses(section) {
    if (section) {
      section.classList.remove('slide-from-left', 'slide-from-right', 'fade-in');
    }
  }
  
  // Function to show section with directional animation
  function showSectionWithAnimation(targetSectionName, direction) {
    const targetSection = allSections[targetSectionName];
    
    if (!targetSection || targetSectionName === currentSection) return;
    
    // Remove animation classes from target section first
    removeAnimationClasses(targetSection);
    
    // Hide all sections
    Object.values(allSections).forEach(section => {
      if (section) {
        section.classList.remove('active-section');
      }
    });
    
    // Add appropriate animation class based on direction
    if (direction === 'forward') {
      targetSection.classList.add('slide-from-right');
    } else if (direction === 'backward') {
      targetSection.classList.add('slide-from-left');
    } else {
      targetSection.classList.add('fade-in');
    }
    
    // Show the target section
    targetSection.classList.add('active-section');
    
    // Update current section
    currentSection = targetSectionName;
    
    // Clean up animation classes after animation completes
    setTimeout(() => {
      removeAnimationClasses(targetSection);
    }, 400);
  }
  
  // Determine navigation direction
  function getNavigationDirection(targetSectionName) {
    const currentIndex = sectionOrder.indexOf(currentSection);
    const targetIndex = sectionOrder.indexOf(targetSectionName);
    
    if (targetIndex > currentIndex) return 'forward';
    if (targetIndex < currentIndex) return 'backward';
    return 'none';
  }
  
  // Update active class on sidebar navigation links
  function setActiveLink(activeAnchor) {
    sidebarLinks.forEach(link => {
      link.classList.remove('active');
    });
    if (activeAnchor) {
      activeAnchor.classList.add('active');
    }
  }
  
  function removeAllActiveLinks() {
    sidebarLinks.forEach(link => {
      link.classList.remove('active');
    });
  }
  
  // Smooth scroll helper
  function smoothScrollToElement(element, offset = 0) {
    if (!element) return;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  
  // AICS Title click handler
  if (aicsTitle) {
    aicsTitle.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollToElement(heroSection, 0);
      if (currentSection !== 'about') {
        showSectionWithAnimation('about', 'none');
        setActiveLink(aboutLink);
      }
    });
  }
  
  // Navigation link handlers
  if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      const direction = getNavigationDirection('about');
      showSectionWithAnimation('about', direction);
      setActiveLink(aboutLink);
      const mainContent = document.querySelector('.main-content');
      if (mainContent) smoothScrollToElement(mainContent, 20);
    });
  }
  
  if (skillsLink) {
    skillsLink.addEventListener('click', (e) => {
      e.preventDefault();
      const direction = getNavigationDirection('skills');
      showSectionWithAnimation('skills', direction);
      setActiveLink(skillsLink);
      const mainContent = document.querySelector('.main-content');
      if (mainContent) smoothScrollToElement(mainContent, 20);
    });
  }
  
  if (contactLink) {
    contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      const direction = getNavigationDirection('contact');
      showSectionWithAnimation('contact', direction);
      setActiveLink(contactLink);
      const mainContent = document.querySelector('.main-content');
      if (mainContent) smoothScrollToElement(mainContent, 20);
    });
  }
  
  // Scroll detection
  function updateScrollPosition() {
    const scrollPosition = window.scrollY + 200;
    
    if (heroSection) {
      const heroTop = heroSection.offsetTop;
      const heroBottom = heroTop + heroSection.offsetHeight;
      if (scrollPosition >= heroTop && scrollPosition < heroBottom - 50) {
        removeAllActiveLinks();
        return;
      }
    }
    
    if (currentSection === 'about' && aboutLink) setActiveLink(aboutLink);
    else if (currentSection === 'skills' && skillsLink) setActiveLink(skillsLink);
    else if (currentSection === 'contact' && contactLink) setActiveLink(contactLink);
  }
  
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollPosition();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initialize on load
  window.addEventListener('load', () => {
    Object.values(allSections).forEach(section => {
      if (section) section.classList.remove('active-section');
    });
    
    if (aboutSection) {
      aboutSection.classList.add('fade-in');
      aboutSection.classList.add('active-section');
      currentSection = 'about';
      setTimeout(() => aboutSection.classList.remove('fade-in'), 300);
    }
    
    setActiveLink(aboutLink);
    
    if (window.location.hash === '#skills') {
      showSectionWithAnimation('skills', getNavigationDirection('skills'));
      setActiveLink(skillsLink);
    } else if (window.location.hash === '#contact') {
      showSectionWithAnimation('contact', getNavigationDirection('contact'));
      setActiveLink(contactLink);
    }
    
    updateScrollPosition();
  });
  
  // Error handling for missing images
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', function() {
      this.style.opacity = '0.7';
      this.style.border = '1px dashed #7BD1D2';
    });
  });
  
  if ('ontouchstart' in window) {
    document.body.style.cursor = 'pointer';
  }
})();

// ===== COPY EMAIL FUNCTION (ID Card Version) =====
function copyIdEmail() {
  const email = "annilei.santos@example.com";
  navigator.clipboard.writeText(email).then(() => {
    const btn = document.querySelector('.id-copy-btn');
    const originalIcon = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      btn.innerHTML = originalIcon;
    }, 1500);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}