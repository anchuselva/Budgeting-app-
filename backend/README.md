# Budgeting App Backend API

Fully functional REST API backend for the Sri Lanka Budgeting Application.

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 12+ or SQLite
- pnpm (or npm)

### 1. Install Dependencies

```bash
cd backend
pnpm install
```

### 2. Database Setup

#### Option A: PostgreSQL (Recommended)

```bash
# Install PostgreSQL
# Windows: https://www.postgresql.org/download/windows/
# macOS: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
createdb budgeting_app

# Update .env with your database URL
# DATABASE_URL="postgresql://username:password@localhost:5432/budgeting_app"
```

#### Option B: SQLite (Quick Setup)

Change in `.env`:
```
DATABASE_URL="file:./dev.db"
```

### 3. Environment Configuration

Create `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` with your values:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/budgeting_app"
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRE="7d"
PORT=5000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
```

### 4. Run Database Migrations

```bash
pnpm run prisma:generate
pnpm run prisma:migrate
```

### 5. Seed Database (Optional)

```bash
pnpm run seed
```

This creates a test user:
- Email: `test@example.com`
- Password: `password123`

### 6. Start Development Server

```bash
pnpm run dev
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)
- `PUT /api/auth/profile` - Update profile (requires token)

### Budget Categories

- `POST /api/budgets/categories` - Create category
- `GET /api/budgets/categories` - Get all categories
- `PUT /api/budgets/categories/:categoryId` - Update category
- `DELETE /api/budgets/categories/:categoryId` - Delete category

### Budgets

- `POST /api/budgets` - Create budget
- `GET /api/budgets` - Get all budgets
- `GET /api/budgets/:year/:month` - Get budgets for specific month
- `PUT /api/budgets/:budgetId` - Update budget
- `DELETE /api/budgets/:budgetId` - Delete budget

### Expenses

- `POST /api/expenses` - Create expense
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/budget/:budgetId` - Get expenses for budget
- `PUT /api/expenses/:expenseId` - Update expense
- `DELETE /api/expenses/:expenseId` - Delete expense

### Income

- `POST /api/income` - Create income entry
- `GET /api/income` - Get all income
- `GET /api/income/summary/:month/:year` - Get income summary
- `PUT /api/income/:incomeId` - Update income
- `DELETE /api/income/:incomeId` - Delete income

### Analytics

- `GET /api/analytics/monthly/:year/:month` - Monthly summary
- `GET /api/analytics/categories/:year/:month` - Category breakdown
- `GET /api/analytics/yearly/:year` - Yearly summary
- `GET /api/analytics/trends/:months` - Expense trends
- `GET /api/analytics/top-categories/:limit` - Top spending categories

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── index.ts              # Server entry point
│   ├── middleware/
│   │   ├── auth.ts           # JWT authentication
│   │   └── errorHandler.ts   # Error handling
│   ├── routes/
│   │   ├── auth.ts           # Auth endpoints
│   │   ├── budget.ts         # Budget endpoints
│   │   ├── expense.ts        # Expense endpoints
│   │   ├── income.ts         # Income endpoints
│   │   └── analytics.ts      # Analytics endpoints
│   ├── utils/
│   │   ├── jwt.ts            # JWT utilities
│   │   └── validation.ts     # Validation helpers
│   └── seed.ts               # Database seeding
├── prisma/
│   └── schema.prisma         # Database schema
├── .env                      # Environment variables
├── .env.example              # Example env file
└── package.json              # Dependencies
```

## 📦 Database Schema

### Users
- id (String, primary key)
- email (String, unique)
- name (String)
- password (String)
- avatar (String, optional)
- createdAt, updatedAt

### BudgetCategories
- id (String, primary key)
- name (String)
- icon (String)
- color (String)
- userId (Foreign key)

### Budgets
- id (String, primary key)
- categoryId (Foreign key)
- userId (Foreign key)
- amount (Float)
- spent (Float)
- month (Int)
- year (Int)
- description (String, optional)

### Expenses
- id (String, primary key)
- budgetId (Foreign key)
- categoryId (Foreign key)
- userId (Foreign key)
- amount (Float)
- description (String, optional)
- date (DateTime)
- receipt (String, optional)

### Income
- id (String, primary key)
- userId (Foreign key)
- source (String)
- amount (Float)
- frequency (String)
- date (DateTime)
- description (String, optional)

## 🛠️ Development Commands

```bash
# Run development server with hot reload
pnpm run dev

# Generate Prisma types
pnpm run prisma:generate

# Run migrations
pnpm run prisma:migrate

# Open Prisma Studio (database GUI)
pnpm run prisma:studio

# Seed database with sample data
pnpm run seed

# Build for production
pnpm run build

# Start production server
pnpm start
```

## 🔍 Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "User Name",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Get current user (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman

1. Import the API endpoints
2. Set up environment variables for `TOKEN` and `BASE_URL`
3. Use pre-request scripts for token management

## 📝 Error Handling

All errors return consistent JSON format:

```json
{
  "success": false,
  "error": {
    "status": 400,
    "code": "VALIDATION_ERROR",
    "message": "Error description"
  }
}
```

## 🚀 Deployment

### Docker

```bash
docker build -t budgeting-app-backend .
docker run -p 5000:5000 --env-file .env budgeting-app-backend
```

### Heroku

```bash
git push heroku main
```

## 📋 Production Checklist

- [ ] Update JWT_SECRET in `.env`
- [ ] Set NODE_ENV to "production"
- [ ] Use PostgreSQL in production
- [ ] Enable HTTPS
- [ ] Set up CORS_ORIGIN properly
- [ ] Configure rate limiting
- [ ] Set up error logging/monitoring
- [ ] Backup database regularly

## 📞 Support

For issues or questions, please create an issue in the repository.

## 📄 License

MIT License
