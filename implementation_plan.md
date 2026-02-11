# AI-Assisted Messages Implementation Plan

## Goal
Implement an "AI-Assisted Message" feature in the `ContactCTA` component that allows users to draft a message and have it enhanced by AI before sending/copying.

## User Review Required
> [!NOTE]
> The AI logic will use a specific system prompt provided by the user to act as a "Conversation Enhancer".
> The `app/api/ai/route.js` will be updated to handle a new `mode` called `enhance-message` to bypass the standard portfolio chatbot logic.

## Proposed Changes

### 1. `app/api/ai/route.js`
#### [MODIFY] [route.js](file:///c:/Portfolio-Website-/app/api/ai/route.js)
- Add a check for `mode === 'enhance-message'` in the request body.
- If true, use the dedicated "Conversation Enhancer" system prompt provided by the user.
- Skip the standard `portfolio-context` logic for this mode.
- Return the enhanced message.

### 2. `components/ContactCTA.jsx`
#### [MODIFY] [ContactCTA.jsx](file:///c:/Portfolio-Website-/components/ContactCTA.jsx)
- Convert the static "AI Helper Card" into a functional component.
- **State Management**:
  - `message`: User's input text.
  - `isEnhancing`: Loading state.
  - `enhancedMessage`: Result from AI.
- **UI Changes**:
  - Replace the static placeholder with a real `<textarea>`.
  - Wire up the "Enhance with AI" button to call `/api/ai` with `mode: 'enhance-message'`.
  - When enhanced, show the result and allow copying or editing.

## Verification Plan

### Manual Verification
1.  **Navigate to Contact Section**: Scroll to the bottom of the homepage.
2.  **Input Draft**: Type a rough message (e.g., "hey i want u to build app for me").
3.  **Click Enhance**: specific "Enhance with AI" button.
4.  **Verify Output**: Check if the message is rewritten professionally.
5.  **Check API**: Ensure other AI features (like Ask AI or Recruiter Summary) still work normally (regression testing).
