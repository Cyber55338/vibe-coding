# Vibe Coding - Project Structure

```
vibe-coding/
│
├── .git/                           # Git repository
├── .gitignore                      # Git ignore patterns
├── README.md                       # Main project documentation
├── package.json                    # Root package.json (workspace)
├── PROJECT_STRUCTURE.md            # This file
│
├── docs/                           # All design documentation
│   ├── PRD.md                      # Product Requirements
│   ├── GAME_DESIGN_DOCUMENT.md     # Game design specs
│   ├── ROADMAP.md                  # Development roadmap
│   ├── USER_FLOW.md                # User journey flows
│   ├── UI_UX_SPECIFICATIONS.md     # Design system
│   └── BMAD_AGENTIC_FLOW.md        # Technical architecture
│
├── frontend/                       # Next.js React application
│   ├── public/                     # Static assets
│   │   ├── icons/                  # UI icons (SVG)
│   │   ├── sounds/                 # Audio files
│   │   └── images/                 # Images
│   │
│   ├── src/
│   │   ├── app/                    # Next.js app directory
│   │   │   ├── layout.tsx          # Root layout
│   │   │   ├── page.tsx            # Landing page
│   │   │   ├── auth/               # Authentication pages
│   │   │   ├── hub/                # Main progress hub
│   │   │   ├── challenge/          # Challenge screens
│   │   │   ├── sandbox/            # Sandbox mode
│   │   │   └── profile/            # User profile
│   │   │
│   │   ├── components/             # React components
│   │   │   ├── ui/                 # Base UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── ...
│   │   │   ├── editor/             # Code editors
│   │   │   │   ├── BlockEditor.tsx # Blockly visual editor
│   │   │   │   ├── TextEditor.tsx  # Monaco text editor
│   │   │   │   └── HybridEditor.tsx
│   │   │   ├── challenge/          # Challenge components
│   │   │   │   ├── ChallengeView.tsx
│   │   │   │   ├── TestResults.tsx
│   │   │   │   └── HintPanel.tsx
│   │   │   └── agents/             # AI agent UI
│   │   │       ├── GuideAgent.tsx
│   │   │       └── AgentMessage.tsx
│   │   │
│   │   ├── lib/                    # Utilities and helpers
│   │   │   ├── api.ts              # API client
│   │   │   ├── websocket.ts        # WebSocket client
│   │   │   ├── codeExecution.ts    # Frontend code validation
│   │   │   └── analytics.ts        # Analytics tracking
│   │   │
│   │   ├── store/                  # Redux state management
│   │   │   ├── index.ts            # Store configuration
│   │   │   ├── slices/
│   │   │   │   ├── userSlice.ts
│   │   │   │   ├── challengeSlice.ts
│   │   │   │   └── agentSlice.ts
│   │   │   └── hooks.ts            # Typed hooks
│   │   │
│   │   ├── styles/                 # Global styles
│   │   │   ├── globals.css         # Global CSS
│   │   │   ├── tokens.css          # Design tokens (CSS vars)
│   │   │   └── animations.css      # Animation definitions
│   │   │
│   │   └── types/                  # TypeScript types
│   │       ├── challenge.ts
│   │       ├── user.ts
│   │       └── agent.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   └── tailwind.config.js          # Tailwind CSS config
│
├── backend/                        # Node.js Express API
│   ├── src/
│   │   ├── server.ts               # Express server entry
│   │   │
│   │   ├── api/                    # API routes
│   │   │   ├── auth.ts             # Authentication
│   │   │   ├── users.ts            # User management
│   │   │   ├── challenges.ts       # Challenge CRUD
│   │   │   ├── attempts.ts         # Challenge attempts
│   │   │   ├── solutions.ts        # Solution sharing
│   │   │   └── progress.ts         # User progress
│   │   │
│   │   ├── services/               # Business logic
│   │   │   ├── authService.ts
│   │   │   ├── challengeService.ts
│   │   │   ├── codeExecutionService.ts
│   │   │   ├── bmadService.ts      # BMAD workflow
│   │   │   └── agentService.ts     # Agent communication
│   │   │
│   │   ├── models/                 # Database models (Prisma/TypeORM)
│   │   │   ├── User.ts
│   │   │   ├── Challenge.ts
│   │   │   ├── Attempt.ts
│   │   │   ├── Solution.ts
│   │   │   └── AgentLog.ts
│   │   │
│   │   ├── middleware/             # Express middleware
│   │   │   ├── auth.ts             # JWT verification
│   │   │   ├── errorHandler.ts
│   │   │   ├── rateLimiter.ts
│   │   │   └── validator.ts
│   │   │
│   │   ├── websocket/              # WebSocket server
│   │   │   ├── socketServer.ts
│   │   │   └── handlers/
│   │   │       ├── codeExecution.ts
│   │   │       └── agentEvents.ts
│   │   │
│   │   ├── sandbox/                # Code execution sandbox
│   │   │   ├── vm2Sandbox.ts       # VM2 implementation
│   │   │   ├── testRunner.ts       # Test case execution
│   │   │   └── securityValidator.ts
│   │   │
│   │   ├── utils/                  # Utility functions
│   │   │   ├── codeAnalyzer.ts     # AST parsing
│   │   │   ├── scorer.ts           # Scoring algorithms
│   │   │   └── logger.ts           # Logging
│   │   │
│   │   └── config/                 # Configuration
│   │       ├── database.ts
│   │       ├── redis.ts
│   │       └── agents.ts
│   │
│   ├── prisma/                     # Prisma ORM
│   │   ├── schema.prisma           # Database schema
│   │   └── migrations/
│   │
│   ├── tests/                      # Backend tests
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example                # Environment variables template
│
├── agents/                         # Python AI agent services
│   ├── main.py                     # FastAPI entry point
│   │
│   ├── agents/                     # Agent implementations
│   │   ├── __init__.py
│   │   ├── base_agent.py           # Base agent class
│   │   ├── guide_agent.py          # Tutorial & hints
│   │   ├── analyzer_agent.py       # Pattern recognition
│   │   ├── content_agent.py        # Challenge generation
│   │   └── orchestrator.py         # Agent coordinator
│   │
│   ├── services/                   # Supporting services
│   │   ├── llm_service.py          # OpenAI/Claude integration
│   │   ├── pattern_detector.py     # Rule-based analysis
│   │   ├── ml_models.py            # Custom ML models
│   │   └── hint_generator.py       # Hint creation logic
│   │
│   ├── models/                     # Pydantic models
│   │   ├── request.py              # API request models
│   │   ├── response.py             # API response models
│   │   └── agent_state.py          # Agent state models
│   │
│   ├── utils/                      # Utilities
│   │   ├── ast_parser.py           # Code AST parsing
│   │   ├── code_metrics.py         # Code quality metrics
│   │   └── templates.py            # Challenge templates
│   │
│   ├── tests/                      # Agent tests
│   │   ├── test_guide_agent.py
│   │   ├── test_analyzer_agent.py
│   │   └── test_content_agent.py
│   │
│   ├── requirements.txt            # Python dependencies
│   └── .env.example                # Environment variables
│
├── database/                       # Database scripts
│   ├── schema.sql                  # PostgreSQL schema
│   ├── seeds/                      # Seed data
│   │   ├── challenges.json         # Sample challenges
│   │   └── users.json              # Test users
│   └── migrations/                 # Manual migrations (if needed)
│
├── scripts/                        # Utility scripts
│   ├── setup.sh                    # Project setup script
│   ├── seed-db.sh                  # Database seeding
│   ├── deploy.sh                   # Deployment script
│   └── test-all.sh                 # Run all tests
│
└── docker/                         # Docker configuration (future)
    ├── docker-compose.yml
    ├── Dockerfile.frontend
    ├── Dockerfile.backend
    └── Dockerfile.agents
```

## Directory Descriptions

### `/docs`
All planning and design documentation created during the planning phase.

### `/frontend`
Next.js 14+ application with App Router, React 18, TypeScript, and Tailwind CSS.
Handles all UI, including visual/text editors, challenge interface, and user flows.

### `/backend`
Node.js/Express API server with TypeScript. Manages authentication, database operations,
code execution, and coordination with AI agents.

### `/agents`
Python FastAPI microservices for AI agents. Includes Guide, Analyzer, and Content agents
with LLM integration and ML-based code analysis.

### `/database`
Database schema, migrations, and seed data for PostgreSQL.

### `/scripts`
Automation scripts for setup, deployment, and maintenance.

## Technology Stack

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Monaco Editor
- Blockly
- Socket.io Client

**Backend:**
- Node.js 20+
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- Socket.io Server
- VM2 (code sandboxing)

**AI Agents:**
- Python 3.11+
- FastAPI
- OpenAI API / Anthropic Claude
- Custom ML models
- WebSocket communication

**DevOps:**
- Git/GitHub
- GitHub Actions (CI/CD)
- Docker (future)
- Vercel (frontend hosting)
- AWS/GCP (backend hosting)

## Getting Started

See the main README.md for setup instructions and development workflow.
