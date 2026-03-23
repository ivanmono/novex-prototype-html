# React → Static HTML + PostCSS Refactor

## Overview
You are tasked with refactoring an existing prototype application built with React and Tailwind CSS into a static HTML-based project using PostCSS.

### Current App
- Built in **ReactJS**
- Uses **Tailwind CSS**
- Contains minimal or no complex functionality (primarily static UI)
- Serves as a visual prototype

### Goal
Convert it into a **maintainable, scalable static frontend architecture**.

---

## 1. Full App Review
- Analyze the entire React application structure
- Review all components, layouts, and styles
- Compare implementation against provided **Figma designs (via link)**
- Identify inconsistencies between code and design
- Ensure final output visually matches Figma as closely as possible

---

## 2. Design System Integration
- Use **design tokens exported from Figma**
- Tokens should drive:
  - Colors
  - Typography
  - Spacing
  - Border radius
  - Shadows

### Implementation
- Use CSS custom properties (variables)
- Ensure tokens are reusable and centralized

---

## 3. React → Static HTML Conversion
- Convert all React components into:
  - Static `.html` pages OR
  - Reusable partials (header, footer, nav, components)

### Remove:
- JSX
- Hooks
- Component lifecycle logic

---

## 4. Styling Migration (Tailwind → PostCSS)

### Requirements
- Replace all Tailwind utility classes with structured CSS
- Use:
  - **PostCSS**
  - **BEM methodology** (Block__Element--Modifier)
  - Modular, object-based architecture

### Guidelines
- Follow **DRY principles**
- Extract reusable patterns (buttons, cards, layouts)
- Avoid duplication
- Separate concerns:
  - Base styles
  - Layout
  - Components
  - Utilities (minimal)

### Example Transformation

#### Tailwind
html
```
<div class="flex items-center justify-between p-4 bg-white rounded-lg"></div>
```

html + BEM 
```
<div class="card card--horizontal"></div>
```

postCSS

```
.card {
  display: flex;
  padding: var(--spacing-md);
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
}
.card--horizontal {
  align-items: center;
  justify-content: space-between;
}
```

## 5. JavaScript Migration
- Replace React interactivity with vanilla JavaScript

### Examples

- Drawer / modal toggle
- Tabs
- Dropdowns

### Guidelines

- Keep JS lightweight
- Use modular structure
- Prefer event-driven logic
- Avoid frameworks and heavy libraries

## 6. Asset Handling

- Store all assets in structured directories

### Requirements

- Use /assets directory

- Store SVGs and icons appropriately

## Tooling

- Use postcss-inline-svg plugin for SVG injection

Accessibility

- Add aria-* attributes where needed

## 7. Project Structure

```
/src
  /html
    /partials
      header.html
      footer.html
    index.html
  /styles
    base/
    components/
    layout/
    utilities/
  /js
    main.js
  /assets
    /icons
    /images
```

## 8. Webpack Integration

Use Webpack to:

- Bundle JavaScript
- Process PostCSS
- Inject HTML partials (header, footer, etc.)

### Goals

- Enable reusable layout system

- Maintain clean build output

## 9. Code Quality Requirements

- Clean and readable code
- Consistent BEM naming conventions
- No unused CSS or JS
- Proper separation of concerns
- Scalable and maintainable structure

## 10. Deliverables

- Fully converted static HTML project
- PostCSS-based styling system
- Vanilla JS for interactivity
- Webpack-configured build system

### Documentation

Include:

- Project structure overview
- Setup and build instructions
- CSS architecture explanation
- Notes on Figma alignment

## 11. Nice-to-Have (Optional)

- Performance optimizations
- Minified production build
- Accessibility improvements
- Responsive behavior aligned with Figma