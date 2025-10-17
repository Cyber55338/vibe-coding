# Getting Started with Vibe Coding

Welcome to Vibe Coding! This guide will help you set up the development environment and start building.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0 or higher (comes with Node.js)
- **Python** 3.11 or higher ([Download](https://www.python.org/))
- **Git** ([Download](https://git-scm.com/))

### Recommended
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/))
- **Redis** 7+ ([Download](https://redis.io/))
- **VS Code** or your preferred IDE

## Quick Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd "new folder prototype v1"
```

### 2. Run the Setup Script

```bash
./scripts/setup.sh
```

This script will:
- Check system requirements
- Create directory structure
- Generate environment files
- Install dependencies

### 3. Configure Environment Variables

Copy the example environment files and update with your configuration:

```bash
# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your settings

# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your settings

# AI Agents
cp agents/.env.example agents/.env
# Edit agents/.env with your API keys
```

### 4. Set Up the Database

```bash
# Create database
createdb vibe_coding_dev

# Run migrations
cd backend
npx prisma migrate dev
cd ..
```

### 5. Start Development Servers

```bash
# Start all services (frontend, backend, agents)
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **AI Agents**: http://localhost:8001

## Project Structure

```
vibe-coding/
├── docs/                   # Design documentation
├── frontend/               # Next.js React app
├── backend/                # Node.js Express API
├── agents/                 # Python AI services
├── database/               # Database scripts
└── scripts/                # Utility scripts
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed structure.

## Development Workflow

### Frontend Development

```bash
cd frontend
npm run dev           # Start dev server
npm run build         # Production build
npm test              # Run tests
npm run lint          # Lint code
```

### Backend Development

```bash
cd backend
npm run dev           # Start dev server
npm run build         # Compile TypeScript
npm test              # Run tests
npx prisma studio     # Open database GUI
```

### AI Agents Development

```bash
cd agents
python -m uvicorn main:app --reload --port 8001  # Start server
pytest                # Run tests
python -m agents.guide_agent  # Test individual agent
```

## Available Scripts

From the root directory:

```bash
npm run dev              # Start all services
npm run build            # Build all projects
npm test                 # Run all tests
npm run lint             # Lint all code
```

## Next Steps

### 1. Explore the Documentation

- **[PRD](./docs/PRD.md)** - Product requirements and vision
- **[Game Design](./docs/GAME_DESIGN_DOCUMENT.md)** - Game mechanics and features
- **[UI/UX Specs](./docs/UI_UX_SPECIFICATIONS.md)** - Design system
- **[BMAD & Agents](./docs/BMAD_AGENTIC_FLOW.md)** - Technical architecture

### 2. Understand the BMAD Method

BMAD (Build, Measure, Adapt, Deploy) is the core learning methodology:

1. **Build** - Learners construct code solutions
2. **Measure** - System evaluates across multiple dimensions
3. **Adapt** - AI agents provide personalized guidance
4. **Deploy** - Execute, celebrate, and share

See [BMAD_AGENTIC_FLOW.md](./docs/BMAD_AGENTIC_FLOW.md) for details.

### 3. Start with a Component

Begin by implementing a single component:

**Suggested Starting Points:**
- Frontend: Implement a UI component from the design system
- Backend: Create a challenge API endpoint
- Agents: Build the Guide Agent hint generator

### 4. Follow the Roadmap

We're following an 18-week plan. See [ROADMAP.md](./docs/ROADMAP.md) for phases and milestones.

## Development Tips

### Hot Reloading
All development servers support hot reloading. Save your changes and they'll appear automatically.

### Debugging

**Frontend:**
- Use React DevTools browser extension
- console.log() statements
- VS Code debugger with launch config

**Backend:**
- Use `console.log()` or a proper logger
- VS Code debugger
- Postman/Insomnia for API testing

**AI Agents:**
- Python debugger (pdb)
- FastAPI auto-generated docs: http://localhost:8001/docs
- Print statements

### Database Management

```bash
# View database in GUI
cd backend && npx prisma studio

# Create a new migration
npx prisma migrate dev --name your_migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Code Quality

```bash
# Run linters
npm run lint

# Format code (if configured)
npm run format

# Run type checking
npm run type-check
```

## Common Issues

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different ports in .env files
```

### Database Connection Error

- Ensure PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Verify database exists: `psql -l`

### Redis Connection Error

- Ensure Redis is running: `redis-cli ping`
- Check REDIS_URL in .env files

### Python Import Errors

```bash
# Ensure you're in agents directory
cd agents

# Reinstall dependencies
pip install -r requirements.txt
```

## Testing

### Unit Tests

```bash
# Frontend
cd frontend && npm test

# Backend
cd backend && npm test

# Agents
cd agents && pytest
```

### Integration Tests

```bash
# Backend integration tests
cd backend && npm run test:integration
```

### End-to-End Tests

```bash
# Run E2E tests (Playwright/Cypress)
npm run test:e2e
```

## Contributing

### Branch Naming

- Feature: `feature/description`
- Fix: `fix/description`
- Docs: `docs/description`

### Commit Messages

Follow conventional commits:
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `test: add tests`

### Pull Requests

1. Create feature branch
2. Make changes
3. Write/update tests
4. Run linters
5. Submit PR with description

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Prisma Docs](https://www.prisma.io/docs)

### Design System
- See [UI_UX_SPECIFICATIONS.md](./docs/UI_UX_SPECIFICATIONS.md)
- Figma file (link TBD)

### APIs
- OpenAI API Docs (for Guide Agent)
- Monaco Editor API
- Blockly Developer Docs

## Support

### Questions?
- Check existing documentation in `/docs`
- Review PROJECT_STRUCTURE.md
- Ask the team in Slack #vibe-coding

### Found a Bug?
- Create an issue in GitHub
- Include reproduction steps
- Attach logs if applicable

## What's Next?

Based on the roadmap, here's what we're building:

**Phase 1 (Current):**
- [ ] Frontend scaffold with Next.js
- [ ] Backend API with Express
- [ ] Basic code editor (text mode)
- [ ] First challenge implementation

**Phase 2:**
- [ ] Visual block editor (Blockly)
- [ ] BMAD workflow implementation
- [ ] AI Agent system
- [ ] Code execution sandbox

See the full [ROADMAP.md](./docs/ROADMAP.md) for details.

---

Ready to code? Start with `npm run dev` and happy building! 🚀

**Questions?** See the main [README.md](./README.md) for more information.
