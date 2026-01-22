# 🚀 Quick Reference - Regional Calculator System

## Import Statement
```javascript
import { RegionManager, createRegionToggle } from './region-toggle.js';
import { getRegionalConfig, updateAllRegionalText } from './regional-config.js';
import { parseFeetInches, feetToMeters, metersToFeet } from './unit-converter.js';
```

## Initialize (3 lines)
```javascript
const regionManager = new RegionManager('UK');
const toggle = createRegionToggle(regionManager);
document.getElementById('regionToggleContainer').appendChild(toggle);
```

## Listen for Changes
```javascript
regionManager.onChange((region, config) => {
    updateAllRegionalText(region);  // Auto-update vocabulary
    calculate();                     // Recalculate
});
```

## Parse Input
```javascript
function parseInput(value, region) {
    if (region === 'US') {
        const inches = parseFeetInches(value);  // "10' 4\"" → 124"
        return feetToMeters(inches / 12);       // → meters
    }
    return parseFloat(value) || 0;  // UK: "2.5" → 2.5m
}
```

## Display Results
```javascript
const region = regionManager.getRegion();
const config = regionManager.getConfig();

if (region === 'US') {
    // Convert metric to imperial for display
    displayValue = metricValue * 10.764;  // m² → sq ft
    unit = 'sq ft';
} else {
    displayValue = metricValue;
    unit = 'm²';
}
```

## Get Regional Data
```javascript
const config = regionManager.getConfig();
const timber = config.vocabulary.timber;      // "Timber" or "Lumber"
const lengthUnit = config.largeUnit;          // "m" or "ft"
const areaUnit = config.areaUnit;             // "m²" or "sq ft"
```

## HTML Template
```html
<!-- Region Toggle Container -->
<div id="regionToggleContainer"></div>

<!-- Mark text for auto-translation -->
<h2 data-regional-text>Timber Calculator</h2>
<label data-regional-text>Plasterboard Type</label>
```

## US Lumber (CRITICAL)
```javascript
// ✓ CORRECT - Use actual dimensions
import { getActualLumberSize } from './regional-config.js';
const actual = getActualLumberSize('2x4');  // [1.5, 3.5]
volume = length * actual[0] * actual[1];

// ✗ WRONG - Don't use nominal
volume = length * 2 * 4;  // NO!
```

## Conversion Cheat Sheet
```javascript
// Length
feetToMeters(ft)      // feet → meters
metersToFeet(m)       // meters → feet
inchesToMm(in)        // inches → mm
mmToInches(mm)        // mm → inches

// Area
squareFeetToSquareMeters(sqft)  // sq ft → m²
squareMetersTSquareFeet(m2)     // m² → sq ft

// Volume
cubicFeetToCubicMeters(cuft)    // cu ft → m³
cubicMetersToCubicFeet(m3)      // m³ → cu ft

// Weight
poundsToTonnes(lbs)    // lbs → tonnes
tonnesToPounds(t)      // tonnes → lbs
```

## Testing Checklist
- [ ] UK: Enter "2.5" → Works
- [ ] US: Enter "8' 2\"" → Works  
- [ ] Toggle region → Updates vocabulary
- [ ] Toggle region → Updates units
- [ ] US lumber uses actual dims
- [ ] Results show correct units

## Common Patterns

### Pattern 1: Basic Calculator
```javascript
const regionManager = new RegionManager('UK');
document.getElementById('regionToggleContainer')
    .appendChild(createRegionToggle(regionManager));

regionManager.onChange(() => calculate());

function calculate() {
    const region = regionManager.getRegion();
    let length = parseInput(document.getElementById('length').value, region);
    if (region === 'US') length = feetToMeters(length);
    
    // Calculate in meters...
    const area = length * width;
    
    // Display in regional units
    displayResults(area, region);
}
```

### Pattern 2: Material Volume
```javascript
function calculateVolume(length, materialSize) {
    const region = regionManager.getRegion();
    const config = regionManager.getConfig();
    
    // Get dimensions
    const dims = config.timberSizes[materialSize];
    let w, h;
    
    if (region === 'UK') {
        w = dims[0] / 1000;  // mm → m
        h = dims[1] / 1000;
    } else {
        w = dims[0] * 0.0254;  // in → m
        h = dims[1] * 0.0254;
    }
    
    return length * w * h;  // m³
}
```

### Pattern 3: Update Dropdown
```javascript
function updateMaterialSizes(region) {
    const select = document.getElementById('materialSize');
    
    if (region === 'UK') {
        select.innerHTML = `
            <option value="2x4">2x4 (50mm x 100mm)</option>
            <option value="2x6">2x6 (50mm x 150mm)</option>
        `;
    } else {
        select.innerHTML = `
            <option value="2x4">2x4 (1.5" x 3.5")</option>
            <option value="2x6">2x6 (1.5" x 5.5")</option>
        `;
    }
}
```

## Files You Need
- ✅ `regional-config.js` - Config & helpers
- ✅ `region-toggle.js` - UI & state
- ✅ `unit-converter.js` - Conversions
- ✅ `feet-inches-input.js` - Enhanced inputs (optional)

## Demo & Docs
- 📄 `regional-demo.html` - Working example
- 📖 `REGIONAL_IMPLEMENTATION_GUIDE_COMPLETE.md` - Full guide
- 📋 `REFACTORING_COMPLETE.md` - Summary

## Remember
1. **Always convert to metric internally**
2. **Display in regional units**
3. **US lumber = actual dimensions**
4. **Mark text with data-regional-text**
5. **Parse input based on region**

---
**Need help?** See `regional-demo.html` for complete working example!
