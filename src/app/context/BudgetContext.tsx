import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  budget: number;
  spent: number;
  icon: string;
}

export interface Expense {
  id: string;
  categoryId: string;
  amount: number;
  description: string;
  date: Date;
  billImage?: string;
}

export interface MonthlyIncome {
  month: string;
  amount: number;
}

interface BudgetContextType {
  monthlyIncome: MonthlyIncome[];
  categories: Category[];
  expenses: Expense[];
  addIncome: (month: string, amount: number) => void;
  updateCategoryBudget: (categoryId: string, budget: number) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  getSpendingSummary: (language?: 'en' | 'ta' | 'si') => string;
  getAISuggestion: (categoryId: string) => string;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

const defaultCategories: Category[] = [
  { id: '1', name: 'food', budget: 0, spent: 0, icon: 'UtensilsCrossed' },
  { id: '2', name: 'utilities', budget: 0, spent: 0, icon: 'Lightbulb' },
  { id: '3', name: 'transport', budget: 0, spent: 0, icon: 'Car' },
  { id: '4', name: 'household', budget: 0, spent: 0, icon: 'Home' },
  { id: '5', name: 'leisure', budget: 0, spent: 0, icon: 'Gamepad2' },
];

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [monthlyIncome, setMonthlyIncome] = useState<MonthlyIncome[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addIncome = (month: string, amount: number) => {
    setMonthlyIncome(prev => {
      const existing = prev.find(i => i.month === month);
      if (existing) {
        return prev.map(i => i.month === month ? { ...i, amount } : i);
      }
      return [...prev, { month, amount }];
    });
  };

  const updateCategoryBudget = (categoryId: string, budget: number) => {
    setCategories(prev =>
      prev.map(cat => cat.id === categoryId ? { ...cat, budget } : cat)
    );
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    setExpenses(prev => [...prev, newExpense]);

    setCategories(prev =>
      prev.map(cat =>
        cat.id === expense.categoryId
          ? { ...cat, spent: cat.spent + expense.amount }
          : cat
      )
    );
  };

  const getSpendingSummary = (language: 'en' | 'ta' | 'si' = 'en'): string => {
    const totalIncome = monthlyIncome.reduce((sum, i) => sum + i.amount, 0);
    const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
    const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
    const remaining = totalIncome - totalSpent;

    if (language === 'ta') {
      return `மொத்த வருமானம்: ${totalIncome} ரூபாய். ஒதுக்கப்பட்ட பட்ஜெட்: ${totalBudget} ரூபாய். மொத்த செலவு: ${totalSpent} ரூபாய். மீதமுள்ளது: ${remaining} ரூபாய்.`;
    } else if (language === 'si') {
      return `මුළු ආදායම: ${totalIncome} රුපියල්. වෙන් කළ අයවැය: ${totalBudget} රුපියල්. මුළු වියදම: ${totalSpent} රුපියල්. ඉතිරිය: ${remaining} රුපියල්.`;
    } else {
      return `Total income: ${totalIncome} rupees. Budget allocated: ${totalBudget} rupees. Total spent: ${totalSpent} rupees. Remaining: ${remaining} rupees.`;
    }
  };

  const getAISuggestion = (categoryId: string): string => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return '';

    const overspend = category.spent - category.budget;
    if (overspend > 0) {
      const percentage = ((overspend / category.budget) * 100).toFixed(0);
      return `You've overspent by ${overspend} LKR (${percentage}%) in ${category.name}. Consider reducing expenses or reallocating from other categories.`;
    }

    return `You're doing well! ${(category.budget - category.spent).toFixed(0)} LKR remaining in ${category.name}.`;
  };

  return (
    <BudgetContext.Provider value={{
      monthlyIncome,
      categories,
      expenses,
      addIncome,
      updateCategoryBudget,
      addExpense,
      getSpendingSummary,
      getAISuggestion,
    }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within BudgetProvider');
  }
  return context;
};
