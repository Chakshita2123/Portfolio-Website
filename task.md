# Task List: Cinematic 3D Depth System

- [x] **Core Features**
  - [x] Implement global 3D tilt interaction (Hero Section)
  - [x] Create `useMouse3D` hook for tracking mouse position
  - [x] Integrate `Magnetic` component for button/link interactions (Component created, integration reverted due to bugs)
  - [x] Develop custom 3D cursor with trailing effects

- [x] **Component Updates**
  - [x] Enhance **Hero Section** with 3D tilt and Orbit System integration
  - [/] Add **Magnetic** wrapper to Navbar links and buttons (Reverted)
  - [/] Add **Magnetic** interaction to Featured Projects buttons (Reverted)
  - [/] Add **Magnetic** interaction to Ask AI Preview buttons (Reverted)
  - [/] Add **Magnetic** interaction to About Preview persona buttons (Reverted)
  - [/] Add **Magnetic** interaction to Contact CTA buttons (Reverted)
  - [/] Add **Magnetic** interaction to Hero buttons (Reverted)

- [x] **Cinematic Transitions**
  - [x] Implement **ScrollReveal** component for section entry animations
  - [x] Update **WelcomeIntro** with fly-through exit animation

- [x] **Fixes & Refinement**
  - [x] Resolve `ReferenceError: CustomCursor is not defined` in `app/layout.js`
  - [x] Clean up code duplication in `FeaturedProjects.jsx` and `AskAIPreview.jsx`
  - [x] Verify parallax in `AnimatedBackground.jsx`
  - [x] Fix `ReferenceError: Link is not defined` in `Hero.jsx` (Reverted Magnetic)
  - [x] Fix `ReferenceError: useRef is not defined` in `Hero.jsx` (Restored imports)

- [ ] **Verification**
  - [ ] Manual test of all interactions and transitions
