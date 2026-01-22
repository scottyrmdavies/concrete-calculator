/**
 * FEET-INCHES INPUT COMPONENT
 * Enhanced input field for US Imperial measurements
 * Supports feet-inches format with real-time parsing and formatting
 */

import { parseFeetInches, formatFeetInches } from './unit-converter.js';

/**
 * Create a feet-inches input component
 * Provides user-friendly input for Imperial measurements
 * 
 * @param {object} options - Configuration options
 *   - id: string - Input element ID
 *   - placeholder: string - Placeholder text
 *   - value: number - Initial value in inches
 *   - onChange: function - Callback when value changes
 *   - showHelper: boolean - Show format helper text
 * @returns {HTMLElement} Input container element
 */
export function createFeetInchesInput(options = {}) {
    const {
        id = '',
        placeholder = "e.g., 10' 4\"",
        value = 0,
        onChange = null,
        showHelper = true,
        className = ''
    } = options;

    // Container
    const container = document.createElement('div');
    container.className = `feet-inches-input-container ${className}`;
    container.style.cssText = 'position: relative;';

    // Input field
    const input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.className = 'feet-inches-input';
    input.placeholder = placeholder;
    input.style.cssText = `
        padding: 0.75rem;
        padding-right: 80px;
        border-width: 2px;
        border-color: #dddddd;
        border-radius: 0.375rem;
        width: 100%;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    `;

    // Set initial value
    if (value > 0) {
        input.value = formatFeetInches(value);
    }

    // Format display (shows converted value)
    const formatDisplay = document.createElement('div');
    formatDisplay.className = 'format-display';
    formatDisplay.style.cssText = `
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: #e8f8f5;
        color: #00AC97;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        pointer-events: none;
    `;
    formatDisplay.textContent = value > 0 ? `${value.toFixed(1)}"` : '';

    // Helper text
    let helperText;
    if (showHelper) {
        helperText = document.createElement('div');
        helperText.className = 'input-helper-text';
        helperText.style.cssText = `
            font-size: 11px;
            color: #4F5655;
            margin-top: 4px;
        `;
        helperText.innerHTML = `
            <span style="opacity: 0.7;">Format:</span> 
            <code style="background: #f3f6f3; padding: 2px 6px; border-radius: 3px; font-size: 10px;">10' 4"</code> or 
            <code style="background: #f3f6f3; padding: 2px 6px; border-radius: 3px; font-size: 10px;">10.33</code>
        `;
    }

    // Input event handler
    input.addEventListener('input', (e) => {
        const inputValue = e.target.value.trim();
        
        if (!inputValue) {
            formatDisplay.textContent = '';
            if (onChange) onChange(0, '');
            return;
        }

        // Parse the input
        const inches = parseFeetInches(inputValue);
        
        // Update format display
        if (inches > 0) {
            formatDisplay.textContent = `${inches.toFixed(1)}"`;
            formatDisplay.style.background = '#e8f8f5';
            formatDisplay.style.color = '#00AC97';
        } else {
            formatDisplay.textContent = 'Invalid';
            formatDisplay.style.background = '#fee';
            formatDisplay.style.color = '#c00';
        }

        // Callback
        if (onChange) {
            onChange(inches, inputValue);
        }
    });

    // Focus styling
    input.addEventListener('focus', () => {
        input.style.borderColor = '#30C7B5';
        input.style.boxShadow = '0 0 0 3px rgba(48, 199, 181, 0.5)';
        input.style.outline = 'none';
    });

    input.addEventListener('blur', () => {
        input.style.borderColor = '#dddddd';
        input.style.boxShadow = 'none';
        
        // Auto-format on blur if valid
        const inches = parseFeetInches(input.value);
        if (inches > 0) {
            input.value = formatFeetInches(inches);
        }
    });

    // Assemble container
    container.appendChild(input);
    container.appendChild(formatDisplay);
    if (showHelper) {
        container.appendChild(helperText);
    }

    return container;
}

/**
 * Convert standard input to feet-inches input
 * Enhances existing input elements with feet-inches parsing
 * 
 * @param {HTMLInputElement} inputElement - Input element to enhance
 * @param {function} onChange - Callback when value changes (receives inches)
 */
export function enhanceInputWithFeetInches(inputElement, onChange = null) {
    if (!inputElement) return;

    // Store original placeholder
    const originalPlaceholder = inputElement.placeholder;
    inputElement.placeholder = "e.g., 10' 4\" or 10.33";

    // Add helper attribute
    inputElement.setAttribute('data-feet-inches', 'true');
    inputElement.type = 'text';

    // Create helper div
    const helper = document.createElement('div');
    helper.className = 'feet-inches-helper';
    helper.style.cssText = `
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 11px;
        color: #00AC97;
        background: #e8f8f5;
        padding: 2px 6px;
        border-radius: 3px;
        pointer-events: none;
        font-weight: 600;
    `;
    helper.style.display = 'none';

    // Ensure parent is positioned
    if (inputElement.parentElement && getComputedStyle(inputElement.parentElement).position === 'static') {
        inputElement.parentElement.style.position = 'relative';
    }
    inputElement.parentElement.appendChild(helper);

    // Input handler
    inputElement.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        
        if (!value) {
            helper.style.display = 'none';
            if (onChange) onChange(0);
            return;
        }

        const inches = parseFeetInches(value);
        
        if (inches > 0) {
            helper.textContent = `${inches.toFixed(1)}"`;
            helper.style.display = 'block';
            if (onChange) onChange(inches);
        } else {
            helper.style.display = 'none';
        }
    });

    // Format on blur
    inputElement.addEventListener('blur', () => {
        const inches = parseFeetInches(inputElement.value);
        if (inches > 0) {
            inputElement.value = formatFeetInches(inches);
        }
    });
}

/**
 * Create a dual-input component (separate feet and inches fields)
 * More explicit input style for users unfamiliar with combined format
 * 
 * @param {object} options - Configuration options
 * @returns {HTMLElement} Dual input container
 */
export function createDualFeetInchesInput(options = {}) {
    const {
        id = '',
        feetValue = 0,
        inchesValue = 0,
        onChange = null,
        className = ''
    } = options;

    const container = document.createElement('div');
    container.className = `dual-feet-inches-input ${className}`;
    container.style.cssText = 'display: flex; gap: 8px; align-items: center;';

    // Feet input
    const feetContainer = document.createElement('div');
    feetContainer.style.cssText = 'flex: 1; display: flex; align-items: center; gap: 4px;';
    
    const feetInput = document.createElement('input');
    feetInput.type = 'number';
    feetInput.id = `${id}_feet`;
    feetInput.className = 'feet-input';
    feetInput.placeholder = '0';
    feetInput.value = feetValue || '';
    feetInput.min = '0';
    feetInput.step = '1';
    feetInput.style.cssText = `
        padding: 0.75rem;
        border: 2px solid #dddddd;
        border-radius: 0.375rem;
        width: 100%;
        box-sizing: border-box;
    `;

    const feetLabel = document.createElement('span');
    feetLabel.textContent = 'ft';
    feetLabel.style.cssText = 'font-weight: 600; color: #4F5655; font-size: 14px;';

    feetContainer.appendChild(feetInput);
    feetContainer.appendChild(feetLabel);

    // Inches input
    const inchesContainer = document.createElement('div');
    inchesContainer.style.cssText = 'flex: 1; display: flex; align-items: center; gap: 4px;';
    
    const inchesInput = document.createElement('input');
    inchesInput.type = 'number';
    inchesInput.id = `${id}_inches`;
    inchesInput.className = 'inches-input';
    inchesInput.placeholder = '0';
    inchesInput.value = inchesValue || '';
    inchesInput.min = '0';
    inchesInput.max = '11.99';
    inchesInput.step = '0.25';
    inchesInput.style.cssText = `
        padding: 0.75rem;
        border: 2px solid #dddddd;
        border-radius: 0.375rem;
        width: 100%;
        box-sizing: border-box;
    `;

    const inchesLabel = document.createElement('span');
    inchesLabel.textContent = 'in';
    inchesLabel.style.cssText = 'font-weight: 600; color: #4F5655; font-size: 14px;';

    inchesContainer.appendChild(inchesInput);
    inchesContainer.appendChild(inchesLabel);

    // Change handler
    const handleChange = () => {
        const feet = parseFloat(feetInput.value) || 0;
        const inches = parseFloat(inchesInput.value) || 0;
        const totalInches = feet * 12 + inches;
        
        if (onChange) {
            onChange(totalInches, feet, inches);
        }
    };

    feetInput.addEventListener('input', handleChange);
    inchesInput.addEventListener('input', handleChange);

    // Focus styling
    [feetInput, inchesInput].forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = '#30C7B5';
            input.style.boxShadow = '0 0 0 3px rgba(48, 199, 181, 0.5)';
            input.style.outline = 'none';
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = '#dddddd';
            input.style.boxShadow = 'none';
        });
    });

    container.appendChild(feetContainer);
    container.appendChild(inchesContainer);

    return container;
}

export default {
    createFeetInchesInput,
    enhanceInputWithFeetInches,
    createDualFeetInchesInput
};
