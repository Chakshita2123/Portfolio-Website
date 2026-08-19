# Interactive Particle Constellation Background Walkthrough

Detailed summary of the interactive particle constellation background system implemented across the portfolio.

## Key Changes Implemented

### 1. Interactive Particle Constellation Network (HTML5 Canvas)
- **Component**: [components/ParticleBackground.jsx](file:///c:/Portfolio-Website-/components/ParticleBackground.jsx) containing a full-viewport, fixed HTML5 Canvas animation behind all page content (`position: fixed; inset: 0; pointer-events: none;`).
- **Applied AI / Neural Constellation Aesthetic**:
  - Small drifting particle nodes connected by dynamic thin lines when particles move within 140px proximity.
  - **Sage-Neutral Palette**: Uses `rgba(107, 127, 94, 0.5)` for particle nodes and distance-interpolated `rgba(107, 127, 94, ...)` for connection lines.
  - **Mouse Magnetism**: Subtle interactive drift where nearby particles gently gravitate toward cursor position.
- **High DPI & Performance**:
  - Automatic `devicePixelRatio` scaling for crisp rendering on Retina/mobile displays.
  - Efficient `requestAnimationFrame` loop with seamless wrap-around edge calculations.
  - Desktop (~70 particles) vs Mobile (<768px: ~35 particles) adaptive counts for optimal battery and 60fps performance.
  - Full support for `prefers-reduced-motion: reduce`.
- **Root Layout Integration**:
  - Integrated cleanly in [app/layout.js](file:///c:/Portfolio-Website-/app/layout.js).

---

## File Summary

| File | Status | Description |
|---|---|---|
| [components/ParticleBackground.jsx](file:///c:/Portfolio-Website-/components/ParticleBackground.jsx) | **ACTIVE** | Interactive HTML5 canvas particle constellation with mouse magnetism |
| [app/layout.js](file:///c:/Portfolio-Website-/app/layout.js) | **ACTIVE** | Mounted `ParticleBackground` globally at the root layout |
| [components/Hero.jsx](file:///c:/Portfolio-Website-/components/Hero.jsx) | **RESTORED** | Interactive 3D Torus Knot & neural node network |
| [components/Hero.module.css](file:///c:/Portfolio-Website-/components/Hero.module.css) | **RESTORED** | Restored hero two-column grid layout |
| [components/Hero3DElement.jsx](file:///c:/Portfolio-Website-/components/Hero3DElement.jsx) | **RESTORED** | Interactive 3D geometric core with orbit controls |
| [app/page.js](file:///c:/Portfolio-Website-/app/page.js) | **RESTORED** | Restored section 3D accents and structure |
