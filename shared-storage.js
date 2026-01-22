/**
 * LOCAL STORAGE & UNDO/REDO SYSTEM
 * Auto-save calculations and provide undo/redo functionality
 */

/**
 * Auto-save manager for calculations
 */
export class AutoSaveManager {
    constructor(calculatorName, saveInterval = 5000) {
        this.calculatorName = calculatorName;
        this.saveInterval = saveInterval;
        this.isDirty = false;
        this.lastSaveTime = null;
    }

    /**
     * Mark as needing save
     */
    markDirty() {
        this.isDirty = true;
    }

    /**
     * Auto-save if dirty
     */
    autoSave(data) {
        if (this.isDirty) {
            this.save(data);
        }
    }

    /**
     * Save data to localStorage
     */
    save(data) {
        try {
            const key = `autosave_${this.calculatorName}`;
            const storageData = {
                timestamp: new Date().toISOString(),
                data,
                version: 1
            };
            localStorage.setItem(key, JSON.stringify(storageData));
            this.isDirty = false;
            this.lastSaveTime = new Date();
            return true;
        } catch (error) {
            console.error('Auto-save failed:', error);
            return false;
        }
    }

    /**
     * Load previously auto-saved data
     */
    load() {
        try {
            const key = `autosave_${this.calculatorName}`;
            const stored = localStorage.getItem(key);
            if (stored) {
                const parsed = JSON.parse(stored);
                return {
                    data: parsed.data,
                    timestamp: parsed.timestamp,
                    hasAutoSave: true
                };
            }
            return { hasAutoSave: false };
        } catch (error) {
            console.error('Auto-load failed:', error);
            return { hasAutoSave: false };
        }
    }

    /**
     * Clear auto-saved data
     */
    clear() {
        try {
            const key = `autosave_${this.calculatorName}`;
            localStorage.removeItem(key);
            this.isDirty = false;
            return true;
        } catch (error) {
            console.error('Auto-save clear failed:', error);
            return false;
        }
    }

    /**
     * Get last save time
     */
    getLastSaveTime() {
        return this.lastSaveTime;
    }

    /**
     * Set up periodic auto-save
     */
    setupPeriodicSave(dataProvider) {
        setInterval(() => {
            if (this.isDirty) {
                this.save(dataProvider());
            }
        }, this.saveInterval);
    }
}

/**
 * Undo/Redo stack manager
 */
export class UndoRedoManager {
    constructor(maxStates = 20) {
        this.undoStack = [];
        this.redoStack = [];
        this.maxStates = maxStates;
    }

    /**
     * Push state onto undo stack
     */
    pushState(state) {
        this.undoStack.push(JSON.parse(JSON.stringify(state)));
        
        // Limit undo stack size
        if (this.undoStack.length > this.maxStates) {
            this.undoStack.shift();
        }
        
        // Clear redo stack when new action is performed
        this.redoStack = [];
    }

    /**
     * Undo last action
     */
    undo() {
        if (!this.canUndo()) return null;
        
        const currentState = this.undoStack.pop();
        const previousState = this.undoStack[this.undoStack.length - 1];
        
        if (previousState) {
            this.redoStack.push(currentState);
        }
        
        return previousState;
    }

    /**
     * Redo last undone action
     */
    redo() {
        if (!this.canRedo()) return null;
        
        const state = this.redoStack.pop();
        this.undoStack.push(state);
        return state;
    }

    /**
     * Check if undo is available
     */
    canUndo() {
        return this.undoStack.length > 1;
    }

    /**
     * Check if redo is available
     */
    canRedo() {
        return this.redoStack.length > 0;
    }

    /**
     * Clear history
     */
    clear() {
        this.undoStack = [];
        this.redoStack = [];
    }

    /**
     * Get undo/redo availability
     */
    getStatus() {
        return {
            canUndo: this.canUndo(),
            canRedo: this.canRedo(),
            undoCount: this.undoStack.length,
            redoCount: this.redoStack.length
        };
    }
}

/**
 * Create undo/redo UI controls
 */
export function createUndoRedoControls(undoRedoManager, onUndo, onRedo) {
    const container = document.createElement('div');
    container.className = 'undo-redo-controls flex gap-2 mb-4';
    
    const undoBtn = document.createElement('button');
    undoBtn.className = 'btn btn-sm';
    undoBtn.textContent = '↶ Undo';
    undoBtn.addEventListener('click', () => {
        const state = undoRedoManager.undo();
        if (state) onUndo(state);
    });
    
    const redoBtn = document.createElement('button');
    redoBtn.className = 'btn btn-sm';
    redoBtn.textContent = '↷ Redo';
    redoBtn.addEventListener('click', () => {
        const state = undoRedoManager.redo();
        if (state) onRedo(state);
    });
    
    const statusEl = document.createElement('span');
    statusEl.className = 'text-sm text-gray-600';
    statusEl.textContent = 'No history';
    
    container.appendChild(undoBtn);
    container.appendChild(redoBtn);
    container.appendChild(statusEl);
    
    // Update status
    const updateStatus = () => {
        const status = undoRedoManager.getStatus();
        undoBtn.disabled = !status.canUndo;
        redoBtn.disabled = !status.canRedo;
        statusEl.textContent = `${status.undoCount} states, ${status.redoCount} redoable`;
    };
    
    updateStatus();
    
    return {
        element: container,
        updateStatus
    };
}

/**
 * Restore calculation from localStorage prompt
 */
export function createRestorePrompt(autoSaveData, onRestore, onDiscard) {
    const dialog = document.createElement('div');
    dialog.className = 'restore-prompt fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
    
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg p-6 max-w-md shadow-lg';
    
    const title = document.createElement('h2');
    title.className = 'text-xl font-bold mb-2';
    title.textContent = 'Restore Previous Calculation?';
    
    const message = document.createElement('p');
    message.className = 'text-gray-600 mb-4';
    const timestamp = new Date(autoSaveData.timestamp).toLocaleString();
    message.textContent = `Found a saved calculation from ${timestamp}. Would you like to restore it?`;
    
    const buttons = document.createElement('div');
    buttons.className = 'flex gap-3 justify-end';
    
    const restoreBtn = document.createElement('button');
    restoreBtn.className = 'btn btn-success';
    restoreBtn.textContent = 'Restore';
    restoreBtn.addEventListener('click', () => {
        onRestore(autoSaveData.data);
        dialog.remove();
    });
    
    const discardBtn = document.createElement('button');
    discardBtn.className = 'btn btn-secondary';
    discardBtn.textContent = 'Start Fresh';
    discardBtn.addEventListener('click', () => {
        onDiscard();
        dialog.remove();
    });
    
    buttons.appendChild(restoreBtn);
    buttons.appendChild(discardBtn);
    
    card.appendChild(title);
    card.appendChild(message);
    card.appendChild(buttons);
    dialog.appendChild(card);
    
    document.body.appendChild(dialog);
}
