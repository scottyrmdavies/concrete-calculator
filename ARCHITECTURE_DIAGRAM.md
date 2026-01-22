# Regional Calculator System - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                               │
│  ┌──────────────────┐    ┌──────────────────┐                       │
│  │  Region Toggle   │    │   Calculator     │                       │
│  │   🇬🇧 UK | US 🇺🇸  │    │     Form         │                       │
│  └────────┬─────────┘    └──────────────────┘                       │
└───────────┼──────────────────────────────────────────────────────────┘
            │
            │ User selects region
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      REGION MANAGER                                  │
│  ┌──────────────────────────────────────────────────────┐           │
│  │  Current Region: UK or US                            │           │
│  │  Current Config: { vocabulary, units, sizes, ... }   │           │
│  │                                                       │           │
│  │  Methods:                                            │           │
│  │  - setRegion(region)                                 │           │
│  │  - getRegion()                                       │           │
│  │  - getConfig()                                       │           │
│  │  - onChange(callback)                                │           │
│  └──────────────────────────────────────────────────────┘           │
└─────────┬───────────────────────────────────┬───────────────────────┘
          │                                   │
          │ Triggers                          │ Accesses
          ▼                                   ▼
┌──────────────────────┐           ┌──────────────────────────────────┐
│  EVENT LISTENERS     │           │   REGIONAL CONFIGURATION         │
│                      │           │                                  │
│  onChange() →        │           │  REGIONAL_CONFIGS = {            │
│    - Update UI       │           │    UK: {                         │
│    - Update vocab    │           │      unit: 'mm',                 │
│    - Recalculate     │           │      largeUnit: 'm',             │
│                      │           │      vocabulary: {...},          │
└──────────────────────┘           │      timberSizes: {...},         │
                                   │      materialSizes: {...}        │
                                   │    },                            │
                                   │    US: {                         │
                                   │      unit: 'inch',               │
                                   │      largeUnit: 'ft',            │
                                   │      vocabulary: {...},          │
                                   │      timberSizes: {...},         │
                                   │      materialSizes: {...}        │
                                   │    }                             │
                                   │  }                               │
                                   └──────────────────────────────────┘
                                              │
                                              │ Used by
                                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        INPUT HANDLING                                │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │  UK INPUT                    US INPUT                    │       │
│  │  ─────────                   ────────                    │       │
│  │  "2.5"                       "8' 2\""                    │       │
│  │    ↓                            ↓                        │       │
│  │  parseFloat()                parseFeetInches()           │       │
│  │    ↓                            ↓                        │       │
│  │  2.5 meters                  124 inches                  │       │
│  │                                 ↓                        │       │
│  │                              / 12 → 10.33 feet           │       │
│  │                                 ↓                        │       │
│  │                              feetToMeters()              │       │
│  │                                 ↓                        │       │
│  │                              3.15 meters                 │       │
│  └──────────────────┬───────────────┬───────────────────────┘       │
└────────────────────┼───────────────┼─────────────────────────────────┘
                     │               │
                     └───────┬───────┘
                             │ Both convert to METERS
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     CALCULATION ENGINE                               │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │  ALL CALCULATIONS IN METRIC                             │       │
│  │                                                          │       │
│  │  length (m) × width (m) = area (m²)                     │       │
│  │  area (m²) × height (m) = volume (m³)                   │       │
│  │  volume (m³) × density (kg/m³) = weight (kg)            │       │
│  │                                                          │       │
│  │  Material Dimensions:                                   │       │
│  │  - UK: from config.timberSizes (mm → m)                │       │
│  │  - US: from config.timberSizes (in → m) [ACTUAL dims]  │       │
│  └──────────────────────────────────────────────────────────┘       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ Results in metric
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      RESULTS DISPLAY                                 │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │  IF UK:                      IF US:                      │       │
│  │  ──────                      ──────                      │       │
│  │  Display as-is               Convert for display         │       │
│  │  10.5 m²                     10.5 m² × 10.764           │       │
│  │  "10.5 m²"                   = 113.02 sq ft             │       │
│  │                              "113.02 sq ft"             │       │
│  │                                                          │       │
│  │  Vocabulary:                 Vocabulary:                │       │
│  │  "Timber"                    "Lumber"                   │       │
│  │  "Plasterboard"              "Drywall"                  │       │
│  └──────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────┘


VOCABULARY SWAPPING FLOW:
═══════════════════════════

┌──────────────┐
│ HTML Element │  <h2 data-regional-text>Timber Calculator</h2>
└──────┬───────┘
       │
       ▼
┌─────────────────────┐
│ updateAllRegional   │  Scans for [data-regional-text]
│ Text(region)        │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────────────┐
│ updateElementVocabulary()   │  Gets element text
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│ replaceVocabulary()         │  Replaces terms
└──────┬──────────────────────┘
       │
       │  UK: "Timber Calculator"
       │  US: "Lumber Calculator"
       ▼
┌─────────────────────────────┐
│ Updates element.textContent │
└─────────────────────────────┘


US LUMBER DIMENSION HANDLING:
═════════════════════════════

User selects "2x4"
       │
       ▼
┌────────────────────────────┐
│ getActualLumberSize('2x4') │  Looks up in config
└──────┬─────────────────────┘
       │
       ▼
config.nominalToActual['2x4']
       │
       ▼
    [1.5, 3.5]  ← ACTUAL dimensions, NOT [2, 4]
       │
       ▼
Convert to meters:
[1.5 × 0.0254, 3.5 × 0.0254]
       │
       ▼
[0.0381 m, 0.0889 m]
       │
       ▼
Used in volume calculation:
length × 0.0381 × 0.0889 = volume (m³)


KEY PRINCIPLES:
══════════════

1. INPUT  → Convert to METERS
2. CALC   → Always in METRIC
3. OUTPUT → Convert to REGIONAL units

   ┌─────────┐      ┌──────────┐      ┌─────────┐
   │  INPUT  │──→   │   CALC   │  ──→ │ OUTPUT  │
   │ Regional│      │  Metric  │      │Regional │
   └─────────┘      └──────────┘      └─────────┘


DATA FLOW EXAMPLE (US User):
════════════════════════════

User Input: "10' 4\""  (length)
                │
                ▼
        parseFeetInches("10' 4\"")
                │
                ▼
            124 inches
                │
                ▼
            124 / 12 = 10.33 feet
                │
                ▼
        feetToMeters(10.33)
                │
                ▼
            3.15 meters  ← STORED VALUE
                │
                ▼
        area = 3.15 × width
                │
                ▼
            10.5 m²  ← CALCULATED VALUE
                │
                ▼
        IF region === 'US':
        10.5 × 10.764 = 113.02
                │
                ▼
        Display: "113.02 sq ft"  ← USER SEES THIS


FILES INTERACTION:
═════════════════

┌──────────────────────────┐
│   regional-config.js     │  Configuration data
│   ────────────────       │
│   - REGIONAL_CONFIGS     │
│   - getRegionalConfig()  │
│   - getLocalizedText()   │
│   - getMaterialSizes()   │
└────────┬─────────────────┘
         │
         │ Used by
         ▼
┌──────────────────────────┐
│   region-toggle.js       │  UI & State Management
│   ──────────────         │
│   - RegionManager        │
│   - createRegionToggle() │
└────────┬─────────────────┘
         │
         │ Triggers
         ▼
┌──────────────────────────┐
│   unit-converter.js      │  Conversion Utilities
│   ───────────────        │
│   - parseFeetInches()    │
│   - feetToMeters()       │
│   - formatFeetInches()   │
└────────┬─────────────────┘
         │
         │ Enhanced by
         ▼
┌──────────────────────────┐
│  feet-inches-input.js    │  Input Components
│  ────────────────────    │
│  - createFeetInchesInput │
│  - enhanceInput...       │
└──────────────────────────┘


COMPLETE FLOW (User Changes Region):
════════════════════════════════════

User clicks UK 🇬🇧 → US 🇺🇸
         │
         ▼
RegionManager.setRegion('US')
         │
         ▼
Updates internal state:
  - currentRegion = 'US'
  - config = REGIONAL_CONFIGS.US
         │
         ▼
Notifies all listeners:
  onChange('US', config)
         │
         ├──→ updateAllRegionalText('US')
         │        └──→ "Timber" → "Lumber"
         │             "Plasterboard" → "Drywall"
         │
         ├──→ updateInputPlaceholders('US')
         │        └──→ "2.5" → "8' 2\""
         │
         ├──→ updateMaterialOptions('US')
         │        └──→ "50mm x 100mm" → "1.5\" x 3.5\""
         │
         └──→ calculate()
                  └──→ Recalculates with new region
                        Displays in imperial units
```

This diagram shows:
- Complete data flow from user input to display
- How region changes trigger updates
- Where conversions happen
- How vocabulary is swapped
- US lumber dimension handling
- File interactions
