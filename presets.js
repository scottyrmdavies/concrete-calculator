/**
 * CALCULATOR PRESETS & TEMPLATES
 * Pre-configured calculations for common scenarios
 */

export const CONCRETE_PRESETS = {
    "Small Patio (4x4m)": {
        rows: [
            {
                description: "Patio Foundation",
                length: 4,
                width: 4,
                depth: 0.15,
                materialType: "Concrete"
            }
        ]
    },
    "Large Driveway (7x3m)": {
        rows: [
            {
                description: "Driveway Base",
                length: 7,
                width: 3,
                depth: 0.10,
                materialType: "Concrete"
            }
        ]
    },
    "Concrete Footings": {
        rows: [
            {
                description: "Footing 1",
                length: 9,
                width: 0.6,
                depth: 1,
                materialType: "Concrete"
            },
            {
                description: "Footing 2",
                length: 9,
                width: 0.6,
                depth: 1,
                materialType: "Concrete"
            }
        ]
    },
    "Excavation & Oversite": {
        rows: [
            {
                description: "Foundation Dig",
                length: 10,
                width: 8,
                depth: 1.2,
                materialType: "Soil"
            },
            {
                description: "Oversite Dig",
                length: 9.3,
                width: 2.8,
                depth: 0.3,
                materialType: "Soil"
            }
        ]
    }
};

export const PAVING_PRESETS = {
    "Small Patio (4x3m)": {
        rows: [
            {
                name: "Main Patio",
                type: "Patio",
                width: 4,
                length: 3,
                qty: 1
            }
        ],
        slabWidth: 600,
        slabLength: 600,
        joint: 10,
        wastage: 10,
        slabsPerPack: 20,
        beddingCoverage: 4
    },
    "Large Patio (6x4m)": {
        rows: [
            {
                name: "Main Patio",
                type: "Patio",
                width: 6,
                length: 4,
                qty: 1
            }
        ],
        slabWidth: 600,
        slabLength: 600,
        joint: 10,
        wastage: 10,
        slabsPerPack: 20,
        beddingCoverage: 4
    },
    "Garden Path (0.6x10m)": {
        rows: [
            {
                name: "Garden Path",
                type: "Path",
                width: 0.6,
                length: 10,
                qty: 1
            }
        ],
        slabWidth: 600,
        slabLength: 600,
        joint: 10,
        wastage: 15,
        slabsPerPack: 20,
        beddingCoverage: 4
    }
};

export const BRICK_BLOCK_PRESETS = {
    "Single Storey (Single Wall)": {
        rows: [
            {
                name: "Exterior Wall",
                length: 10,
                height: 2.8,
                qty: 1
            }
        ],
        wallThickness: "single",
        sandRatio: 3.5,
        cementRatio: 0.3,
        bricksRatio: 60
    },
    "Single Storey (Double Wall)": {
        rows: [
            {
                name: "External Wall",
                length: 10,
                height: 2.8,
                qty: 1
            }
        ],
        wallThickness: "double",
        sandRatio: 7.0,
        cementRatio: 0.6,
        bricksRatio: 120
    },
    "Block Wall (4m x 3m)": {
        rows: [
            {
                name: "Utility Wall",
                length: 4,
                height: 3,
                qty: 1,
                materialType: "Blocks"
            }
        ],
        wallThickness: "single",
        sandRatio: 1.0,
        cementRatio: 0.1,
        bricksRatio: 10
    }
};

export const TILE_PRESETS = {
    "Bathroom (2x2m)": {
        rows: [
            {
                name: "Bathroom Floor",
                type: "Floor",
                width: 2,
                height: 2,
                qty: 1
            }
        ],
        tileWidth: 300,
        tileHeight: 300,
        grout: 3,
        wastage: 10,
        tilesPerBox: 9,
        adhesiveCoverage: 5
    },
    "Kitchen Backsplash (1x3m)": {
        rows: [
            {
                name: "Backsplash",
                type: "Wall",
                width: 1,
                height: 3,
                qty: 1
            }
        ],
        tileWidth: 150,
        tileHeight: 300,
        grout: 2,
        wastage: 15,
        tilesPerBox: 20,
        adhesiveCoverage: 5
    },
    "Large Bathroom (3x2.5m)": {
        rows: [
            {
                name: "Floor",
                type: "Floor",
                width: 3,
                height: 2.5,
                qty: 1
            },
            {
                name: "Walls",
                type: "Wall",
                width: 3,
                height: 2,
                qty: 2
            }
        ],
        tileWidth: 300,
        tileHeight: 300,
        grout: 3,
        wastage: 10,
        tilesPerBox: 9,
        adhesiveCoverage: 5
    }
};

export const PLASTER_PRESETS = {
    "Single Room (4x3x2.4m)": {
        rows: [
            {
                description: "Walls",
                type: "Wall",
                length: 4,
                height: 2.4,
                openings: 0
            },
            {
                description: "Ceiling",
                type: "Ceiling",
                length: 4,
                height: 3,
                openings: 0
            }
        ],
        boardSize: "1.2x2.4",
        wastePercent: 10,
        skimThicknessMm: 2
    },
    "Large Room (6x4x2.6m)": {
        rows: [
            {
                description: "Walls",
                type: "Wall",
                length: 6,
                height: 2.6,
                openings: 2.4
            },
            {
                description: "Ceiling",
                type: "Ceiling",
                length: 6,
                height: 4,
                openings: 0
            }
        ],
        boardSize: "1.2x2.4",
        wastePercent: 10,
        skimThicknessMm: 2
    }
};

export const STUD_PRESETS = {
    "Single Wall (4m x 2.4m)": {
        rows: [
            {
                name: "Main Wall",
                length: 4,
                height: 2.4,
                centers: 400,
                nogginsRows: 1,
                qty: 1
            }
        ],
        unitSystem: "metric"
    },
    "Double Wall (6m x 2.8m)": {
        rows: [
            {
                name: "Wall 1",
                length: 6,
                height: 2.8,
                centers: 400,
                nogginsRows: 1,
                qty: 1
            },
            {
                name: "Wall 2",
                length: 6,
                height: 2.8,
                centers: 400,
                nogginsRows: 1,
                qty: 1
            }
        ],
        unitSystem: "metric"
    }
};

/**
 * Get all presets for a calculator
 */
export function getPresets(calculatorType) {
    const presetMap = {
        'concrete': CONCRETE_PRESETS,
        'paving': PAVING_PRESETS,
        'brick-block': BRICK_BLOCK_PRESETS,
        'tile': TILE_PRESETS,
        'plaster': PLASTER_PRESETS,
        'stud': STUD_PRESETS
    };
    
    return presetMap[calculatorType] || {};
}

/**
 * Create preset selector UI
 */
export function createPresetSelector(calculatorType, onSelectPreset) {
    const presets = getPresets(calculatorType);
    
    if (Object.keys(presets).length === 0) {
        return null;
    }
    
    const container = document.createElement('div');
    container.className = 'preset-selector mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200';
    
    const label = document.createElement('label');
    label.className = 'block text-sm font-semibold mb-2';
    label.textContent = 'Quick Start - Select a Template:';
    
    const select = document.createElement('select');
    select.className = 'quantity-input w-full';
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Choose a preset...';
    select.appendChild(defaultOption);
    
    Object.entries(presets).forEach(([name, preset]) => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    });
    
    select.addEventListener('change', (e) => {
        if (e.target.value) {
            onSelectPreset(presets[e.target.value]);
            select.value = '';
        }
    });
    
    container.appendChild(label);
    container.appendChild(select);
    
    return container;
}
