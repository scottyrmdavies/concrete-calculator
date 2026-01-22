/**
 * REGIONAL CONFIGURATION & STANDARDS
 * UK (Metric) and US (Imperial) building standards and material specifications
 */

/**
 * Complete regional configuration for UK and US markets
 * Includes: units, material names, standard sizes, spacing, densities
 */
export const REGIONAL_CONFIGS = {
    UK: {
        // Basic units
        unit: 'mm',
        unitLabel: 'mm',
        largeUnit: 'm',
        largeUnitLabel: 'Metres',
        areaUnit: 'm²',
        volumeUnit: 'm³',
        weightUnit: 'tonnes',
        
        // Display format (e.g., "2.5 m")
        format: 'decimal',
        decimalPlaces: 2,
        
        // Regional material names
        vocabulary: {
            plasterboard: 'Plasterboard',
            drywall: 'Plasterboard',
            timber: 'Timber',
            lumber: 'Timber',
            skirting: 'Skirting',
            baseboard: 'Skirting',
            skip: 'Skip',
            dumpster: 'Skip',
            sheet: 'Sheet',
            board: 'Board',
            brick: 'Brick',
            block: 'Block',
            sand: 'Sand',
            mortar: 'Mortar',
            plaster: 'Plaster',
            adhesive: 'Adhesive',
            grout: 'Grout',
            joint: 'Joint'
        },
        
        // Standard sheet/board sizes (mm)
        sheetSizes: {
            plasterboard: [1200, 2400],  // 1.2m x 2.4m
            ply: [1200, 2400],
            mdf: [1220, 2440]
        },
        
        // Standard timber/lumber sizes (actual, in mm)
        timberSizes: {
            '2x2': [50, 50],      // 50mm x 50mm
            '2x4': [50, 100],     // 50mm x 100mm
            '2x6': [50, 150],     // 50mm x 150mm
            '4x4': [100, 100],    // 100mm x 100mm
            '6x6': [150, 150]     // 150mm x 150mm
        },
        
        // Standard stud spacing (mm)
        studSpacing: [400, 600],  // 400mm or 600mm on center
        
        // Brick/Block sizes (L x W x H in mm)
        materialSizes: {
            brick: {
                standard: [215, 102.5, 65],    // Length x Width x Height
                perM2: 60
            },
            block: {
                standard: [440, 215, 215],     // Concrete block
                perM2: 10
            }
        },
        
        // Material densities (kg/m³)
        densities: {
            concrete: 2400,
            clay: 1700,
            soil: 1600,
            sand: 1900,
            gravel: 1900,
            brick: 1920,
            block: 2350,
            timber: 600,
            plasterboard: 750
        },
        
        // Bulking factors for excavated materials
        bulkingFactors: {
            clay: 1.35,
            soil: 1.25,
            rock: 1.50,
            gravel: 1.10,
            sand: 1.10
        },
        
        // Material ratios (per m²)
        materialRatios: {
            sand: 3.5,      // kg per m²
            cement: 0.3,    // kg per m²
            mortar: 75      // kg per m²
        },
        
        // Coverage rates
        coverage: {
            skim: 10,           // m² per 25kg bag at 2mm
            adhesive: 5,        // m² per bag
            grout: 1.5,         // m² per kg
            bedding: 4,         // m² per bag
            plaster: 10         // m² per 25kg bag
        }
    },
    
    US: {
        // Basic units
        unit: 'inch',
        unitLabel: 'in',
        largeUnit: 'ft',
        largeUnitLabel: 'Feet',
        areaUnit: 'sq ft',
        volumeUnit: 'cu ft',
        weightUnit: 'lbs',
        
        // Display format (e.g., "8' 4\"")
        format: 'feetInches',
        decimalPlaces: 1,
        
        // Regional material names
        vocabulary: {
            plasterboard: 'Drywall',
            drywall: 'Drywall',
            timber: 'Lumber',
            lumber: 'Lumber',
            skirting: 'Baseboard',
            baseboard: 'Baseboard',
            skip: 'Dumpster',
            dumpster: 'Dumpster',
            sheet: 'Sheet',
            board: 'Board',
            brick: 'Brick',
            block: 'Concrete Block',
            sand: 'Sand',
            mortar: 'Mortar Mix',
            plaster: 'Joint Compound',
            adhesive: 'Thin-Set',
            grout: 'Grout',
            joint: 'Joint'
        },
        
        // Standard sheet/board sizes (inches)
        sheetSizes: {
            drywall: [48, 96],      // 4ft x 8ft
            plywood: [48, 96],
            osb: [48, 96]
        },
        
        // Standard lumber sizes (ACTUAL, not nominal - in inches)
        // NOTE: US lumber uses nominal naming but actual dimensions are smaller
        // E.g., a "2x4" is actually 1.5" x 3.5" due to planing/drying
        // ALWAYS use the ACTUAL dimensions for volume/weight calculations
        timberSizes: {
            '2x2': [1.5, 1.5],      // Nominal: 2x2, Actual: 1.5" x 1.5"
            '2x4': [1.5, 3.5],      // Nominal: 2x4, Actual: 1.5" x 3.5"
            '2x6': [1.5, 5.5],      // Nominal: 2x6, Actual: 1.5" x 5.5"
            '2x8': [1.5, 7.25],     // Nominal: 2x8, Actual: 1.5" x 7.25"
            '4x4': [3.5, 3.5],      // Nominal: 4x4, Actual: 3.5" x 3.5"
            '6x6': [5.5, 5.5]       // Nominal: 6x6, Actual: 5.5" x 5.5"
        },
        
        // Nominal to actual dimensions mapping
        nominalToActual: {
            '2x2': [1.5, 1.5],
            '2x4': [1.5, 3.5],
            '2x6': [1.5, 5.5],
            '2x8': [1.5, 7.25],
            '2x10': [1.5, 9.25],
            '2x12': [1.5, 11.25],
            '4x4': [3.5, 3.5],
            '4x6': [3.5, 5.5],
            '6x6': [5.5, 5.5]
        },
        
        // Standard stud spacing (inches)
        studSpacing: [16, 24],      // 16" or 24" on center
        
        // Brick/Block sizes (L x W x H in inches)
        materialSizes: {
            brick: {
                standard: [8.5, 4, 2.25],     // Length x Width x Height
                perSqFt: 6.5
            },
            block: {
                standard: [16, 8, 8],         // Standard concrete block
                perSqFt: 1.125
            }
        },
        
        // Material densities (lbs/cu ft)
        densities: {
            concrete: 150,          // 150 lbs/cu ft
            clay: 106,
            soil: 100,
            sand: 118,
            gravel: 118,
            brick: 120,
            block: 147,
            timber: 37.5,
            drywall: 47
        },
        
        // Bulking factors for excavated materials
        bulkingFactors: {
            clay: 1.35,
            soil: 1.25,
            rock: 1.50,
            gravel: 1.10,
            sand: 1.10
        },
        
        // Material ratios (per sq ft)
        materialRatios: {
            sand: 0.32,         // lbs per sq ft
            cement: 0.028,      // lbs per sq ft
            mortar: 6.8         // lbs per sq ft
        },
        
        // Coverage rates
        coverage: {
            drywall: 33.33,         // sq ft per sheet (4ft x 8ft = 32 sq ft)
            adhesive: 50,           // sq ft per gallon
            grout: 15,              // sq ft per lb
            bedding: 40,            // sq ft per bag
            compound: 100           // sq ft per 20lb bucket
        }
    }
};

/**
 * Get regional configuration
 * @param {string} region - 'UK' or 'US'
 * @returns {object} Regional configuration
 */
export function getRegionalConfig(region) {
    return REGIONAL_CONFIGS[region.toUpperCase()] || REGIONAL_CONFIGS.UK;
}

/**
 * Get localized text for a key
 * @param {string} region - 'UK' or 'US'
 * @param {string} key - Text key (e.g., 'plasterboard', 'timber')
 * @returns {string} Localized text
 */
export function getLocalizedText(region, key) {
    const config = getRegionalConfig(region);
    return config.vocabulary[key.toLowerCase()] || key;
}

/**
 * Get all material size presets for region
 * @param {string} region - 'UK' or 'US'
 * @param {string} materialType - 'timber', 'brick', etc.
 * @returns {object} Material size options
 */
export function getMaterialSizes(region, materialType) {
    const config = getRegionalConfig(region);
    
    if (materialType === 'timber' || materialType === 'lumber') {
        return config.timberSizes;
    } else if (materialType === 'brick') {
        return config.materialSizes.brick;
    } else if (materialType === 'block') {
        return config.materialSizes.block;
    }
    
    return {};
}

/**
 * Get material density for region
 * @param {string} region - 'UK' or 'US'
 * @param {string} materialType - Material type
 * @returns {number} Density in regional units
 */
export function getDensity(region, materialType) {
    const config = getRegionalConfig(region);
    return config.densities[materialType.toLowerCase()] || 1;
}

/**
 * Get bulking factor for excavation
 * @param {string} region - 'UK' or 'US'
 * @param {string} materialType - Material type
 * @returns {number} Bulking factor
 */
export function getBulkingFactor(region, materialType) {
    const config = getRegionalConfig(region);
    return config.bulkingFactors[materialType.toLowerCase()] || 1;
}

/**
 * Validate region
 * @param {string} region - Region to validate
 * @returns {boolean} True if valid region
 */
export function isValidRegion(region) {
    return ['UK', 'US'].includes(region.toUpperCase());
}

/**
 * Get available regions
 * @returns {array} Array of available regions
 */
export function getAvailableRegions() {
    return Object.keys(REGIONAL_CONFIGS);
}

/**
 * Replace vocabulary in text content dynamically
 * @param {string} text - Original text
 * @param {string} region - Target region ('UK' or 'US')
 * @returns {string} Text with replaced vocabulary
 * 
 * @example
 * replaceVocabulary("Install plasterboard and timber", "US")
 * // Returns: "Install drywall and lumber"
 */
export function replaceVocabulary(text, region) {
    const config = getRegionalConfig(region);
    let result = text;
    
    // Replace each vocabulary term
    Object.keys(config.vocabulary).forEach(key => {
        const regionalTerm = config.vocabulary[key];
        const regex = new RegExp(key, 'gi');
        result = result.replace(regex, (match) => {
            // Preserve capitalization
            if (match[0] === match[0].toUpperCase()) {
                return regionalTerm.charAt(0).toUpperCase() + regionalTerm.slice(1);
            }
            return regionalTerm;
        });
    });
    
    return result;
}

/**
 * Update HTML element text content with regional vocabulary
 * @param {HTMLElement} element - Element to update
 * @param {string} region - Target region
 */
export function updateElementVocabulary(element, region) {
    if (!element) return;
    
    const config = getRegionalConfig(region);
    
    // Update text content
    if (element.textContent) {
        element.textContent = replaceVocabulary(element.textContent, region);
    }
    
    // Update placeholder
    if (element.placeholder) {
        element.placeholder = replaceVocabulary(element.placeholder, region);
    }
    
    // Update title
    if (element.title) {
        element.title = replaceVocabulary(element.title, region);
    }
    
    // Update aria-label
    if (element.getAttribute('aria-label')) {
        element.setAttribute('aria-label', replaceVocabulary(element.getAttribute('aria-label'), region));
    }
}

/**
 * Update all elements with data-regional-text attribute
 * @param {string} region - Target region
 * @param {HTMLElement} container - Container to search within (default: document)
 */
export function updateAllRegionalText(region, container = document) {
    const elements = container.querySelectorAll('[data-regional-text]');
    elements.forEach(element => {
        updateElementVocabulary(element, region);
    });
    
    // Also update all labels, headings, and common text elements
    const textElements = container.querySelectorAll('label, h1, h2, h3, h4, h5, h6, th, button, span, div, p');
    textElements.forEach(element => {
        if (element.children.length === 0 || element.classList.contains('regional-text')) {
            updateElementVocabulary(element, region);
        }
    });
}

/**
 * Get US lumber actual dimensions from nominal size
 * @param {string} nominalSize - Nominal size (e.g., '2x4')
 * @returns {Array} [width, height] in inches or null if not found
 */
export function getActualLumberSize(nominalSize) {
    const config = getRegionalConfig('US');
    return config.nominalToActual?.[nominalSize] || config.timberSizes?.[nominalSize] || null;
}

export default REGIONAL_CONFIGS;
