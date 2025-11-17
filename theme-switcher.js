// Theme Switcher
class ThemeSwitcher {
    constructor() {
        this.STORAGE_KEY = 'php-framework-theme';
        this.DARK_MODE_CLASS = 'dark-mode';
        this.init();
    }

    init() {
        // Load saved theme or detect system preference
        this.loadTheme();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup system theme change listener
        this.setupMediaQueryListener();
    }

    loadTheme() {
        // Check localStorage first
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
    }

    setTheme(theme) {
        const html = document.documentElement;
        
        if (theme === 'dark') {
            html.classList.add(this.DARK_MODE_CLASS);
            localStorage.setItem(this.STORAGE_KEY, 'dark');
        } else {
            html.classList.remove(this.DARK_MODE_CLASS);
            localStorage.setItem(this.STORAGE_KEY, 'light');
        }
        
        this.updateToggleButton(theme);
    }

    toggleTheme() {
        const isDarkMode = document.documentElement.classList.contains(this.DARK_MODE_CLASS);
        this.setTheme(isDarkMode ? 'light' : 'dark');
    }

    updateToggleButton(theme) {
        const btn = document.getElementById('themeToggleBtn');
        if (!btn) return;
        
        if (theme === 'dark') {
            btn.innerHTML = '<i class="bi bi-brightness-high"></i>';
            btn.title = 'Switch to Light Mode';
        } else {
            btn.innerHTML = '<i class="bi bi-moon"></i>';
            btn.title = 'Switch to Dark Mode';
        }
    }

    setupEventListeners() {
        const btn = document.getElementById('themeToggleBtn');
        if (btn) {
            btn.addEventListener('click', () => this.toggleTheme());
        }
    }

    setupMediaQueryListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually selected a theme
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    getCurrentTheme() {
        return document.documentElement.classList.contains(this.DARK_MODE_CLASS) ? 'dark' : 'light';
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeSwitcher = new ThemeSwitcher();
    });
} else {
    window.themeSwitcher = new ThemeSwitcher();
}
