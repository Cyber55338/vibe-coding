# UI/UX Specifications
## Vibe Coding: Minimal Black & White Design System

**Version:** 1.0
**Date:** 2025-10-18
**Design Philosophy:** Clarity through simplicity

---

## 1. Design Principles

### Core Philosophy: "Invisible Interface"
The best interface is one that disappears, leaving only the learning experience.

### Five Pillars

1. **Clarity Over Cleverness**
   - Every element serves a clear purpose
   - No decorative elements
   - Information hierarchy obvious at a glance

2. **Calm Technology**
   - Never interrupts flow state
   - Subtle, non-intrusive feedback
   - User initiates all interactions

3. **Progressive Disclosure**
   - Show only what's needed now
   - Advanced features hidden until relevant
   - Complexity revealed gradually

4. **Accessible by Default**
   - High contrast
   - Keyboard navigable
   - Screen reader friendly
   - Works without color

5. **Performance as Design**
   - Fast is beautiful
   - Smooth animations (never janky)
   - Instant feedback (<100ms)

---

## 2. Color System

### Primary Palette (Achromatic)

```
White        #FFFFFF   ███████   Background, canvas
Light Gray   #F5F5F5   ███████   Secondary background
Gray         #999999   ███████   Disabled, placeholders
Dark Gray    #666666   ███████   Secondary text
Near Black   #1A1A1A   ███████   UI elements, borders
Black        #000000   ███████   Primary text, code
```

### Accent Colors (Semantic Only)

```
Blue         #0066FF   ███████   Interactive elements, links
Green        #00AA00   ███████   Success, correct
Red          #CC0000   ███████   Error, incorrect
Amber        #FFAA00   ███████   Warning, attention
```

### Usage Rules

**Background:**
- Primary: `#FFFFFF` (white)
- Cards/panels: `#FFFFFF` with subtle shadow
- Hover states: `#F5F5F5` (light gray)

**Text:**
- Primary: `#000000` (black) - body text, code
- Secondary: `#666666` (dark gray) - labels, hints
- Disabled: `#999999` (gray) - inactive elements

**Interactive:**
- Default state: Black outline/text
- Hover: Blue `#0066FF`
- Active/pressed: Darker blue `#0052CC`
- Focus: 2px blue outline

**Feedback:**
- Success: Green background `#E6F7E6`, green text `#00AA00`
- Error: Red background `#FFE6E6`, red text `#CC0000`
- Warning: Amber background `#FFF7E6`, amber text `#FFAA00`

---

## 3. Typography

### Typefaces

**UI & Content:** Inter (Google Fonts)
- Modern, highly readable
- Excellent at small sizes
- Open source

**Code:** Fira Code (Google Fonts)
- Monospace with ligatures
- Clear distinction between similar characters (0/O, 1/l/I)
- Widely adopted in developer tools

### Type Scale

```
Display Large    32px / 40px   600   Inter   Page titles
Display Medium   24px / 32px   600   Inter   Section headers
Heading          20px / 28px   600   Inter   Card titles
Subheading       18px / 26px   500   Inter   Sub-sections
Body Large       16px / 24px   400   Inter   Primary content
Body             14px / 22px   400   Inter   Secondary content
Caption          12px / 18px   400   Inter   Labels, meta info
Code Large       16px / 24px   400   Fira    Code blocks
Code             14px / 20px   400   Fira    Inline code, editor
Code Small       12px / 18px   400   Fira    Annotations
```

Size / Line Height / Weight / Family / Usage

### Spacing & Rhythm

- **Letter spacing:**
  - Headings: -0.01em (slight tighten)
  - Body: 0 (default)
  - Code: 0 (default)
  - ALL CAPS: +0.05em (if ever used)

- **Paragraph spacing:** 16px between paragraphs
- **Maximum line length:** 65-75 characters (optimal readability)

### Hierarchy Example

```
┌─────────────────────────────────────────┐
│  Challenge 1.5: Variables               │  Display Medium (24px)
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                         │
│  Create a program that stores a name    │  Body Large (16px)
│  and displays a greeting.               │
│                                         │
│  EXAMPLE                                │  Caption (12px, uppercase)
│  Input: "Alice"                         │  Code (14px)
│  Output: "Hello, Alice!"                │  Code (14px)
│                                         │
└─────────────────────────────────────────┘
```

---

## 4. Spacing System

### 8-Point Grid
All spacing uses multiples of 8px for consistency and alignment.

```
4px   (0.5 unit)  Micro spacing (inline elements)
8px   (1 unit)    Tight spacing (related items)
16px  (2 units)   Base spacing (standard gaps)
24px  (3 units)   Medium spacing (section gaps)
32px  (4 units)   Large spacing (major sections)
48px  (6 units)   XL spacing (page sections)
64px  (8 units)   XXL spacing (landing page)
```

### Component Padding

```
Button            12px (vertical) × 24px (horizontal)
Input field       12px (vertical) × 16px (horizontal)
Card              24px (all sides)
Modal             32px (all sides)
Page container    32px (desktop), 16px (mobile)
```

### Layout Spacing

```
Gap between input and label:     8px
Gap between form fields:          16px
Gap between sections:             32px
Gap between major areas:          48px
```

---

## 5. Layout System

### Grid System

**Desktop (≥1024px):**
- 12-column grid
- Column width: flexible
- Gutter: 24px
- Margin: 32px

**Tablet (768-1023px):**
- 8-column grid
- Gutter: 16px
- Margin: 24px

**Mobile (<768px):**
- 4-column grid
- Gutter: 16px
- Margin: 16px

### Breakpoints

```css
/* Mobile first approach */
mobile:  0px     (default)
tablet:  768px   @media (min-width: 768px)
desktop: 1024px  @media (min-width: 1024px)
wide:    1440px  @media (min-width: 1440px)
```

### Max Content Width

- Reading content: 720px (optimal for text)
- Application UI: 1280px (prevents overly wide layouts)
- Full-width: Code editor, canvas (no limit)

### Aspect Ratios

- Video embeds: 16:9
- Thumbnail images: 1:1 or 3:2
- Hero sections: 21:9 (ultrawide)

---

## 6. Components Library

### 6.1 Buttons

#### Primary Button
```
┌─────────────────┐
│   Run Code  ▶   │  Black text on white, black border
└─────────────────┘  Hover: White text on black

Specs:
- Height: 40px (touch-friendly 44px on mobile)
- Padding: 12px 24px
- Border: 2px solid black
- Border radius: 4px
- Font: 14px, 600 weight
- Transition: all 200ms ease
```

#### Secondary Button
```
┌─────────────────┐
│   Get Hint      │  Gray text, gray border
└─────────────────┘  Hover: Dark gray

Specs:
- Same as primary
- Border: 2px solid #999999
- Text: #666666
- Hover border: #666666
```

#### Text Button (Tertiary)
```
  Skip for now →     Blue text, no border
                     Hover: Underline

Specs:
- No background/border
- Text: #0066FF
- Hover: underline
- Padding: 8px 16px
```

### 6.2 Input Fields

#### Text Input
```
┌───────────────────────────────────┐
│ Enter your name...                │  Placeholder in gray
└───────────────────────────────────┘

Specs:
- Height: 40px
- Padding: 12px 16px
- Border: 1px solid #CCCCCC
- Border radius: 4px
- Focus: 2px solid blue outline
- Font: 14px
```

#### Code Input (Multi-line)
```
┌───────────────────────────────────┐
│ let x = 5                         │  Fira Code font
│ print(x)                          │  Line numbers optional
│                                   │
└───────────────────────────────────┘

Specs:
- Min height: 120px
- Padding: 16px
- Border: 1px solid #CCCCCC
- Background: #FAFAFA (slight tint)
- Font: Fira Code, 14px
- Tab: 2 spaces (configurable)
```

### 6.3 Cards

```
┌─────────────────────────────────────┐
│                                     │
│  Card Title                         │  Heading
│                                     │
│  Card content goes here. This is    │  Body
│  a description or details.          │
│                                     │
│  [Action Button]                    │
│                                     │
└─────────────────────────────────────┘

Specs:
- Background: White
- Border: 1px solid #E5E5E5
- Border radius: 8px
- Padding: 24px
- Shadow: 0 1px 3px rgba(0,0,0,0.08) (optional)
- Hover: Shadow increases slightly
```

### 6.4 Modals (Rare Use)

```
        [Screen dimmed to 40% black]

        ┌─────────────────────────┐
        │  ×                      │  Close button top-right
        │                         │
        │  Modal Title            │  Display Medium
        │  ───────────────────    │
        │                         │
        │  Modal content here.    │  Body
        │  Keep it concise.       │
        │                         │
        │  [Cancel]  [Confirm]    │  Buttons
        │                         │
        └─────────────────────────┘

Specs:
- Max width: 480px
- Padding: 32px
- Border radius: 8px
- Shadow: 0 8px 24px rgba(0,0,0,0.15)
- Backdrop: rgba(0,0,0,0.4)
- Escape key closes
- Focus trap (tab navigation contained)
```

### 6.5 Toast Notifications

```
┌───────────────────────────────────┐
│  ✓ Challenge complete!            │  Success toast (green accent)
└───────────────────────────────────┘

Specs:
- Position: Bottom center (desktop), top (mobile)
- Width: Auto, max 400px
- Padding: 16px 24px
- Background: White
- Border: 1px solid green (#00AA00)
- Border-left: 4px solid green (accent)
- Shadow: 0 4px 12px rgba(0,0,0,0.1)
- Duration: 3s (auto-dismiss), can click to dismiss
- Animation: Slide up (in), fade out
```

### 6.6 Progress Indicators

#### Progress Bar
```
┌───────────────────────────────────┐
│ ████████████░░░░░░░░░░░░░░░  60% │
└───────────────────────────────────┘

Specs:
- Height: 8px
- Background: #E5E5E5 (track)
- Fill: #000000 (progress)
- Border radius: 4px
- Transition: width 300ms ease
```

#### Loading Spinner
```
     ◐     Rotating spinner (minimalist)

Specs:
- Size: 24px (small), 40px (medium), 64px (large)
- Color: Black
- Animation: Rotate 360° over 1s, infinite
- Style: Simple circle with gap (not elaborate)
```

### 6.7 Code Block Display

```
┌───────────────────────────────────┐
│ 1  let name = input()             │  Line numbers (gray)
│ 2  print("Hello, " + name)        │  Syntax highlighting (subtle)
└───────────────────────────────────┘

Specs:
- Background: #FAFAFA
- Border: 1px solid #E5E5E5
- Padding: 16px
- Font: Fira Code, 14px
- Line numbers: Right-aligned, 8px margin
- Syntax highlighting:
  - Keywords: Bold black
  - Strings: #666666 (dark gray)
  - Numbers: #666666
  - Comments: #999999 (gray), italic
  - Functions: Black
```

### 6.8 Tooltip

```
             [?]  ← Hover trigger
             │
             ▼
        ┌─────────────────┐
        │ Helpful tip     │
        │ appears here    │
        └─────────────────┘

Specs:
- Background: #1A1A1A (near black)
- Text: White
- Padding: 8px 12px
- Font: 12px
- Border radius: 4px
- Max width: 200px
- Appears on hover (desktop), tap (mobile)
- Delay: 300ms
- Arrow pointer to target (8px)
```

---

## 7. Iconography

### Style Guide

**Design Principles:**
- Line-based (stroke, not fill)
- 2px stroke weight
- 24×24px grid (scales to 16px, 32px)
- Round line caps and joins
- Minimal detail (iconic, not realistic)

### Icon Set (Essential Icons)

```
Play       ▶   Run code
Pause      ⏸   Pause execution
Stop       ⏹   Stop execution
Check      ✓   Success, correct
Cross      ×   Error, close
Info       ⓘ   Information
Help       ?   Help, hint
Home       ⌂   Return to hub
Settings   ⚙   Preferences
User       👤  Profile
Search     🔍  Search
Menu       ≡   Navigation menu
Back       ←   Previous
Forward    →   Next
Edit       ✎   Edit mode
Save       💾  Save
Share      ⤴   Share
Code       <>  Code view
Visual     ◫   Block view
Sandbox    📦  Sandbox mode
```

### Icon Usage

- Always include text label (icon reinforces, doesn't replace)
- Exception: Universally understood icons (×, ?, ⚙)
- Size: 20px (inline), 24px (standard), 32px (prominent)
- Color: Black (default), Blue (interactive), Gray (disabled)

---

## 8. Animation & Transitions

### Motion Principles

1. **Purposeful:** Every animation communicates state or guides attention
2. **Subtle:** Never distracting or gratuitous
3. **Fast:** 200-500ms (never sluggish)
4. **Natural:** Easing curves mimic physics

### Easing Functions

```css
ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1)     /* Entrances */
ease-in:      cubic-bezier(0.4, 0.0, 1, 1)       /* Exits */
ease-in-out:  cubic-bezier(0.4, 0.0, 0.2, 1)     /* Movements */
linear:       linear                              /* Progress indicators */
```

### Animation Durations

```
Micro:   100ms   Hover states, ripples
Fast:    200ms   Button presses, toggles
Base:    300ms   Modals, drawers, cards
Slow:    500ms   Page transitions, large movements
XL:      1000ms  Success celebrations (rare)
```

### Common Animations

**Button Hover:**
```css
transition: all 200ms ease-out;
/* Background color, text color, border */
```

**Card Appear:**
```css
opacity: 0 → 1
transform: translateY(8px) → translateY(0)
duration: 300ms
easing: ease-out
```

**Modal Open:**
```css
backdrop: opacity 0 → 1 (300ms)
modal: scale(0.95) → scale(1) (300ms ease-out)
```

**Code Execution Trace:**
```css
Highlight line:
  background: transparent → yellow (100ms)
  background: yellow → transparent (1000ms)
  total: 1100ms per line
```

**Success Checkmark:**
```css
Draw checkmark path:
  stroke-dashoffset: 20 → 0
  duration: 400ms
  easing: ease-out
```

### Motion Accessibility

- **Reduced motion:** Respect `prefers-reduced-motion` media query
- **Fallback:** Instant state changes (no animation)
- **User control:** Settings to disable all animations

---

## 9. Responsive Design

### Mobile Optimizations (<768px)

**Layout:**
- Single column (stack vertically)
- Full-width components
- Larger touch targets (min 44×44px)
- Sticky header (navigation always accessible)

**Typography:**
- Slightly smaller scale (max 24px headings)
- Maintain line height ratios

**Code Editor:**
- Full-screen mode option
- Simplified palette (bottom drawer)
- Larger blocks (easier to tap)

**Navigation:**
- Hamburger menu (≡)
- Bottom navigation bar (mobile pattern)

### Tablet Adjustments (768-1023px)

- 2-column layouts where appropriate
- Hybrid touch/mouse interactions
- Side-by-side code/output (landscape)
- Stacked code/output (portrait)

### Desktop Enhancements (≥1024px)

- 3-column layouts (palette | editor | output)
- Hover states fully utilized
- Keyboard shortcuts prominent
- Resizable panels (drag dividers)

---

## 10. Accessibility Standards

### WCAG 2.1 AA Compliance

#### Color Contrast
- Normal text: 4.5:1 minimum
- Large text (≥18px or ≥14px bold): 3:1 minimum
- UI components: 3:1 minimum

**Our contrast ratios:**
- Black on white: 21:1 ✓
- Dark gray (#666) on white: 5.7:1 ✓
- Blue (#0066FF) on white: 4.5:1 ✓
- Gray (#999) on white: 2.8:1 (disabled only, not interactive)

#### Keyboard Navigation
- All interactive elements focusable
- Logical tab order
- Visible focus indicators (2px blue outline)
- No keyboard traps
- Skip to main content link

#### Screen Readers
- Semantic HTML (proper headings, landmarks)
- ARIA labels where needed
- Alt text for all images
- Form labels explicitly associated
- Status messages announced (aria-live)

#### Other Requirements
- Text resizable to 200% (responsive)
- No content flashing >3 times/sec
- Link purpose clear from context
- Multiple ways to navigate (menu, search, breadcrumb)

### Testing Checklist
- [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Esc)
- [ ] Screen reader (NVDA/JAWS/VoiceOver)
- [ ] Color contrast analyzer
- [ ] Text resize (200%)
- [ ] Focus visible at all times
- [ ] Error messages clear and helpful

---

## 11. Dark Mode (Future Enhancement)

### Inverted Palette

```
Background   #000000   Black
Surface      #1A1A1A   Near black
Border       #333333   Dark gray
Text         #FFFFFF   White
Secondary    #999999   Gray
```

### Adjustments
- Reduce pure white (#FFFFFF → #E5E5E5) to avoid eye strain
- Increase border visibility (#333333)
- Maintain accent colors (blue, green, red, amber)
- Slightly reduce contrast (too high is harsh in dark mode)

### Implementation
- CSS custom properties (variables)
- System preference detection: `prefers-color-scheme: dark`
- Manual toggle in settings
- Persist user choice (localStorage)

---

## 12. Component States

### Interactive States

Every interactive element has these states:

**Default:**
- Normal appearance
- Clear affordance (looks clickable)

**Hover:** (Desktop only)
- Visual change within 100ms
- Cursor: pointer
- Typically: Color shift or underline

**Focus:**
- 2px blue outline (`outline: 2px solid #0066FF`)
- Never remove focus styles
- Offset: 2px from element

**Active/Pressed:**
- Immediate feedback (<100ms)
- Typically: Slightly darker or scale(0.98)

**Disabled:**
- Opacity: 0.4 OR gray color
- Cursor: not-allowed
- No hover/active states
- Aria-disabled="true"

**Loading:**
- Spinner indicator
- Text: "Loading..." OR original text + spinner
- Disabled during load
- Cannot be clicked again

### Example: Button States

```css
/* Default */
background: white;
color: black;
border: 2px solid black;

/* Hover */
background: black;
color: white;
cursor: pointer;

/* Focus */
outline: 2px solid #0066FF;
outline-offset: 2px;

/* Active */
background: #1A1A1A;
transform: scale(0.98);

/* Disabled */
opacity: 0.4;
cursor: not-allowed;
```

---

## 13. Error Handling & Empty States

### Error Messages

**Principles:**
- Human-readable (not technical jargon)
- Specific (what went wrong)
- Actionable (how to fix)
- Blame-free tone (never "You did X wrong")

**Example:**
```
❌ BAD:  "Error: undefined is not a function"
✓ GOOD:  "The function 'calculate' doesn't exist yet.
         Try defining it first with 'function calculate() { ... }'"
```

**Visual Treatment:**
- Red accent (#CC0000)
- Icon: × or ⚠
- Background: Light red (#FFE6E6) for major errors
- Inline red text for field validation

### Empty States

**When to show:**
- No search results
- No saved projects
- No challenges unlocked yet

**Components:**
- Illustration (minimal, black line art) OR large icon
- Heading: "No [items] yet"
- Body: Brief explanation
- CTA button: Primary action to resolve

**Example:**
```
┌─────────────────────────────────┐
│         📦                      │  Large icon
│                                 │
│    No saved projects yet        │  Heading
│                                 │
│    Create your first project    │  Body
│    in Sandbox mode.             │
│                                 │
│    [Open Sandbox]               │  CTA
└─────────────────────────────────┘
```

---

## 14. Sound Design (Optional)

### Audio UI Elements

**Enable by default:** No
**User control:** Settings toggle + volume slider
**Quality:** 44.1kHz, compressed

### Sound Library

```
code_snap.wav        50ms   Subtle click  Block connected
code_delete.wav      30ms   Soft whoosh   Block removed
code_run.wav         200ms  Whoosh        Code execution start
test_pass.wav        300ms  Chime         Test passed
test_fail.wav        100ms  Buzz          Test failed
challenge_complete   1000ms Melody        Challenge complete
hint_appear.wav      150ms  Pop           Hint displayed
button_click.wav     50ms   Tap           Button pressed
```

### Volume Levels
- Default: 20%
- Max: 60% (never too loud)
- Individual controls per sound type (future)

---

## 15. Print Styles (Future)

For printing code solutions or notes:

```css
@media print {
  /* Hide UI chrome */
  header, nav, footer { display: none; }

  /* Optimize for paper */
  body { background: white; color: black; }
  font-size: 12pt;

  /* Avoid page breaks in code blocks */
  pre, code { page-break-inside: avoid; }

  /* Show URLs for links */
  a[href]:after { content: " (" attr(href) ")"; }
}
```

---

## 16. Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-white: #FFFFFF;
  --color-gray-50: #F5F5F5;
  --color-gray-400: #999999;
  --color-gray-600: #666666;
  --color-gray-900: #1A1A1A;
  --color-black: #000000;

  --color-blue: #0066FF;
  --color-green: #00AA00;
  --color-red: #CC0000;
  --color-amber: #FFAA00;

  /* Typography */
  --font-ui: 'Inter', -apple-system, sans-serif;
  --font-code: 'Fira Code', 'Courier New', monospace;

  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 32px;

  /* Spacing */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;

  /* Borders */
  --border-width: 1px;
  --border-width-thick: 2px;
  --border-radius: 4px;
  --border-radius-lg: 8px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.15);

  /* Transitions */
  --transition-fast: 200ms;
  --transition-base: 300ms;
  --transition-slow: 500ms;

  --easing-in: cubic-bezier(0.4, 0.0, 1, 1);
  --easing-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --easing-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
}
```

---

## 17. Brand Expressions (Minimal)

While the UI is minimal, small touches of personality appear in:

**Loading Messages:**
- "Compiling your code..."
- "Running tests..."
- "Thinking..."

**Success Messages:**
- "Nice work!"
- "Excellent!"
- "Perfect solution!"
- "You're on fire! 🔥" (rare, after streak)

**Encouragement (after failures):**
- "Almost there!"
- "Try again?"
- "You can do this!"

**Tone:** Supportive friend, never condescending or overly enthusiastic

---

## 18. Quality Assurance Checklist

Before shipping any screen:

**Visual:**
- [ ] Follows 8px grid system
- [ ] Uses design tokens (no hard-coded values)
- [ ] Typography hierarchy clear
- [ ] Adequate whitespace
- [ ] High contrast (passes WCAG AA)
- [ ] Consistent with other screens

**Interaction:**
- [ ] All interactive elements have hover/focus/active states
- [ ] Keyboard navigable (logical tab order)
- [ ] Loading states implemented
- [ ] Error states handled gracefully
- [ ] Empty states designed

**Responsive:**
- [ ] Works on mobile (375px)
- [ ] Works on tablet (768px)
- [ ] Works on desktop (1280px)
- [ ] No horizontal scroll
- [ ] Touch targets ≥44px on mobile

**Accessibility:**
- [ ] Screen reader tested
- [ ] Keyboard-only navigation tested
- [ ] Focus always visible
- [ ] Alt text on images
- [ ] Form labels associated

**Performance:**
- [ ] No janky animations (60fps)
- [ ] Images optimized
- [ ] Fonts preloaded
- [ ] Initial load <2s

---

## 19. Design File Organization

### Figma Structure

```
📁 Vibe Coding
  📁 00 - Design System
    📄 Colors
    📄 Typography
    📄 Spacing
    📄 Icons
    📄 Components Library

  📁 01 - User Flows
    📄 Onboarding Flow
    📄 Challenge Flow
    📄 Sandbox Flow

  📁 02 - Screens
    📄 Landing Page
    📄 Auth
    📄 Main Hub
    📄 Challenge Screen
    📄 Profile
    📄 Sandbox

  📁 03 - Components (Reusable)
    📄 Buttons
    📄 Inputs
    📄 Cards
    📄 Modals

  📁 04 - Prototypes
    📄 MVP Interactive Prototype
```

### Naming Conventions

- **Frames:** `ScreenName - Variant` (e.g., "Challenge - Completed")
- **Components:** `Category/ComponentName` (e.g., "Button/Primary")
- **Layers:** Descriptive, no "Rectangle 1" or "Group 43"

---

## 20. Handoff to Development

### Developer Resources

**Provide:**
1. Figma access (with Inspect mode)
2. This specification document
3. Design tokens (CSS variables file)
4. Icon SVG exports
5. Example implementations (CodePen/Storybook)

**Communication:**
- Weekly design review meeting
- Slack channel for quick questions
- Loom videos for complex interactions

**Iteration:**
- Design is not final until shipped
- Implement → Review → Refine cycle
- Designer QA's final implementation

---

## Conclusion

This design system prioritizes clarity, accessibility, and flow state preservation. Every element serves the learning experience, never distracting from it. The minimal black-and-white aesthetic ensures timelessness, reduces cognitive load, and works beautifully across all devices and accessibility needs.

**Remember:** The best UI is invisible. If users are thinking about the interface, we've failed. They should be thinking about code.

---

**Document Status:** Living document
**Last Updated:** 2025-10-18
**Owner:** Design Team
**Next Review:** After prototyping feedback
**Version Control:** Track changes in Figma + Git
