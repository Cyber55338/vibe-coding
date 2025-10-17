# User Flow Diagram
## Vibe Coding: High-Level User Journeys

**Version:** 1.0
**Date:** 2025-10-18
**Purpose:** Visual representation of key user paths through the application

---

## 1. Overall Application Flow

```
                    ┌──────────────────┐
                    │   LANDING PAGE   │
                    │  (Marketing)     │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   SIGN UP/LOGIN  │
                    │   (Auth0)        │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   ONBOARDING     │
                    │   (Tutorial)     │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │    MAIN HUB      │
                    │  (Progress Map)  │
                    └────┬──┬──┬──┬────┘
                         │  │  │  │
        ┌────────────────┘  │  │  └──────────────┐
        │                   │  │                 │
    ┌───▼────┐      ┌──────▼──▼──────┐     ┌────▼─────┐
    │ PROFILE│      │   CHALLENGE     │     │ SANDBOX  │
    │        │      │     MODE        │     │   MODE   │
    └────────┘      └────────┬────────┘     └──────────┘
                             │
                    ┌────────▼─────────┐
                    │   CODE EDITOR    │
                    │   (Build)        │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │  EXECUTE & TEST  │
                    │  (Measure)       │
                    └────┬─────┬───────┘
                         │     │
                   Fail  │     │  Pass
                    ┌────▼─┐ ┌─▼────┐
                    │ HINT │ │ NEXT │
                    │(Adapt)│ │LEVEL │
                    └──────┘ └──────┘
```

---

## 2. First-Time User Journey (Critical Path)

### Journey A: Complete Beginner

```
START: User lands on website
│
├─► [1] Landing Page
│   │   ├─ Read value proposition
│   │   ├─ Watch 30s demo video
│   │   └─ Click "Start Learning Free"
│   │
│   └─► [2] Sign Up
│       │   ├─ Email + password OR
│       │   ├─ Google OAuth OR
│       │   └─ GitHub OAuth
│       │
│       └─► [3] Welcome Survey (Optional, 30 seconds)
│           │   ├─ "What's your coding experience?"
│           │   │   • Never coded
│           │   │   • Some experience ✓
│           │   │   • Already know basics
│           │   ├─ "What's your goal?"
│           │   │   • Career change
│           │   │   • Hobby/curiosity ✓
│           │   │   • Academic
│           │   └─ "How much time per week?"
│           │       • 1-2 hours ✓
│           │       • 3-5 hours
│           │       • 5+ hours
│           │
│           └─► [4] Interactive Tutorial (5 minutes)
│               │
│               ├─ Screen 1: "Welcome to Neo-Binary City"
│               │   ├─ Character intro (Vari the Librarian)
│               │   ├─ Story context
│               │   └─ Click "Help Vari" →
│               │
│               ├─ Screen 2: "Your First Program"
│               │   ├─ Show pre-built blocks
│               │   ├─ Instruction: "Drag the PRINT block"
│               │   ├─ Visual highlight of correct area
│               │   ├─ User drags block
│               │   └─ Click "Run" →
│               │
│               ├─ Screen 3: "See Your Code Execute"
│               │   ├─ Animated execution trace
│               │   ├─ Output displayed: "Hello, World!"
│               │   ├─ Success feedback ✓
│               │   └─ Click "Continue" →
│               │
│               ├─ Screen 4: "Now You Try"
│               │   ├─ Task: Print your name
│               │   ├─ Hints available (?)
│               │   ├─ User solves
│               │   └─ Success! →
│               │
│               └─ Screen 5: "Tutorial Complete!"
│                   ├─ Achievement unlocked
│                   ├─ "You're ready to explore"
│                   └─ Click "Enter the City" →
│
└─► [5] Main Hub (Progress Map)
    │   ├─ See available districts
    │   ├─ Module 1 (Sequence Station) highlighted
    │   ├─ Click Module 1
    │   │
    │   └─► [6] Challenge 1.1
    │       ├─ Read story context
    │       ├─ Understand goal
    │       ├─ Build solution
    │       ├─ Execute & validate
    │       ├─ Pass → Next challenge
    │       └─ Repeat...
    │
    └─► ENGAGED USER (returns for more)

TIME TO VALUE: 5-10 minutes (tutorial complete, first real challenge solved)
```

---

## 3. Challenge Completion Flow (Core Loop)

```
┌─────────────────────────────────────────────────────────┐
│              CHALLENGE SCREEN LAYOUT                    │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Challenge 2.3: Pattern Maker                    │  │
│  │  [Home] [Help] [Sandbox]                [Avatar] │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  STORY & INSTRUCTIONS                            │  │
│  │  "Loop needs your help creating a repeating      │  │
│  │   pattern for her new track..."                  │  │
│  │                                                  │  │
│  │  Goal: Print numbers 1-5, three times           │  │
│  │  Expected output: 1 2 3 4 5 / 1 2 3 4 5 / ...   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌────────────────────┬────────────────────────────┐  │
│  │  BLOCK PALETTE     │  CODE WORKSPACE            │  │
│  │  (Visual/Text)     │  (Editor)                  │  │
│  │                    │                            │  │
│  │  • Loops           │  for (i = 0; i < 3; i++) { │  │
│  │  • Variables       │    for (j = 1; j <= 5; j++){ │
│  │  • Print           │      print(j)              │  │
│  │                    │    }                       │  │
│  │  [? Hint]          │  }                         │  │
│  └────────────────────┴────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  [Clear] [Undo] [Redo]          [▶ RUN CODE]    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  OUTPUT:                                         │  │
│  │  > 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5                │  │
│  │  ✓ Test 1: Passed                               │  │
│  │  ✓ Test 2: Passed                               │  │
│  │  ✓ Test 3: Passed                               │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Detailed Step-by-Step Flow

```
[1] Challenge Loads
    ├─ Story/context displayed
    ├─ Instructions clear
    ├─ Example shown (if applicable)
    └─ Editor ready

[2] User Reads & Understands
    ├─ Can click [?] for clarification
    ├─ Can view example solutions (previous challenges)
    └─ Can watch concept video (if available)

[3] User Writes Code
    │
    ├─► [Block Mode]
    │   ├─ Drag blocks from palette
    │   ├─ Snap to connect
    │   ├─ Real-time validation (syntax)
    │   └─ Preview code in text
    │
    └─► [Text Mode]
        ├─ Type code directly
        ├─ Auto-complete suggestions
        ├─ Syntax highlighting
        └─ Live error detection

[4] User Clicks "Run Code"
    │
    ├─ Animation: Code submitting
    ├─ Execution starts (sandboxed)
    │
    ├─► [Execution Visualization]
    │   ├─ Lines highlight as they run
    │   ├─ Variable values shown inline
    │   ├─ Output streams to console
    │   └─ Can pause/step/replay
    │
    └─► [Test Validation]
        ├─ Test 1 runs → Result
        ├─ Test 2 runs → Result
        └─ Test 3 runs → Result

[5] Results Displayed
    │
    ├─► [ALL TESTS PASS] ✓
    │   │
    │   ├─ Success animation
    │   ├─ Feedback message: "Excellent work!"
    │   ├─ Metrics displayed:
    │   │   • Correctness: 100%
    │   │   • Efficiency: 8/10
    │   │   • Elegance: 7/10
    │   │   • Time: 3m 24s
    │   │
    │   ├─ Optional: View solution analysis
    │   ├─ Optional: See community solutions
    │   │
    │   └─► [Next Challenge] button appears
    │       └─ Click → Load next challenge
    │
    └─► [SOME TESTS FAIL] ✗
        │
        ├─ Specific test failures shown:
        │   • Test 1: ✓ Passed
        │   • Test 2: ✗ Failed (expected: 5, got: 4)
        │   • Test 3: ✓ Passed
        │
        ├─ Error explanation (human-readable)
        ├─ Highlight problematic code (if detectable)
        │
        ├─► USER OPTIONS:
        │   │
        │   ├─ [Try Again] → Edit code → Re-run
        │   │
        │   ├─ [Get Hint] → AI Agent provides guidance
        │   │   │
        │   │   ├─ Hint Level 1: Gentle question
        │   │   │   "Are you handling all edge cases?"
        │   │   │
        │   │   ├─ Hint Level 2: Direction
        │   │   │   "Check your loop condition"
        │   │   │
        │   │   └─ Hint Level 3: Specific
        │   │       "Try using <= instead of <"
        │   │
        │   ├─ [View Example] → Similar solved problem
        │   │
        │   ├─ [Ask Community] → Post question (optional)
        │   │
        │   └─ [Skip for Now] → Mark for later, move on
        │
        └─► User iterates until success or skips
```

---

## 4. User Decision Tree

```
                      USER ENTERS APP
                            │
                ┌───────────┴───────────┐
                │                       │
        RETURNING USER          NEW USER
                │                       │
                │                ┌──────▼──────┐
                │                │ ONBOARDING  │
                │                │  TUTORIAL   │
                │                └──────┬──────┘
                │                       │
                └───────────┬───────────┘
                            │
                    ┌───────▼────────┐
                    │   MAIN HUB     │
                    │ (Progress Map) │
                    └───┬────┬───┬───┘
                        │    │   │
        ┌───────────────┘    │   └──────────────┐
        │                    │                  │
    ┌───▼────┐         ┌─────▼─────┐      ┌────▼─────┐
    │Continue│         │ Explore   │      │  Free    │
    │Current │         │ New Area  │      │ Create   │
    │Challenge│        └─────┬─────┘      │(Sandbox) │
    └───┬────┘               │            └────┬─────┘
        │                    │                 │
        │         ┌──────────┼─────────┐       │
        │         │          │         │       │
        │    ┌────▼───┐ ┌────▼───┐ ┌──▼───┐   │
        │    │Practice│ │ Next   │ │Social│   │
        │    │ Past   │ │Module  │ │Space │   │
        │    │Concepts│ └────┬───┘ └──┬───┘   │
        │    └────┬───┘      │        │       │
        │         │          │        │       │
        └─────────┴──────────┴────────┴───────┘
                         │
                  ┌──────▼──────┐
                  │  CHALLENGE  │
                  │    SCREEN   │
                  └──────┬──────┘
                         │
                  [Core Loop Begins]
```

---

## 5. Adaptive Learning Paths

```
USER COMPLETES CHALLENGE
         │
         ▼
   ┌─────────────┐
   │   ANALYZE   │◄──── AI Analyzer Agent
   │ PERFORMANCE │      monitors solution
   └──────┬──────┘
          │
    ┌─────┴─────┐
    │           │
Fast Solve   Struggled
    │           │
    ▼           ▼
┌────────┐  ┌────────┐
│INCREASE│  │MAINTAIN│
│ PACE   │  │OR HELP │
└───┬────┘  └───┬────┘
    │           │
    ▼           ▼
┌────────┐  ┌────────┐
│ Skip   │  │ Add    │
│Optional│  │Practice│
│Content │  │Problems│
└───┬────┘  └───┬────┘
    │           │
    └─────┬─────┘
          ▼
    NEXT CHALLENGE
    (Personalized)
```

---

## 6. BMAD Method Flow (Detailed)

```
┌──────────────────────────────────────────────┐
│             BUILD PHASE                      │
│  ┌────────────────────────────────────────┐  │
│  │  User constructs code solution         │  │
│  │  ├─ Visual blocks OR text editor       │  │
│  │  ├─ Real-time syntax validation        │  │
│  │  ├─ Inline documentation               │  │
│  │  └─ Auto-complete suggestions          │  │
│  └────────────────────────────────────────┘  │
└──────────────────┬───────────────────────────┘
                   ▼
┌──────────────────────────────────────────────┐
│            MEASURE PHASE                     │
│  ┌────────────────────────────────────────┐  │
│  │  Code execution & analysis             │  │
│  │  ├─ Run test cases                     │  │
│  │  ├─ Measure performance                │  │
│  │  │   • Execution time                  │  │
│  │  │   • Memory usage                    │  │
│  │  │   • Cyclomatic complexity           │  │
│  │  ├─ Assess correctness (pass/fail)     │  │
│  │  ├─ Evaluate elegance (style)          │  │
│  │  └─ Generate metrics report            │  │
│  └────────────────────────────────────────┘  │
└──────────────────┬───────────────────────────┘
                   ▼
              ┌─────────┐
              │ PASSED? │
              └────┬────┘
                   │
        ┌──────────┴──────────┐
        │ YES                 │ NO
        ▼                     ▼
┌─────────────────┐  ┌──────────────────────────┐
│  DEPLOY PHASE   │  │     ADAPT PHASE          │
│                 │  │  ┌────────────────────┐  │
│  ├─ Show       │  │  │ AI Guide Agent     │  │
│  │   results   │  │  │ analyzes failure   │  │
│  ├─ Display    │  │  └─────────┬──────────┘  │
│  │   metrics   │  │            ▼             │
│  ├─ Save       │  │  ┌────────────────────┐  │
│  │   solution  │  │  │ Provide adaptive   │  │
│  ├─ Share      │  │  │ feedback:          │  │
│  │   (optional)│  │  │ ├─ Contextual hint │  │
│  └─ Progress   │  │  │ ├─ Suggest approach│  │
│       to next   │  │  │ ├─ Simplify task  │  │
│                 │  │  │ └─ Show example   │  │
│                 │  │  └─────────┬──────────┘  │
│                 │  │            │             │
│                 │  │            ▼             │
│                 │  │     User refines code    │
│                 │  │            │             │
│                 │  │            └──► MEASURE  │
│                 │  │                (retry)   │
└─────────────────┘  └──────────────────────────┘
```

---

## 7. Frustration Detection & Intervention Flow

```
USER SOLVING CHALLENGE
         │
         ▼
┌─────────────────┐
│  Monitor User   │◄──── Background Analyzer Agent
│  Behavior       │      • Failed attempts count
└────────┬────────┘      • Time on problem
         │               • Code churn rate
         │               • Quit attempts
         ▼
    Frustration
    Detected?
         │
    ┌────┴────┐
    │ NO      │ YES
    ▼         ▼
Keep      ┌────────────┐
Going     │ INTERVENE  │
          └──────┬─────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
     ▼           ▼           ▼
┌─────────┐ ┌────────┐ ┌─────────┐
│ Gentle  │ │Simplify│ │ Suggest │
│  Hint   │ │Problem │ │  Break  │
└─────────┘ └────────┘ └─────────┘
     │           │           │
     └───────────┴───────────┘
                 │
                 ▼
        ┌────────────────┐
        │ User chooses:  │
        │ • Try hint     │
        │ • Continue     │
        │ • Skip problem │
        │ • Take break   │
        └────────────────┘
```

---

## 8. Social & Community Flow (Optional Features)

```
USER IN CHALLENGE
       │
       ▼
Wants to see
other solutions?
       │
       ▼
┌──────────────────┐
│  SOLUTION        │
│  GALLERY         │
│  ┌────────────┐  │
│  │ Filter by: │  │
│  │ • Popular  │  │
│  │ • Elegant  │  │
│  │ • Fast     │  │
│  │ • Recent   │  │
│  └────────────┘  │
└────┬─────────────┘
     │
     ▼
Select solution
     │
     ▼
┌──────────────────┐
│  VIEW SOLUTION   │
│  ├─ Code display │
│  ├─ Metrics      │
│  ├─ Comments     │
│  └─ Author       │
└────┬─────────────┘
     │
     ├─► [Fork/Remix] → Edit in sandbox
     ├─► [Upvote] → Thank creator
     ├─► [Comment] → Discuss approach
     └─► [Report] → Flag inappropriate
```

---

## 9. Progress Tracking Flow

```
USER ACTIVITY
     │
     ├─► Challenge completed ──┐
     ├─► Time spent ────────────┤
     ├─► Hints used ────────────┤
     ├─► Attempts made ─────────┼──► ANALYTICS ENGINE
     ├─► Solutions saved ───────┤
     └─► Social interactions ───┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │ UPDATE PROFILE  │
                        │ ├─ XP gained    │
                        │ ├─ Level up?    │
                        │ ├─ Achievements │
                        │ └─ Skill tree   │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │ INFORM USER     │
                        │ (Non-intrusive) │
                        │ • Progress bar  │
                        │ • Subtle badge  │
                        └─────────────────┘
```

---

## 10. Sandbox Mode Flow

```
USER SELECTS SANDBOX
         │
         ▼
┌──────────────────────┐
│  SANDBOX OPTIONS     │
│  ├─ Blank canvas     │
│  ├─ Template         │
│  └─ Continue project │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  CODE EDITOR         │
│  (Full freedom)      │
│  ├─ All commands     │
│  ├─ Asset library    │
│  ├─ No restrictions  │
│  └─ Auto-save        │
└──────┬───────────────┘
       │
       ├─► Write code
       ├─► Test/Run
       ├─► Iterate
       │
       ▼
┌──────────────────────┐
│  PROJECT ACTIONS     │
│  ├─ Save             │
│  ├─ Rename           │
│  ├─ Share (public)   │
│  ├─ Export code      │
│  └─ Delete           │
└──────────────────────┘
```

---

## 11. Mobile User Flow (Future)

```
MOBILE USER
     │
     ▼
Optimized
Experience
     │
     ├─► Simplified block UI (larger touch targets)
     ├─► Swipe navigation
     ├─► Bottom sheet for palettes
     ├─► Full-screen code view
     ├─► Voice input option (advanced)
     └─► Offline mode (sync when online)
```

---

## 12. Error State Flows

### Network Error
```
Network issue detected
         │
         ▼
┌─────────────────────┐
│  ERROR MESSAGE      │
│  "Connection lost"  │
│  [Retry] [Offline]  │
└──────┬──────────────┘
       │
       ├─► Retry → Reconnect
       └─► Offline → Limited functionality
```

### Code Execution Timeout
```
Code runs > 5 seconds
         │
         ▼
┌─────────────────────┐
│  TIMEOUT WARNING    │
│  "Infinite loop?"   │
│  [Stop] [Debug]     │
└──────┬──────────────┘
       │
       ├─► Stop → Review code
       └─► Debug → Step through
```

### Sandbox Security Violation
```
Restricted API called
         │
         ▼
┌─────────────────────┐
│  SECURITY ERROR     │
│  "Not allowed"      │
│  [Learn Why]        │
└──────┬──────────────┘
       │
       └─► Educational explanation
```

---

## 13. Key User Flows Summary

### Critical Path (Shortest time to value)
1. Land on site → 0 min
2. Sign up → 1 min
3. Tutorial (optional skip) → 6 min
4. First challenge → 10 min
5. Success! → 12 min

**Goal:** 80% of users reach step 5 within 15 minutes

### Engagement Loop (Daily user)
1. Return to app
2. See progress / continue challenge
3. Complete 2-3 challenges (20 min)
4. Optional: Explore sandbox (10 min)
5. Exit with desire to return

**Goal:** 60% return within 7 days

### Mastery Path (Committed learner)
1. Complete all 6 modules (20-30 hours)
2. Build sandbox projects (10+ hours)
3. Participate in community (optional)
4. Achieve certification
5. Progress to advanced tracks

**Goal:** 30% complete Module 1, 10% complete all modules

---

## Conclusion

These user flows provide a comprehensive map of how users will interact with Vibe Coding, from first impression to long-term engagement. The flows emphasize:

- **Minimal friction** to first value
- **Gentle learning curve** with adaptive support
- **Flow state preservation** through thoughtful UX
- **Multiple engagement paths** for different user types
- **Safety nets** for frustration and errors

All flows support the core mission: make coding accessible, enjoyable, and effective for all learners.

---

**Document Status:** Living document
**Last Updated:** 2025-10-18
**Owner:** Product & UX Design Team
**Next Review:** After prototyping phase
