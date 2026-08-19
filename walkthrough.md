# Build Fix Walkthrough

Pinpointed and resolved the root cause of the Vercel static page generation build error (`Element type is invalid: expected a string or a class/function but got: undefined`).

## Cause of Build Failure
- In [components/FloatingAIOrb.jsx](file:///c:/Portfolio-Website-/components/FloatingAIOrb.jsx), `FaSparkles` was imported from `react-icons/fa6`.
- `FaSparkles` does not exist in standard FontAwesome free icons, returning `undefined` at runtime.
- Because `FloatingAIOrb` is mounted in [app/layout.js](file:///c:/Portfolio-Website-/app/layout.js), React attempted to render `<undefined />` across all pages during static page generation (`/_not-found`, `/`, `/about`, `/contact`, `/projects`, `/skills`, etc.), failing the build.

## Fix Applied
- Replaced the `react-icons/fa6` import in [components/FloatingAIOrb.jsx](file:///c:/Portfolio-Website-/components/FloatingAIOrb.jsx) with a zero-dependency, inline SVG `SparklesIcon` component.
- Added both named and default exports to [hooks/useGlassTilt.js](file:///c:/Portfolio-Website-/hooks/useGlassTilt.js) for robust import compatibility.
- Verified all component imports and icon references across the repository.

---

## File Summary

| File | Status | Description |
|---|---|---|
| [components/FloatingAIOrb.jsx](file:///c:/Portfolio-Website-/components/FloatingAIOrb.jsx) | **FIXED** | Replaced `FaSparkles` import with self-contained inline SVG `SparklesIcon` |
| [hooks/useGlassTilt.js](file:///c:/Portfolio-Website-/hooks/useGlassTilt.js) | **UPDATED** | Added `export default useGlassTilt` alongside named export |
