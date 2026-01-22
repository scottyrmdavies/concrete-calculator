/**
 * UNIT CONVERTER & PARSER
 * Convert between UK (Metric) and US (Imperial) measurements
 * Parse feet+inches format and convert to decimals
 */

import { getRegionalConfig } from './regional-config.js';

/**
 * Parse feet and inches input (e.g., "10' 4\"" or "10 4")
 * Returns decimal inches
 * 
 * @param {string} input - Input like "10' 4\"", "10 4", "10.5", etc.
 * @returns {number} Total inches as decimal
 * 
 * @example
 * parseFeetInches("10' 4\"")   // Returns 124 (10*12 + 4)
 * parseFeetInches("8.5")       // Returns 102 (8.5 * 12)
 * parseFeetInches("10 4.5")    // Returns 124.5
 */
export function parseFeetInches(input) {
    if (typeof input === 'number') {
        return input;
    }
    
    const str = String(input).trim();
    
    // Try to match pattern: X' Y" or X Y or X.X
    const feetInchesMatch = str.match(/(\d+\.?\d*)\s*[\'′]?\s*(\d+\.?\d*)\s*["″]?/);
    
    if (feetInchesMatch) {
        const feet = parseFloat(feetInchesMatch[1]) || 0;
        const inches = parseFloat(feetInchesMatch[2]) || 0;
        return feet * 12 + inches;
    }
    
    // If only one number, assume it's in feet and convert to inches
    const singleMatch = str.match(/^(\d+\.?\d*)$/);
    if (singleMatch) {
        const feet = parseFloat(singleMatch[1]);
        return feet * 12;
    }
    
    return 0;
}

/**
 * Format inches to feet and inches display
 * 
 * @param {number} totalInches - Total measurement in inches
 * @returns {string} Formatted as "X' Y\""
 * 
 * @example
 * formatFeetInches(124)    // Returns "10' 4\""
 * formatFeetInches(96)     // Returns "8' 0\""
 * formatFeetInches(150.5)  // Returns "12' 6.5\""
 */
export function formatFeetInches(totalInches) {
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    
    if (inches === 0) {
        return `${feet}'`;
    }
    
    return `${feet}' ${inches.toFixed(1)}"`;
}

/**
 * Convert millimeters to inches
 * @param {number} mm - Measurement in millimeters
 * @returns {number} Measurement in inches
 */
export function mmToInches(mm) {
    return mm / 25.4;
}

/**
 * Convert inches to millimeters
 * @param {number} inches - Measurement in inches
 * @returns {number} Measurement in millimeters
 */
export function inchesToMm(inches) {
    return inches * 25.4;
}

/**
 * Convert meters to feet
 * @param {number} meters - Measurement in meters
 * @returns {number} Measurement in feet
 */
export function metersToFeet(meters) {
    return meters * 3.28084;
}

/**
 * Convert feet to meters
 * @param {number} feet - Measurement in feet
 * @returns {number} Measurement in meters
 */
export function feetToMeters(feet) {
    return feet / 3.28084;
}

/**
 * Convert cubic meters to cubic feet
 * @param {number} cubicMeters - Volume in cubic meters
 * @returns {number} Volume in cubic feet
 */
export function cubicMetersToCubicFeet(cubicMeters) {
    return cubicMeters * 35.3147;
}

/**
 * Convert cubic feet to cubic meters
 * @param {number} cubicFeet - Volume in cubic feet
 * @returns {number} Volume in cubic meters
 */
export function cubicFeetToCubicMeters(cubicFeet) {
    return cubicFeet / 35.3147;
}

/**
 * Convert square meters to square feet
 * @param {number} squareMeters - Area in square meters
 * @returns {number} Area in square feet
 */
export function squareMetersTSquareFeet(squareMeters) {
    return squareMeters * 10.7639;
}

/**
 * Convert square feet to square meters
 * @param {number} squareFeet - Area in square feet
 * @returns {number} Area in square meters
 */
export function squareFeetToSquareMeters(squareFeet) {
    return squareFeet / 10.7639;
}

/**
 * Convert tonnes to pounds
 * @param {number} tonnes - Weight in tonnes (metric tons)
 * @returns {number} Weight in pounds
 */
export function tonnesToPounds(tonnes) {
    return tonnes * 2204.62;
}

/**
 * Convert pounds to tonnes
 * @param {number} pounds - Weight in pounds
 * @returns {number} Weight in tonnes
 */
export function poundsToTonnes(pounds) {
    return pounds / 2204.62;
}

/**
 * Convert kilograms to pounds
 * @param {number} kg - Weight in kilograms
 * @returns {number} Weight in pounds
 */
export function kgToPounds(kg) {
    return kg * 2.20462;
}

/**
 * Convert pounds to kilograms
 * @param {number} pounds - Weight in pounds
 * @returns {number} Weight in kilograms
 */
export function poundsToKg(pounds) {
    return pounds / 2.20462;
}

/**
 * Format measurement value for display
 * Uses regional format (decimal for UK, feet+inches for US)
 * 
 * @param {number} value - Numeric value
 * @param {string} region - 'UK' or 'US'
 * @param {string} dimension - 'length', 'area', 'volume', 'weight'
 * @returns {string} Formatted display value
 */
export function formatForRegion(value, region, dimension = 'length') {
    const config = getRegionalConfig(region);
    
    if (region.toUpperCase() === 'US' && dimension === 'length') {
        // Convert to feet for display
        return formatFeetInches(value);  // Assumes value is in inches
    }
    
    return value.toFixed(config.decimalPlaces);
}

/**
 * Parse user input for measurement
 * Handles both decimal and feet+inches formats
 * 
 * @param {string} input - User input
 * @param {string} region - 'UK' or 'US'
 * @returns {number} Parsed value in regional base units (mm for UK, inches for US)
 */
export function parseUserInput(input, region) {
    if (region.toUpperCase() === 'US') {
        // Parse feet+inches format for US
        return parseFeetInches(input);  // Returns inches
    } else {
        // Simple decimal parsing for UK
        return parseFloat(input) || 0;  // Assumes meters, will be converted to mm elsewhere
    }
}

/**
 * Convert value from one region to another
 * Handles complete conversion with proper formatting
 * 
 * @param {number} value - Value in source region units
 * @param {string} fromRegion - Source region ('UK' or 'US')
 * @param {string} toRegion - Target region ('UK' or 'US')
 * @param {string} dimension - 'length', 'area', 'volume', 'weight'
 * @returns {number} Converted value in target region units
 */
export function convertBetweenRegions(value, fromRegion, toRegion, dimension = 'length') {
    if (fromRegion === toRegion) {
        return value;
    }
    
    const fromConfig = getRegionalConfig(fromRegion);
    const toConfig = getRegionalConfig(toRegion);
    
    // If both metric or both imperial, just return value
    if ((fromRegion === 'UK' && toRegion === 'UK') || 
        (fromRegion === 'US' && toRegion === 'US')) {
        return value;
    }
    
    // UK (metric) to US (imperial)
    if (fromRegion === 'UK' && toRegion === 'US') {
        switch (dimension) {
            case 'length':
                // mm to inches
                return mmToInches(value);
            case 'area':
                // m² to sq ft
                return squareMetersTSquareFeet(value);
            case 'volume':
                // m³ to cu ft
                return cubicMetersToCubicFeet(value);
            case 'weight':
                // tonnes to lbs
                return tonnesToPounds(value);
            default:
                return value;
        }
    }
    
    // US (imperial) to UK (metric)
    if (fromRegion === 'US' && toRegion === 'UK') {
        switch (dimension) {
            case 'length':
                // inches to mm
                return inchesToMm(value);
            case 'area':
                // sq ft to m²
                return squareFeetToSquareMeters(value);
            case 'volume':
                // cu ft to m³
                return cubicFeetToCubicMeters(value);
            case 'weight':
                // lbs to tonnes
                return poundsToTonnes(value);
            default:
                return value;
        }
    }
    
    return value;
}

/**
 * Create an input helper for feet+inches
 * Returns element that can parse feet and inches
 * 
 * @param {string} placeholderExample - Example text (e.g., "10' 4\"" or "10.5 ft")
 * @returns {object} Input helper with parse method
 */
export function createFeetInchesInputHelper(placeholderExample = "10' 4\"") {
    return {
        placeholder: placeholderExample,
        hint: 'Enter as feet and inches (e.g., 10\' 4") or decimal feet (10.33)',
        parse: (input) => parseFeetInches(input),
        format: (inches) => formatFeetInches(inches)
    };
}

/**
 * Create an input helper for decimal meters
 * 
 * @returns {object} Input helper with parse method
 */
export function createDecimalInputHelper() {
    return {
        placeholder: '2.5',
        hint: 'Enter decimal meters (e.g., 2.5)',
        parse: (input) => parseFloat(input) || 0,
        format: (value) => value.toFixed(2)
    };
}

/**
 * Get appropriate input helper for region
 * 
 * @param {string} region - 'UK' or 'US'
 * @returns {object} Input helper
 */
export function getInputHelperForRegion(region) {
    if (region.toUpperCase() === 'US') {
        return createFeetInchesInputHelper();
    } else {
        return createDecimalInputHelper();
    }
}

export default {
    parseFeetInches,
    formatFeetInches,
    mmToInches,
    inchesToMm,
    metersToFeet,
    feetToMeters,
    cubicMetersToCubicFeet,
    cubicFeetToCubicMeters,
    squareMetersTSquareFeet,
    squareFeetToSquareMeters,
    tonnesToPounds,
    poundsToTonnes,
    parseUserInput,
    convertBetweenRegions,
    getInputHelperForRegion
};
