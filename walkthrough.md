# Hero 3D Element Enhancement Walkthrough

Detailed overview of the interactive 3D Geometric Shape + Neural Network Core implemented for the Hero section.

## Core Features Implemented

### 1. Central Geometric Shape (AI/Engineering Core)
- **Geometry**: Smooth mathematical **Torus Knot** (`p=2, q=3`, tube radius `0.26`, radius `0.92`, `128x32` segments) representing structured engineering and AI complexity.
- **Material**: `MeshStandardMaterial` with `roughness: 0.35`, `metalness: 0.15`, and `--accent` (`#6B7F5E`) base color.
- **Visual Depth**: Clear specular highlights, soft surface shadow gradation, and rich three-dimensional contouring.

### 2. Neural Network Nodes & Connections
- **Orbital Shell Nodes**: 11 nodes (desktop) / 7 nodes (mobile) positioned organically in a spherical orbit around the central core using golden spiral distribution.
- **Glow & Shading**: Nodes rendered with `MeshStandardMaterial` (`#93A886`), emissive glow (`#93A886`, intensity `0.4`), and roughness `0.3`.
- **Dynamic Breathing Animation**: Each node independently pulses in scale (0.90x to 1.15x) and micro-drifts along its radial vector with phase-offset sine waves.
- **Translucent Connecting Lines**: `LineSegments` linking proximate node pairs (restricted to avoid clutter) and connecting select nodes to the central core with `--accent-light` (`#93A886`) at `0.35` opacity.

### 3. Interactive 360° Drag-to-Rotate (OrbitControls)
- **Single Grouping**: Central shape, nodes, and line segments rotate together seamlessly in a unified `THREE.Group`.
- **Idle Auto-Rotation**: Smooth auto-rotation at speed `1.2`.
- **Free 360° Drag Interaction**: Smooth override while dragging in any direction with inertia damping (`dampingFactor: 0.05`).
- **Resumption**: Automatically resumes idle auto-rotation after 1.4s of inactivity.
- **Cursor Feedback**: Container displays `grab` cursor on hover, transitioning to `grabbing` during active drag.

### 4. Lighting & Color Palette
- **Ambient Light**: `0.55` intensity for balanced base illumination.
- **Directional Light (Key)**: Positioned at `[3, 3, 3]`, intensity `1.15` for crisp top-front highlights.
- **Directional Light (Fill)**: Positioned at `[-3, -2, -2]`, sage-tinted (`#93A886`) at `0.45` intensity.
- **Directional Light (Rim)**: Positioned at `[0, -3, 2]`, soft muted sage (`#A8B5A0`) at `0.3` intensity.

---

## File Changes Summary

| File | Status | Description |
|---|---|---|
| [components/Hero3DElement.jsx](file:///c:/Portfolio-Website-/components/Hero3DElement.jsx) | **NEW** | Interactive 3D Torus Knot + Neural Network with OrbitControls & dynamic lines |
| [components/Hero3DElement.module.css](file:///c:/Portfolio-Website-/components/Hero3DElement.module.css) | **NEW** | Responsive canvas container, ambient glow, interactive hint & grab cursors |
| [components/Hero.jsx](file:///c:/Portfolio-Website-/components/Hero.jsx) | **MODIFIED** | Dynamic client lazy-load of `Hero3DElement` in the hero visual column |
| [components/Hero3DOrganicBlob.jsx](file:///c:/Portfolio-Website-/components/Hero3DOrganicBlob.jsx) | **MODIFIED** | Re-exported `Hero3DElement` for backward compatibility |
| [package.json](file:///c:/Portfolio-Website-/package.json) | **MODIFIED** | Added `three`, `@react-three/fiber`, and `@react-three/drei` dependencies |

---

## Verification & Interaction Checklist

- [x] **Central Shape**: Smooth Torus Knot with clean highlights and sage palette (`#6B7F5E`).
- [x] **Neural Nodes**: Spheres glowing with `--accent-light` (`#93A886`) and pulsing subtly.
- [x] **Connections**: Subtle translucent lines connecting nearby nodes without visual clutter.
- [x] **Interaction**: 360° rotation on click/drag with `grab`/`grabbing` cursor states.
- [x] **Idle Behavior**: Smooth auto-rotation when idle, pausing on drag and resuming seamlessly.
- [x] **Performance**: High FPS WebGL rendering, zero SSR blockage via Next.js dynamic import.
