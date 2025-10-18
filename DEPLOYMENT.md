# Vibe Coding - Deployment Guide

Complete guide for deploying Vibe Coding to production.

---

## Quick Start with Docker

The fastest way to run the entire application:

```bash
# Clone the repository
git clone https://github.com/Cyber55338/vibe-coding.git
cd vibe-coding

# Start all services
docker-compose up -d

# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Seed the database
docker-compose exec backend npm run seed

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# AI Agents: http://localhost:8001
```

---

## Manual Setup (Without Docker)

### Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL 15+
- Redis 7+ (optional, for caching)

### 1. Database Setup

```bash
# Install PostgreSQL
# macOS
brew install postgresql@15

# Ubuntu
sudo apt install postgresql-15

# Start PostgreSQL
brew services start postgresql  # macOS
sudo systemctl start postgresql # Linux

# Create database
createdb vibe_coding
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your database URL
# DATABASE_URL="postgresql://user:password@localhost:5432/vibe_coding"

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
npm run seed

# Start backend
npm run dev
# Runs on http://localhost:3001
```

### 3. AI Agents Setup

```bash
cd agents

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# (Optional) Add OpenAI API key for enhanced hints
# OPENAI_API_KEY=your-key-here

# Start agents service
python main.py
# Runs on http://localhost:8001
```

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001

# Start frontend
npm run dev
# Runs on http://localhost:3000
```

---

## Production Deployment

### Option 1: Vercel + Railway (Recommended)

**Frontend (Vercel):**
1. Push code to GitHub
2. Import project to Vercel
3. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```
4. Deploy

**Backend + Database (Railway):**
1. Create new project on Railway
2. Add PostgreSQL service
3. Add Node.js service (backend)
   - Connect to GitHub repo
   - Root directory: `/backend`
   - Build command: `npm install && npx prisma generate`
   - Start command: `npm start`
   - Environment variables:
     ```
     DATABASE_URL=${POSTGRES_URL}
     JWT_SECRET=your-random-secret
     AGENTS_SERVICE_URL=https://your-agents.railway.app
     CORS_ORIGIN=https://your-app.vercel.app
     ```
4. Add Python service (agents)
   - Root directory: `/agents`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

**Post-deployment:**
```bash
# Run migrations via Railway CLI
railway run npx prisma migrate deploy

# Seed database
railway run npm run seed
```

---

### Option 2: AWS (Full Control)

**Infrastructure:**
- Frontend: AWS Amplify or S3 + CloudFront
- Backend: EC2 or ECS
- Database: RDS PostgreSQL
- Cache: ElastiCache Redis
- AI Agents: Lambda or ECS

**Steps:**

1. **Database (RDS)**
   - Create PostgreSQL RDS instance
   - Note connection string

2. **Backend (EC2)**
   ```bash
   # SSH into EC2
   ssh -i key.pem ubuntu@your-ec2-ip

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Clone repo
   git clone https://github.com/Cyber55338/vibe-coding.git
   cd vibe-coding/backend

   # Install dependencies
   npm ci

   # Set environment variables
   export DATABASE_URL="postgresql://..."
   export JWT_SECRET="..."

   # Run migrations
   npx prisma migrate deploy

   # Start with PM2
   npm install -g pm2
   pm2 start npm --name "vibe-backend" -- start
   pm2 startup
   pm2 save
   ```

3. **Frontend (S3 + CloudFront)**
   ```bash
   cd frontend

   # Build
   npm run build

   # Upload to S3
   aws s3 sync out/ s3://your-bucket-name

   # Create CloudFront distribution
   # Point to S3 bucket
   ```

---

### Option 3: DigitalOcean App Platform

1. Connect GitHub repository
2. Configure services:
   - **Backend**: Node.js app from `/backend`
   - **Frontend**: Static site from `/frontend`
   - **Agents**: Python app from `/agents`
   - **Database**: Managed PostgreSQL

3. Set environment variables for each service

4. Deploy

---

## Environment Variables Reference

### Backend (.env)
```bash
# Server
PORT=3001
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Redis (optional)
REDIS_URL=redis://host:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRES_IN=7d

# AI Agents
AGENTS_SERVICE_URL=http://agents:8001

# CORS
CORS_ORIGIN=https://your-frontend-domain.com

# Code Execution
SANDBOX_TIMEOUT=5000
SANDBOX_MEMORY_LIMIT=52428800
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

### AI Agents (.env)
```bash
PORT=8001
HOST=0.0.0.0
BACKEND_URL=https://your-backend-domain.com
ENV=production
OPENAI_API_KEY=sk-... # Optional
```

---

## Database Migrations

### Create New Migration
```bash
cd backend
npx prisma migrate dev --name description_of_changes
```

### Apply Migrations in Production
```bash
npx prisma migrate deploy
```

### Reset Database (DANGER - Development Only)
```bash
npx prisma migrate reset
```

---

## Monitoring & Logging

### Recommended Services

**Error Tracking:**
- Sentry (frontend + backend)
```bash
npm install @sentry/nextjs @sentry/node
```

**Application Monitoring:**
- Datadog
- New Relic

**Log Aggregation:**
- Logtail
- Papertrail

**Uptime Monitoring:**
- UptimeRobot
- Pingdom

---

## SSL/HTTPS Setup

### With Nginx
```nginx
server {
    listen 443 ssl;
    server_name api.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### With Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

---

## Performance Optimization

### Frontend
- Enable Next.js image optimization
- Use CDN for static assets
- Enable gzip/brotli compression
- Implement code splitting

### Backend
- Enable Redis caching
- Set up connection pooling
- Index database tables
- Enable response compression

### Database
```sql
-- Add indexes
CREATE INDEX idx_users_email ON "User"(email);
CREATE INDEX idx_challenges_module ON "Challenge"(module, "order");
CREATE INDEX idx_attempts_user_challenge ON "Attempt"("userId", "challengeId");
```

---

## Backup Strategy

### Database Backups
```bash
# Automated daily backups
pg_dump -U postgres vibe_coding > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -U postgres vibe_coding < backup_20250118.sql
```

### Code Backups
- GitHub (primary)
- Regular git tags for releases
- S3 for additional redundancy

---

## Security Checklist

- [ ] Change all default passwords and secrets
- [ ] Enable HTTPS everywhere
- [ ] Set secure JWT_SECRET (32+ random characters)
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Enable database encryption
- [ ] Use environment variables (never commit secrets)
- [ ] Set up monitoring and alerts

---

## Scaling

### Horizontal Scaling
- Load balancer (AWS ALB, nginx)
- Multiple backend instances
- Session storage in Redis
- Database read replicas

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching

---

## Troubleshooting

### Backend won't start
```bash
# Check logs
pm2 logs vibe-backend

# Check database connection
npx prisma db push
```

### Database connection errors
- Verify DATABASE_URL
- Check firewall rules
- Ensure PostgreSQL is running

### Frontend build fails
```bash
# Clear cache
rm -rf .next
npm run build
```

---

## Health Checks

### API Health Check
```bash
curl http://localhost:3001/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Database Check
```bash
curl http://localhost:3001/api/challenges
# Should return list of challenges
```

---

## Support

- GitHub Issues: https://github.com/Cyber55338/vibe-coding/issues
- Documentation: README.md
- API Docs: (coming soon)

---

**Last Updated:** 2025-10-18
