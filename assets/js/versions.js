// Version History Manager
// This file manages all version data by loading individual version files

const versionHistory = {};

// Version registry - maps version strings to their data objects
// Only include released/stable versions
const versionRegistry = {
    'v1.0.0-beta': () => version1_0_0_beta,
    'v1.1.0-beta': () => version1_1_0_beta
};

// Initialize version history from registry
function initializeVersionHistory() {
    Object.keys(versionRegistry).forEach(version => {
        try {
            versionHistory[version] = versionRegistry[version]();
        } catch (error) {
            console.error(`Error loading version ${version}:`, error);
        }
    });
}

// Get all versions in order (newest first)
function getAllVersions() {
    return Object.keys(versionHistory).sort((a, b) => {
        const aNum = parseInt(a.replace('v', '').split('.')[0]);
        const bNum = parseInt(b.replace('v', '').split('.')[0]);
        if (aNum !== bNum) return bNum - aNum;
        const aMinor = parseInt(a.replace('v', '').split('.')[1]);
        const bMinor = parseInt(b.replace('v', '').split('.')[1]);
        if (aMinor !== bMinor) return bMinor - aMinor;
        return parseInt(b.replace('v', '').split('.')[2]) - parseInt(a.replace('v', '').split('.')[2]);
    });
}

// Get previous version
function getPreviousVersion(version) {
    const versions = getAllVersions();
    const currentIndex = versions.indexOf(version);
    return currentIndex < versions.length - 1 ? versions[currentIndex + 1] : null;
}

// Get version data
function getVersionData(version) {
    return versionHistory[version] || null;
}

// Initialize on load
initializeVersionHistory();
