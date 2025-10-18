# 🚀 Vibe Coding - Quick Start Guide

Get the app running in **5 minutes** with Docker!

---

## ⚡ Fastest Method (Docker - Recommended)

### Prerequisites
- Docker Desktop installed
- Git installed

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Cyber55338/vibe-coding.git
cd vibe-coding

# 2. Start all services (this will take 2-3 minutes first time)
docker-compose up -d

# 3. Wait for services to be ready (check logs)
docker-compose logs -f

# 4. Run database migrations
docker-compose exec backend npx prisma migrate deploy

# 5. Seed the database with challenges
docker-compose exec backend npm run seed

# 6. Open the app!
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# AI Agents: http://localhost:8001
```

### Test It Works

1. Go to http://localhost:3000
2. Click "Register"
3. Create an account
4. Complete the tutorial
5. Start coding!

### Stop the App

```bash
docker-compose down
```

---

## 🛠️ Manual Setup (Without Docker)

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 15+
- Git

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and set your database URL
# DATABASE_URL="postgresql://user:password@localhost:5432/vibe_coding"

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
npm run seed

# Start backend (runs on http://localhost:3001)
npm run dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001

# Start frontend (runs on http://localhost:3000)
npm run dev
```

### AI Agents Setup

```bash
cd agents

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env
cp .env.example .env

# Start agents (runs on http://localhost:8001)
python main.py
```

---

## 🎯 What You Get

After setup, you'll have:

✅ **20 Coding Challenges**
- Module 1: Sequence Station (10 challenges)
- Module 2: Loop Gardens (10 challenges)

✅ **Full Features**
- User authentication
- Interactive tutorial
- Real-time code execution
- AI-powered hints
- Progress tracking
- Code quality scoring

✅ **3 Services Running**
- Frontend (Next.js)
- Backend API (Express)
- AI Agents (FastAPI)

---

## 🐛 Troubleshooting

### Docker Issues

**"port already in use"**
```bash
# Stop conflicting services
docker-compose down
# Or change ports in docker-compose.yml
```

**"database connection failed"**
```bash
# Wait for PostgreSQL to be ready
docker-compose logs postgres
# Run migrations again
docker-compose exec backend npx prisma migrate deploy
```

### Manual Setup Issues

**"Cannot find module"**
```bash
# Reinstall dependencies
npm ci  # or pip install -r requirements.txt
```

**"Database connection error"**
```bash
# Check PostgreSQL is running
pg_isready
# Verify DATABASE_URL in .env
```

**"Port 3000/3001/8001 already in use"**
```bash
# Find and kill process
# macOS/Linux:
lsof -ti:3000 | xargs kill
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📚 Next Steps

After getting the app running:

1. **Register an account** at http://localhost:3000
2. **Complete the tutorial** (7 interactive steps)
3. **Start Module 1** (Sequence Station)
4. **Try the sandbox mode** for free coding
5. **View your profile** to track progress

---

## 🔧 Development Commands

### Docker

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f [service-name]

# Restart a service
docker-compose restart [service-name]

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

### Backend

```bash
cd backend

# Development mode (auto-reload)
npm run dev

# Production mode
npm start

# Run migrations
npx prisma migrate dev

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Frontend

```bash
cd frontend

# Development mode
npm run dev

# Production build
npm run build
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

### AI Agents

```bash
cd agents

# Development mode (auto-reload)
uvicorn main:app --reload --host 0.0.0.0 --port 8001

# Production mode
python main.py
```

---

## 🌐 Access Points

When running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health**: http://localhost:3001/health
- **AI Agents**: http://localhost:8001
- **Agent Docs**: http://localhost:8001/docs

---

## 💾 Database

### View Data

```bash
# With Prisma Studio (GUI)
cd backend
npx prisma studio
# Opens at http://localhost:5555
```

### Reset Database

```bash
# ⚠️ WARNING: This deletes all data!
cd backend
npx prisma migrate reset
npm run seed
```

---

## 📦 What's Running?

After `docker-compose up`:

| Service | Port | URL |
|---------|------|-----|
| Frontend (Next.js) | 3000 | http://localhost:3000 |
| Backend (Express) | 3001 | http://localhost:3001 |
| AI Agents (FastAPI) | 8001 | http://localhost:8001 |
| PostgreSQL | 5432 | localhost:5432 |
| Redis (optional) | 6379 | localhost:6379 |

---

## 🎓 Using the App

### As a Student

1. Register at `/auth/register`
2. Complete tutorial at `/tutorial`
3. View dashboard at `/dashboard`
4. Choose a module
5. Solve challenges
6. Track your progress

### Testing Features

- **Code Execution**: Write code and click "Run Code"
- **Hints**: Click "Request Hint" when stuck
- **Scoring**: View 4 metrics after each attempt
- **Sandbox**: Free coding at `/sandbox`
- **Solutions**: Community solutions at `/solutions`

---

## 🔒 Security Notes

- Default JWT secret is for development only
- Change all secrets before production
- Never commit `.env` files
- Use environment variables for sensitive data

---

## 📖 More Documentation

- [Full Deployment Guide](./DEPLOYMENT.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [Development Guide](./GETTING_STARTED.md)

---

## ❓ Need Help?

- **Issues**: https://github.com/Cyber55338/vibe-coding/issues
- **Discussions**: https://github.com/Cyber55338/vibe-coding/discussions

---

**Ready to code!** 🎉

Start at: **http://localhost:3000**
