# Projects Section: "Level Select" Aesthetic Walkthrough

Visual restyle of the Projects section with a subtle, tasteful "game level select" aesthetic while preserving 100% of the existing content, links, structure, and functionality.

## Key Changes Implemented

### 1. Monospace Typography Chrome
- **Google Font**: Imported `JetBrains Mono` (weights 500, 600, 700) in [app/globals.css](file:///c:/Portfolio-Website-/app/globals.css) and defined `--font-mono`.
- **Eyebrow Label**: Added a small monospace section label `SELECT PROJECT // LOG_04` above the section title.

### 2. Level Badges & Status Chrome
- **Level Numbering**: Added `LEVEL 01`, `LEVEL 02`, `LEVEL 03`, and `LEVEL 04` monospace badges to each project card in [components/FeaturedProjects.jsx](file:///c:/Portfolio-Website-/components/FeaturedProjects.jsx) and [app/projects/page.js](file:///c:/Portfolio-Website-/app/projects/page.js).
- **Status Badges**: Styled `[In Progress]` and `[Case Study]` badges with clean monospace tags that complement the level indicators.

### 3. Decorative Progress Bar Divider
- Embedded a thin (4px) progress track within each card:
  - **100% Fill** (`--accent`) for deployed projects (Code Review AI, MARKD, Portfolio).
  - **Partial Fill** (`--accent` gradient) for in-progress project (Journey Curator).

### 4. Selected State Hover Glow
- Configured a soft sage outline glow and elevated drop shadow (`box-shadow: 0 0 0 1.5px var(--accent), 0 16px 36px rgba(43, 46, 39, 0.22)`) on card hover in [components/FeaturedProjects.module.css](file:///c:/Portfolio-Website-/components/FeaturedProjects.module.css) and [app/projects/projects.module.css](file:///c:/Portfolio-Website-/app/projects/projects.module.css).

---

## File Summary

| File | Status | Description |
|---|---|---|
| [app/globals.css](file:///c:/Portfolio-Website-/app/globals.css) | **MODIFIED** | Imported `JetBrains Mono` and declared `--font-mono` variable |
| [components/FeaturedProjects.jsx](file:///c:/Portfolio-Website-/components/FeaturedProjects.jsx) | **MODIFIED** | Added Level Select eyebrow, LEVEL 0X badges, and progress bars |
| [components/FeaturedProjects.module.css](file:///c:/Portfolio-Website-/components/FeaturedProjects.module.css) | **MODIFIED** | Styled Level Select badges, progress tracks, and selected hover glow |
| [app/projects/page.js](file:///c:/Portfolio-Website-/app/projects/page.js) | **MODIFIED** | Added Level Select chrome to all-projects page |
| [app/projects/projects.module.css](file:///c:/Portfolio-Website-/app/projects/projects.module.css) | **MODIFIED** | Styled Level Select chrome for all-projects page |
