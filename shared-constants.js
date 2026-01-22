/**
 * CALIDWELL HOMES - SHARED CONSTANTS & UTILITIES
 * Shared across all calculators
 */

// ============================================
// MATERIAL PROPERTIES & CONFIGURATIONS
// ============================================

export const MATERIAL_PROPERTIES = {
    "Concrete": { 
        density: 2.4, 
        bulkingFactor: 1.0,
        description: "Ready-mix concrete"
    },
    "Clay": { 
        density: 1.7, 
        bulkingFactor: 1.35,
        description: "Clay soil"
    },
    "Soil": { 
        density: 1.6, 
        bulkingFactor: 1.25,
        description: "General soil"
    },
    "Rock/Bricks": { 
        density: 1.8, 
        bulkingFactor: 1.50,
        description: "Crushed rock or brick rubble"
    },
    "Sand/Gravel": { 
        density: 1.9, 
        bulkingFactor: 1.10,
        description: "Sand or gravel fill"
    }
};

export const WALL_MATERIALS = {
    "Bricks": {
        perM2: 60,
        perPack: 500,
        unit: "units"
    },
    "Blocks": {
        perM2: 10,
        perPack: 120,
        unit: "units"
    }
};

export const MATERIAL_RATIOS = {
    "single": {
        sand: 3.5,  // kg per m²
        cement: 0.3, // kg per m²
        bricksPerM2: 60
    },
    "double": {
        sand: 7.0,
        cement: 0.6,
        bricksPerM2: 120
    }
};

export const BOARD_SIZES = {
    "1.2x2.4": 2.88,  // m²
    "1.2x2.7": 3.24,  // m²
    "1.2x3.0": 3.60   // m²
};

export const TILE_DEFAULTS = {
    wastePercentage: 10,
    groutWidth: 3,  // mm
    adhesiveCoverage: 5 // m² per bag
};

export const PAVING_DEFAULTS = {
    wastePercentage: 10,
    slabsPerPack: 20,
    beddingCoverage: 4  // m² per bag
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Safe number conversion
 * @param {string|number} value - Value to convert
 * @returns {number} Parsed number or 0
 */
export const toNumber = (value) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
};

/**
 * Round to fixed decimal places
 * @param {number} value - Value to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded number
 */
export const toFixed = (value, decimals = 2) => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Ceiling function - round up
 * @param {number} value - Value to round
 * @returns {number} Rounded up value
 */
export const ceiling = (value) => Math.ceil(toNumber(value));

/**
 * Floor function - round down
 * @param {number} value - Value to round
 * @returns {number} Rounded down value
 */
export const floor = (value) => Math.floor(toNumber(value));

/**
 * Debounce function for performance
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (fn, delay = 300) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};

/**
 * Validate numeric input
 * @param {any} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {object} Validation result with errors
 */
export const validateNumber = (value, min = 0, max = Infinity) => {
    const num = toNumber(value);
    const errors = [];
    
    if (num < min) errors.push(`Value must be at least ${min}`);
    if (num > max) errors.push(`Value must be at most ${max}`);
    
    return {
        valid: errors.length === 0,
        value: num,
        errors
    };
};

/**
 * Format number for display
 * @param {number} value - Value to format
 * @param {object} options - Formatting options
 * @returns {string} Formatted value
 */
export const formatNumber = (value, options = {}) => {
    const {
        decimals = 2,
        prefix = '',
        suffix = '',
        separator = ','
    } = options;
    
    const formatted = toFixed(value, decimals).toString();
    const [whole, decimal] = formatted.split('.');
    
    // Add thousands separator
    const withSeparator = whole.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    
    return prefix + withSeparator + (decimal ? '.' + decimal : '') + suffix;
};

/**
 * Clone object deeply
 * @param {object} obj - Object to clone
 * @returns {object} Cloned object
 */
export const deepClone = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    
    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
};

/**
 * Generate unique ID
 * @returns {string} Unique identifier
 */
export const generateId = () => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Show error message
 * @param {string} message - Error message
 * @param {number} duration - Duration in ms (0 = persistent)
 */
export const showError = (message, duration = 4000) => {
    const container = document.getElementById('error-container') || createErrorContainer();
    const errorEl = document.createElement('div');
    errorEl.className = 'error-alert fade-in';
    errorEl.textContent = message;
    container.appendChild(errorEl);
    
    if (duration > 0) {
        setTimeout(() => errorEl.remove(), duration);
    }
};

/**
 * Show success message
 * @param {string} message - Success message
 * @param {number} duration - Duration in ms
 */
export const showSuccess = (message, duration = 3000) => {
    const container = document.getElementById('success-container') || createSuccessContainer();
    const successEl = document.createElement('div');
    successEl.className = 'success-alert fade-in';
    successEl.textContent = message;
    container.appendChild(successEl);
    
    setTimeout(() => successEl.remove(), duration);
};

/**
 * Create error message container
 * @private
 */
const createErrorContainer = () => {
    const container = document.createElement('div');
    container.id = 'error-container';
    container.className = 'alert-container error';
    document.body.prepend(container);
    return container;
};

/**
 * Create success message container
 * @private
 */
const createSuccessContainer = () => {
    const container = document.createElement('div');
    container.id = 'success-container';
    container.className = 'alert-container success';
    document.body.prepend(container);
    return container;
};

// ============================================
// STORAGE UTILITIES
// ============================================

/**
 * Save calculation to localStorage
 * @param {string} key - Storage key
 * @param {object} data - Data to save
 */
export const saveCalculation = (key, data) => {
    try {
        const storageKey = `calc_${key}`;
        localStorage.setItem(storageKey, JSON.stringify({
            timestamp: new Date().toISOString(),
            data
        }));
    } catch (error) {
        showError('Failed to save calculation');
    }
};

/**
 * Load calculation from localStorage
 * @param {string} key - Storage key
 * @returns {object|null} Stored data or null
 */
export const loadCalculation = (key) => {
    try {
        const storageKey = `calc_${key}`;
        const stored = localStorage.getItem(storageKey);
        return stored ? JSON.parse(stored).data : null;
    } catch (error) {
        return null;
    }
};

/**
 * Get all saved calculations
 * @returns {array} List of saved calculations
 */
export const getSavedCalculations = () => {
    const saved = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('calc_')) {
            const stored = JSON.parse(localStorage.getItem(key));
            saved.push({
                name: key.replace('calc_', ''),
                timestamp: stored.timestamp,
                data: stored.data
            });
        }
    }
    return saved.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

/**
 * Delete saved calculation
 * @param {string} key - Storage key
 */
export const deleteCalculation = (key) => {
    localStorage.removeItem(`calc_${key}`);
};
