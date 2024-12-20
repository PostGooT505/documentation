// Component loader function
async function loadComponent(url, targetId) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(targetId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${url}:`, error);
    }
}

// Load all components
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('components/Header.html', 'header');
    loadComponent('components/Hero.html', 'hero');
    loadComponent('components/GettingStarted.html', 'gettingStarted');
    loadComponent('components/NavBar.html', 'navBar');
    // Sections
    loadComponent('components/Sections/Introduction.html', 'introduction');
    loadComponent('components/Sections/CoreFeatures.html', 'coreFeatures');
    loadComponent('components/Sections/FileStructure.html', 'fileStructure');
    loadComponent('components/Sections/Customization.html', 'customization');
    loadComponent('components/Sections/Typography.html', 'typography');
    loadComponent('components/Sections/ThankYou.html', 'thankYou');

});