# Concrete Calculator - Quick Wins Implementation Guide

## What's New

This update adds several productivity features to all calculators with minimal code changes.

### 📁 New Files Added

1. **shared-styles.css** - Unified styling for all calculators
   - Calidwell theme variables
   - Reusable component classes
   - Print-friendly styles
   - Responsive utilities

2. **shared-constants.js** - Shared data and utilities
   - Material properties definitions
   - Common calculations (toNumber, toFixed, etc.)
   - Storage utilities
   - Messaging functions

3. **shared-validation.js** - Form validation system
   - Input validators (number, percentage, range, etc.)
   - Real-time validation helpers
   - Error/success messaging
   - Form data management

4. **shared-storage.js** - Auto-save and undo/redo
   - Auto-save manager (saves periodically to localStorage)
   - Undo/redo stack with state management
   - Restore previous calculations dialog
   - Auto-load on page refresh

5. **print-styles.css** - Professional print output
   - Print-friendly layout
   - Table optimization for paper
   - Removes buttons and controls
   - Proper page breaks

6. **presets.js** - Pre-configured templates
   - Common scenarios for each calculator
   - Quick-start templates
   - Preset selector UI

7. **export-utils.js** - Export and sharing features
   - Copy results to clipboard
   - Export as JSON/CSV
   - Generate shareable links
   - Print integration

---

## Implementation Guide

### Step 1: Update HTML Files

Add these imports to the `<head>` of each calculator HTML:

```html
<!-- Shared styles -->
<link rel="stylesheet" href="../shared-styles.css">
<link rel="stylesheet" href="../print-styles.css">

<!-- Existing Tailwind CDN line stays -->
<script src="https://cdn.tailwindcss.com"></script>
```

### Step 2: Basic Calculator Setup (Concrete as Example)

```javascript
// At the top of your script section, add:
import { 
    toNumber, 
    toFixed, 
    debounce,
    showError,
    showSuccess 
} from '../shared-constants.js';

import { 
    getValidatedInput,
    validators,
    addInputError 
} from '../shared-validation.js';

import { 
    AutoSaveManager,
    UndoRedoManager,
    createRestorePrompt 
} from '../shared-storage.js';

import { 
    getPresets,
    createPresetSelector 
} from '../presets.js';

import {
    createExportMenu,
    createSummaryCard,
    loadDataFromUrl
} from '../export-utils.js';

// Initialize managers
const autoSave = new AutoSaveManager('concrete-calculator');
const undoRedo = new UndoRedoManager();

// Try to restore previous calculation
const savedData = autoSave.load();
if (savedData.hasAutoSave) {
    createRestorePrompt(
        savedData,
        (data) => {
            // Load the restored data
            loadRestoredCalculation(data);
            showSuccess('Calculation restored!');
        },
        () => {
            // Start fresh
            console.log('Starting fresh calculation');
        }
    );
}

// Check for shared URL data
const sharedData = loadDataFromUrl();
if (sharedData) {
    loadRestoredCalculation(sharedData);
    showSuccess('Loaded shared calculation!');
}
```

### Step 3: Add Auto-Save to Calculations

Replace your existing calculate function with:

```javascript
function calculateAll() {
    try {
        // Your existing calculation code here
        totalConcreteVolume += calculatedVolume;
        totalConcreteWeight += materialWeight;
        
        // Save state for undo
        const currentState = {
            rows: itemsContainer.querySelectorAll('tr').length,
            data: captureFormState()
        };
        undoRedo.pushState(currentState);
        
        // Auto-save to localStorage
        const dataToSave = captureFormState();
        autoSave.markDirty();
        autoSave.autoSave(dataToSave);
        
    } catch (error) {
        showError(`Calculation failed: ${error.message}`);
    }
}

// Debounce the calculate function
const debouncedCalculate = debounce(calculateAll, 300);

// Update event listeners
document.getElementById('addItemBtn').addEventListener('click', () => {
    createItemRow();
    debouncedCalculate();
});
```

### Step 4: Add Validation to Inputs

```javascript
// Update input event listeners with validation
const lengthInput = document.querySelector('input[name="length"]');
if (lengthInput) {
    lengthInput.addEventListener('blur', () => {
        const validated = getValidatedInput(
            lengthInput,
            validators.positiveNumber,
            'Length'
        );
        if (validated !== null) {
            debouncedCalculate();
        }
    });
}
```

### Step 5: Add Presets UI

```javascript
// Add after your main container but before the results section
const presetsContainer = document.querySelector('.container');
const presetUI = createPresetSelector('concrete', (preset) => {
    // Load preset data
    loadPreset(preset);
    showSuccess('Preset loaded!');
});

if (presetUI) {
    presetsContainer.insertBefore(presetUI, presetsContainer.firstChild);
}

function loadPreset(preset) {
    // Clear existing rows
    itemsContainer.innerHTML = '';
    
    // Load preset rows
    preset.rows.forEach(row => {
        createItemRow(row);
    });
    
    calculateAll();
}
```

### Step 6: Add Export Menu

```javascript
// Add after results display
function updateExportMenu() {
    const existingMenu = document.querySelector('.export-menu');
    if (existingMenu) existingMenu.remove();
    
    const resultsContainer = document.querySelector('.results');
    if (resultsContainer) {
        const results = {
            'Total Concrete Volume': totalConcreteVolume,
            'Total Concrete Weight': totalConcreteWeight,
            'Total Excavated Volume': totalExcavatedVolume,
            'Total Excavated Weight': totalExcavatedWeight
        };
        
        const menu = createExportMenu('concrete-calculator', 
            captureFormState(), 
            results
        );
        resultsContainer.parentElement.appendChild(menu);
    }
}
```

---

## Feature Usage Examples

### Auto-Save
- Automatically saves every 5 seconds (configurable)
- Saves to browser localStorage
- On refresh, user can restore or start fresh

### Undo/Redo
```javascript
const undoBtn = document.getElementById('undoBtn');
undoBtn.addEventListener('click', () => {
    const previousState = undoRedo.undo();
    if (previousState) {
        restoreState(previousState);
    }
});
```

### Input Validation
```javascript
const wastageInput = document.getElementById('wastage');
import { addLiveValidation, validators } from '../shared-validation.js';

addLiveValidation(wastageInput, validators.percentage, 'Wastage');
// Now input shows error on blur if not 0-100
```

### Export Results
```javascript
import { createExportMenu } from '../export-utils.js';

const menu = createExportMenu('calculator-name', data, results);
document.body.appendChild(menu);

// Users can now:
// - Copy results to clipboard
// - Export as JSON
// - Export as CSV
// - Share via link
// - Print professionally
```

### Presets
```javascript
import { createPresetSelector, getPresets } from '../presets.js';

const presets = getPresets('paving'); // Gets all paving presets
// {
//   "Small Patio (4x3m)": {...},
//   "Large Patio (6x4m)": {...},
//   ...
// }
```

---

## Estimated Code Reduction

- **calculator.html**: 380 lines → 250 lines (-34%)
- **paving-calculator/index.html**: 360 lines → 240 lines (-33%)
- **brick-block-calculator/index.html**: 520 lines → 320 lines (-38%)
- **Other calculators**: Similar reduction

**Total**: ~2,000 shared lines eliminated through modularization

---

## Next Steps (Future Improvements)

1. **Cloud Sync** - Sync saved calculations across devices
2. **Templates** - User-created custom templates
3. **Cost Estimation** - Material pricing integration
4. **API Integration** - Export to project management tools
5. **Offline Mode** - Service worker for offline access
6. **Unit Testing** - Jest test suite for calculations
7. **Dark Mode** - Toggleable dark theme

---

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

All features use standard Web APIs (localStorage, Clipboard API, etc.)

---

## Questions?

Each shared module includes JSDoc comments. View them for detailed function documentation.

```javascript
// Example: Check available validators
import { validators } from './shared-validation.js';
console.log(Object.keys(validators));
// ['positiveNumber', 'percentage', 'required', 'inList', 'range']
```
