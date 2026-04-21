// API Client Service for Frontend Integration

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('authToken');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private async request(method: string, endpoint: string, data?: any) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: any = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: any = {
      method,
      headers,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || 'API Error');
    }

    return result;
  }

  // Auth endpoints
  async register(email: string, name: string, password: string, confirmPassword: string) {
    return this.request('POST', '/auth/register', {
      email,
      name,
      password,
      confirmPassword,
    });
  }

  async login(email: string, password: string) {
    return this.request('POST', '/auth/login', { email, password });
  }

  async getMe() {
    return this.request('GET', '/auth/me');
  }

  async updateProfile(name?: string, avatar?: string) {
    return this.request('PUT', '/auth/profile', { name, avatar });
  }

  // Budget categories
  async createCategory(name: string, icon?: string, color?: string) {
    return this.request('POST', '/budgets/categories', { name, icon, color });
  }

  async getCategories() {
    return this.request('GET', '/budgets/categories');
  }

  async updateCategory(categoryId: string, name?: string, icon?: string, color?: string) {
    return this.request('PUT', `/budgets/categories/${categoryId}`, { name, icon, color });
  }

  async deleteCategory(categoryId: string) {
    return this.request('DELETE', `/budgets/categories/${categoryId}`);
  }

  // Budgets
  async createBudget(categoryId: string, amount: number, month: number, year: number, description?: string) {
    return this.request('POST', '/budgets', {
      categoryId,
      amount,
      month,
      year,
      description,
    });
  }

  async getBudgets() {
    return this.request('GET', '/budgets');
  }

  async getBudgetsByMonth(year: number, month: number) {
    return this.request('GET', `/budgets/${year}/${month}`);
  }

  async updateBudget(budgetId: string, amount?: number, description?: string) {
    return this.request('PUT', `/budgets/${budgetId}`, { amount, description });
  }

  async deleteBudget(budgetId: string) {
    return this.request('DELETE', `/budgets/${budgetId}`);
  }

  // Expenses
  async createExpense(
    budgetId: string,
    categoryId: string,
    amount: number,
    description?: string,
    date?: string,
    receipt?: string
  ) {
    return this.request('POST', '/expenses', {
      budgetId,
      categoryId,
      amount,
      description,
      date,
      receipt,
    });
  }

  async getExpenses(categoryId?: string, month?: number, year?: number) {
    let endpoint = '/expenses';
    const params = new URLSearchParams();
    if (categoryId) params.append('categoryId', categoryId);
    if (month) params.append('month', month.toString());
    if (year) params.append('year', year.toString());
    if (params.toString()) endpoint += `?${params.toString()}`;
    return this.request('GET', endpoint);
  }

  async getExpensesByBudget(budgetId: string) {
    return this.request('GET', `/expenses/budget/${budgetId}`);
  }

  async updateExpense(
    expenseId: string,
    amount?: number,
    description?: string,
    date?: string,
    receipt?: string
  ) {
    return this.request('PUT', `/expenses/${expenseId}`, { amount, description, date, receipt });
  }

  async deleteExpense(expenseId: string) {
    return this.request('DELETE', `/expenses/${expenseId}`);
  }

  // Income
  async createIncome(
    source: string,
    amount: number,
    frequency?: string,
    date?: string,
    description?: string
  ) {
    return this.request('POST', '/income', {
      source,
      amount,
      frequency,
      date,
      description,
    });
  }

  async getIncome(frequency?: string, month?: number, year?: number) {
    let endpoint = '/income';
    const params = new URLSearchParams();
    if (frequency) params.append('frequency', frequency);
    if (month) params.append('month', month.toString());
    if (year) params.append('year', year.toString());
    if (params.toString()) endpoint += `?${params.toString()}`;
    return this.request('GET', endpoint);
  }

  async getIncomeSummary(month: number, year: number) {
    return this.request('GET', `/income/summary/${month}/${year}`);
  }

  async updateIncome(
    incomeId: string,
    source?: string,
    amount?: number,
    frequency?: string,
    date?: string,
    description?: string
  ) {
    return this.request('PUT', `/income/${incomeId}`, {
      source,
      amount,
      frequency,
      date,
      description,
    });
  }

  async deleteIncome(incomeId: string) {
    return this.request('DELETE', `/income/${incomeId}`);
  }

  // Analytics
  async getMonthlySummary(year: number, month: number) {
    return this.request('GET', `/analytics/monthly/${year}/${month}`);
  }

  async getCategoryBreakdown(year: number, month: number) {
    return this.request('GET', `/analytics/categories/${year}/${month}`);
  }

  async getYearlySummary(year: number) {
    return this.request('GET', `/analytics/yearly/${year}`);
  }

  async getExpenseTrends(months: number = 6) {
    return this.request('GET', `/analytics/trends/${months}`);
  }

  async getTopCategories(limit: number = 5) {
    return this.request('GET', `/analytics/top-categories/${limit}`);
  }
}

export const apiClient = new ApiClient();
