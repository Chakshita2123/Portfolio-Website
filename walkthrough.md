# Interactive Particle Constellation Background Walkthrough

Detailed summary of the interactive particle constellation background system implemented across the portfolio.

## Key Changes Implemented

### 1. Interactive Particle Constellation Network (HTML5 Canvas)
- **Component**: Created [components/ParticleBackground.jsx](file:///c:/Portfolio-Website-/components/ParticleBackground.jsx) containing a full-viewport, fixed HTML5 Canvas animation behind all page content (`position: fixed; inset: 0; pointer-events: none;`).
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
  - Cleaned up aurora blob styles in [components/AnimatedBackground.module.css](file:///c:/Portfolio-Website-/components/AnimatedBackground.module.css).

---

## File Summary

| File | Status | Description |
|---|---|---|
| [components/ParticleBackground.jsx](file:///c:/Portfolio-Website-/components/ParticleBackground.jsx) | **CREATED** | Interactive HTML5 canvas particle constellation with mouse magnetism |
| [app/layout.js](file:///c:/Portfolio-Website-/app/layout.js) | **MODIFIED** | Mounted `ParticleBackground` globally at the root layout |
| [components/AnimatedBackground.jsx](file:///c:/Portfolio-Website-/components/AnimatedBackground.jsx) | **MODIFIED** | Re-exports `ParticleBackground` to prevent broken references |
| [components/AnimatedBackground.module.css](file:///c:/Portfolio-Website-/components/AnimatedBackground.module.css) | **MODIFIED** | Deprecated unused aurora blob styles |
