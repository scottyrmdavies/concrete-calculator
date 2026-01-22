# Regional Support Implementation Guide

Complete guide for integrating UK/US regional support into construction calculators.

## Overview

The regional refactoring system consists of three core modules:

1. **`regional-config.js`** - Configuration objects for UK and US standards
2. **`unit-converter.js`** - Unit conversion and input parsing utilities
3. **`region-toggle.js`** - UI components and state management

---

## Quick Start (5 minutes)

### Step 1: Add HTML Toggle

```html
<div id="region-toggle-container"></div>
```

### Step 2: Initialize in Script

```javascript
import { initializeRegionToggle } from './region-toggle.js';

const regionSetup = initializeRegionToggle('region-toggle-container');
const { regionManager } = regionSetup;

// Listen for region changes
regionManager.onChange((region, config) => {
    console.log(`Switched to ${region}`);
    recalculateAll();
});
```

### Step 3: Use in Calculations

```javascript
import { getLocalizedText } from './regional-config.js';
import { parseUserInput, formatForRegion } from './unit-converter.js';

// Get regional text
const plasterboardLabel = getLocalizedText(regionManager.getRegion(), 'plasterboard');
// UK: "Plasterboard", US: "Drywall"

// Parse user input (handles both decimal and feet+inches)
const lengthInches = parseUserInput(userInput, regionManager.getRegion());
// UK: decimal meters → converted to mm
// US: feet+inches string → converted to inches

// Format output
const displayText = formatForRegion(result, regionManager.getRegion(), 'length');
// UK: "2.50", US: "8' 4\""
```

---

## Architecture: Regional Configuration

### Structure

```javascript
{
    UK: {
        unit: 'mm',                           // Base unit for inputs
        unitLabel: 'mm',                      // Display label
        largeUnit: 'm',                       // Large unit
        format: 'decimal',                    // Input format type
        vocabulary: { ... },                  // Localized text
        sheetSizes: { ... },                  // Standard sheet dimensions
        timberSizes: { ... },                 // Timber dimension options
        studSpacing: [400, 600],              // Standard spacing options
        densities: { ... },                   // Material densities
        bulkingFactors: { ... },              // Excavation bulking
        coverage: { ... }                     // Material coverage rates
    },
    US: { ... similar structure ... }
}
```

### Usage Examples

```javascript
import { getRegionalConfig, getLocalizedText, getMaterialSizes } from './regional-config.js';

const region = 'US';
const config = getRegionalConfig(region);

// Get localized text
const drywall = getLocalizedText(region, 'plasterboard');  // Returns "Drywall"
const lumber = getLocalizedText(region, 'timber');         // Returns "Lumber"

// Get material sizes
const timberSizes = getMaterialSizes(region, 'timber');
// UK: { '2x2': [50, 50], '2x4': [50, 100], ... }
// US: { '2x2': [1.5, 1.5], '2x4': [1.5, 3.5], ... } ← ACTUAL sizes!

// Get density
const density = getDensity(region, 'concrete');
// UK: 2400 kg/m³
// US: 150 lbs/cu ft
```

---

## Input Handling: Critical Implementation

### UK (Metric) - Decimal Input

```html
<input type="number" step="0.1" placeholder="2.5" id="length-uk">
```

```javascript
const lengthMeters = parseFloat(document.getElementById('length-uk').value);
const lengthMm = lengthMeters * 1000;  // Convert to mm for calculations
```

### US (Imperial) - Feet + Inches Input

```html
<input type="text" placeholder="10' 4\"" id="length-us">
```

```javascript
import { parseFeetInches, formatFeetInches } from './unit-converter.js';

const userInput = document.getElementById('length-us').value;  // "10' 4\""
const totalInches = parseFeetInches(userInput);                // 124
const totalFeet = totalInches / 12;                            // 10.333...

// For calculations, use inches as base unit
const volumeCubicFeet = length * width * depth / (12 * 12 * 12);

// Format output
const displayValue = formatFeetInches(124);  // "10' 4\""
```

### Intelligent Input Helper

```javascript
import { getInputHelperForRegion } from './unit-converter.js';

const region = regionManager.getRegion();
const helper = getInputHelperForRegion(region);

// UK helper
// { placeholder: '2.5', hint: 'Enter decimal meters', parse: ..., format: ... }

// US helper  
// { placeholder: '10\' 4"', hint: 'Enter as feet and inches', parse: ..., format: ... }
```

---

## Vocabulary Swapping Implementation

### Dynamic UI Updates

```javascript
import { getLocalizedText } from './regional-config.js';

function updateUIText(region) {
    const texts = {
        plasterboard: getLocalizedText(region, 'plasterboard'),
        timber: getLocalizedText(region, 'timber'),
        skirting: getLocalizedText(region, 'skirting'),
        skip: getLocalizedText(region, 'skip')
    };

    document.getElementById('label-plasterboard').textContent = texts.plasterboard;
    document.getElementById('label-timber').textContent = texts.timber;
    document.getElementById('label-skirting').textContent = texts.skirting;
    document.getElementById('label-skip').textContent = texts.skip;
}

// Listen for region changes
regionManager.onChange((region) => {
    updateUIText(region);
});
```

### Vocabulary Table

| Concept | UK | US |
|---------|----|----|
| Sheet | Plasterboard | Drywall |
| Frame Material | Timber | Lumber |
| Floor Trim | Skirting | Baseboard |
| Waste Container | Skip | Dumpster |
| Measurement | Metres | Feet |
| Weight | Tonnes | Pounds |
| Unit | Millimeters | Inches |

---

## Standards & Actual Dimensions

### Critical: Lumber Sizes

Lumber is sold by **nominal** size but has **actual** dimensions:

**US Lumber (Actual Dimensions):**
```
Nominal    Actual (inches)
2x2        1.5" x 1.5"
2x4        1.5" x 3.5"          ← NOT 2x4!
2x6        1.5" x 5.5"          ← NOT 2x6!
2x8        1.5" x 7.25"
4x4        3.5" x 3.5"          ← NOT 4x4!
6x6        5.5" x 5.5"          ← NOT 6x6!
```

**Use actual dimensions in calculations:**

```javascript
const config = getRegionalConfig('US');
const size = config.timberSizes['2x4'];  // [1.5, 3.5] inches
const volume = length * size[0] * size[1];  // Correct!
// NOT: const volume = length * 2 * 4;    // Wrong!
```

### UK Timber (Consistent Naming)

```javascript
const config = getRegionalConfig('UK');
const size = config.timberSizes['2x4'];  // [50, 100] mm (actual)
// 50mm x 100mm (consistent, no nominal vs actual)
```

### Brick/Block Sizes

**US Brick:**
```javascript
brick: {
    standard: [8.5, 4, 2.25],      // inches L x W x H
    perSqFt: 6.5                   // bricks per square foot
}
```

**UK Brick:**
```javascript
brick: {
    standard: [215, 102.5, 65],    // mm L x W x H
    perM2: 60                       // bricks per square meter
```

---

## Example: Concrete Calculator Refactoring

### Before (Hardcoded UK)

```javascript
function calculateConcrete(length, width, depth) {
    // Hardcoded for UK
    const lengthMm = length * 1000;      // Assumes meters
    const widthMm = width * 1000;
    const depthMm = depth * 1000;
    
    const volumeM3 = (lengthMm * widthMm * depthMm) / 1e9;
    const weight = volumeM3 * 2400;      // Hardcoded UK density
    
    return {
        volume: volumeM3,
        unit: 'm³',
        weight: weight,
        weightUnit: 'tonnes'
    };
}
```

### After (Regional Support)

```javascript
import { parseUserInput, formatForRegion } from './unit-converter.js';
import { getRegionalConfig, getDensity } from './regional-config.js';

function calculateConcrete(lengthInput, widthInput, depthInput, region) {
    const config = getRegionalConfig(region);
    const density = getDensity(region, 'concrete');
    
    // Parse user input (handles both formats)
    const lengthInches = parseUserInput(lengthInput, region);  // Returns inches (US) or mm (UK)
    const widthInches = parseUserInput(widthInput, region);
    const depthInches = parseUserInput(depthInput, region);
    
    let volume, volumeUnit, weight, weightUnit;
    
    if (region === 'US') {
        // US: inches → cubic feet
        volume = (lengthInches * widthInches * depthInches) / (12 * 12 * 12);
        volumeUnit = 'cu ft';
        weight = volume * density;  // 150 lbs/cu ft
        weightUnit = 'lbs';
    } else {
        // UK: mm → cubic meters
        volume = (lengthInches * widthInches * depthInches) / 1e9;  // lengthInches is mm
        volumeUnit = 'm³';
        weight = volume * density;  // 2400 kg/m³
        weightUnit = 'tonnes';
    }
    
    return {
        volume: formatForRegion(volume, region, 'volume'),
        volumeUnit,
        weight: formatForRegion(weight, region, 'weight'),
        weightUnit
    };
}

// Usage
regionManager.onChange((region) => {
    const result = calculateConcrete(
        document.getElementById('length').value,
        document.getElementById('width').value,
        document.getElementById('depth').value,
        region
    );
    
    document.getElementById('result').textContent = 
        `${result.volume} ${result.volumeUnit} (${result.weight} ${result.weightUnit})`;
});
```

---

## Region Toggle Component

### Full-Featured Toggle

```javascript
import { initializeRegionToggle } from './region-toggle.js';

const regionSetup = initializeRegionToggle('region-container', {
    defaultRegion: 'UK',
    showLabels: true,
    showDescription: true
});

// Listen for changes
regionSetup.setOnChange((region, config) => {
    console.log(`Changed to ${region}`);
    recalculateAll();
});
```

### Compact Button Toggle

```javascript
import { RegionManager, createCompactRegionButton } from './region-toggle.js';

const regionManager = new RegionManager('UK');
const compactButton = createCompactRegionButton(regionManager, (region) => {
    recalculateAll();
});

document.getElementById('header').appendChild(compactButton);
```

### Settings Panel

```javascript
import { createRegionSettingsPanel } from './region-toggle.js';

const settingsPanel = createRegionSettingsPanel(regionManager);
document.getElementById('settings-container').appendChild(settingsPanel);
```

---

## Complete Integration Example

### HTML Structure

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="shared-styles.css">
    <link rel="stylesheet" href="print-styles.css">
</head>
<body>
    <div class="container">
        <!-- Region Toggle -->
        <div id="region-container"></div>
        
        <!-- Calculator Inputs -->
        <div class="section">
            <h2>Concrete Calculation</h2>
            
            <div class="form-group">
                <label id="label-length">Length</label>
                <input type="text" id="length" class="quantity-input">
                <small id="hint-length"></small>
            </div>
            
            <div class="form-group">
                <label id="label-width">Width</label>
                <input type="text" id="width" class="quantity-input">
            </div>
            
            <div class="form-group">
                <label id="label-depth">Depth</label>
                <input type="text" id="depth" class="quantity-input">
            </div>
            
            <button class="btn" id="calculate-btn">Calculate</button>
        </div>
        
        <!-- Results -->
        <div id="results" class="section" style="display: none;">
            <h3>Results</h3>
            <div id="result-text"></div>
        </div>
    </div>

    <script type="module">
        import { initializeRegionToggle } from './region-toggle.js';
        import { parseUserInput, formatForRegion, getInputHelperForRegion } from './unit-converter.js';
        import { getRegionalConfig, getDensity, getLocalizedText } from './regional-config.js';

        // Initialize region toggle
        const regionSetup = initializeRegionToggle('region-container');
        const { regionManager } = regionSetup;

        // Update UI based on region
        function updateUI(region) {
            const config = getRegionalConfig(region);
            const helper = getInputHelperForRegion(region);
            
            // Update placeholders and hints
            document.getElementById('length').placeholder = helper.placeholder;
            document.getElementById('hint-length').textContent = helper.hint;
            
            // Update labels
            document.getElementById('label-length').textContent = 
                `Length (${config.largeUnitLabel})`;
            document.getElementById('label-width').textContent = 
                `Width (${config.largeUnitLabel})`;
            document.getElementById('label-depth').textContent = 
                `Depth (${config.largeUnitLabel})`;
        }

        // Calculate concrete
        function calculateConcrete() {
            const region = regionManager.getRegion();
            const config = getRegionalConfig(region);
            const density = getDensity(region, 'concrete');
            
            const length = parseUserInput(document.getElementById('length').value, region);
            const width = parseUserInput(document.getElementById('width').value, region);
            const depth = parseUserInput(document.getElementById('depth').value, region);
            
            let volume;
            if (region === 'US') {
                volume = (length * width * depth) / (12 * 12 * 12);  // inches to cu ft
            } else {
                volume = (length * width * depth) / 1e9;  // mm to m³
            }
            
            const weight = volume * density;
            
            const resultText = document.getElementById('result-text');
            resultText.innerHTML = `
                <p><strong>Volume:</strong> ${formatForRegion(volume, region, 'volume')} ${config.volumeUnit}</p>
                <p><strong>Weight:</strong> ${formatForRegion(weight, region, 'weight')} ${config.weightUnit}</p>
            `;
            
            document.getElementById('results').style.display = 'block';
        }

        // Event listeners
        regionManager.onChange((region) => {
            updateUI(region);
            calculateConcrete();
        });

        document.getElementById('calculate-btn').addEventListener('click', calculateConcrete);
        document.getElementById('length').addEventListener('input', calculateConcrete);
        document.getElementById('width').addEventListener('input', calculateConcrete);
        document.getElementById('depth').addEventListener('input', calculateConcrete);

        // Initial setup
        updateUI(regionManager.getRegion());
    </script>
</body>
</html>
```

---

## Testing Checklist

- [ ] Region toggle displays correctly
- [ ] UK decimal inputs work (e.g., "2.5")
- [ ] US feet+inches inputs work (e.g., "10' 4\"")
- [ ] Vocabulary updates on region change
- [ ] Calculations update on region change
- [ ] Material sizes use correct regional standards
- [ ] US lumber uses actual dimensions, not nominal
- [ ] Print output shows correct region units
- [ ] Mobile responsive layout maintained
- [ ] localStorage saves selected region

---

## Common Pitfalls

❌ **Wrong**: Converting final results mathematically
```javascript
const volumeM3 = 50;
const volumeCubicFeet = volumeM3 * 35.3147;  // WRONG approach
```

✅ **Correct**: Using regional standards throughout
```javascript
// Use actual regional densities, sizes, and standards
const density = getDensity(region, 'concrete');
const size = getMaterialSizes(region, 'timber');
```

❌ **Wrong**: Using nominal lumber sizes
```javascript
const volumeUS = 10 * 4 * 5;  // Assumes 2x4 is 2"x4"
```

✅ **Correct**: Using actual lumber dimensions
```javascript
const config = getRegionalConfig('US');
const size = config.timberSizes['2x4'];  // [1.5, 3.5]
const volumeUS = 10 * size[0] * size[1];
```

---

## Performance Tips

1. **Cache regional config**
   ```javascript
   const config = regionManager.getConfig();  // Don't call repeatedly
   ```

2. **Debounce calculations**
   ```javascript
   import { debounce } from './shared-constants.js';
   const debouncedCalc = debounce(calculateConcrete, 300);
   input.addEventListener('input', debouncedCalc);
   ```

3. **Batch DOM updates**
   ```javascript
   const updates = { length: '2.5', width: '3.0' };
   Object.entries(updates).forEach(([id, value]) => {
       document.getElementById(id).value = value;
   });
   ```

---

## Next Steps

1. Integrate into `calculator.html`
2. Integrate into `brick-block-calculator/`
3. Integrate into other calculators
4. Add tests for unit conversion
5. Add region to localStorage persistence
6. Create region-specific preset templates

