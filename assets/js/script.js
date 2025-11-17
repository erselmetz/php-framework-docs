// Current selected version
let currentVersion = 'v2.0.0';

// Get tutorial key from current page (must be defined before use)
function getTutorialKeyFromPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    const tutorialMap = {
        'tutorial-routing.html': 'routing',
        'tutorial-database.html': 'database',
        'tutorial-validation.html': 'validation',
        'tutorial-views.html': 'views',
        'tutorial-csrf.html': 'csrf',
        'tutorial-upload.html': 'upload'
    };
    
    return tutorialMap[filename] || null;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a tutorial page first
    const tutorialKey = getTutorialKeyFromPage();
    const isTutorialPage = tutorialKey && document.getElementById('tutorialContent');
    
    // Get version from URL parameter first (for tutorial pages) or use default
    const urlParams = new URLSearchParams(window.location.search);
    const urlVersion = urlParams.get('version');
    if (urlVersion) {
        currentVersion = urlVersion;
    }
    
    // Initialize version selector (it will check if we're on tutorial page)
    initializeVersionSelector();
    
    if (isTutorialPage) {
        // Load tutorial for current version (from URL or default)
        loadTutorial(tutorialKey);
        
        // Update dropdown button to show current version
        const currentVersionEl = document.getElementById('currentVersion');
        if (currentVersionEl) {
            currentVersionEl.textContent = currentVersion;
        }
        
        // Update tutorial version badge
        const tutorialVersionBadge = document.getElementById('tutorialVersionBadge');
        if (tutorialVersionBadge) {
            tutorialVersionBadge.textContent = currentVersion;
        }
    } else if (document.getElementById('currentVersionBadge')) {
        // Load version if on index page
        loadVersion(currentVersion);
    }
    
    initializeNavigation();
    initializeAnimations();
    initializeCodeCopy();
    if (document.getElementById('lastUpdated')) {
        updateLastUpdated();
    }
    initializeSidebar();
    
    // Set current year dynamically
    setCurrentYear();
    
    // Preserve version in tutorial links when on tutorial pages
    if (isTutorialPage) {
        preserveVersionInLinks();
    }
});

// Initialize version selector dropdown
function initializeVersionSelector() {
    const versionList = document.getElementById('versionList');
    if (!versionList) return;
    
    const versions = getAllVersions();
    const tutorialKey = getTutorialKeyFromPage();
    const isTutorialPage = tutorialKey && document.getElementById('tutorialContent');
    
    versions.forEach(version => {
        const versionData = getVersionData(version);
        // Only show stable/released versions, skip planned ones
        if (versionData.status === 'planned') {
            return;
        }
        
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = version;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            currentVersion = version;
            
            // Check if we're on a tutorial page or index page
            if (isTutorialPage) {
                // Handle tutorial page version change
                updateVersionForTutorial(version);
            } else if (document.getElementById('currentVersionBadge')) {
                // Handle index page version change
                loadVersion(version);
            }
            
            // Update dropdown button text
            const currentVersionEl = document.getElementById('currentVersion');
            if (currentVersionEl) {
                currentVersionEl.textContent = version;
            }
            
            // Update active state
            versionList.querySelectorAll('a').forEach(link => {
                link.classList.remove('active');
            });
            a.classList.add('active');
        });
        
        if (version === currentVersion) {
            a.classList.add('active');
        }
        
        li.appendChild(a);
        versionList.appendChild(li);
    });
}

// Load version data
function loadVersion(version) {
    const versionData = getVersionData(version);
    const previousVersion = getPreviousVersion(version);
    const previousVersionData = previousVersion ? getVersionData(previousVersion) : null;
    const isFirstVersion = !previousVersion;
    
    if (!versionData) return;
    
    // Update hero section - show two separate badges: label and full version
    const versionLabelBadge = document.getElementById('versionLabelBadge');
    const versionBadge = document.getElementById('currentVersionBadge');
    
    if (versionLabelBadge && versionBadge) {
        if (isFirstVersion) {
            versionLabelBadge.textContent = 'initial release';
            versionLabelBadge.className = 'badge bg-secondary fs-5 px-4 py-3';
        } else {
            versionLabelBadge.textContent = 'version';
            versionLabelBadge.className = 'badge bg-secondary fs-5 px-4 py-3';
        }
        
        // Show full version number (v2.0.0, v1.0.0, etc.)
        versionBadge.textContent = version;
        versionBadge.className = 'badge bg-primary fs-5 px-4 py-3';
    }
    
    // Update overview
    document.getElementById('whatsNewText').textContent = versionData.description;
    updateList('whatsNewList', versionData.whatsNew);
    if (isFirstVersion) {
        document.getElementById('improvementsText').textContent = 'Initial version - foundation features.';
        updateList('improvementsList', ['Foundation features']);
    } else {
        document.getElementById('improvementsText').textContent = `Key improvements over ${previousVersion}:`;
        updateList('improvementsList', versionData.improvements.length > 0 ? versionData.improvements : ['No specific improvements listed']);
    }
    
    // Update feature section
    if (isFirstVersion) {
        document.getElementById('previousVersionTitle').textContent = 'Initial Release';
        document.getElementById('previousVersionTitle').classList.remove('badge', 'bg-secondary');
        document.getElementById('previousVersionTitle').classList.add('text-muted');
    } else {
        document.getElementById('previousVersionTitle').textContent = previousVersion;
        document.getElementById('previousVersionTitle').classList.add('badge', 'bg-secondary');
        document.getElementById('previousVersionTitle').classList.remove('text-muted');
    }
    document.getElementById('currentVersionTitle').textContent = version;
    renderFeatures(versionData.features, previousVersionData?.features, isFirstVersion);
    
    // Update comparison table
    if (isFirstVersion) {
        document.getElementById('comparisonTitle').textContent = 'Available Features';
        document.getElementById('prevVersionHeader').textContent = 'Description';
        document.getElementById('currVersionHeader').textContent = 'Status';
        renderFeaturesComparison(versionData.features);
    } else {
        document.getElementById('comparisonTitle').textContent = 'Side-by-Side Comparison';
        document.getElementById('prevVersionHeader').textContent = previousVersion;
        document.getElementById('currVersionHeader').textContent = version;
        renderComparison(versionData.comparison, previousVersionData?.comparison);
    }
    
    // Update changelog
    renderChangelog(versionData.changelog);
}

// Update list items
function updateList(listId, items) {
    const list = document.getElementById(listId);
    list.innerHTML = '';
    
    if (!items || items.length === 0) {
        list.innerHTML = '<li><i class="bi bi-info-circle text-info"></i> No items</li>';
        return;
    }
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="bi bi-check-circle text-success"></i> ${item}`;
        list.appendChild(li);
    });
}

// Render features
function renderFeatures(currentFeatures, previousFeatures, isFirstVersion = false) {
    const container = document.getElementById('featuresContainer');
    container.innerHTML = '';
    
    const featureKeys = Object.keys(currentFeatures);
    
    featureKeys.forEach(key => {
        const feature = currentFeatures[key];
        const wasInPrevious = !isFirstVersion && previousFeatures && previousFeatures[key];
        const isNew = !isFirstVersion && !wasInPrevious;
        
        const col = document.createElement('div');
        col.className = 'col-md-6 mb-4';
        
        const card = document.createElement('div');
        
        if (isFirstVersion) {
            // For first version, always use feature-card style
            card.className = 'feature-card';
            card.innerHTML = `
                <div class="feature-icon bg-${feature.color}">
                    <i class="bi ${feature.icon}"></i>
                </div>
                <h4>${key}</h4>
                <p>${feature.description}</p>
            `;
        } else if (isNew) {
            // New feature in this version
            card.className = 'new-feature-card border-start border-5 border-success';
            card.innerHTML = `
                <div class="d-flex align-items-center mb-3">
                    <div class="new-badge bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3">
                        <i class="bi bi-plus-lg"></i>
                    </div>
                    <h4 class="mb-0">${key}</h4>
                </div>
                <p>${feature.description}</p>
                ${feature.code ? `<code class="d-block bg-light p-2 rounded">${feature.code}</code>` : ''}
            `;
        } else {
            // Existing feature
            card.className = 'feature-card';
            card.innerHTML = `
                <div class="feature-icon bg-${feature.color}">
                    <i class="bi ${feature.icon}"></i>
                </div>
                <h4>${key}</h4>
                <p>${feature.description}</p>
            `;
        }
        
        col.appendChild(card);
        container.appendChild(col);
    });
}

// Render comparison table
function renderComparison(currentComparison, previousComparison) {
    const tbody = document.getElementById('comparisonTableBody');
    tbody.innerHTML = '';
    
    Object.keys(currentComparison).forEach(feature => {
        const row = document.createElement('tr');
        const current = currentComparison[feature].current;
        const previous = previousComparison 
            ? previousComparison[feature]?.current || 'N/A'
            : currentComparison[feature].previous || 'N/A';
        
        const isImproved = current !== previous && previous !== 'N/A';
        
        row.innerHTML = `
            <td><strong>${feature}</strong></td>
            <td class="text-center">
                ${previous === 'N/A' 
                    ? '<i class="bi bi-x-circle text-danger"></i> N/A'
                    : `<i class="bi bi-check-circle text-secondary"></i> ${previous}`
                }
            </td>
            <td class="text-center ${isImproved ? 'table-success' : ''}">
                ${isImproved 
                    ? '<i class="bi bi-arrow-up-circle text-success"></i> '
                    : '<i class="bi bi-check-circle text-success"></i> '
                }${current}
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Render features comparison for first version
function renderFeaturesComparison(features) {
    const tbody = document.getElementById('comparisonTableBody');
    tbody.innerHTML = '';
    
    Object.keys(features).forEach(featureName => {
        const feature = features[featureName];
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td><strong>${featureName}</strong></td>
            <td class="text-center">
                <i class="bi bi-check-circle text-success"></i> ${feature.description}
            </td>
            <td class="text-center">
                <i class="bi bi-check-circle text-success"></i> Available
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Render changelog
function renderChangelog(changelog) {
    const timeline = document.getElementById('changelogTimeline');
    timeline.innerHTML = '';
    
    changelog.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-marker bg-success"></div>
            <div class="timeline-content">
                <h4>${item.component}</h4>
                <ul>
                    ${item.changes.map(change => `<li>${change}</li>`).join('')}
                </ul>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Smooth scroll for anchor links
function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Highlight active nav item on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all feature cards and timeline items
    document.querySelectorAll('.feature-card, .new-feature-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add copy to clipboard for code blocks
function initializeCodeCopy() {
    // Copy buttons for tutorial code blocks
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const codeBlock = document.getElementById(targetId);
            if (codeBlock) {
                const text = codeBlock.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<i class="bi bi-check"></i> Copied!';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.classList.remove('copied');
                    }, 2000);
                });
            }
        });
    });
    
    // Also allow clicking on code blocks directly
    document.querySelectorAll('.code-block code').forEach(code => {
        code.style.cursor = 'pointer';
        code.title = 'Click to copy';
        code.addEventListener('click', () => {
            const text = code.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = code.textContent;
                code.textContent = 'Copied!';
                code.style.color = '#198754';
                setTimeout(() => {
                    code.textContent = originalText;
                    code.style.color = '';
                }, 2000);
            });
        });
    });
    
    // Add syntax highlighting class to code blocks
    document.querySelectorAll('.code-block code').forEach(code => {
        const language = code.closest('.code-block-wrapper')?.querySelector('.code-header')?.textContent || '';
        code.classList.add('language-detected');
        
        // Add line numbers
        const lines = code.textContent.split('\n');
        if (lines.length > 1) {
            code.setAttribute('data-line-count', lines.length);
        }
    });
}

// Update last updated date
function updateLastUpdated() {
    // Always show today's date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('lastUpdated').textContent = today.toLocaleDateString('en-US', options);
}

// Initialize sidebar for mobile
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    // Toggle sidebar on mobile
    const toggleBtn = document.querySelector('.navbar-toggler');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });
}

// Tutorial loader system
function loadTutorial(tutorialKey) {
    // Use the currentVersion variable (which should be set from URL or default)
    const version = currentVersion;
    
    // Get version data
    const versionData = getVersionData(version);
    if (!versionData || !versionData.tutorials || !versionData.tutorials[tutorialKey]) {
        console.warn(`Tutorial ${tutorialKey} not found for version ${version}`);
        return;
    }
    
    const tutorial = versionData.tutorials[tutorialKey];
    const container = document.getElementById('tutorialContent');
    
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Render tutorial title
    const title = document.querySelector('.main-content h1.h2');
    if (title) {
        title.textContent = tutorial.title;
    }
    
    // Render each section
    tutorial.sections.forEach((section, index) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'content-section';
        
        const codeId = `tutorial-code-${tutorialKey}-${index}`;
        
        sectionDiv.innerHTML = `
            <h2>${section.heading}</h2>
            <p>${section.content}</p>
            
            <div class="code-block-wrapper">
                <div class="code-header d-flex justify-content-between align-items-center">
                    <span class="text-muted small">Code Example</span>
                    <button class="btn btn-sm btn-outline-secondary copy-btn" data-target="${codeId}">
                        <i class="bi bi-clipboard"></i> Copy
                    </button>
                </div>
                <pre id="${codeId}" class="code-block"><code>${escapeHtml(section.code)}</code></pre>
            </div>
            
            <div class="explanation-box mt-3">
                <strong><i class="bi bi-info-circle"></i> How it works:</strong>
                <ul class="mb-0 mt-2">
                    ${section.explanation.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
        
        container.appendChild(sectionDiv);
    });
    
    // Re-initialize copy buttons
    initializeCodeCopy();
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Preserve version when navigating between tutorial pages
function preserveVersionInLinks() {
    // Get current version from URL or use currentVersion
    const urlParams = new URLSearchParams(window.location.search);
    const currentVersionParam = urlParams.get('version') || currentVersion;
    
    // Update all tutorial links in sidebar to include version parameter
    document.querySelectorAll('a[href*="tutorial-"]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('tutorial-')) {
            // Create URL object for easier manipulation
            try {
                const url = new URL(href, window.location.origin);
                url.searchParams.set('version', currentVersionParam);
                // Preserve hash if exists
                const hash = url.hash;
                link.setAttribute('href', url.pathname + url.search + (hash || ''));
            } catch (e) {
                // If URL parsing fails, manually construct
                if (!href.includes('?')) {
                    link.setAttribute('href', href + `?version=${currentVersionParam}`);
                } else {
                    link.setAttribute('href', href.replace(/(\?|&)version=[^&]*/, '') + `&version=${currentVersionParam}`);
                }
            }
        }
    });
}

// Update version selector to work with tutorials
function updateVersionForTutorial(version) {
    const tutorialKey = getTutorialKeyFromPage();
    if (tutorialKey) {
        currentVersion = version;
        loadTutorial(tutorialKey);
        
        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('version', version);
        window.history.pushState({}, '', url);
        
        // Update dropdown button
        const currentVersionEl = document.getElementById('currentVersion');
        if (currentVersionEl) {
            currentVersionEl.textContent = version;
        }
        
        // Update tutorial version badge if it exists
        const tutorialVersionBadge = document.getElementById('tutorialVersionBadge');
        if (tutorialVersionBadge) {
            tutorialVersionBadge.textContent = version;
        }
        
        // Update active state in dropdown
        const versionList = document.getElementById('versionList');
        if (versionList) {
            versionList.querySelectorAll('a').forEach(link => {
                link.classList.remove('active');
                if (link.textContent.trim() === version) {
                    link.classList.add('active');
                }
            });
        }
        
        // Update tutorial links to preserve version
        preserveVersionInLinks();
    }
}

// Set current year dynamically
function setCurrentYear() {
    const yearElements = document.querySelectorAll('#currentYear, .current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// Console message
console.log('%cPHP Framework Documentation', 'color: #0d6efd; font-size: 20px; font-weight: bold;');
console.log('%cVersion History System', 'color: #198754; font-size: 14px;');

