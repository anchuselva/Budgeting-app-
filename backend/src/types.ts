// API Types and Interfaces

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      email: string;
      name: string;
    };
    token: string;
  };
  error?: {
    message: string;
  };
}

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  userId: string;
  amount: number;
  spent: number;
  month: number;
  year: number;
  description?: string;
  category?: BudgetCategory;
  expenses?: Expense[];
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: string;
  budgetId: string;
  categoryId: string;
  userId: string;
  amount: number;
  description?: string;
  date: string;
  receipt?: string;
  category?: BudgetCategory;
  budget?: Budget;
  createdAt: string;
  updatedAt: string;
}

export interface Income {
  id: string;
  userId: string;
  source: string;
  amount: number;
  frequency: 'monthly' | 'weekly' | 'daily' | 'one-time';
  date: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    status: number;
    code: string;
    message: string;
  };
  message?: string;
}

export interface MonthlySummary {
  month: number;
  year: number;
  income: number;
  budgeted: number;
  spent: number;
  remaining: number;
  surplus: number;
}

export interface CategoryBreakdown {
  category: string;
  icon: string;
  budgeted: number;
  spent: number;
  remaining: number;
  percentage: number;
  expenses: number;
}
