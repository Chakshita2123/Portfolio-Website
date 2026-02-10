# Task List: Cinematic 3D Depth System

- [x] **Core Features**
  - [x] Implement global 3D tilt interaction (Hero Section)
  - [x] Create `useMouse3D` hook for tracking mouse position
  - [x] Integrate `Magnetic` component for button/link interactions (Component created, integration reverted due to bugs)
  - [x] Develop custom 3D cursor with trailing effects

- [x] **Component Updates**
  - [x] Enhance **Hero Section** with 3D tilt and Orbit System integration
  - [/] Add **Magnetic** wrapper to Navbar links and buttons (Reverted)
  - [/] Add **Magnetic** wrapper (Reverted in several components)
  - [x] Implement **ScrollThoughts** micro-storytelling (System-style, transient)
  - [ ] Enhance **Hero** with revolving 3D cards (Reverted)
  - [ ] Enhance **Hero** with revolving 3D cards (Reverted)
  - [x] Animate **About Me** cards (Auto-cycle single card, Stack reverted)

- [x] **Cinematic Transitions**
  - [x] Implement **ScrollReveal** component for section entry animations
  - [x] Update **WelcomeIntro** with fly-through exit animation

- [x] **Fixes & Refinement**
  - [x] Resolve `ReferenceError: CustomCursor is not defined` in `app/layout.js`
  - [x] Clean up code duplication in `FeaturedProjects.jsx` and `AskAIPreview.jsx`
  - [x] Verify parallax in `AnimatedBackground.jsx`
  - [x] Fix `ReferenceError: Link is not defined` in `Hero.jsx` (Reverted Magnetic)
  - [x] Fix `ReferenceError: useRef is not defined` in `Hero.jsx` (Restored imports)
  - [x] Fix invalid default export import of `usePerformanceTier`
  - [x] Fix invalid default export import of `usePerformanceTier`
  - [x] Fix `TypeError` in `PortfolioExperienceProvider.jsx` (Imported `useEffect` from `next/navigation`)
  - [x] Adjust `WelcomeIntro` duration to 5s and fix `reducedMotion` default (false)

- [ ] **Verification**
  - [ ] Manual test of all interactions and transitions

- [ ] **Performance & Stability Optimization**
  - [ ] Optimize `AnimatedBackground` (Refactor to refs for 60fps)
  - [ ] Optimize `Hero` & `useMouse3D` (Direct DOM manipulation)
  - [ ] Optimize `CustomCursor` (Direct DOM manipulation)
  - [ ] Enhance `ScrollReveal` for `reducedMotion`
  - [ ] Enhance `ScrollReveal` for `reducedMotion`
  - [ ] Verify `OrbitSystem` performance on low-end devices

- [ ] **Ask AI Upgrade (Context-Aware)**
  - [ ] Create `AIContext.js` and `useAI` hook
  - [ ] Implement `api/chat/route.js` with context injection
  - [ ] Upgrade `AskAIPreview.jsx` to use new hook
  - [ ] Create "Portfolio Knowledge Map" for system prompt
  - [ ] Verify context awareness (e.g., asking about projects on /projects page)
