# About Section Stack Animation

## Goal
Implement a visually rich "card shuffle" effect where the next persona card comes from behind the current one and lands on top.

## User Review Required
> [!NOTE]
> I will restructure the `AboutPreview` component to render all 3 persona cards in the DOM simultaneously. They will be stacked using absolute positioning (`z-index`). This increases DOM size slightly but is necessary for the visual interaction requested.

## Proposed Changes

### 1. Component Structure (`AboutPreview.jsx`)
- Wrap the `.aiCard` area in a relative container `aiCardStack`.
- Render `personas.map((persona, index) => ...)` to create 3 cards.
- **Dynamic Classes**:
  - `active`: The visible, top card.
  - `next`: The card behind it.
  - `prev` (or hidden/waiting): The third card.
- **Auto-Cycle Logic**:
  - Keep `selectedPersona` (or better, `currentIndex` 0-2).
  - Calculate `getCardState(index)` based on `currentIndex`.

### 2. Styling (`AboutPreview.module.css`)
- **Container**: `position: relative; height: [fixed or min-content];`
- **Cards**:
  - `position: absolute; top: 0; left: 0; width: 100%;`
  - `transition: all 0.6s cubic-bezier(...)`
- **States**:
  - `.active`: `z-index: 10`, `transform: translateY(0) scale(1)`, `opacity: 1`.
  - `.next`: `z-index: 5`, `transform: translateY(10px) scale(0.96)`, `opacity: 0.8`.
  - `.prev`: `z-index: 1`, `transform: translateY(20px) scale(0.92)`, `opacity: 0.6` (or similar stack look).
- **"From Behind" Animation**:
  - When transitioning `next` -> `active`:
    - The card needs to pop out.
    - We might use a keyframe or just the transition properties.
    - "Piche se nikl kr aage aaya" -> It's essentially the stack shuffling.

## Refinement
To make it look like it comes "from behind and onto top":
- The transition for the *new* active card:
  - Start: `scale(0.96) translateY(10px)` (Behind)
  - End: `scale(1) translateY(0)` (Front)
- The transition for the *old* active card:
  - Needs to move to back? Or slide away?
  - Deck logic: Top card slides down/back to bottom. Next card rises.
  - User said "behind card comes front".
  - So: Bottom card -> Top.
  - Top card -> Middle.
  - Middle -> Bottom.
  - **Wait**: 0->1->2.
  - If 0 is top. 1 is behind. 2 is behind 1.
  - Next cycle (Active=1):
    - 0 moves to back (2's old spot).
    - 1 moves to front.
    - 2 moves to middle.
  - This is a standard carousel rotation.

## Verification
- Check smooth stacking.
- Ensure z-indices swap correctly.
- Pause on hover still applies.
