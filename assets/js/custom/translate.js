let translations = {};

// Function to get language from URL
function getLanguageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('lang') || 'en';
}

// Function to update URL with language parameter
function updateURL(lang) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.pushState({}, '', url);
}

async function loadTranslations(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        translations = await response.json();
        updateContent();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let value = translations;
        for (const key of keys) {
            value = value[key];
        }
        if (value) {
            element.textContent = value;
        }
    });
}

async function changeLanguage(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update direction to RTL if Arabic (lang = ar), else LTR
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';  // Right-to-left for Arabic
    } else {
        document.documentElement.dir = 'ltr';  // Left-to-right for other languages
    }

    // Update URL with new language
    updateURL(lang);

    // Load and apply translations
    await loadTranslations(lang);

    // Store language preference
    localStorage.setItem('preferredLanguage', lang);

    // Update select dropdown value
    const languageSelect = document.getElementById('language-select');
    if (languageSelect.value !== lang) {
        languageSelect.value = lang;
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', async () => {
    // First check URL parameter
    const urlLang = getLanguageFromURL();

    // If no URL parameter, check localStorage
    const savedLanguage = urlLang || localStorage.getItem('preferredLanguage') || 'en';

    // Update dropdown and apply language
    document.getElementById('language-select').value = savedLanguage;
    await changeLanguage(savedLanguage);
});