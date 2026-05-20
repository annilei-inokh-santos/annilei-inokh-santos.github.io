/* =============================================
   nav-n-borders-script.js
   ============================================= */

(function () {
    'use strict';

    const sidebar        = document.getElementById('sidebar');
    const sidebarToggle  = document.getElementById('sidebarToggle');
    const mainContent    = document.getElementById('mainContent');
    const overlay        = document.getElementById('sidebarOverlay');
    const navLinks       = document.querySelectorAll('.nav-link');
    const sections       = document.querySelectorAll('.page-section');

    const MOBILE_BP = 768;

    /* ── Detect mobile ── */
    function isMobile() {
        return window.innerWidth <= MOBILE_BP;
    }

    /* ── Inject mobile hamburger button ── */
    const mobileBtn = document.createElement('button');
    mobileBtn.className = 'mobile-menu-btn';
    mobileBtn.setAttribute('aria-label', 'Open menu');
    mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.body.appendChild(mobileBtn);

    /* ── State ── */
    let desktopExpanded = false;
    let mobileOpen      = false;

    /* ── Desktop sidebar toggle ── */
    function toggleDesktop() {
        desktopExpanded = !desktopExpanded;
        sidebar.classList.toggle('expanded', desktopExpanded);
        mainContent.classList.toggle('shifted', desktopExpanded);
        sidebarToggle.querySelector('i').className = desktopExpanded
            ? 'fa-solid fa-xmark'
            : 'fa-solid fa-bars';
    }

    /* ── Mobile sidebar open/close ── */
    function openMobile() {
        mobileOpen = true;
        sidebar.classList.add('mobile-open');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeMobile() {
        mobileOpen = false;
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    /* ── Button listeners ── */
    sidebarToggle.addEventListener('click', () => {
        if (isMobile()) {
            mobileOpen ? closeMobile() : openMobile();
        } else {
            toggleDesktop();
        }
    });

    mobileBtn.addEventListener('click', () => {
        mobileOpen ? closeMobile() : openMobile();
    });

    overlay.addEventListener('click', closeMobile);

    /* ── SPA Section navigation ── */
    function activateSection(targetId) {
        sections.forEach(s => s.classList.toggle('active', s.id === targetId));
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === targetId));
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.section;
            activateSection(target);
            // Update URL hash without scrolling
            history.replaceState(null, '', '#' + target);
            // Close mobile sidebar after navigation
            if (isMobile()) closeMobile();
        });
    });

    /* ── Handle direct URL hash on load ── */
    function handleHashOnLoad() {
        const hash = window.location.hash.replace('#', '');
        const validSections = ['home', 'animals', 'countries', 'foods', 'months'];
        if (hash && validSections.includes(hash)) {
            activateSection(hash);
        }
    }

    handleHashOnLoad();

    /* ── Resize: reset states when crossing breakpoint ── */
    let lastMobile = isMobile();
    window.addEventListener('resize', () => {
        const nowMobile = isMobile();
        if (nowMobile !== lastMobile) {
            lastMobile = nowMobile;
            // Reset everything cleanly on breakpoint change
            closeMobile();
            if (!nowMobile) {
                sidebar.classList.remove('mobile-open');
                // Restore desktop expanded state
                sidebar.classList.toggle('expanded', desktopExpanded);
                mainContent.classList.toggle('shifted', desktopExpanded);
                document.body.style.overflow = '';
            }
        }
        // Show/hide mobile button
        mobileBtn.style.display = nowMobile ? 'flex' : 'none';
    });

    /* ── Initial mobile button visibility ── */
    mobileBtn.style.display = isMobile() ? 'flex' : 'none';

})();