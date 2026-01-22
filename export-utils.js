/**
 * EXPORT & SHARING UTILITIES
 * Copy calculations, generate sharable links, export data
 */

import { showSuccess, showError, formatNumber } from './shared-constants.js';

/**
 * Copy calculation results to clipboard
 */
export function copyCalculationToClipboard(results) {
    try {
        let text = '';
        
        // Add results
        if (typeof results === 'object') {
            Object.entries(results).forEach(([key, value]) => {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
                const formattedValue = typeof value === 'number' 
                    ? formatNumber(value) 
                    : value;
                text += `${formattedKey}: ${formattedValue}\n`;
            });
        } else {
            text = String(results);
        }
        
        navigator.clipboard.writeText(text).then(() => {
            showSuccess('Calculation copied to clipboard!');
        });
    } catch (error) {
        showError('Failed to copy to clipboard');
    }
}

/**
 * Export results as JSON
 */
export function exportAsJSON(calculatorName, data, results) {
    const exportData = {
        calculator: calculatorName,
        timestamp: new Date().toISOString(),
        data,
        results
    };
    
    const json = JSON.stringify(exportData, null, 2);
    downloadFile(json, `${calculatorName}_${Date.now()}.json`, 'application/json');
    showSuccess('Calculation exported as JSON');
}

/**
 * Export results as CSV
 */
export function exportAsCSV(calculatorName, rows) {
    if (!rows || rows.length === 0) {
        showError('No data to export');
        return;
    }
    
    // Get column headers
    const firstRow = rows[0];
    const headers = Object.keys(firstRow);
    
    // Build CSV
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        const values = headers.map(header => {
            const value = row[header];
            // Escape quotes and wrap in quotes if contains comma
            if (typeof value === 'string' && value.includes(',')) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        });
        csv += values.join(',') + '\n';
    });
    
    downloadFile(csv, `${calculatorName}_${Date.now()}.csv`, 'text/csv');
    showSuccess('Calculation exported as CSV');
}

/**
 * Generate shareable URL
 */
export function generateShareableUrl(calculatorName, data) {
    try {
        // Compress data using base64
        const jsonString = JSON.stringify(data);
        const compressed = btoa(encodeURIComponent(jsonString));
        
        // Create URL
        const baseUrl = window.location.origin + window.location.pathname;
        const params = new URLSearchParams({
            calc: calculatorName,
            data: compressed
        });
        
        const shareUrl = `${baseUrl}?${params.toString()}`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
            showSuccess('Share link copied! Paste in your browser to load this calculation.');
        });
        
        return shareUrl;
    } catch (error) {
        showError('Failed to generate share link');
        return null;
    }
}

/**
 * Load data from URL parameters
 */
export function loadDataFromUrl() {
    try {
        const params = new URLSearchParams(window.location.search);
        const data = params.get('data');
        
        if (!data) return null;
        
        const jsonString = decodeURIComponent(atob(data));
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Failed to load data from URL:', error);
        return null;
    }
}

/**
 * Download file
 * @private
 */
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Create export menu
 */
export function createExportMenu(calculatorName, data, results) {
    const menu = document.createElement('div');
    menu.className = 'export-menu card mt-4 p-4';
    
    const title = document.createElement('h3');
    title.className = 'font-semibold mb-3';
    title.textContent = 'Export & Share';
    
    const buttons = document.createElement('div');
    buttons.className = 'flex flex-wrap gap-2';
    
    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn btn-sm';
    copyBtn.textContent = '📋 Copy Results';
    copyBtn.addEventListener('click', () => copyCalculationToClipboard(results));
    
    // JSON export
    const jsonBtn = document.createElement('button');
    jsonBtn.className = 'btn btn-sm';
    jsonBtn.textContent = '📄 Export JSON';
    jsonBtn.addEventListener('click', () => exportAsJSON(calculatorName, data, results));
    
    // CSV export
    const csvBtn = document.createElement('button');
    csvBtn.className = 'btn btn-sm';
    csvBtn.textContent = '📊 Export CSV';
    csvBtn.addEventListener('click', () => {
        if (Array.isArray(data)) {
            exportAsCSV(calculatorName, data);
        } else {
            showError('CSV export requires table data');
        }
    });
    
    // Share link
    const shareBtn = document.createElement('button');
    shareBtn.className = 'btn btn-sm';
    shareBtn.textContent = '🔗 Share Link';
    shareBtn.addEventListener('click', () => generateShareableUrl(calculatorName, data));
    
    // Print
    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-sm';
    printBtn.textContent = '🖨️ Print';
    printBtn.addEventListener('click', () => window.print());
    
    buttons.appendChild(copyBtn);
    buttons.appendChild(jsonBtn);
    buttons.appendChild(csvBtn);
    buttons.appendChild(shareBtn);
    buttons.appendChild(printBtn);
    
    menu.appendChild(title);
    menu.appendChild(buttons);
    
    return menu;
}

/**
 * Create calculation summary card
 */
export function createSummaryCard(title, results) {
    const card = document.createElement('div');
    card.className = 'summary card mt-4 p-6 bg-gradient-to-br from-blue-50 to-green-50';
    
    const heading = document.createElement('h3');
    heading.className = 'text-lg font-bold mb-4';
    heading.textContent = title;
    
    const content = document.createElement('div');
    content.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
    
    Object.entries(results).forEach(([key, value]) => {
        const item = document.createElement('div');
        item.className = 'flex justify-between items-center border-b pb-2';
        
        const label = document.createElement('span');
        label.className = 'font-medium';
        label.textContent = key.replace(/([A-Z])/g, ' $1').trim();
        
        const valueEl = document.createElement('span');
        valueEl.className = 'font-bold text-lg';
        if (typeof value === 'number') {
            valueEl.textContent = formatNumber(value, { decimals: 2 });
        } else {
            valueEl.textContent = String(value);
        }
        
        item.appendChild(label);
        item.appendChild(valueEl);
        content.appendChild(item);
    });
    
    card.appendChild(heading);
    card.appendChild(content);
    
    return card;
}
