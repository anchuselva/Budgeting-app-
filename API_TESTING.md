# API Testing Guide

## Quick API Test Examples

### 1. Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "name": "New User",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id_here",
      "email": "newuser@example.com",
      "name": "New User"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "SecurePass123"
  }'
```

### 3. Create Budget Category
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/budgets/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Food & Groceries",
    "icon": "🛒",
    "color": "#FF6B6B"
  }'
```

### 4. Get All Categories
```bash
TOKEN="your_jwt_token_here"

curl -X GET http://localhost:5000/api/budgets/categories \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Create Budget
```bash
TOKEN="your_jwt_token_here"
CATEGORY_ID="category_id_from_step_3"

curl -X POST http://localhost:5000/api/budgets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "categoryId": "'$CATEGORY_ID'",
    "amount": 500,
    "month": 4,
    "year": 2026,
    "description": "Monthly grocery budget"
  }'
```

### 6. Get Budgets for April 2026
```bash
TOKEN="your_jwt_token_here"

curl -X GET http://localhost:5000/api/budgets/2026/4 \
  -H "Authorization: Bearer $TOKEN"
```

### 7. Create Income Entry
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/income \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "source": "Salary",
    "amount": 3000,
    "frequency": "monthly",
    "description": "Monthly salary"
  }'
```

### 8. Create Expense
```bash
TOKEN="your_jwt_token_here"
BUDGET_ID="budget_id_from_step_5"
CATEGORY_ID="category_id_from_step_3"

curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "budgetId": "'$BUDGET_ID'",
    "categoryId": "'$CATEGORY_ID'",
    "amount": 45.50,
    "description": "Weekly grocery shopping",
    "date": "2026-04-15T10:30:00Z"
  }'
```

### 9. Get Monthly Summary
```bash
TOKEN="your_jwt_token_here"

curl -X GET http://localhost:5000/api/analytics/monthly/2026/4 \
  -H "Authorization: Bearer $TOKEN"
```

### 10. Get Category Breakdown
```bash
TOKEN="your_jwt_token_here"

curl -X GET http://localhost:5000/api/analytics/categories/2026/4 \
  -H "Authorization: Bearer $TOKEN"
```

---

## Postman Collection

### Setup Postman Environment

1. Create new Environment with variables:
```json
{
  "base_url": "http://localhost:5000/api",
  "token": "",
  "user_email": "test@example.com",
  "user_password": "password123"
}
```

2. In **Auth** tab, add Pre-request Script:
```javascript
// Auto-login before each request
if (!pm.environment.get("token")) {
  const loginRequest = {
    url: pm.environment.get("base_url") + "/auth/login",
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    body: {
      mode: 'raw',
      raw: JSON.stringify({
        email: pm.environment.get("user_email"),
        password: pm.environment.get("user_password")
      })
    }
  };
  
  pm.sendRequest(loginRequest, (err, response) => {
    if (err) console.log(err);
    else {
      pm.environment.set("token", response.json().data.token);
    }
  });
}
```

3. Add to Header:
```
Authorization: Bearer {{token}}
```

---

## Response Examples

### Success Response
```json
{
  "success": true,
  "data": {
    "budget": {
      "id": "clk1234567890",
      "categoryId": "clk0987654321",
      "userId": "clk1111111111",
      "amount": 500,
      "spent": 95.75,
      "month": 4,
      "year": 2026,
      "description": "Monthly grocery budget",
      "createdAt": "2026-04-01T10:00:00Z",
      "updatedAt": "2026-04-15T14:30:00Z"
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "status": 400,
    "code": "VALIDATION_ERROR",
    "message": "Invalid amount"
  }
}
```

---

## Testing Checklist

### Authentication
- [ ] Register new user
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Access protected endpoint without token (should fail)
- [ ] Access protected endpoint with invalid token (should fail)

### Budget Management
- [ ] Create budget category
- [ ] List all categories
- [ ] Update category
- [ ] Delete category
- [ ] Create budget
- [ ] Get budgets for specific month
- [ ] Update budget
- [ ] Delete budget

### Expense Tracking
- [ ] Create expense
- [ ] Get expenses for budget
- [ ] Get all expenses with filters
- [ ] Update expense
- [ ] Delete expense
- [ ] Verify budget "spent" updates

### Income
- [ ] Create income entry
- [ ] Get income with filters
- [ ] Get income summary
- [ ] Update income
- [ ] Delete income

### Analytics
- [ ] Get monthly summary
- [ ] Get category breakdown
- [ ] Get yearly summary
- [ ] Get expense trends
- [ ] Get top categories

---

## Performance Testing

### Load Test (using Apache Bench)
```bash
ab -n 100 -c 10 -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/expenses
```

### Response Time Monitoring
```bash
# Using curl with timing
curl -w "\nTime: %{time_total}s\n" \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/budgets
```

---

## Debugging Tips

### Enable SQL Query Logging
Add to `.env`:
```
DEBUG=prisma:*
```

### Check Request/Response
```bash
# Verbose curl output
curl -v http://localhost:5000/api/health
```

### Monitor Database
```bash
# Open Prisma Studio
pnpm run prisma:studio
```

### View Server Logs
```bash
# Already shown in terminal when running: pnpm run dev
```
