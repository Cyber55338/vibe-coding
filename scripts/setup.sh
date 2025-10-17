#!/bin/bash

# Vibe Coding - Project Setup Script
# This script sets up the entire development environment

set -e  # Exit on error

echo "🚀 Vibe Coding - Project Setup"
echo "================================"
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v) detected"

# Check Python version
echo "🐍 Checking Python version..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+ first."
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f2)
if [ "$PYTHON_VERSION" -lt 11 ]; then
    echo "⚠️  Python 3.11+ recommended. Current version: $(python3 --version)"
fi
echo "✅ Python $(python3 --version) detected"

# Check PostgreSQL
echo "🐘 Checking PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found. You'll need to install it for database functionality."
else
    echo "✅ PostgreSQL detected"
fi

# Check Redis
echo "📮 Checking Redis..."
if ! command -v redis-cli &> /dev/null; then
    echo "⚠️  Redis not found. You'll need to install it for caching functionality."
else
    echo "✅ Redis detected"
fi

echo ""
echo "📂 Setting up project directories..."

# Create necessary directories
mkdir -p frontend/src/{app,components,lib,store,styles,types}
mkdir -p frontend/public/{icons,sounds,images}
mkdir -p backend/src/{api,services,models,middleware,websocket,sandbox,utils,config}
mkdir -p backend/prisma
mkdir -p backend/tests/{unit,integration,e2e}
mkdir -p agents/{agents,services,models,utils,tests}
mkdir -p database/{seeds,migrations}

echo "✅ Directory structure created"

echo ""
echo "📝 Creating environment files..."

# Frontend .env.example
cat > frontend/.env.example << 'EOF'
# Frontend Environment Variables

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Authentication
NEXT_PUBLIC_AUTH_PROVIDER=custom

# Analytics (optional)
# NEXT_PUBLIC_MIXPANEL_TOKEN=
# NEXT_PUBLIC_GA_ID=

# Feature Flags
NEXT_PUBLIC_ENABLE_SANDBOX=true
NEXT_PUBLIC_ENABLE_SOCIAL=false
EOF

# Backend .env.example
cat > backend/.env.example << 'EOF'
# Backend Environment Variables

# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/vibe_coding_dev

# Redis
REDIS_URL=redis://localhost:6379

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# AI Agents Service
AGENTS_SERVICE_URL=http://localhost:8001

# Code Execution
SANDBOX_TIMEOUT=5000
SANDBOX_MEMORY_LIMIT=52428800

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
EOF

# Agents .env.example
cat > agents/.env.example << 'EOF'
# AI Agents Service Environment Variables

# Server Configuration
PORT=8001
ENVIRONMENT=development

# LLM API Keys
OPENAI_API_KEY=your-openai-api-key-here
# ANTHROPIC_API_KEY=your-anthropic-api-key-here

# Model Configuration
GUIDE_AGENT_MODEL=gpt-4-turbo
GUIDE_AGENT_TEMPERATURE=0.7
GUIDE_AGENT_MAX_TOKENS=200

ANALYZER_AGENT_MODEL=gpt-3.5-turbo
CONTENT_AGENT_MODEL=gpt-4-turbo

# Database (shared with backend)
DATABASE_URL=postgresql://user:password@localhost:5432/vibe_coding_dev

# Redis
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=INFO
EOF

echo "✅ Environment files created"

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install root dependencies
echo "Installing root workspace dependencies..."
npm install

# Install frontend dependencies (will be created next)
if [ -f "frontend/package.json" ]; then
    echo "Installing frontend dependencies..."
    cd frontend && npm install && cd ..
else
    echo "⚠️  frontend/package.json not found, skipping frontend install"
fi

# Install backend dependencies (will be created next)
if [ -f "backend/package.json" ]; then
    echo "Installing backend dependencies..."
    cd backend && npm install && cd ..
else
    echo "⚠️  backend/package.json not found, skipping backend install"
fi

# Install Python dependencies
if [ -f "agents/requirements.txt" ]; then
    echo "Installing Python dependencies..."
    cd agents && pip3 install -r requirements.txt && cd ..
else
    echo "⚠️  agents/requirements.txt not found, skipping Python install"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Copy .env.example files to .env in each directory"
echo "2. Update environment variables with your configuration"
echo "3. Set up PostgreSQL database: createdb vibe_coding_dev"
echo "4. Run database migrations: cd backend && npx prisma migrate dev"
echo "5. Start development servers: npm run dev"
echo ""
echo "📚 For more information, see README.md"
echo ""
