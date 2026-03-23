# Novexx Prototype — Static HTML

Static HTML prototype of the Novexx HMI interface, converted from React + Tailwind CSS.
Designed for a fixed **480 × 800 px** touchscreen display.

---

## Tech stack

| Tool | Role |
|------|------|
| **Webpack 5** | Bundler, dev server, multi-page output |
| **PostCSS** | CSS processing pipeline |
| **postcss-nesting** | CSS nesting syntax |
| **postcss-inline-svg** | SVG backgrounds on `<i>` icon tags |
| **autoprefixer** | Vendor prefixes |
| **cssnano** | Production minification |
| **posthtml-include** | HTML partial injection |
| **html-webpack-plugin** | Per-page HTML output |

---

## Setup

```bash
npm install
npm run dev      # dev server on http://localhost:3000
npm run build    # production build → /dist
```

---

## Project structure

```
src/
├── html/
│   ├── partials/            # Reusable HTML fragments
│   │   ├── status-bar.html            (running)
│   │   ├── status-bar--standby.html
│   │   ├── status-bar--error.html
│   │   ├── bottom-nav-home.html       (Trigger / Login / Menu)
│   │   ├── bottom-nav-home--standby.html
│   │   ├── bottom-nav-home--error.html
│   │   ├── bottom-nav-inner.html      (Back / MENU / L2 avatar)
│   │   └── bottom-nav-inner--guest.html
│   ├── index.html                     (Home — running)
│   ├── home-standby.html
│   ├── home-error.html
│   ├── login.html
│   ├── menu.html
│   ├── manage-users.html
│   ├── manage-users-edit.html
│   ├── manage-users-password.html
│   ├── manage-users-password-keyboard.html
│   ├── manage-users-password-keyboard-num.html
│   ├── playground.html                (sliders)
│   ├── playground-inputs.html         (input fields)
│   ├── playground-role.html           (role selector)
│   ├── playground-dropdown.html       (select drawer — closed)
│   ├── playground-dropdown-open.html  (select drawer — open, static)
│   ├── playground-date.html           (calendar picker)
│   ├── printers.html
│   ├── chart.html
│   ├── chart-2.html
│   └── chart-3.html
│
├── styles/
│   ├── main.css             # Entry — imports everything
│   ├── base/
│   │   ├── _tokens.css      # CSS custom properties (dark + light themes)
│   │   ├── _reset.css
│   │   ├── _typography.css  # Figtree + Fira Code
│   │   └── _root.css        # Body, .device container
│   ├── layout/
│   │   ├── _page-shell.css
│   │   ├── _status-bar.css
│   │   ├── _page-header.css
│   │   └── _bottom-nav.css
│   ├── components/
│   │   ├── _card.css
│   │   ├── _button.css
│   │   ├── _status-chip.css
│   │   ├── _menu-tile.css
│   │   ├── _quick-link.css
│   │   ├── _user-tile.css
│   │   ├── _field-tile.css
│   │   ├── _input.css
│   │   ├── _slider.css
│   │   ├── _select-drawer.css
│   │   ├── _role-selector.css
│   │   ├── _calendar.css
│   │   ├── _keyboard.css
│   │   ├── _chart.css
│   │   └── _error-overlay.css
│   └── utilities/
│       └── _icons.css       # 49 icon classes via postcss-inline-svg
│
├── js/
│   ├── main.js              # Entry — imports CSS and inits modules
│   ├── theme.js             # Dark/light theme toggle (localStorage)
│   └── ui.js                # Sliders, select drawers, radio selectors
│
└── assets/
    ├── icons/               # 49 SVG icon files
    └── images/
        └── logo.svg
```

---

## CSS architecture

### Design tokens

All colors, gradients, and shadows live in `_tokens.css` as CSS custom properties.
Dark theme is the default (`:root`). Light theme is applied via `[data-theme="light"]` on `<html>`.

```css
/* Toggle theme in JS */
document.documentElement.setAttribute('data-theme', 'light');
```

### BEM naming

```
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

Examples: `.user-tile`, `.user-tile__name`, `.status-pill--running`, `.bottom-nav__item--disabled`

### Icons

Icons are `<i>` elements with two classes: a base size class and an icon identifier.

```html
<i class="icon icon--wifi icon--md"></i>
<i class="icon icon--arrow-left icon--sm icon--white"></i>
```

Color is controlled by CSS filter modifiers: `icon--white`, `icon--brand`, `icon--navy`, `icon--orange`, `icon--purple`, `icon--success`, `icon--danger`, `icon--muted`.

### Gradient borders

The "bevel/stroke" border effect (used on cards, tiles, inputs) is achieved via a 1px padding wrapper with a gradient background:

```html
<div style="padding:1px; border-radius:24px; background:var(--gradient-stroke-secondary);">
  <div style="border-radius:23px; background:var(--card-background);">...</div>
</div>
```

BEM classes: `.card-border` → `.card`, `.user-tile` → `.user-tile__inner`, etc.

---

## JavaScript

| Module | Responsibility |
|--------|---------------|
| `theme.js` | Read/write `localStorage` + set `data-theme` on `<html>` |
| `ui.js` → `initSliders()` | Wire `[data-slider]` elements: step buttons + native range drag |
| `ui.js` → `initSelectDrawers()` | Shared drawer overlay for `playground-dropdown.html` |
| `ui.js` → `initRadioSelectors()` | Toggle check/empty visuals on role + level option rows |

No frameworks. No build-time JS — everything runs on DOM-ready.

---

## Figma alignment notes

- **Source**: [Novexx Figma](https://www.figma.com/design/TdibiPYHfxbo9UpVhm2aQ0/Novexx?node-id=293-1134)
- **Canvas**: "Playground" — 22 frames at 480 × 800 px
- **Fonts**: Figtree (UI) + Fira Code (parameter values) — loaded from Google Fonts
- **Background**: `radial-gradient(46.66% 78.22% at 98.75% 0.31%, #4c546c 0%, #1d2028 100%)`
- **Card stroke**: `linear-gradient(99deg, #43464b 0%, #777f8f 48.08%, #59606d 100%)` — 1px via padding trick
- **Play button ring**: `linear-gradient(146deg, #c6cbdd 0%, #2d303b 53.37%, #c6cbdd 100%)` — metallic bevel
- **Status colors**: Running `#22d464` · Stand By `#ffcc04` · Error `#ff6579`
- **Level colors**: L1 navy `#79a3ff` · L2 orange `#ff601c` · L3 purple `#b34aff`
