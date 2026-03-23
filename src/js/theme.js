/**
 * theme.js — Dark / light theme toggle
 * Reads preference from localStorage, applies to <html data-theme>.
 */

const STORAGE_KEY = 'novexx-theme';
const DEFAULT_THEME = 'dark';

/**
 * Apply a theme by setting data-theme on <html>.
 * @param {'dark'|'light'} theme
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

/**
 * Toggle between dark and light themes.
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

/**
 * Initialise theme from stored preference.
 */
function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  applyTheme(stored);
}

export { initTheme, toggleTheme, applyTheme };
