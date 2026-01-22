# Regional Implementation Guide - UK/US Calculator Support

## Overview
This guide explains how to implement regional support (UK Metric and US Imperial) in the Calidwell Homes construction calculators. The system provides automatic unit conversion, vocabulary localization, and regional material standards.

---

## Table of Contents
1. [Architecture](#architecture)
2. [Quick Start](#quick-start)
3. [Regional Configuration](#regional-configuration)
4. [Input Handling](#input-handling)
5. [Vocabulary Swapping](#vocabulary-swapping)
6. [Material Standards](#material-standards)
7. [Implementation Examples](#implementation-examples)

---

## Architecture

### Core Files

| File | Purpose |
|------|---------|
| `regional-config.js` | Regional configuration constants and helper functions |
| `region-toggle.js` | UI component for region switching and state management |
| `unit-converter.js` | Unit conversion utilities and input parsers |
| `feet-inches-input.js` | Enhanced input components for Imperial measurements |

### Configuration Object Structure

```javascript
REGIONAL_CONFIGS = {
    UK: {
        unit: 'mm',
        largeUnit: 'm',
        areaUnit: 'm²',
        volumeUnit: 'm³',
        weightUnit: 'tonnes',
        format: 'decimal',
        vocabulary: { /* UK terms */ },
        sheetSizes: { /* UK standard sizes */ },
        timberSizes: { /* UK timber dimensions */ },
        materialSizes: { /* UK brick/block sizes */ },
        densities: { /* Material densities in kg/m³ */ },
        // ...
    },
    US: {
        unit: 'inch',
        largeUnit: 'ft',
        areaUnit: 'sq ft',
        volumeUnit: 'cu ft',
        weightUnit: 'lbs',
        format: 'feetInches',
        vocabulary: { /* US terms */ },
        sheetSizes: { /* US standard sizes */ },
        timberSizes: { /* US lumber ACTUAL dimensions */ },
        // ...
    }
}
```

---

## Quick Start

### 1. Add Module Imports

```html
<script type="module">
    import { RegionManager, createRegionToggle } from './region-toggle.js';
    import { getRegionalConfig, updateAllRegionalText } from './regional-config.js';
    import { parseFeetInches, formatFeetInches, feetToMeters, metersToFeet } from './unit-converter.js';
</script>
```

### 2. Initialize Region Manager

```javascript
// Create region manager with default region
const regionManager = new RegionManager('UK');

// Create toggle UI
const toggleContainer = document.getElementById('regionToggleContainer');
const toggle = createRegionToggle(regionManager, {
    showLabels: true,
    showDescription: true,
    compact: false
});
toggleContainer.appendChild(toggle);

// Listen for changes
regionManager.onChange((region, config) => {
    updateUIForRegion(region, config);
    recalculate();
});
```

### 3. Add Region Toggle Container to HTML

```html
<body>
    <div class="calculator-container">
        <h1>Calculator Name</h1>
        
        <!-- Add this container for the region toggle -->
        <div id="regionToggleContainer"></div>
        
        <!-- Rest of your calculator -->
    </div>
</body>
```

---

## Regional Configuration

### Accessing Configuration

```javascript
// Get current region
const region = regionManager.getRegion(); // 'UK' or 'US'

// Get current config
const config = regionManager.getConfig();

// Access specific properties
const lengthUnit = config.largeUnit; // 'm' or 'ft'
const areaUnit = config.areaUnit;    // 'm²' or 'sq ft'
const vocabulary = config.vocabulary; // Regional terms
```

### Material Standards

#### UK Timber Sizes (Metric)
```javascript
config.timberSizes = {
    '2x2': [50, 50],      // 50mm x 50mm
    '2x4': [50, 100],     // 50mm x 100mm
    '2x6': [50, 150],     // 50mm x 150mm
    '4x4': [100, 100],    // 100mm x 100mm
}
```

#### US Lumber Sizes (ACTUAL dimensions)
```javascript
config.timberSizes = {
    '2x4': [1.5, 3.5],    // Actual: 1.5" x 3.5" (NOT 2" x 4")
    '2x6': [1.5, 5.5],    // Actual: 1.5" x 5.5" (NOT 2" x 6")
    '4x4': [3.5, 3.5],    // Actual: 3.5" x 3.5" (NOT 4" x 4")
}
```

**CRITICAL:** US lumber calculations MUST use actual dimensions, not nominal names!

```javascript
// CORRECT ✓
const actualSize = getActualLumberSize('2x4'); // [1.5, 3.5]
const volume = length * actualSize[0] * actualSize[1];

// WRONG ✗
const volume = length * 2 * 4; // Don't use nominal!
```

---

## Input Handling

### UK (Decimal Input)

UK users enter values as simple decimals:
```
Input: "2.5" → 2.5 meters
Input: "10.75" → 10.75 meters
```

### US (Feet + Inches Input)

US users can enter values in multiple formats:
```
Input: "10' 4\""  → 10 feet 4 inches
Input: "10 4"     → 10 feet 4 inches  
Input: "10.33"    → 10.33 feet
```

### Parsing Functions

```javascript
import { parseFeetInches, feetToMeters, metersToFeet } from './unit-converter.js';

// Parse user input based on region
function parseInput(value, region) {
    if (region === 'US') {
        // Parse as feet-inches
        const inches = parseFeetInches(value);
        return inches / 12; // Convert to feet
    } else {
        // Parse as decimal meters
        return parseFloat(value) || 0;
    }
}

// Example usage
const lengthInput = document.getElementById('length').value;
let length = parseInput(lengthInput, region);

// Convert to meters for calculations
if (region === 'US') {
    length = feetToMeters(length);
}

// Now length is in meters for both regions
```

### Enhanced Input Components

Use the feet-inches input component for better UX:

```javascript
import { createFeetInchesInput } from './feet-inches-input.js';

// Create enhanced input
const lengthInput = createFeetInchesInput({
    id: 'length',
    placeholder: "e.g., 10' 4\"",
    value: 0,
    onChange: (inches, displayValue) => {
        console.log('Value in inches:', inches);
        calculate();
    },
    showHelper: true
});

// Add to container
document.getElementById('lengthContainer').appendChild(lengthInput);
```

---

## Vocabulary Swapping

### Automatic Text Updates

Mark elements for automatic vocabulary replacement:

```html
<h2 data-regional-text>Timber Calculator</h2>
<label data-regional-text>Plasterboard Size</label>
<span data-regional-text>Skip</span>
```

Then update on region change:

```javascript
import { updateAllRegionalText } from './regional-config.js';

regionManager.onChange((region, config) => {
    updateAllRegionalText(region);
});
```

### Vocabulary Mapping

| UK Term | US Term |
|---------|---------|
| Plasterboard | Drywall |
| Timber | Lumber |
| Skirting | Baseboard |
| Skip | Dumpster |

### Manual Replacement

```javascript
import { getLocalizedText } from './regional-config.js';

const materialName = getLocalizedText(region, 'timber');
// UK: "Timber"
// US: "Lumber"
```

---

## Material Standards

### Using Regional Standards

```javascript
// Get material sizes for region
const materialSizes = getMaterialSizes(region, 'timber');

// Get density for calculations
const density = getDensity(region, 'timber');
// UK: 600 kg/m³
// US: 37.5 lbs/cu ft
```

### Brick/Block Standards

#### UK
```javascript
brick: {
    standard: [215, 102.5, 65],  // mm
    perM2: 60
}
block: {
    standard: [440, 215, 215],   // mm
    perM2: 10
}
```

#### US
```javascript
brick: {
    standard: [8.5, 4, 2.25],    // inches
    perSqFt: 6.5
}
block: {
    standard: [16, 8, 8],        // inches
    perSqFt: 1.125
}
```

### Stud Spacing

**UK:** 400mm or 600mm on center
**US:** 16" (406.4mm) or 24" (609.6mm) on center

```javascript
// Update spacing dropdown
if (region === 'UK') {
    select.innerHTML = `
        <option value="400">400 mm</option>
        <option value="600">600 mm</option>
    `;
} else {
    select.innerHTML = `
        <option value="406.4">16" OC</option>
        <option value="609.6">24" OC</option>
    `;
}
```

---

## Implementation Examples

### Example 1: Simple Length Input

```javascript
// HTML
<input type="text" id="length" placeholder="Enter length">
<span id="lengthUnit">m</span>

// JavaScript
const region = regionManager.getRegion();
const lengthInput = document.getElementById('length').value;

// Parse based on region
let length = parseInput(lengthInput, region);

// Convert to meters
if (region === 'US') {
    length = feetToMeters(length);
}

// Use in calculation (always in meters)
const area = length * width;
```

### Example 2: Displaying Results

```javascript
function displayResults(area, volume, weight) {
    const region = regionManager.getRegion();
    const config = regionManager.getConfig();
    
    if (region === 'US') {
        // Convert from metric to imperial
        document.getElementById('area').textContent = 
            (area * 10.764).toFixed(2) + ' sq ft';
        document.getElementById('volume').textContent = 
            (volume * 35.315).toFixed(2) + ' cu ft';
        document.getElementById('weight').textContent = 
            (weight * 2204.62).toFixed(1) + ' lbs';
    } else {
        // Display in metric
        document.getElementById('area').textContent = 
            area.toFixed(2) + ' m²';
        document.getElementById('volume').textContent = 
            volume.toFixed(3) + ' m³';
        document.getElementById('weight').textContent = 
            weight.toFixed(1) + ' tonnes';
    }
}
```

### Example 3: Material Volume Calculation

```javascript
function calculateLumberVolume(length, size) {
    const region = regionManager.getRegion();
    const config = regionManager.getConfig();
    
    // Ensure length is in meters
    if (region === 'US') {
        length = feetToMeters(length);
    }
    
    // Get material dimensions
    let width, height;
    if (region === 'UK') {
        const dims = config.timberSizes[size];
        width = dims[0] / 1000;  // mm to m
        height = dims[1] / 1000;
    } else {
        // US - use ACTUAL dimensions
        const actualDims = getActualLumberSize(size);
        width = actualDims[0] * 0.0254;  // inches to m
        height = actualDims[1] * 0.0254;
    }
    
    // Calculate volume in cubic meters
    const volume = length * width * height;
    
    return volume;
}
```

### Example 4: Complete Calculator Structure

```javascript
// Initialize
const regionManager = new RegionManager('UK');
const toggle = createRegionToggle(regionManager);
document.getElementById('regionToggleContainer').appendChild(toggle);

// Listen for changes
regionManager.onChange((region, config) => {
    updateUI(region, config);
    updatePlaceholders(region, config);
    updateVocabulary(region);
    calculate();
});

// Update UI function
function updateUI(region, config) {
    // Update unit labels
    document.querySelectorAll('.length-unit').forEach(el => {
        el.textContent = config.largeUnit;
    });
    
    document.querySelectorAll('.area-unit').forEach(el => {
        el.textContent = config.areaUnit;
    });
    
    // Update material options
    updateMaterialOptions(region, config);
    
    // Update all regional text
    updateAllRegionalText(region);
}

// Calculate function
function calculate() {
    const region = regionManager.getRegion();
    const config = regionManager.getConfig();
    
    // Get inputs
    let length = parseInput(
        document.getElementById('length').value, 
        region
    );
    
    let width = parseInput(
        document.getElementById('width').value, 
        region
    );
    
    // Convert to meters
    if (region === 'US') {
        length = feetToMeters(length);
        width = feetToMeters(width);
    }
    
    // Perform calculations (always in metric)
    const area = length * width;
    
    // Display results (convert if needed)
    displayResults(area);
}
```

---

## Best Practices

### ✅ DO:
- Always convert user input to meters internally
- Use actual lumber dimensions for US calculations
- Update all vocabulary on region change
- Provide clear input format hints
- Display results in regional units
- Use regional standard sizes

### ❌ DON'T:
- Mix units within calculations
- Use nominal lumber sizes for US volumes
- Hardcode unit labels in HTML
- Assume decimal input format
- Display metric to US users
- Store values in regional units

---

## Testing Checklist

- [ ] Region toggle switches correctly
- [ ] UK decimal input parses correctly
- [ ] US feet-inches input parses correctly
- [ ] Vocabulary updates on region change
- [ ] Material sizes use regional standards
- [ ] US lumber uses actual dimensions (not nominal)
- [ ] Results display in correct units
- [ ] Calculations remain accurate across regions
- [ ] Input placeholders update
- [ ] Unit labels update

---

## Support

For questions or issues:
- Review `regional-demo.html` for working example
- Check `regional-config.js` for available functions
- See `unit-converter.js` for conversion utilities
- Examine `feet-inches-input.js` for input components

---

## Summary

The regional system provides:
1. **Automatic unit handling** - Converts between metric and imperial
2. **Intelligent input parsing** - Supports feet-inches format for US
3. **Vocabulary localization** - Swaps terms automatically
4. **Regional standards** - Uses correct material sizes
5. **Accurate calculations** - Always uses proper dimensions

Remember: **Convert to metric internally, display regionally**
