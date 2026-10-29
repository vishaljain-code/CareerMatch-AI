const STORAGE_KEY = 'careermatch_ai_history';

/**
 * Retrieves all saved analyses from localStorage
 */
export function getSavedAnalyses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read saved analyses from localStorage:', err);
    return [];
  }
}

/**
 * Saves a new analysis record to localStorage
 */
export function saveAnalysis(analysisData) {
  try {
    const current = getSavedAnalyses();
    const id = `analysis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    
    const record = {
      id,
      ...analysisData,
      savedAt: new Date().toISOString(),
    };

    // Keep the most recent 50 analyses to prevent exceeding storage limits
    const updated = [record, ...current].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return record;
  } catch (err) {
    console.error('Failed to save analysis to localStorage:', err);
    return null;
  }
}

/**
 * Retrieves a single analysis by its ID
 */
export function getAnalysisById(id) {
  const all = getSavedAnalyses();
  return all.find((item) => item.id === id) || null;
}

/**
 * Deletes an analysis record by ID
 */
export function deleteAnalysis(id) {
  try {
    const current = getSavedAnalyses();
    const filtered = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Failed to delete analysis from localStorage:', err);
    return false;
  }
}

/**
 * Clears all analysis records
 */
export function clearAllAnalyses() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error('Failed to clear analyses from localStorage:', err);
    return false;
  }
}

/**
 * Exports all history as a JSON download
 */
export function exportAnalysesAsJSON() {
  const analyses = getSavedAnalyses();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(analyses, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `careermatch_history_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
