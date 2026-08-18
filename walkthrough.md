# Hero 3D Element Enhancement & Visual Refinement

Detailed overview of the interactive 3D Geometric Shape + Neural Network Core implemented and refined for the Hero section.

## Refinements & Visual Polish

### 1. Glossy Material & Multi-Angle Lighting
- **Torus Knot Shader**: Tuned `MeshStandardMaterial` to `roughness: 0.20` and `metalness: 0.35` for rich metallic sheen with dynamic curvature highlights.
- **Lighter Base Tone**: Upgraded to a vibrant, luminous sage green (`#8FA880`) to ensure clean contrast and clear light-to-dark gradients across surface loops.
- **4-Point Lighting Scheme**:
  - **Key Light**: High-intensity (`1.4`) directional light from `[3.5, 3.5, 3.5]` for crisp top highlights.
  - **Opposing Fill Light**: Directional light at `[-3.0, -2.0, 2.0]` (`0.55`) to eliminate dark, flat underside shadows.
  - **Rim / Edge Light**: High-angle back light at `[0, 4.0, -4.0]` (`0.75`) providing a silhouette rim that separates the 3D core from the hero background.
  - **Bottom Ambient**: Subtle upward fill at `[0, -3.5, -1.0]` (`0.35`).

### 2. Tight, Cohesive Node Network (Orbital Satellite Silhouette)
- **Knot-Contour Distribution**: Nodes are mathematically mapped along the knot's parametric curves and placed at a tight radius (`1.25` - `1.40` units), sitting immediately outside the knot's silhouette like orbiting satellites.
- **Node Visibility**: Increased node size (`radius: 0.08`) and boosted emissive glow (`emissive: #93A886`, `emissiveIntensity: 0.55`) for glowing contrast against the knot.
- **Local Organic Connections**: Lines are restricted to the 2 nearest neighbors (`< 1.4` distance) with increased opacity (`0.45`), eliminating long awkward crosses.
- **Surface Anchors**: Added 4 direct anchor lines connecting select neural nodes directly to the nearest points on the knot's surface to fuse the knot and the neural network into a single unified object.

### 3. Interactive 360° Drag-to-Rotate (OrbitControls)
- Single unified group rotation in 360°.
- Idle auto-rotation (`speed: 1.2`) smoothly overrides on click/drag with inertia damping (`0.05`) and resumes after 1.4s.
- `grab` and `grabbing` cursor states.
- Clean "Drag to rotate" hint badge.

---

## File Summary

| File | Status | Description |
|---|---|---|
| [components/Hero3DElement.jsx](file:///c:/Portfolio-Website-/components/Hero3DElement.jsx) | **UPDATED** | Refined glossy material, 4-point lighting, tight orbital node distribution, and surface anchors |
| [components/Hero3DElement.module.css](file:///c:/Portfolio-Website-/components/Hero3DElement.module.css) | **STABLE** | Responsive sizing, backdrop glow, grab cursor feedback |
| [components/Hero.jsx](file:///c:/Portfolio-Website-/components/Hero.jsx) | **STABLE** | Dynamic client lazy-load of `Hero3DElement` |
