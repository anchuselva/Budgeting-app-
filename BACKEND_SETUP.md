# Setup Instructions for Backend

## Quick Start (5 minutes)

### Step 1: Install PostgreSQL

**Windows:**
- Download from: https://www.postgresql.org/download/windows/
- Install with default settings
- Remember the password you set for `postgres` user

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Inside psql shell, create database
CREATE DATABASE budgeting_app;

# Exit with \q
\q
```

### Step 3: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Copy and edit .env file
cp .env.example .env

# Edit .env with your database credentials:
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/budgeting_app"
```

### Step 4: Install & Run

```bash
# Install dependencies
pnpm install

# Run migrations
pnpm run prisma:generate
pnpm run prisma:migrate

# Seed sample data (optional)
pnpm run seed

# Start development server
pnpm run dev
```

✅ Backend is now running at `http://localhost:5000`

---

## Docker Setup (Alternative)

### Prerequisites
- Docker & Docker Compose installed

### Setup

```bash
# From root directory
docker-compose up -d

# Run migrations
docker exec -it budgeting_app_backend pnpm run prisma:migrate

# Seed data (optional)
docker exec -it budgeting_app_backend pnpm run seed
```

✅ Database: `postgresql://postgres:password@postgres:5432/budgeting_app`
✅ Backend: `http://localhost:5000`

---

## Frontend Integration

### Update Frontend .env

In root directory, create or update `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

### Update vite.config.ts

Add proxy configuration:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
});
```

---

## Test API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Using Postman

1. Create new Collection
2. Import all endpoints
3. Set up Environment variables:
   - `base_url`: `http://localhost:5000/api`
   - `token`: From login response
4. Use in requests: `{{base_url}}/auth/me` with header `Authorization: Bearer {{token}}`

---

## Database Management

### Prisma Studio (Visual Editor)

```bash
cd backend
pnpm run prisma:studio
```

Opens interactive database viewer at `http://localhost:5555`

### Reset Database

```bash
cd backend

# Reset (caution: deletes all data)
pnpm run prisma:migrate reset

# Or manually:
# 1. Drop database
# 2. Create new database
# 3. Run migrations
```

---

## Common Issues

### Issue: "Cannot find module '@prisma/client'"
**Solution:**
```bash
cd backend
pnpm install
pnpm run prisma:generate
```

### Issue: Database connection refused
**Solution:**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Check username/password
- For Docker: ensure postgres service is healthy

### Issue: Port 5000 already in use
**Solution:**
```bash
# Change PORT in .env or:
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000   # Windows
```

### Issue: CORS errors
**Solution:**
- Update CORS_ORIGIN in .env to match frontend URL
- Default: `http://localhost:5173`

---

## Production Deployment

### Environment Variables
```
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-db:5432/budgeting_app
JWT_SECRET=<long-random-secret>
CORS_ORIGIN=https://yourdomain.com
```

### Build & Deploy

```bash
cd backend

# Build
pnpm run build

# Start
pnpm start
```

### Deploy to Heroku
```bash
heroku login
heroku create budgeting-app-api
git push heroku main
heroku run pnpm run prisma:migrate
```

---

## Support

For issues:
1. Check backend logs: `pnpm run dev`
2. Check database: `pnpm run prisma:studio`
3. Test endpoints with cURL or Postman
4. Check .env configuration
