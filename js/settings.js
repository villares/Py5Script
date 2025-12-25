
const SETTINGS_KEY = 'py5script_settings';

const DEFAULT_SETTINGS = {
    theme: 'dark', // 'dark' or 'light'
    fontSize: 16,
    softTabs: true,
    showInvisibles: false
};

let currentSettings = { ...DEFAULT_SETTINGS };

function loadSettings() {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            currentSettings = { ...DEFAULT_SETTINGS, ...parsed };
        } catch (e) {
            console.error("Failed to parse settings", e);
        }
    }
}

function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(currentSettings));
}

function applySettings() {
    // 1. Theme
    if (currentSettings.theme === 'light') {
        document.body.classList.add('light-theme');
        if (typeof editor !== 'undefined' && editor.setTheme) {
            editor.setTheme("ace/theme/chrome"); 
        }
    } else {
        document.body.classList.remove('light-theme');
        if (typeof editor !== 'undefined' && editor.setTheme) {
            editor.setTheme("ace/theme/monokai");
        }
    }

    // 2. Editor Options
    if (typeof editor !== 'undefined' && editor.setFontSize) {
        editor.setFontSize(parseInt(currentSettings.fontSize));
        editor.session.setUseSoftTabs(currentSettings.softTabs);
        editor.setShowInvisibles(currentSettings.showInvisibles);
    }
}

function updateSetting(key, value) {
    currentSettings[key] = value;
    saveSettings();
    applySettings();
}

// Initial Load
loadSettings();
// Apply initial Theme (body class) immediately, but skip Editor if not ready
// We can call applySettings safely now because of the checks.
applySettings();
