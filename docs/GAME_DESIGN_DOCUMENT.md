# Game Design Document (GDD)
## Vibe Coding: Educational Programming Game

**Version:** 1.0
**Date:** 2025-10-18
**Document Type:** Game Design Specification

---

## 1. Game Overview

### Concept Statement
Vibe Coding is a zen-like educational experience where players learn programming by solving elegant puzzles in a minimalist cyberpunk world. The game emphasizes flow state, creative problem-solving, and the satisfying feeling of code execution.

### Genre
- Educational Puzzle Game
- Visual Programming Simulator
- Zen/Flow Experience

### Target Platform
- Web (primary)
- Desktop/Tablet optimized
- Mobile (future)

### ESRB Rating
E for Everyone (Educational)

---

## 2. Core Gameplay Loop

```
┌─────────────────────────────────────────────┐
│          CORE 5-MINUTE LOOP                 │
├─────────────────────────────────────────────┤
│  1. Receive Challenge (story context)       │
│           ↓                                 │
│  2. Observe Example/Demo                    │
│           ↓                                 │
│  3. Write Code (visual/text)                │
│           ↓                                 │
│  4. Execute & See Results                   │
│           ↓                                 │
│  5. Refine Solution                         │
│           ↓                                 │
│  6. Unlock Next Challenge                   │
└─────────────────────────────────────────────┘
```

### Extended Loop (20-30 minutes)
- Complete 4-5 related challenges
- Boss puzzle synthesizing concepts
- Story progression cutscene
- New district/mechanic unlock

---

## 3. Game World & Narrative

### Setting: Neo-Binary City
A minimalist digital metropolis where everything runs on code. The city's systems are malfunctioning, and players help different characters by writing programs to fix or enhance various systems.

### Districts (Modules)
1. **Sequence Station** - Linear programming, I/O
2. **Loop Gardens** - Iteration, patterns
3. **Decision Crossroads** - Conditionals, branching logic
4. **Function Factory** - Abstraction, modularity
5. **Data District** - Arrays, objects, structures
6. **Algorithm Avenue** - Optimization, efficiency

### Characters (NPCs)
Each character represents a programming concept and has a personality:

- **Vari** (Variables) - Forgetful librarian who needs containers
- **Loop** (Iteration) - DJ who creates repetitive beats
- **Branch** (Conditionals) - Traffic controller managing flows
- **Func** (Functions) - Architect who designs reusable blueprints
- **Array** (Data Structures) - Organizer managing collections
- **Sort** (Algorithms) - Curator arranging exhibits

### Story Arc
- **Act 1:** City is glitchy, learn basics while helping locals
- **Act 2:** Discover deeper system issues, learn advanced concepts
- **Act 3:** Rebuild core systems, master integration
- **Epilogue:** Create your own programs in sandbox

---

## 4. Core Mechanics

### 4.1 Visual Programming System

#### Block-Based Coding (Levels 1-20)
```
┌─────────────────────┐
│  [Variable: name]   │
│       ↓             │
│  [Input: user]      │
│       ↓             │
│  [Print: "Hello"]   │
└─────────────────────┘
```

**Features:**
- Drag blocks from palette
- Snap-to-connect logic
- Auto-complete suggestions
- Inline value preview
- Syntax errors impossible

#### Hybrid Mode (Levels 21-40)
- Side-by-side visual and text
- Edit either view, both update
- Gradual introduction of syntax
- Optional text-only mode

#### Text-First Mode (Levels 41+)
- Full code editor
- Syntax highlighting
- Auto-completion
- Visual debugging tools

### 4.2 Code Execution Visualization

**Real-Time Execution Trace:**
- Highlighted lines as code runs
- Variable values displayed inline
- Step-through debugging
- Rewind/replay capability
- Speed control (0.5x to 4x)

**Output Visualization:**
- Console output (text)
- Graphics canvas (drawings)
- Audio synthesis (sound)
- Data visualizations (charts)
- Robot/character animation

### 4.3 Challenge Types

#### Type A: Fix the Bug
- Broken code provided
- Multiple test cases fail
- Find and fix the issue
- Learn debugging skills

#### Type B: Build from Scratch
- Requirements specified
- Blank canvas
- Multiple valid solutions
- Creativity encouraged

#### Type C: Optimization Challenge
- Working code provided
- Make it faster/shorter/cleaner
- Performance metrics shown
- Learn best practices

#### Type D: Pattern Recognition
- Series of examples shown
- Infer the rule/algorithm
- Implement the pattern
- Develop algorithmic thinking

#### Type E: Creative Sandbox
- Open-ended goal
- Use learned concepts
- Share with community
- No wrong answers

### 4.4 Difficulty Progression

**Adaptive Difficulty System:**
```
Player Skill Assessment
        ↓
    Too Easy? → Increase complexity
    Too Hard? → Add scaffolding
    Just Right? → Maintain pace
```

**Scaffolding Techniques:**
- Pre-filled code templates
- Additional hint system
- Reduced problem scope
- Extra examples

**Challenge Amplification:**
- Remove hints
- Add constraints
- Complex edge cases
- Multi-step solutions

---

## 5. BMAD Method Integration

### Build Phase Mechanics

**Code Construction Interface:**
- Palette of available commands
- Recent/favorite blocks quick access
- Search functionality
- Context-sensitive suggestions

**Live Feedback:**
- Syntax validation (real-time)
- Type checking
- Logic warnings (not errors)
- Style suggestions

### Measure Phase Mechanics

**Solution Analysis:**
```
┌──────────────────────────────┐
│  SOLUTION METRICS            │
├──────────────────────────────┤
│  ✓ Correctness: 100%         │
│  ⚡ Efficiency: 7/10          │
│  ✨ Elegance: 8/10            │
│  📚 Readability: 9/10         │
└──────────────────────────────┘
```

**Performance Tracking:**
- Test cases passed
- Execution time
- Memory usage
- Lines of code
- Code complexity score

### Adapt Phase Mechanics

**Intelligent Hints System:**
- Context-aware suggestions
- Never gives away full answer
- Asks guiding questions
- Shows relevant examples
- Adjusts to frustration level

**Alternative Pathways:**
- Multiple solution approaches
- Different difficulty branches
- Skip option (with note)
- "Come back later" feature

### Deploy Phase Mechanics

**Code Execution:**
- Animated run through
- Visual output display
- Performance report
- Save solution

**Sharing:**
- Public solution gallery
- Upvote/comment system
- Remix other solutions
- Challenge friends

---

## 6. Agentic Flow System

### AI Agent Architecture

#### 1. Guide Agent (Tutorial AI)
**Personality:** Patient mentor
**Functions:**
- Contextual hints
- Conceptual explanations
- Encouragement
- Error interpretation

**Behavior:**
- Speaks in natural language
- Appears in sidebar
- Never interrupts flow
- Activated on request or high struggle

#### 2. Analyzer Agent (Pattern Recognition)
**Functions:**
- Detects common mistakes
- Identifies misconceptions
- Suggests optimizations
- Recognizes creative solutions

**Behavior:**
- Silent background process
- Influences hint system
- Generates personalized challenges
- Updates difficulty model

#### 3. Content Agent (Dynamic Generation)
**Functions:**
- Creates similar problems
- Generates practice exercises
- Remixes existing challenges
- Personalizes learning path

**Behavior:**
- Generates on-demand practice
- Creates infinite variations
- Maintains difficulty curve
- Ensures concept coverage

#### 4. Social Agent (Community Curator)
**Functions:**
- Matches collaboration partners
- Curates solution gallery
- Suggests interesting solutions
- Facilitates discussion

**Behavior:**
- Opt-in social features
- Privacy-respecting
- Anti-harassment systems
- Promotes positive interaction

### Flow State Preservation

**No Flow Breakers:**
- ❌ No timers
- ❌ No lives/health
- ❌ No forced tutorials
- ❌ No intrusive ads
- ❌ No sudden difficulty spikes

**Flow Enhancers:**
- ✅ Immediate feedback
- ✅ Clear goals
- ✅ Sense of control
- ✅ Ambient soundscape
- ✅ Smooth progression
- ✅ Meaningful challenge

**Frustration Detection:**
```
Monitor player actions:
  - Repeated failed attempts (>5)
  - Time stuck (>3 minutes)
  - Random code changes
  - Quit/reload attempts

Response:
  1. Offer hint (gentle)
  2. Simplify problem
  3. Show example solution
  4. Suggest break/skip
```

---

## 7. User Interface Design

### UI Philosophy: Minimal Black & White

**Color Palette:**
- Background: `#FFFFFF` (white)
- Text: `#000000` (black)
- UI Elements: `#1A1A1A` (near black)
- Inactive: `#999999` (gray)
- Interactive: `#0066FF` (blue - only accent)
- Success: `#00AA00` (green)
- Error: `#CC0000` (red)
- Warning: `#FFAA00` (amber)

### Screen Layouts

#### Main Coding Screen
```
┌─────────────────────────────────────────────┐
│  [Home]  Challenge 1.5: Variables    [?]    │ ← Header
├─────────────────────────────────────────────┤
│                                             │
│  Challenge Description:                     │
│  Create a program that asks for a name      │
│  and greets the user.                       │
│                                             │
│  Example: Input "Alice" → "Hello, Alice!"   │
│                                             │
├──────────────────┬──────────────────────────┤
│                  │                          │
│  CODE BLOCKS     │     CODE EDITOR          │
│  (palette)       │     (workspace)          │
│                  │                          │
│  • Variables     │   let name = input()    │
│  • Input/Output  │   print("Hello, " +     │
│  • Operations    │         name + "!")     │
│                  │                          │
│                  │                          │
├──────────────────┴──────────────────────────┤
│  [Clear]  [Undo]  [Redo]  [Run] →          │ ← Controls
├─────────────────────────────────────────────┤
│  OUTPUT:                                    │
│  > Hello, Alice!                            │
│  ✓ Test passed (1/3)                        │
└─────────────────────────────────────────────┘
```

#### Progress Map Screen
```
┌─────────────────────────────────────────────┐
│  Neo-Binary City                    [Lvl 5] │
├─────────────────────────────────────────────┤
│                                             │
│         ╔════════════╗                      │
│         ║  SEQUENCE  ║                      │
│         ║  STATION   ║ ✓                    │
│         ╚════════════╝                      │
│              │                              │
│              │                              │
│         ╔════════════╗                      │
│         ║    LOOP    ║                      │
│         ║   GARDENS  ║ ← YOU ARE HERE       │
│         ╚════════════╝                      │
│              │                              │
│              │ 🔒                           │
│         ╔════════════╗                      │
│         ║  DECISION  ║                      │
│         ║ CROSSROADS ║                      │
│         ╚════════════╝                      │
│                                             │
│  Progress: 8/15 challenges complete         │
└─────────────────────────────────────────────┘
```

### Typography
- **Headings:** Inter, 24px, 600 weight
- **Body:** Inter, 16px, 400 weight
- **Code:** Fira Code, 14px, 400 weight
- **Line Height:** 1.6 for readability
- **Letter Spacing:** -0.01em for headings

### Animation Principles
- **Duration:** 300-500ms (never instant, never slow)
- **Easing:** Ease-out for entrances, ease-in for exits
- **Purpose:** Every animation has purpose (no decoration)
- **Subtlety:** Micro-interactions, not distractions

### Accessibility
- Keyboard shortcuts for all actions
- Screen reader friendly
- High contrast mode option
- Dyslexia-friendly font option
- Text scaling (100%-200%)
- Motion reduction option

---

## 8. Audio Design

### Sound Philosophy
Minimal, non-intrusive, optional

### Ambient Soundscape
- **Default:** Soft white noise / café ambience
- **Option:** Lo-fi beats, nature sounds, silence
- **Reactive:** Music tempo adjusts to coding pace
- **Volume:** 20% by default, user adjustable

### Sound Effects
- **Code Block Snap:** Soft click (50ms)
- **Code Run:** Subtle whoosh (200ms)
- **Success:** Pleasant chime (300ms)
- **Error:** Gentle buzz (100ms)
- **Level Complete:** Satisfying tone progression (1s)

### Voice
- **Optional:** Text-to-speech for instructions
- **Style:** Neutral, calm, encouraging
- **Language:** Multi-language support

---

## 9. Progression Systems

### Experience Progression
```
Level 1  →  Level 2  →  Level 3  →  ...  →  Level 50
   │            │            │                    │
   └── 100 XP ──┴── 150 XP ──┴──  ...  ────── 1000 XP

XP Sources:
- Complete challenge: 50 XP
- Perfect first try: +25 XP
- Optimization bonus: +10 XP
- Daily streak: +5 XP
- Help others: +15 XP
```

### Skill Tree
```
                    PROGRAMMING MASTERY
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    VARIABLES           CONTROL FLOW          DATA
        │                   │                   │
    ┌───┴───┐           ┌───┴───┐           ┌───┴───┐
  Types  Scope       Loops  Cond.        Arrays  Objects
```

### Unlockables (Non-Intrusive)
- New visual themes (still minimal)
- Code block styles
- Ambient soundscapes
- Avatar customization (simple)
- Sandbox assets (graphics, sounds)
- Advanced editor features

### Achievement System (Subtle)
- Shown in profile, not as pop-ups
- Focus on learning milestones
- No FOMO or pressure
- Examples:
  - "First Program" - Write your first code
  - "Debugger" - Fix 10 bugs
  - "Optimizer" - Improve solution efficiency
  - "Teacher" - Help 5 other learners
  - "Perfectionist" - 10 challenges solved on first try

---

## 10. Multiplayer & Social Features

### Collaborative Coding (Optional)
- **Pair Programming Mode:**
  - Two players, one problem
  - Shared code editor
  - Voice/text chat
  - Both get credit

- **Code Review:**
  - Request feedback on solution
  - Async comments
  - Learn from critique

### Community Features
- **Solution Gallery:**
  - Browse creative solutions
  - Filter by elegance, efficiency
  - Remix/fork others' code

- **Challenges:**
  - Create custom challenges
  - Share with community
  - Leaderboards (optional, hidden by default)

### Privacy & Safety
- Usernames only (no real names required)
- Moderated comments
- Report/block functionality
- Parent/teacher oversight options
- COPPA compliant

---

## 11. Learning Content Structure

### Module 1: Sequence Station (Levels 1-10)
**Concepts:** Variables, Input/Output, Basic Operations

| Level | Challenge | Concept Introduced |
|-------|-----------|-------------------|
| 1.1 | Hello World | Print statements |
| 1.2 | Echo Chamber | Input and output |
| 1.3 | Name Tag | String variables |
| 1.4 | Calculator | Number variables |
| 1.5 | Mad Libs | String concatenation |
| 1.6 | Unit Converter | Math operations |
| 1.7 | Temperature | Formulas |
| 1.8 | Multi-step | Sequential operations |
| 1.9 | Debugging Basics | Fix broken code |
| 1.10 | Boss: Story Generator | Combine all concepts |

### Module 2: Loop Gardens (Levels 11-20)
**Concepts:** For loops, While loops, Break/Continue

| Level | Challenge | Concept Introduced |
|-------|-----------|-------------------|
| 2.1 | Repeat After Me | Basic for loop |
| 2.2 | Countdown | Loop ranges |
| 2.3 | Pattern Maker | Nested loops |
| 2.4 | Until Ready | While loops |
| 2.5 | Search Party | Loop + condition |
| 2.6 | Skip and Stop | Break/continue |
| 2.7 | Accumulator | Sum in loop |
| 2.8 | Filter | Conditional collection |
| 2.9 | Debug Infinite | Fix loop bugs |
| 2.10 | Boss: ASCII Art | Complex iteration |

### [Additional modules structured similarly]

---

## 12. Sandbox Mode

### Creative Playground
**Available After:** Completing Module 1

**Features:**
- Blank canvas
- All unlocked commands
- Asset library (graphics, sounds)
- Save unlimited projects
- Share publicly

**Templates:**
- Drawing program
- Text adventure game
- Calculator
- Quiz app
- Animation tool
- Music sequencer

**Learning Integration:**
- Apply concepts freely
- Discover edge cases
- Experimental learning
- Intrinsic motivation

---

## 13. Technical Architecture

### Frontend Components
```
┌─────────────────────────────────────────┐
│         React Application               │
├─────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────┐  │
│  │ Code Editor  │  │  Visualizer     │  │
│  │ (Monaco)     │  │  (Canvas/SVG)   │  │
│  └──────────────┘  └─────────────────┘  │
│  ┌──────────────┐  ┌─────────────────┐  │
│  │ Block UI     │  │  AI Agents      │  │
│  │ (Blockly)    │  │  (WebSocket)    │  │
│  └──────────────┘  └─────────────────┘  │
├─────────────────────────────────────────┤
│        State Management (Redux)         │
├─────────────────────────────────────────┤
│          API Layer (REST/WS)            │
└─────────────────────────────────────────┘
```

### Backend Services
```
┌─────────────────────────────────────────┐
│            API Gateway (Node.js)        │
├─────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────┐  │
│  │ Auth Service │  │ User Service    │  │
│  └──────────────┘  └─────────────────┘  │
│  ┌──────────────┐  ┌─────────────────┐  │
│  │ Code Sandbox │  │ Content Service │  │
│  │ (Isolated)   │  │ (Challenges)    │  │
│  └──────────────┘  └─────────────────┘  │
│  ┌──────────────┐  ┌─────────────────┐  │
│  │ AI Agent Svc │  │ Analytics       │  │
│  │ (Python)     │  │ (Metrics)       │  │
│  └──────────────┘  └─────────────────┘  │
├─────────────────────────────────────────┤
│      Database (PostgreSQL + Redis)      │
└─────────────────────────────────────────┘
```

### Code Execution Environment
- **Sandboxed JavaScript VM**
- **Execution Timeout:** 5 seconds max
- **Memory Limit:** 50MB per execution
- **No Network Access**
- **Whitelisted APIs only**
- **Input Validation:** All user code sanitized

---

## 14. Playtesting & Iteration Plan

### Alpha Testing (Internal)
- **Week 1-2:** Team testing
- **Focus:** Core mechanics, bugs
- **Metrics:** Completion rate, time per level

### Beta Testing (Limited External)
- **Week 3-6:** 50-100 users
- **Focus:** User experience, difficulty curve
- **Metrics:** Retention, satisfaction, confusion points

### Soft Launch
- **Week 7-8:** 1000 users
- **Focus:** Scalability, content quality
- **Metrics:** All KPIs from PRD

### Continuous Improvement
- **A/B Testing:** UI variations, hint timing
- **Analytics:** Heatmaps, session recordings
- **Feedback:** In-app surveys, user interviews
- **Iteration:** Bi-weekly updates

---

## 15. Known Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Users bypass learning | Require concept demonstration before advancing |
| Frustration on hard puzzles | Adaptive hints, skip option with "try later" tag |
| Boredom on easy puzzles | Accelerated path for experienced users |
| Text code intimidation | Very gradual transition, optional visual mode |
| Multiplayer complexity | Phase 2 feature, not MVP |
| AI hint quality | Human review, training data curation |
| Content creation speed | Community-generated challenges (moderated) |

---

## 16. Future Expansions (Post-Launch)

### Additional Modules
- Module 7: Object-Oriented Programming
- Module 8: Recursion & Advanced Algorithms
- Module 9: Data Science Basics
- Module 10: Web Development

### New Game Modes
- Speed Challenges (optional)
- Code Golf (shortest solution)
- Team Competitions
- Live Events

### Language Support
- Python track
- Java track
- C++ track (advanced)

### Platform Expansion
- Native mobile apps
- VR coding environment
- IDE integration

---

## Appendices

### A. Control Scheme
**Mouse:**
- Drag & drop blocks
- Click to edit values
- Right-click for options

**Keyboard:**
- `Ctrl+Enter` - Run code
- `Ctrl+Z` - Undo
- `Ctrl+Shift+Z` - Redo
- `Ctrl+/` - Toggle comment
- `Ctrl+Space` - Auto-complete
- `F1` - Help
- `Esc` - Cancel/Close

**Touch:**
- Tap to select
- Long press for options
- Swipe to navigate
- Pinch to zoom

### B. Glossary
- **Block:** Visual representation of code
- **Challenge:** A coding puzzle/problem
- **Module:** Collection of related challenges
- **District:** Thematic world area
- **Agent:** AI system assisting player
- **Flow State:** Optimal engagement zone

### C. References
- Flow theory (Csikszentmihalyi)
- BMAD methodology
- Agentic learning systems
- Visual programming best practices
- Educational game design research

---

**Document Status:** Living document, updated throughout development
**Next Review:** After alpha testing
**Owner:** Game Design Team
