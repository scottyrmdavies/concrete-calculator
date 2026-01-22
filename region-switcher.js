/**
 * REGION SWITCHER WITH I18N SUPPORT
 * Complete regional switching with vocabulary, units, and calculations
 */

import { getI18nConfig, getLocalizedText } from './i18n-config.js';

/**
 * Region Switcher Manager
 */
export class RegionSwitcher {
    constructor(defaultRegion = 'UK') {
        this.currentRegion = defaultRegion;
        this.config = getI18nConfig(defaultRegion);
        this.listeners = [];
        
        // Store original content for restoration
        this.originalContent = new Map();
    }

    /**
     * Set region and trigger updates
     */
    setRegion(region) {
        if (this.currentRegion !== region) {
            this.currentRegion = region;
            this.config = getI18nConfig(region);
            this.notifyListeners();
        }
    }

    /**
     * Get current region
     */
    getRegion() {
        return this.currentRegion;
    }

    /**
     * Get current config
     */
    getConfig() {
        return this.config;
    }

    /**
     * Toggle between UK and US
     */
    toggle() {
        this.setRegion(this.currentRegion === 'UK' ? 'US' : 'UK');
    }

    /**
     * Subscribe to region changes
     */
    onChange(callback) {
        this.listeners.push(callback);
    }

    /**
     * Notify all listeners
     */
    notifyListeners() {
        this.listeners.forEach(callback => {
            callback(this.currentRegion, this.config);
        });
    }
}

/**
 * Create region switcher UI
 */
export function createRegionSwitcher(regionSwitcher, options = {}) {
    const {
        showLabels = true,
        position = 'top',
        className = ''
    } = options;

    const container = document.createElement('div');
    container.className = `region-switcher ${className}`;
    container.style.cssText = `
        background: linear-gradient(135deg, #f3f6f3 0%, #f6f7f8 100%);
        border: 1px solid #dddddd;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 20px;
    `;

    // Title
    const title = document.createElement('div');
    title.style.cssText = `
        font-weight: 700;
        color: #14261c;
        margin-bottom: 12px;
        font-size: 16px;
    `;
    title.textContent = 'Select Your Region';
    container.appendChild(title);

    // Toggle wrapper
    const toggleWrapper = document.createElement('div');
    toggleWrapper.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;

    // UK Button
    const ukButton = document.createElement('button');
    ukButton.className = 'region-btn uk-btn';
    ukButton.style.cssText = `
        flex: 1;
        padding: 12px 16px;
        border: 2px solid ${regionSwitcher.getRegion() === 'UK' ? '#30C7B5' : '#dddddd'};
        background: ${regionSwitcher.getRegion() === 'UK' ? '#e8f8f5' : 'white'};
        border-radius: 8px;
        cursor: pointer;
        font-weight: ${regionSwitcher.getRegion() === 'UK' ? '700' : '600'};
        color: ${regionSwitcher.getRegion() === 'UK' ? '#00AC97' : '#4F5655'};
        transition: all 0.3s ease;
        font-size: 14px;
    `;
    ukButton.innerHTML = `
        <div>🇬🇧 UK (Metric)</div>
        <div style="font-size: 11px; font-weight: normal; margin-top: 4px; opacity: 0.8;">Metres • Kg • UK Ton (1016kg)</div>
    `;

    // US Button
    const usButton = document.createElement('button');
    usButton.className = 'region-btn us-btn';
    usButton.style.cssText = `
        flex: 1;
        padding: 12px 16px;
        border: 2px solid ${regionSwitcher.getRegion() === 'US' ? '#30C7B5' : '#dddddd'};
        background: ${regionSwitcher.getRegion() === 'US' ? '#e8f8f5' : 'white'};
        border-radius: 8px;
        cursor: pointer;
        font-weight: ${regionSwitcher.getRegion() === 'US' ? '700' : '600'};
        color: ${regionSwitcher.getRegion() === 'US' ? '#00AC97' : '#4F5655'};
        transition: all 0.3s ease;
        font-size: 14px;
    `;
    usButton.innerHTML = `
        <div>🇺🇸 US (Imperial)</div>
        <div style="font-size: 11px; font-weight: normal; margin-top: 4px; opacity: 0.8;">Feet • Lbs • US Ton (907kg)</div>
    `;

    // Click handlers
    ukButton.addEventListener('click', () => {
        regionSwitcher.setRegion('UK');
        updateButtons();
    });

    usButton.addEventListener('click', () => {
        regionSwitcher.setRegion('US');
        updateButtons();
    });

    // Update button styles
    const updateButtons = () => {
        const region = regionSwitcher.getRegion();
        
        ukButton.style.borderColor = region === 'UK' ? '#30C7B5' : '#dddddd';
        ukButton.style.background = region === 'UK' ? '#e8f8f5' : 'white';
        ukButton.style.fontWeight = region === 'UK' ? '700' : '600';
        ukButton.style.color = region === 'UK' ? '#00AC97' : '#4F5655';

        usButton.style.borderColor = region === 'US' ? '#30C7B5' : '#dddddd';
        usButton.style.background = region === 'US' ? '#e8f8f5' : 'white';
        usButton.style.fontWeight = region === 'US' ? '700' : '600';
        usButton.style.color = region === 'US' ? '#00AC97' : '#4F5655';
    };

    toggleWrapper.appendChild(ukButton);
    toggleWrapper.appendChild(usButton);
    container.appendChild(toggleWrapper);

    // Info box
    const infoBox = document.createElement('div');
    infoBox.style.cssText = `
        margin-top: 12px;
        padding: 12px;
        background: white;
        border-radius: 6px;
        border-left: 3px solid #30C7B5;
        font-size: 12px;
        color: #4F5655;
    `;
    infoBox.innerHTML = `
        <strong>Note:</strong><br>
        • UK Ton = 1,016 kg (Long Ton)<br>
        • US Ton = 907 kg (Short Ton)<br>
        • Bag sizes and calculations adjust automatically
    `;
    container.appendChild(infoBox);

    return container;
}

/**
 * Update all elements with data-i18n attributes
 */
export function updateAllI18nElements(region, container = document) {
    const config = getI18nConfig(region);
    
    // Update elements with data-i18n attribute
    const elements = container.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const localizedText = getLocalizedText(region, key);
        
        if (element.tagName === 'INPUT' && element.placeholder) {
            element.placeholder = localizedText;
        } else if (element.value !== undefined && element.tagName === 'INPUT') {
            // Don't change input values, only placeholders
        } else {
            element.textContent = localizedText;
        }
    });
    
    // Update unit labels with data-unit attribute
    const unitElements = container.querySelectorAll('[data-unit]');
    unitElements.forEach(element => {
        const unitType = element.getAttribute('data-unit');
        let unitLabel = '';
        
        switch(unitType) {
            case 'length':
                unitLabel = config.units.lengthLabel;
                break;
            case 'lengthSmall':
                unitLabel = config.units.lengthSmallLabel;
                break;
            case 'area':
                unitLabel = config.units.areaLabel;
                break;
            case 'volume':
                unitLabel = config.units.volumeLabel;
                break;
            case 'weight':
                unitLabel = config.units.weightLabel;
                break;
            case 'weightHeavy':
                unitLabel = config.units.weightHeavyLabel;
                break;
        }
        
        element.textContent = unitLabel;
    });
}

/**
 * Update specific text by replacing keywords
 */
export function updateVocabulary(region, container = document) {
    const config = getI18nConfig(region);
    
    // Get all text nodes
    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    // Replace vocabulary in text nodes
    textNodes.forEach(node => {
        let text = node.textContent;
        let modified = false;
        
        // Replace each vocabulary term
        Object.keys(config.vocabulary).forEach(key => {
            const value = config.vocabulary[key];
            const regex = new RegExp(`\\b${key}\\b`, 'gi');
            if (regex.test(text)) {
                text = text.replace(regex, value);
                modified = true;
            }
        });
        
        if (modified) {
            node.textContent = text;
        }
    });
}

/**
 * Initialize region switcher on a page
 */
export function initializeRegionSwitcher(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container #${containerId} not found`);
        return null;
    }

    const regionSwitcher = new RegionSwitcher(options.defaultRegion || 'UK');
    const switcher = createRegionSwitcher(regionSwitcher, options);
    container.appendChild(switcher);

    // Set up automatic updates
    regionSwitcher.onChange((region, config) => {
        updateAllI18nElements(region);
        updateVocabulary(region);
    });

    return regionSwitcher;
}

export default {
    RegionSwitcher,
    createRegionSwitcher,
    updateAllI18nElements,
    updateVocabulary,
    initializeRegionSwitcher
};
