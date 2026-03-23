/**
 * ui.js — Vanilla JS interactions
 * - Sliders (drag + step buttons)
 * - Select drawers (open/close with animation)
 * - Role / level radio selectors
 */

// ─────────────────────────────────────────────────────────────
// SLIDERS
// ─────────────────────────────────────────────────────────────

/**
 * Compute fill class based on percentage.
 * @param {number} pct  0–100
 * @returns {'slider__fill--low'|'slider__fill--mid'|'slider__fill--high'}
 */
function fillClass(pct) {
  if (pct < 100 / 3) return 'slider__fill--low';
  if (pct < 200 / 3) return 'slider__fill--mid';
  return 'slider__fill--high';
}

/**
 * Update a slider's fill bar, thumb position, and value label.
 * @param {HTMLElement} sliderEl
 * @param {number} value
 */
function updateSlider(sliderEl, value) {
  const min    = Number(sliderEl.dataset.min ?? 0);
  const max    = Number(sliderEl.dataset.max ?? 100);
  const pct    = max === min ? 0 : ((value - min) / (max - min)) * 100;
  const clamp  = Math.max(0, Math.min(100, pct));

  // Update fill
  const fill = sliderEl.querySelector('[data-fill]');
  if (fill) {
    fill.style.width = `${clamp}%`;
    fill.className = `slider__fill ${fillClass(clamp)}`;
  }

  // Update thumb
  const thumb = sliderEl.querySelector('[data-thumb]');
  if (thumb) {
    thumb.style.left = `${clamp}%`;
  }

  // Update value label
  const label = sliderEl.querySelector('[data-value]');
  if (label) {
    label.textContent = value;
    label.style.left  = `clamp(0%, ${clamp}%, 100%)`;
  }

  // Update native input aria
  const input = sliderEl.querySelector('.slider__input');
  if (input) {
    input.setAttribute('aria-valuenow', value);
  }

  sliderEl.dataset.value = value;
}

/**
 * Initialise all sliders on the page.
 */
function initSliders() {
  document.querySelectorAll('[data-slider]').forEach((sliderEl) => {
    const min  = Number(sliderEl.dataset.min  ?? 0);
    const max  = Number(sliderEl.dataset.max  ?? 100);
    const step = Number(sliderEl.dataset.step ?? 1);
    let value  = Number(sliderEl.dataset.value ?? 0);

    // Step-button handlers
    sliderEl.querySelector('[data-decrement]')?.addEventListener('click', () => {
      value = Math.max(min, value - step);
      const input = sliderEl.querySelector('.slider__input');
      if (input) input.value = value;
      updateSlider(sliderEl, value);
    });

    sliderEl.querySelector('[data-increment]')?.addEventListener('click', () => {
      value = Math.min(max, value + step);
      const input = sliderEl.querySelector('.slider__input');
      if (input) input.value = value;
      updateSlider(sliderEl, value);
    });

    // Native range input handler (drag / touch)
    sliderEl.querySelector('.slider__input')?.addEventListener('input', (e) => {
      value = Number(e.target.value);
      updateSlider(sliderEl, value);
    });

    // Initial render
    updateSlider(sliderEl, value);
  });
}

// ─────────────────────────────────────────────────────────────
// SELECT DRAWERS
// ─────────────────────────────────────────────────────────────

/** Per-drawer option sets used when the overlay is shared on playground-dropdown.html */
const DRAWER_OPTIONS = {
  'drawer-1': [
    { value: '1', label: 'Option One' },
    { value: '2', label: 'Option Two' },
    { value: '3', label: 'Option Three' },
    { value: '4', label: 'Option Four' },
    { value: '5', label: 'Option Five' },
    { value: '6', label: 'Option Six' },
  ],
  'drawer-2': [
    { value: 'auto',   label: 'Automatic' },
    { value: 'manual', label: 'Manual' },
    { value: 'semi',   label: 'Semi-automatic' },
    { value: 'custom', label: 'Custom' },
  ],
  'drawer-3': [
    { value: 'default',   label: 'Default Profile' },
    { value: 'profile_a', label: 'Profile A' },
    { value: 'profile_b', label: 'Profile B' },
    { value: 'profile_c', label: 'Profile C' },
  ],
};

/**
 * Initialise the shared select drawer overlay (playground-dropdown.html pattern).
 */
function initSelectDrawers() {
  const overlay      = document.getElementById('drawer-overlay');
  const panel        = document.getElementById('drawer-panel');
  const optionsEl    = document.getElementById('drawer-options');

  if (!overlay || !panel || !optionsEl) return;

  let activeDrawerId    = null;
  const selectedValues  = {};

  /** Open overlay for a specific drawer */
  function openDrawer(drawerId) {
    activeDrawerId = drawerId;
    const options  = DRAWER_OPTIONS[drawerId] ?? [];
    const selected = selectedValues[drawerId];

    // Build option buttons
    optionsEl.innerHTML = options
      .map((opt, i) => {
        const isSelected = opt.value === selected;
        const isLast     = i === options.length - 1;
        return `
          <button class="select-drawer__option" role="option" aria-selected="${isSelected}"
                  data-value="${opt.value}" ${isLast ? 'style="border-bottom:none;"' : ''}>
            <span class="select-drawer__option-label${isSelected ? ' select-drawer__option-label--selected' : ''}">
              ${opt.label}
            </span>
            ${isSelected
              ? '<i class="icon icon--check-circle icon--sm icon--white select-drawer__check" aria-hidden="true"></i>'
              : '<div class="select-drawer__radio"></div>'
            }
          </button>`;
      })
      .join('');

    // Bind option click
    optionsEl.querySelectorAll('[data-value]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedValues[drawerId] = btn.dataset.value;
        // Update trigger text
        updateTriggerText(drawerId, btn.dataset.value, options);
        closeDrawer();
      });
    });

    overlay.classList.add('select-drawer__overlay--open');

    const trigger = document.querySelector(`#${drawerId} [data-trigger]`);
    if (trigger) trigger.setAttribute('aria-expanded', 'true');

    // Focus first option for accessibility
    optionsEl.querySelector('button')?.focus();
  }

  /** Close the overlay */
  function closeDrawer() {
    overlay.classList.remove('select-drawer__overlay--open');
    if (activeDrawerId) {
      const trigger = document.querySelector(`#${activeDrawerId} [data-trigger]`);
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    }
    activeDrawerId = null;
  }

  /** Update the trigger's display text after selection */
  function updateTriggerText(drawerId, value, options) {
    const opt     = options.find((o) => o.value === value);
    const textEl  = document.querySelector(`#${drawerId} .select-drawer__trigger-text`);
    if (textEl && opt) textEl.textContent = opt.label;

    const chevron = document.querySelector(`#${drawerId} .select-drawer__chevron`);
    if (chevron) chevron.classList.remove('select-drawer__chevron--open');
  }

  // Bind trigger buttons
  document.querySelectorAll('[data-drawer] [data-trigger]').forEach((trigger) => {
    const drawer = trigger.closest('[data-drawer]');
    if (!drawer) return;
    trigger.addEventListener('click', () => {
      openDrawer(drawer.id);
      trigger.querySelector('.select-drawer__chevron')?.classList.add('select-drawer__chevron--open');
    });
  });

  // Close on backdrop click
  overlay.querySelector('[data-close-drawer]')?.addEventListener('click', closeDrawer);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeDrawerId) closeDrawer();
  });
}

// ─────────────────────────────────────────────────────────────
// ROLE / LEVEL RADIO SELECTORS
// ─────────────────────────────────────────────────────────────

/**
 * Initialise all radio-style role/level option groups.
 */
function initRadioSelectors() {
  document.querySelectorAll('[data-role-option], [data-level-option]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group    = btn.closest('[role="radiogroup"]');
      if (!group) return;
      const siblings = group.querySelectorAll('[data-role-option], [data-level-option]');

      siblings.forEach((sib) => {
        const isSelected = sib === btn;
        sib.setAttribute('aria-checked', String(isSelected));

        // Label opacity
        const label = sib.querySelector('.role-option__label, .level-option__label');
        if (label) {
          label.classList.toggle('role-option__label--selected',  isSelected && label.classList.contains('role-option__label'));
          label.classList.toggle('level-option__label--selected', isSelected && label.classList.contains('level-option__label'));
        }

        // Swap check ↔ empty box
        const checkEl = sib.querySelector('.role-option__check');
        const emptyEl = sib.querySelector('.role-option__empty');
        if (checkEl) checkEl.style.display = isSelected ? '' : 'none';
        if (emptyEl) emptyEl.style.display = isSelected ? 'none' : '';
      });
    });
  });
}

export { initSliders, initSelectDrawers, initRadioSelectors };
