/**
 * REGION TOGGLE COMPONENT
 * UI component for switching between UK and US regional settings
 * Manages regional state and triggers recalculations
 */

import { getRegionalConfig, getAvailableRegions } from './regional-config.js';

/**
 * Region Manager - Handles regional state and callbacks
 */
export class RegionManager {
    constructor(defaultRegion = 'UK') {
        this.currentRegion = defaultRegion;
        this.listeners = [];
        this.config = getRegionalConfig(defaultRegion);
    }

    /**
     * Set region and notify listeners
     * @param {string} region - 'UK' or 'US'
     */
    setRegion(region) {
        if (this.currentRegion !== region) {
            this.currentRegion = region;
            this.config = getRegionalConfig(region);
            this.notifyListeners();
        }
    }

    /**
     * Get current region
     * @returns {string} Current region
     */
    getRegion() {
        return this.currentRegion;
    }

    /**
     * Get current config
     * @returns {object} Regional configuration
     */
    getConfig() {
        return this.config;
    }

    /**
     * Subscribe to region changes
     * @param {function} callback - Called when region changes
     */
    onChange(callback) {
        this.listeners.push(callback);
    }

    /**
     * Notify all listeners of change
     * @private
     */
    notifyListeners() {
        this.listeners.forEach(callback => {
            callback(this.currentRegion, this.config);
        });
    }

    /**
     * Get available regions
     * @returns {array} Available region codes
     */
    getAvailableRegions() {
        return getAvailableRegions();
    }

    /**
     * Toggle between UK and US
     */
    toggle() {
        this.setRegion(this.currentRegion === 'UK' ? 'US' : 'UK');
    }
}

/**
 * Create region toggle UI component
 * 
 * @param {RegionManager} regionManager - Region manager instance
 * @param {object} options - Configuration options
 *   - showLabels: boolean (default: true)
 *   - showDescription: boolean (default: true)
 *   - compact: boolean (default: false)
 *   - className: string (default: '')
 * @returns {HTMLElement} Toggle component element
 */
export function createRegionToggle(regionManager, options = {}) {
    const {
        showLabels = true,
        showDescription = true,
        compact = false,
        className = ''
    } = options;

    const container = document.createElement('div');
    container.className = `region-toggle-container ${compact ? 'compact' : ''} ${className}`;
    container.style.cssText = `
        padding: 16px;
        background: linear-gradient(135deg, #f3f6f3 0%, #f6f7f8 100%);
        border-radius: 12px;
        margin-bottom: 20px;
        border: 1px solid #dddddd;
    `;

    // Title
    if (showLabels) {
        const title = document.createElement('div');
        title.style.cssText = `
            font-weight: 700;
            color: #14261c;
            margin-bottom: 8px;
            font-size: 16px;
        `;
        title.textContent = 'Select Your Region';
        container.appendChild(title);
    }

    // Toggle wrapper
    const toggleWrapper = document.createElement('div');
    toggleWrapper.className = 'toggle-wrapper';
    toggleWrapper.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: ${showDescription ? '12px' : '0'};
    `;

    // UK Option
    const ukOption = document.createElement('div');
    ukOption.className = 'region-option uk';
    ukOption.style.cssText = `
        flex: 1;
        padding: 12px 16px;
        border-radius: 8px;
        border: 2px solid ${regionManager.getRegion() === 'UK' ? '#30C7B5' : '#dddddd'};
        background: ${regionManager.getRegion() === 'UK' ? '#e8f8f5' : 'white'};
        cursor: pointer;
        text-align: center;
        font-weight: ${regionManager.getRegion() === 'UK' ? '700' : '600'};
        color: ${regionManager.getRegion() === 'UK' ? '#00AC97' : '#4F5655'};
        transition: all 0.3s ease;
    `;
    ukOption.innerHTML = `
        <div style="font-size: 14px;">🇬🇧 UK (Metric)</div>
        <div style="font-size: 12px; font-weight: normal; margin-top: 4px; opacity: 0.8;">Metres, Kg</div>
    `;

    // US Option
    const usOption = document.createElement('div');
    usOption.className = 'region-option us';
    usOption.style.cssText = `
        flex: 1;
        padding: 12px 16px;
        border-radius: 8px;
        border: 2px solid ${regionManager.getRegion() === 'US' ? '#30C7B5' : '#dddddd'};
        background: ${regionManager.getRegion() === 'US' ? '#e8f8f5' : 'white'};
        cursor: pointer;
        text-align: center;
        font-weight: ${regionManager.getRegion() === 'US' ? '700' : '600'};
        color: ${regionManager.getRegion() === 'US' ? '#00AC97' : '#4F5655'};
        transition: all 0.3s ease;
    `;
    usOption.innerHTML = `
        <div style="font-size: 14px;">🇺🇸 US (Imperial)</div>
        <div style="font-size: 12px; font-weight: normal; margin-top: 4px; opacity: 0.8;">Feet, Lbs</div>
    `;

    // Event listeners
    ukOption.addEventListener('click', () => {
        regionManager.setRegion('UK');
        updateToggleUI();
    });

    usOption.addEventListener('click', () => {
        regionManager.setRegion('US');
        updateToggleUI();
    });

    // Update toggle UI after region change
    const updateToggleUI = () => {
        const currentRegion = regionManager.getRegion();
        
        ukOption.style.borderColor = currentRegion === 'UK' ? '#30C7B5' : '#dddddd';
        ukOption.style.background = currentRegion === 'UK' ? '#e8f8f5' : 'white';
        ukOption.style.fontWeight = currentRegion === 'UK' ? '700' : '600';
        ukOption.style.color = currentRegion === 'UK' ? '#00AC97' : '#4F5655';

        usOption.style.borderColor = currentRegion === 'US' ? '#30C7B5' : '#dddddd';
        usOption.style.background = currentRegion === 'US' ? '#e8f8f5' : 'white';
        usOption.style.fontWeight = currentRegion === 'US' ? '700' : '600';
        usOption.style.color = currentRegion === 'US' ? '#00AC97' : '#4F5655';
    };

    toggleWrapper.appendChild(ukOption);
    toggleWrapper.appendChild(usOption);
    container.appendChild(toggleWrapper);

    // Description
    if (showDescription) {
        const description = document.createElement('div');
        description.style.cssText = `
            font-size: 12px;
            color: #4F5655;
            background: white;
            padding: 12px;
            border-radius: 6px;
            border-left: 3px solid #30C7B5;
        `;
        description.innerHTML = `
            <strong>Regional Notes:</strong><br>
            • Measurements update to local standards<br>
            • Material sizes follow regional specifications<br>
            • Terminology adjusted for your market
        `;
        container.appendChild(description);
    }

    return container;
}

/**
 * Create a compact toggle button
 * Smaller version for header integration
 * 
 * @param {RegionManager} regionManager - Region manager instance
 * @param {function} onToggle - Callback when toggled
 * @returns {HTMLElement} Toggle button element
 */
export function createCompactRegionButton(regionManager, onToggle) {
    const button = document.createElement('button');
    button.className = 'region-toggle-button';
    button.style.cssText = `
        background: white;
        border: 2px solid #dddddd;
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        color: #30C7B5;
        transition: all 0.3s ease;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
    `;

    const updateButton = () => {
        const region = regionManager.getRegion();
        button.textContent = region === 'UK' ? '🇬🇧 UK' : '🇺🇸 US';
        button.title = `Current: ${region === 'UK' ? 'UK (Metric)' : 'US (Imperial)'}. Click to toggle.`;
    };

    button.addEventListener('click', () => {
        regionManager.toggle();
        updateButton();
        if (onToggle) onToggle(regionManager.getRegion());
    });

    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.borderColor = '#30C7B5';
        button.style.background = '#e8f8f5';
    });

    button.addEventListener('mouseleave', () => {
        button.style.borderColor = '#dddddd';
        button.style.background = 'white';
    });

    updateButton();
    return button;
}

/**
 * Create a regional settings panel
 * Detailed settings for advanced users
 * 
 * @param {RegionManager} regionManager - Region manager instance
 * @returns {HTMLElement} Settings panel element
 */
export function createRegionSettingsPanel(regionManager) {
    const panel = document.createElement('div');
    panel.className = 'region-settings-panel';
    panel.style.cssText = `
        background: white;
        border: 1px solid #dddddd;
        border-radius: 12px;
        padding: 20px;
        margin: 20px 0;
    `;

    const title = document.createElement('h3');
    title.textContent = 'Regional Settings';
    title.style.cssText = `
        margin: 0 0 16px 0;
        color: #14261c;
        font-size: 18px;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    `;

    const config = regionManager.getConfig();
    const region = regionManager.getRegion();

    // Region information card
    const infoCard = document.createElement('div');
    infoCard.style.cssText = `
        background: #f6f7f8;
        padding: 12px;
        border-radius: 8px;
        border-left: 4px solid #30C7B5;
    `;
    infoCard.innerHTML = `
        <div style="font-weight: 700; color: #14261c; margin-bottom: 8px;">Active Region</div>
        <div style="color: #4F5655; font-size: 14px;">
            <div><strong>${region}</strong></div>
            <div style="font-size: 12px; margin-top: 4px;">
                Unit: <code>${config.unitLabel}</code><br>
                Large Unit: <code>${config.largeUnitLabel}</code><br>
                Volume: <code>${config.volumeUnit}</code><br>
                Weight: <code>${config.weightUnit}</code>
            </div>
        </div>
    `;

    // Vocabulary sample
    const vocabCard = document.createElement('div');
    vocabCard.style.cssText = `
        background: #f6f7f8;
        padding: 12px;
        border-radius: 8px;
        border-left: 4px solid #30C7B5;
    `;
    vocabCard.innerHTML = `
        <div style="font-weight: 700; color: #14261c; margin-bottom: 8px;">Terminology</div>
        <div style="color: #4F5655; font-size: 12px;">
            <div>Plasterboard: <strong>${config.vocabulary.plasterboard}</strong></div>
            <div>Timber: <strong>${config.vocabulary.timber}</strong></div>
            <div>Skirting: <strong>${config.vocabulary.skirting}</strong></div>
            <div>Skip: <strong>${config.vocabulary.skip}</strong></div>
        </div>
    `;

    content.appendChild(infoCard);
    content.appendChild(vocabCard);

    panel.appendChild(title);
    panel.appendChild(content);

    return panel;
}

/**
 * Initialize region toggle in a container
 * Convenience function for setup
 * 
 * @param {string} containerId - Container element ID
 * @param {object} options - Configuration options
 * @returns {object} { regionManager, toggle, container }
 */
export function initializeRegionToggle(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container #${containerId} not found`);
        return null;
    }

    const defaultRegion = options.defaultRegion || 'UK';
    const regionManager = new RegionManager(defaultRegion);
    
    const toggle = createRegionToggle(regionManager, {
        showLabels: options.showLabels !== false,
        showDescription: options.showDescription !== false,
        compact: options.compact || false
    });

    container.appendChild(toggle);

    return {
        regionManager,
        toggle,
        container,
        setOnChange: (callback) => regionManager.onChange(callback)
    };
}

export default {
    RegionManager,
    createRegionToggle,
    createCompactRegionButton,
    createRegionSettingsPanel,
    initializeRegionToggle
};
