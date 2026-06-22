/**
 * quiz-storage.js
 * Shared localStorage helper for all exam HTML files.
 * Each page passes its own storageKey when calling initStorage().
 */

(function(global) {
  'use strict';

  /** Call once per page to wire up save/load. storageKey must be unique per exam file. */
  global.initStorage = function(storageKey) {
    global._STORAGE_KEY = storageKey;
  };

  global.saveState = function(questionId, selectedValues, isCorrect) {
    const key = global._STORAGE_KEY;
    if (!key) return;
    try {
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      if (!data.submitted) data.submitted = {};
      if (!data.answers)   data.answers   = {};
      data.answers[questionId] = selectedValues;       // array of values
      data.submitted[questionId] = isCorrect;
      data.correct = Object.values(data.submitted).filter(Boolean).length;
      localStorage.setItem(key, JSON.stringify(data));
    } catch(e) { /* storage unavailable */ }
  };

  global.saveTotalQuestions = function(total) {
    const key = global._STORAGE_KEY;
    if (!key) return;
    try {
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      data.total = total;
      localStorage.setItem(key, JSON.stringify(data));
    } catch(e) {}
  };

  global.loadState = function() {
    const key = global._STORAGE_KEY;
    if (!key) return null;
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch(e) { return {}; }
  };

  global.resetState = function() {
    const key = global._STORAGE_KEY;
    if (!key) return;
    try { localStorage.removeItem(key); } catch(e) {}
  };

})(window);

