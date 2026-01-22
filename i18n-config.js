/**
 * INTERNATIONALIZATION CONFIGURATION
 * Complete regional support with vocabulary, units, and conversion factors
 */

export const I18N_CONFIG = {
    UK: {
        // Basic Information
        code: 'UK',
        name: 'United Kingdom (Metric)',
        flag: '🇬🇧',
        
        // Vocabulary Dictionary
        vocabulary: {
            // Building Materials
            plasterboard: 'Plasterboard',
            drywall: 'Plasterboard',
            sheetrock: 'Plasterboard',
            timber: 'Timber',
            lumber: 'Timber',
            skirting: 'Skirting',
            baseboard: 'Skirting',
            architrave: 'Architrave',
            trim: 'Architrave',
            skip: 'Skip',
            dumpster: 'Skip',
            breezeblock: 'Breeze Block',
            cinderblock: 'Breeze Block',
            cmu: 'Breeze Block',
            
            // General Terms
            metre: 'Metre',
            meter: 'Metre',
            foot: 'Metre',
            feet: 'Metres',
            millimetre: 'Millimetre',
            millimeter: 'Millimetre',
            inch: 'Millimetre',
            inches: 'Millimetres'
        },
        
        // Unit Labels
        units: {
            length: 'm',
            lengthSmall: 'mm',
            lengthLong: 'metres',
            area: 'm²',
            volume: 'm³',
            weight: 'kg',
            weightHeavy: 'tonnes',
            
            // Display formats
            lengthLabel: '(m)',
            lengthSmallLabel: '(mm)',
            areaLabel: '(m²)',
            volumeLabel: '(m³)',
            weightLabel: '(kg)',
            weightHeavyLabel: '(tonnes)'
        },
        
        // Conversion Factors (base units)
        conversions: {
            lengthToMeters: 1,          // meters to meters
            areaToSquareMeters: 1,      // m² to m²
            volumeToCubicMeters: 1,     // m³ to m³
            weightToKg: 1,              // kg to kg
            
            // Important: UK Ton = 1016 kg (Long Ton)
            tonToKg: 1016,
            kgToTon: 1/1016,
            
            // Bag sizes (standard UK)
            cementBagKg: 25,            // 25kg cement bag
            sandBagKg: 25,              // 25kg sand bag
            concreteBagKg: 25,          // 25kg concrete bag
            plasterBagKg: 25,           // 25kg plaster bag
            
            // Bags per ton
            cementBagsPerTon: 1016 / 25,    // ~40.64 bags
            concreteBagsPerTon: 1016 / 25   // ~40.64 bags
        },
        
        // Standard Sizes
        standards: {
            plasterboardSheet: [1200, 2400],    // mm
            timberSpacing: [400, 600],          // mm on center
            brickSize: [215, 102.5, 65],        // mm (L x W x H)
            blockSize: [440, 215, 215],         // mm
            bricksPerM2: 60,
            blocksPerM2: 10
        }
    },
    
    US: {
        // Basic Information
        code: 'US',
        name: 'United States (Imperial)',
        flag: '🇺🇸',
        
        // Vocabulary Dictionary
        vocabulary: {
            // Building Materials
            plasterboard: 'Drywall',
            drywall: 'Drywall',
            sheetrock: 'Sheetrock',
            timber: 'Lumber',
            lumber: 'Lumber',
            skirting: 'Baseboard',
            baseboard: 'Baseboard',
            architrave: 'Trim',
            trim: 'Trim',
            skip: 'Dumpster',
            dumpster: 'Dumpster',
            breezeblock: 'Cinder Block',
            cinderblock: 'Cinder Block',
            cmu: 'CMU',
            
            // General Terms
            metre: 'Foot',
            meter: 'Foot',
            foot: 'Foot',
            feet: 'Feet',
            millimetre: 'Inch',
            millimeter: 'Inch',
            inch: 'Inch',
            inches: 'Inches'
        },
        
        // Unit Labels
        units: {
            length: 'ft',
            lengthSmall: 'in',
            lengthLong: 'feet',
            area: 'sq ft',
            volume: 'cu yd',
            weight: 'lbs',
            weightHeavy: 'tons',
            
            // Display formats
            lengthLabel: '(ft)',
            lengthSmallLabel: '(in)',
            areaLabel: '(sq ft)',
            volumeLabel: '(cu yd)',
            weightLabel: '(lbs)',
            weightHeavyLabel: '(tons)'
        },
        
        // Conversion Factors (to metric base units)
        conversions: {
            lengthToMeters: 0.3048,         // feet to meters
            areaToSquareMeters: 0.092903,   // sq ft to m²
            volumeToCubicMeters: 0.764555,  // cu yd to m³
            weightToKg: 0.453592,           // lbs to kg
            
            // Important: US Ton = 907.185 kg (Short Ton)
            tonToKg: 907.185,
            kgToTon: 1/907.185,
            
            // Bag sizes (standard US)
            cementBagKg: 42.6,              // 94 lb cement bag (~42.6 kg)
            sandBagKg: 22.7,                // 50 lb sand bag (~22.7 kg)
            concreteBagKg: 36.3,            // 80 lb concrete bag (~36.3 kg)
            plasterBagKg: 11.3,             // 25 lb joint compound (~11.3 kg)
            
            // Bags per ton (US Short Ton)
            cementBagsPerTon: 907.185 / 42.6,   // ~21.3 bags (94lb bags)
            concreteBagsPerTon: 907.185 / 36.3  // ~25 bags (80lb bags)
        },
        
        // Standard Sizes (converted to inches then to mm for internal calculation)
        standards: {
            plasterboardSheet: [1219, 2438],    // 4ft x 8ft in mm
            timberSpacing: [406.4, 609.6],      // 16" or 24" on center in mm
            brickSize: [203, 92, 57],           // inches converted (8"×3.6"×2.25")
            blockSize: [406, 203, 203],         // 16"×8"×8"
            bricksPerM2: 6.5,                   // per sq ft converted
            blocksPerM2: 1.125                  // per sq ft converted
        }
    }
};

/**
 * Get configuration for a region
 */
export function getI18nConfig(region = 'UK') {
    return I18N_CONFIG[region.toUpperCase()] || I18N_CONFIG.UK;
}

/**
 * Get localized text for a key
 */
export function getLocalizedText(region, key) {
    const config = getI18nConfig(region);
    return config.vocabulary[key.toLowerCase()] || key;
}

/**
 * Convert value from regional units to metric (for calculation)
 */
export function toMetric(value, type, region) {
    const config = getI18nConfig(region);
    
    switch(type) {
        case 'length':
            return value * config.conversions.lengthToMeters;
        case 'area':
            return value * config.conversions.areaToSquareMeters;
        case 'volume':
            return value * config.conversions.volumeToCubicMeters;
        case 'weight':
            return value * config.conversions.weightToKg;
        default:
            return value;
    }
}

/**
 * Convert value from metric to regional units (for display)
 */
export function fromMetric(value, type, region) {
    const config = getI18nConfig(region);
    
    switch(type) {
        case 'length':
            return value / config.conversions.lengthToMeters;
        case 'area':
            return value / config.conversions.areaToSquareMeters;
        case 'volume':
            return value / config.conversions.volumeToCubicMeters;
        case 'weight':
            return value / config.conversions.weightToKg;
        default:
            return value;
    }
}

/**
 * Convert tons to kg based on region
 * CRITICAL: UK Ton (1016kg) vs US Ton (907.185kg)
 */
export function tonsToKg(tons, region) {
    const config = getI18nConfig(region);
    return tons * config.conversions.tonToKg;
}

/**
 * Convert kg to tons based on region
 */
export function kgToTons(kg, region) {
    const config = getI18nConfig(region);
    return kg * config.conversions.kgToTon;
}

/**
 * Get bags per ton for material type and region
 */
export function getBagsPerTon(material, region) {
    const config = getI18nConfig(region);
    
    switch(material.toLowerCase()) {
        case 'cement':
            return config.conversions.cementBagsPerTon;
        case 'concrete':
            return config.conversions.concreteBagsPerTon;
        default:
            return config.conversions.concreteBagsPerTon;
    }
}

/**
 * Get bag size in kg for material type and region
 */
export function getBagSizeKg(material, region) {
    const config = getI18nConfig(region);
    
    switch(material.toLowerCase()) {
        case 'cement':
            return config.conversions.cementBagKg;
        case 'sand':
            return config.conversions.sandBagKg;
        case 'concrete':
            return config.conversions.concreteBagKg;
        case 'plaster':
            return config.conversions.plasterBagKg;
        default:
            return config.conversions.concreteBagKg;
    }
}

export default I18N_CONFIG;
