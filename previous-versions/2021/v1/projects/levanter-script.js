// ============================================
// PAGE SWITCHING & TAB SWITCHING FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // PAGE SWITCHING (Sidebar Navigation)
    // ============================================
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-page]');
    const pages = {
        lyrics: document.getElementById('lyrics-page'),
        about: document.getElementById('about-page'),
        credits: document.getElementById('credits-page')
    };
    const desktopWikiLinks = document.getElementById('desktopWikiLinks');
    
    function switchPage(pageId) {
        // Hide all pages
        Object.values(pages).forEach(page => {
            if (page) page.classList.remove('active-page');
        });
        
        // Show selected page
        if (pages[pageId]) {
            pages[pageId].classList.add('active-page');
        }
        
        // Update active state on sidebar links
        sidebarLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Show desktop wiki links only when Credits page is active
        if (desktopWikiLinks) {
            if (pageId === 'credits') {
                desktopWikiLinks.classList.add('show');
            } else {
                desktopWikiLinks.classList.remove('show');
            }
        }
    }
    
    // Add click event to sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                switchPage(pageId);
            }
        });
    });
    
    // ============================================
    // TAB SWITCHING (Lyrics page only)
    // ============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active-content'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active-content');
        });
    });
});