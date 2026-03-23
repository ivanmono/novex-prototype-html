/**
 * main.js — Entry point
 * Imports CSS bundle and initialises UI modules.
 */
import '../styles/main.css';

import { initTheme }                              from './theme.js';
import { initSliders, initSelectDrawers, initRadioSelectors } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSliders();
  initSelectDrawers();
  initRadioSelectors();
});
