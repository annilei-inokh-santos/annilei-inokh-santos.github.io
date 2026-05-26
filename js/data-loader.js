/* ============================================================
   DATA-LOADER.JS — Load and Render Experience, Projects & Portfolio Versions from JSON
   ============================================================ */

(function() {
  // Cache for loaded data
  let portfolioData = null;
  let portfolioVersions = null;
  
  /**
   * Fetch portfolio data from JSON file
   */
  async function loadPortfolioData() {
    if (portfolioData) {
      return portfolioData;
    }
    
    try {
      const response = await fetch('data/portfolio-data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      portfolioData = await response.json();
      console.log('Portfolio data loaded successfully:', portfolioData);
      return portfolioData;
    } catch (error) {
      console.error('Failed to load portfolio data:', error);
      return { experience: [], projects: [] };
    }
  }
  
  /**
   * Fetch portfolio versions from JSON file
   */
  async function loadPortfolioVersions() {
    if (portfolioVersions) {
      return portfolioVersions;
    }
    
    try {
      const response = await fetch('data/portfolio-versions.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      portfolioVersions = await response.json();
      console.log('Portfolio versions loaded successfully:', portfolioVersions);
      return portfolioVersions;
    } catch (error) {
      console.error('Failed to load portfolio versions:', error);
      return { versions: [] };
    }
  }
  
  /**
   * Sort items by ID (descending - most recent/largest ID first)
   */
  function sortByIdDescending(items) {
    return [...items].sort((a, b) => {
      const getNumericId = (id) => {
        if (typeof id === 'number') return id;
        const match = String(id).match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };
      
      const aNum = getNumericId(a.id);
      const bNum = getNumericId(b.id);
      return bNum - aNum;
    });
  }
  
  /**
   * Create experience item HTML
   */
  function createExperienceHTML(exp) {
    const locationHTML = exp.location ? ` · ${exp.location}` : '';
    const companyDisplay = exp.companyUrl ? 
      `<a href="${exp.companyUrl}" target="_blank" rel="noopener noreferrer">${exp.company}${locationHTML}</a>` : 
      `${exp.company}${locationHTML}`;
    
    return `
      <div class="exp-item" data-exp-id="${exp.id}">
        <div class="exp-logo-wrap">
          <img
            src="${exp.logo}"
            alt="${exp.company} logo"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <span class="exp-logo-fallback" style="display:none;">${exp.logoFallback}</span>
        </div>
        <div class="exp-body">
          <div class="exp-top">
            <div class="exp-role">${exp.role}</div>
          </div>
          <div class="exp-place">${companyDisplay}</div>
          <div class="exp-desc">${exp.description}</div>
          <div class="exp-date-tag exp-date-${exp.dateTheme}">${exp.dateTag}</div>
        </div>
      </div>
    `;
  }
  
  /**
   * Create project item HTML with WIP badge BEFORE project title
   */
  function createProjectHTML(proj) {
    // Convert links object to an array
    const validLinks = [];
    
    const labelMap = {
      'liveDemo': 'Live Demo',
      'wireframe': 'Wireframe',
      'viewPage': 'View Page',
      'watchVideo': 'Watch Video',
      'github': 'GitHub',
      'demo': 'Demo',
      'documentation': 'Docs',
      'api': 'API'
    };
    
    // Loop through ALL links in the JSON
    for (const [key, url] of Object.entries(proj.links)) {
      if (url && url.trim() !== '') {
        let label = labelMap[key];
        if (!label) {
          label = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/[-_]/g, ' ')
            .replace(/^\w/, c => c.toUpperCase())
            .trim();
        }
        
        validLinks.push(`
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="proj-link t-${proj.yearTheme}-link">${label}</a>
        `);
      }
    }
    
    // Join with separators
    const linksHTML = validLinks.length > 0 
      ? validLinks.join('<span class="link-separator">|</span>')
      : '';
    
    // Create WIP badge BEFORE project title if wip === true
    const wipBadge = proj.wip ? '<span class="wip-badge">WIP</span>' : '';
    
    return `
      <div class="proj-item" data-proj-id="${proj.id}">
        <div class="proj-name">
          ${wipBadge}
          ${proj.name}
        </div>
        <div class="proj-desc">${proj.description}</div>
        <div class="proj-tags">
          <span class="proj-tag t-date-${proj.yearTheme}">${proj.year}</span>
          <span class="proj-tag t-tech-${proj.techTheme}">${proj.tech}</span>
        </div>
        ${linksHTML ? `<div class="proj-links"><i class="fa-solid fa-link"></i>${linksHTML}</div>` : ''}
      </div>
    `;
  }
  
  /**
   * Create portfolio version card HTML
   */
  function createVersionCardHTML(version) {
    return `
      <div class="carousel-card" 
           data-version="${version.id}" 
           data-number="${version.number}" 
           data-created-month="${version.createdMonth}" 
           data-created-day="${version.createdDay}" 
           data-created-year="${version.createdYear}"
           data-url="${version.url}">
        <img src="${version.thumbnail}" alt="Portfolio Version ${version.label}" class="card-image" onerror="this.src='/assets/portfolio-versions/placeholder.png'">
        <span class="version-label">${version.label}</span>
      </div>
    `;
  }
  
  /**
   * Render portfolio versions carousel
   */
  function renderPortfolioVersions(versions) {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) {
      console.warn('Carousel track not found');
      return false;
    }
    
    carouselTrack.innerHTML = '';
    
    if (versions && versions.length > 0) {
      const sortedVersions = sortByIdDescending(versions);
      sortedVersions.forEach(version => {
        carouselTrack.insertAdjacentHTML('beforeend', createVersionCardHTML(version));
      });
      console.log(`Rendered ${sortedVersions.length} portfolio versions (sorted by ID)`);
      return true;
    } else {
      console.warn('No portfolio versions found');
      return false;
    }
  }
  
  /**
   * Render all experience items
   */
  function renderExperiences(experiences) {
    const experienceContainer = document.querySelector('.col-l');
    if (!experienceContainer) {
      console.error('Experience container not found');
      return;
    }
    
    let expContent = experienceContainer.querySelector('.experience-content');
    if (!expContent) {
      expContent = document.createElement('div');
      expContent.className = 'experience-content';
      experienceContainer.appendChild(expContent);
    }
    
    expContent.innerHTML = '';
    const sortedExperiences = sortByIdDescending(experiences);
    
    sortedExperiences.forEach(exp => {
      expContent.insertAdjacentHTML('beforeend', createExperienceHTML(exp));
    });
    
    console.log(`Rendered ${sortedExperiences.length} experience items`);
  }
  
  /**
   * Render all project items
   */
  function renderProjects(projects) {
    const projectsContainer = document.querySelector('.col-r');
    if (!projectsContainer) {
      console.error('Projects container not found');
      return;
    }
    
    let projContent = projectsContainer.querySelector('.projects-content');
    if (!projContent) {
      projContent = document.createElement('div');
      projContent.className = 'projects-content';
      projectsContainer.appendChild(projContent);
    }
    
    projContent.innerHTML = '';
    const sortedProjects = sortByIdDescending(projects);
    
    sortedProjects.forEach(proj => {
      projContent.insertAdjacentHTML('beforeend', createProjectHTML(proj));
    });
    
    console.log(`Rendered ${sortedProjects.length} project items`);
  }
  
  /**
   * Get version URL by ID
   */
  function getVersionUrl(versionId) {
    if (portfolioVersions && portfolioVersions.versions) {
      const version = portfolioVersions.versions.find(v => v.id === versionId);
      return version ? version.url : null;
    }
    return null;
  }
  
  /**
   * Get all versions
   */
  function getAllVersions() {
    return portfolioVersions ? portfolioVersions.versions : [];
  }
  
  /**
   * Initialize data loading and rendering
   */
  async function initDataLoader() {
    console.log('Data loader initializing...');
    
    const data = await loadPortfolioData();
    if (data.experience && data.experience.length > 0) {
      renderExperiences(data.experience);
    }
    
    if (data.projects && data.projects.length > 0) {
      renderProjects(data.projects);
    }
    
    const versions = await loadPortfolioVersions();
    let versionsRendered = false;
    if (versions.versions && versions.versions.length > 0) {
      versionsRendered = renderPortfolioVersions(versions.versions);
    }
    
    const dataLoadedEvent = new CustomEvent('portfolioDataLoaded', { 
      detail: { data, versions: versions.versions } 
    });
    document.dispatchEvent(dataLoadedEvent);
    
    if (versionsRendered && versions.versions.length > 0) {
      const versionsLoadedEvent = new CustomEvent('portfolioVersionsLoaded', { 
        detail: versions.versions 
      });
      document.dispatchEvent(versionsLoadedEvent);
    }
    
    console.log('Data loader initialization complete');
  }
  
  // Export functions
  window.PortfolioData = {
    loadData: loadPortfolioData,
    loadVersions: loadPortfolioVersions,
    getVersionUrl: getVersionUrl,
    getAllVersions: getAllVersions,
    reload: initDataLoader,
    getData: () => portfolioData,
    getVersions: () => portfolioVersions,
    isReady: () => portfolioVersions !== null
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDataLoader);
  } else {
    initDataLoader();
  }
})();