/**
 * quiz-storage.js
 * Shared localStorage helper for all exam HTML files.
 * Each page passes its own storageKey when calling initStorage().
 */

(function(global) {
  'use strict';

  let restoreScheduled = false;

  function restoreStateToDom() {
    const key = global._STORAGE_KEY;
    if (!key) return;

    let data = {};
    try {
      data = JSON.parse(localStorage.getItem(key) || '{}');
    } catch (e) {
      return;
    }

    if (!data.answers) return;

    Object.entries(data.answers).forEach(function(entry) {
      const questionId = entry[0];
      const selectedValues = entry[1];
      const qElem = document.getElementById(questionId);
      if (!qElem || !Array.isArray(selectedValues)) return;

      const isCorrect = !!(data.submitted && data.submitted[questionId]);
      const color = isCorrect ? 'limegreen' : 'red';

      selectedValues.forEach(function(val) {
        const input = qElem.querySelector('input[value="' + val + '"]');
        if (!input) return;
        input.checked = true;

        if (input.type === 'radio') {
          const maybeSpan = input.parentElement && input.parentElement.children && input.parentElement.children[0];
          if (maybeSpan && maybeSpan.tagName === 'SPAN') {
            maybeSpan.classList.add('selected');
          }
        }

        const li = input.closest('li.answer');
        if (li && li.children[0]) {
          li.children[0].style.borderColor = color;
        }
      });
    });
  }

  function scheduleRestore() {
    if (restoreScheduled) return;
    restoreScheduled = true;
    setTimeout(function() {
      restoreStateToDom();
      restoreScheduled = false;
    }, 0);
  }

  /** Call once per page to wire up save/load. storageKey must be unique per exam file. */
  global.initStorage = function(storageKey) {
    global._STORAGE_KEY = storageKey;
    scheduleRestore();
  };

  global.saveState = function(questionId, selectedValues, isCorrect) {
    const key = global._STORAGE_KEY;
    if (!key) return;
    if (!Array.isArray(selectedValues) || selectedValues.length === 0) return;

    try {
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      if (!data.submitted) data.submitted = {};
      if (!data.answers)   data.answers   = {};
      data.answers[questionId] = selectedValues;       // array of values

      // Never overwrite a previously-correct answer with false.
      data.submitted[questionId] = Boolean(data.submitted[questionId]) || Boolean(isCorrect);
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

  // Restore after load and whenever quiz nodes are injected into DOM.
  global.addEventListener('load', scheduleRestore);
  const observer = new MutationObserver(scheduleRestore);
  observer.observe(document.documentElement, { childList: true, subtree: true });

})(window);

