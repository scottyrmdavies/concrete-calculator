/**
 * FORM & INPUT VALIDATION UTILITIES
 * Provides validation and form management for all calculators
 */

import { showError, showSuccess } from './shared-constants.js';

// ============================================
// VALIDATORS
// ============================================

export const validators = {
    /**
     * Validate positive number
     */
    positiveNumber: (value, fieldName = 'Value') => {
        const num = parseFloat(value);
        if (isNaN(num)) return { valid: false, error: `${fieldName} must be a number` };
        if (num <= 0) return { valid: false, error: `${fieldName} must be greater than 0` };
        return { valid: true };
    },

    /**
     * Validate non-negative number
     */
    nonNegativeNumber: (value, fieldName = 'Value') => {
        const num = parseFloat(value);
        if (isNaN(num)) return { valid: false, error: `${fieldName} must be a number` };
        if (num < 0) return { valid: false, error: `${fieldName} cannot be negative` };
        return { valid: true };
    },

    /**
     * Validate percentage
     */
    percentage: (value, fieldName = 'Percentage') => {
        const num = parseFloat(value);
        if (isNaN(num)) return { valid: false, error: `${fieldName} must be a number` };
        if (num < 0 || num > 100) return { valid: false, error: `${fieldName} must be between 0-100` };
        return { valid: true };
    },

    /**
     * Validate required field
     */
    required: (value, fieldName = 'Field') => {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            return { valid: false, error: `${fieldName} is required` };
        }
        return { valid: true };
    },

    /**
     * Validate from list of options
     */
    inList: (value, options, fieldName = 'Selection') => {
        if (!options.includes(value)) {
            return { valid: false, error: `${fieldName} must be one of: ${options.join(', ')}` };
        }
        return { valid: true };
    },

    /**
     * Validate range
     */
    range: (value, min, max, fieldName = 'Value') => {
        const num = parseFloat(value);
        if (isNaN(num)) return { valid: false, error: `${fieldName} must be a number` };
        if (num < min) return { valid: false, error: `${fieldName} must be at least ${min}` };
        if (num > max) return { valid: false, error: `${fieldName} must be at most ${max}` };
        return { valid: true };
    }
};

// ============================================
// FORM UTILITIES
// ============================================

/**
 * Add error styling to input
 */
export const addInputError = (input, message) => {
    input.classList.add('input-error');
    const errorEl = input.parentElement.querySelector('.error-message');
    if (errorEl) {
        errorEl.textContent = message;
    } else {
        const newError = document.createElement('div');
        newError.className = 'error-message';
        newError.textContent = message;
        input.parentElement.appendChild(newError);
    }
};

/**
 * Remove error styling from input
 */
export const removeInputError = (input) => {
    input.classList.remove('input-error');
    const errorEl = input.parentElement.querySelector('.error-message');
    if (errorEl) {
        errorEl.remove();
    }
};

/**
 * Validate and get input value
 */
export const getValidatedInput = (input, validator, fieldName) => {
    const result = validator(input.value, fieldName);
    
    if (!result.valid) {
        addInputError(input, result.error);
        return null;
    } else {
        removeInputError(input);
        return parseFloat(input.value) || input.value;
    }
};

/**
 * Get form data and validate
 */
export const getFormData = (formSelectors, validators = {}) => {
    const data = {};
    const errors = {};
    
    Object.entries(formSelectors).forEach(([key, selector]) => {
        const input = document.querySelector(selector);
        if (!input) return;
        
        const value = input.value;
        const validator = validators[key];
        
        if (validator) {
            const result = validator(value, key);
            if (!result.valid) {
                addInputError(input, result.error);
                errors[key] = result.error;
            } else {
                removeInputError(input);
                data[key] = parseFloat(value) || value;
            }
        } else {
            data[key] = value;
        }
    });
    
    return {
        valid: Object.keys(errors).length === 0,
        data,
        errors
    };
};

/**
 * Populate form from data object
 */
export const populateForm = (data, formSelectors) => {
    Object.entries(formSelectors).forEach(([key, selector]) => {
        const input = document.querySelector(selector);
        if (input && data[key] !== undefined) {
            input.value = data[key];
        }
    });
};

/**
 * Add real-time validation to input
 */
export const addLiveValidation = (input, validator, fieldName) => {
    input.addEventListener('blur', () => {
        const result = validator(input.value, fieldName);
        if (!result.valid) {
            addInputError(input, result.error);
        } else {
            removeInputError(input);
        }
    });
};

/**
 * Clear form errors
 */
export const clearFormErrors = (container) => {
    const inputs = container.querySelectorAll('.input-error');
    inputs.forEach(input => removeInputError(input));
};

// ============================================
// STYLES FOR VALIDATION
// ============================================

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .error-alert {
        background-color: #fee2e2;
        border-left: 4px solid #dc2626;
        padding: 12px 16px;
        margin-bottom: 12px;
        color: #7f1d1d;
        border-radius: 4px;
    }
    
    .success-alert {
        background-color: #d1fae5;
        border-left: 4px solid #10b981;
        padding: 12px 16px;
        margin-bottom: 12px;
        color: #065f46;
        border-radius: 4px;
    }
    
    .alert-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
    }
    
    .alert-container.error {
        border-left-color: #dc2626;
    }
    
    .alert-container.success {
        border-left-color: #10b981;
    }
`;
document.head.appendChild(styleSheet);
