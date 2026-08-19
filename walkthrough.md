# Custom Cursor + Glass Card Tilt + Floating AI Orb Enhancements

Three additive, low-risk visual polish enhancements implemented across the portfolio with zero structural or content alterations.

---

## 1. Custom Cursor (`components/CustomCursor.jsx`)
- **Fine-Pointer Detection**: Automatically detects desktop environments with `(hover: hover) and (pointer: fine)`. Touch devices maintain default native touch behaviors.
- **Fluid Lerp Trailing Motion**: Main pointer and outer ring follow mouse movements with linear interpolation (`requestAnimationFrame`) for a smooth, organic feel.
- **Dynamic Interaction States**:
  - **Default**: 7px glowing precision dot with soft halo.
  - **Clickable / Interactive Hover**: Ring smoothly expands to 32px with `--accent-light` border and soft sage fill over links, buttons, project cards, and input elements.
  - **Ambient Glow**: Trailing soft radial gradient aura following behind the cursor.
- **Non-blocking**: `pointer-events: none` on all cursor layers ensures click accuracy.

---

## 2. Glass Card Tilt Effect (`hooks/useGlassTilt.js`, `components/GlassTiltCard.jsx`)
- **Subtle 3D Perspective**: Restrained 6–7 degree rotation on mouse movement (`rotateX` and `rotateY` calculated relative to card center).
- **Specular Glass Glare**: Soft specular radial gradient reflection that tracks the cursor across the card surface (`rgba(255,255,255,0.5)` to `--accent-light`).
- **Dynamic Directional Shadow**: Soft drop-shadow shifting in the opposite direction of the tilt to reinforce 3D depth.
- **Zero-Latency Active Response**: Instant response during mousemove, transitioning smoothly on `mouseleave`.
- **Applied to**:
  - Featured Project Cards ([components/FeaturedProjects.jsx](file:///c:/Portfolio-Website-/components/FeaturedProjects.jsx))
  - All Projects Page Cards ([app/projects/page.js](file:///c:/Portfolio-Website-/app/projects/page.js))
  - About Focus & Stat Cards ([components/AboutPreview.jsx](file:///c:/Portfolio-Website-/components/AboutPreview.jsx))
  - Professional Certification Chips ([components/SkillsSnapshot.jsx](file:///c:/Portfolio-Website-/components/SkillsSnapshot.jsx))

---

## 3. Floating AI Orb (`components/FloatingAIOrb.jsx`)
- **3D Luminous Sphere**: Rendered using a rich spherical radial gradient with specular top-left gloss, deep bottom shadow, and central sparkle icon.
- **Gentle Breathing Aura**: Slow 3.2s continuous ambient breathing animation that gives the assistant an alive presence without distraction.
- **Persistent Access**: Fixed in the bottom-right corner across pages (while keeping the existing Navbar "Ask AI" button intact).
- **Expandable Tooltip**: Displays "Ask AI" on hover and links directly to `/ask-ai`.

---

## File Summary

| File | Status | Description |
|---|---|---|
| [components/CustomCursor.jsx](file:///c:/Portfolio-Website-/components/CustomCursor.jsx) | **MODIFIED** | Fluid lerp smoothing, reactive ring scaling, and desktop pointer detection |
| [components/CustomCursor.module.css](file:///c:/Portfolio-Website-/components/CustomCursor.module.css) | **MODIFIED** | Cursor dot, interactive ring, and ambient glow styles |
| [app/globals.css](file:///c:/Portfolio-Website-/app/globals.css) | **MODIFIED** | Desktop cursor override rule |
| [hooks/useGlassTilt.js](file:///c:/Portfolio-Website-/hooks/useGlassTilt.js) | **NEW** | Reusable 3D glass tilt hook with specular glare and directional shadow |
| [components/GlassTiltCard.jsx](file:///c:/Portfolio-Website-/components/GlassTiltCard.jsx) | **NEW** | Declarative 3D tilt card wrapper |
| [components/FeaturedProjects.jsx](file:///c:/Portfolio-Website-/components/FeaturedProjects.jsx) | **MODIFIED** | Wrapped project cards with 3D glass tilt |
| [app/projects/page.js](file:///c:/Portfolio-Website-/app/projects/page.js) | **MODIFIED** | Wrapped project cards with 3D glass tilt |
| [components/AboutPreview.jsx](file:///c:/Portfolio-Website-/components/AboutPreview.jsx) | **MODIFIED** | Wrapped stat cards with 3D glass tilt |
| [components/SkillsSnapshot.jsx](file:///c:/Portfolio-Website-/components/SkillsSnapshot.jsx) | **MODIFIED** | Wrapped certification chips with 3D glass tilt |
| [components/FloatingAIOrb.jsx](file:///c:/Portfolio-Website-/components/FloatingAIOrb.jsx) | **NEW** | Persistent 3D luminous AI assistant floating sphere |
| [components/FloatingAIOrb.module.css](file:///c:/Portfolio-Website-/components/FloatingAIOrb.module.css) | **NEW** | 3D sphere gradient, breathing aura animation, and tooltip |
| [app/layout.js](file:///c:/Portfolio-Website-/app/layout.js) | **MODIFIED** | Mounted `FloatingAIOrb` globally |
| [components/MindsetCards.jsx](file:///c:/Portfolio-Website-/components/MindsetCards.jsx) | **MODIFIED** | Updated glow overlay to sage palette |
