# Quick Start Guide

## 🎯 Get Backend Running in 5 Minutes

### Windows Users

1. **Open Command Prompt** in the project root folder

2. **Run setup script:**
   ```batch
   setup-backend.bat
   ```
   This will:
   - ✅ Install all dependencies
   - ✅ Setup database (with Prisma)
   - ✅ Create .env file
   - ✅ Seed sample data

3. **Start backend:**
   ```batch
   cd backend
   pnpm run dev
   ```

### macOS/Linux Users

1. **Open Terminal** in the project root folder

2. **Make script executable:**
   ```bash
   chmod +x setup-backend.sh
   ```

3. **Run setup script:**
   ```bash
   ./setup-backend.sh
   ```

4. **Start backend:**
   ```bash
   cd backend
   pnpm run dev
   ```

---

## 🚀 What Happens Next

### Backend Server Ready
```
✅ Server running on http://localhost:5000
```

### Test API (Open new terminal)
```bash
# Test if server is running
curl http://localhost:5000/api/health

# Response should be:
# {"message":"Server is running","timestamp":"2026-04-21T..."}
```

### Create Test Account
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

---

## 📁 What Was Created

### Backend Structure
```
backend/
├── src/
│   ├── index.ts                  # Main server file
│   ├── types.ts                  # TypeScript interfaces
│   ├── seed.ts                   # Sample data seeding
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   └── errorHandler.ts      # Error handling
│   ├── routes/
│   │   ├── auth.ts              # User registration & login
│   │   ├── budget.ts            # Budget management
│   │   ├── expense.ts           # Expense tracking
│   │   ├── income.ts            # Income management
│   │   └── analytics.ts         # Reports & analytics
│   └── utils/
│       ├── jwt.ts               # JWT helper functions
│       └── validation.ts        # Input validation
├── prisma/
│   └── schema.prisma            # Database schema
├── .env                         # Configuration (create after setup)
├── .env.example                 # Example config
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── nodemon.json                 # Auto-reload config
├── Dockerfile                   # Docker image
└── README.md                    # Detailed docs
```

### Frontend Services
```
src/services/
└── apiClient.ts                 # API client for frontend
```

### Documentation
```
BACKEND_SETUP.md                 # Detailed setup guide
API_TESTING.md                   # API testing examples
setup-backend.bat                # Windows setup script
setup-backend.sh                 # macOS/Linux setup script
docker-compose.yml               # Docker configuration
```

---

## 🗄️ Database

### PostgreSQL (Recommended)

**Already configured in .env.example**

### SQLite (Quick Development)

Edit `backend/.env`:
```
DATABASE_URL="file:./dev.db"
```

Then run migrations.

---

## 🔌 Database Schema

### Users Table
- Email, name, password (hashed)
- Avatar, timestamps

### BudgetCategories Table
- Name, icon, color
- User relationship

### Budgets Table
- Amount, spent tracking
- Month/year, category
- Description

### Expenses Table
- Amount, date, description
- Receipt (optional)
- Budget & category relationship

### Income Table
- Source, amount, frequency
- Date, description

---

## 📡 Key API Endpoints

### Authentication
```
POST   /api/auth/register          Create account
POST   /api/auth/login             Login
GET    /api/auth/me                Get current user
PUT    /api/auth/profile           Update profile
```

### Budgets
```
POST   /api/budgets                Create budget
GET    /api/budgets                Get all budgets
GET    /api/budgets/:year/:month   Get budgets for month
PUT    /api/budgets/:id            Update budget
DELETE /api/budgets/:id            Delete budget
```

### Expenses
```
POST   /api/expenses               Create expense
GET    /api/expenses               Get all expenses
PUT    /api/expenses/:id           Update expense
DELETE /api/expenses/:id           Delete expense
```

### Income
```
POST   /api/income                 Create income
GET    /api/income                 Get all income
PUT    /api/income/:id             Update income
DELETE /api/income/:id             Delete income
```

### Analytics
```
GET    /api/analytics/monthly/:year/:month    Monthly summary
GET    /api/analytics/categories/:year/:month Category breakdown
GET    /api/analytics/yearly/:year            Yearly summary
GET    /api/analytics/trends/:months          Expense trends
GET    /api/analytics/top-categories/:limit   Top categories
```

---

## 🔐 Authentication

All protected endpoints require:
```
Authorization: Bearer <token>
```

Token obtained from `/api/auth/login` or `/api/auth/register`

---

## 🐳 Docker Setup (Alternative)

### Prerequisites
- Docker & Docker Compose installed

### Start with Docker
```bash
docker-compose up -d
```

This creates:
- ✅ PostgreSQL database container
- ✅ Backend API container

### Access
- API: `http://localhost:5000`
- Database: `localhost:5432`

---

## 🛠️ Common Commands

```bash
cd backend

# Development
pnpm run dev                      # Start with hot reload

# Database
pnpm run prisma:generate         # Generate Prisma client
pnpm run prisma:migrate          # Run migrations
pnpm run prisma:studio           # Open database UI

# Seeding
pnpm run seed                     # Add sample data

# Production
pnpm run build                    # Build for production
pnpm start                        # Start production server
```

---

## 🔧 Environment Variables

Edit `backend/.env`:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/budgeting_app"

# JWT
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRE="7d"

# Server
PORT=5000
NODE_ENV="development"

# CORS
CORS_ORIGIN="http://localhost:5173"
```

---

## 📊 What's Included

✅ **Complete REST API** with all CRUD operations
✅ **Database Models** for budgeting features
✅ **Authentication** with JWT tokens
✅ **Password Hashing** with bcryptjs
✅ **Input Validation** for all endpoints
✅ **Error Handling** with consistent responses
✅ **Analytics** endpoints for reports
✅ **TypeScript** support throughout
✅ **Docker** configuration for easy deployment
✅ **Prisma ORM** for type-safe database queries
✅ **Middleware** for auth and error handling
✅ **Seed Script** for sample data
✅ **CORS** enabled for frontend
✅ **Request Logging** with Morgan

---

## ✅ Next Steps

1. ✅ Backend setup complete
2. **Frontend Integration** (next)
   - Install `@tanstack/react-query` for caching
   - Setup API client in React components
   - Update auth context to use backend
   - Replace mock data with real API calls

3. **Testing** (optional)
   - Write unit tests with Jest
   - Write API integration tests
   - Load testing

4. **Deployment** (when ready)
   - Deploy to Heroku, Vercel, or AWS
   - Setup CI/CD pipeline
   - Configure production database

---

## 📞 Troubleshooting

### Backend won't start?
1. Check Node.js version: `node -v` (should be 18+)
2. Check if port 5000 is available
3. Check DATABASE_URL in .env

### Database connection failed?
1. Ensure PostgreSQL is running
2. Verify username/password in .env
3. Check if database exists

### CORS errors?
1. Check CORS_ORIGIN in .env
2. Ensure frontend is at `http://localhost:5173`

### Port 5000 already in use?
```bash
# Find process
lsof -i :5000              # macOS/Linux
netstat -ano | findstr 5000 # Windows

# Kill process
kill -9 <PID>              # macOS/Linux
taskkill /PID <PID> /F     # Windows
```

---

## 📚 More Information

- 📖 [Detailed Backend Setup](./BACKEND_SETUP.md)
- 🧪 [API Testing Examples](./API_TESTING.md)
- 📦 [Backend README](./backend/README.md)
- 🗄️ [Database Schema](./backend/prisma/schema.prisma)

---

**Happy coding! 🚀**
