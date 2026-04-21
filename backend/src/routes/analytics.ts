import { Router } from 'express';
import { prisma } from '../index.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// Get monthly summary
router.get(
  '/monthly/:year/:month',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { year, month } = req.params;

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0);

    // Get budgets for month
    const budgets = await prisma.budget.findMany({
      where: {
        userId: req.userId,
        year: Number(year),
        month: Number(month),
      },
      include: { category: true, expenses: true },
    });

    // Get income for month
    const income = await prisma.income.findMany({
      where: {
        userId: req.userId,
        date: { gte: startDate, lte: endDate },
      },
    });

    const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
    const totalBudgeted = budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const totalRemaining = totalBudgeted - totalSpent;

    res.status(200).json({
      success: true,
      data: {
        month,
        year,
        income: totalIncome,
        budgeted: totalBudgeted,
        spent: totalSpent,
        remaining: totalRemaining,
        surplus: totalIncome - totalSpent,
      },
    });
  })
);

// Get category breakdown
router.get(
  '/categories/:year/:month',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { year, month } = req.params;

    const budgets = await prisma.budget.findMany({
      where: {
        userId: req.userId,
        year: Number(year),
        month: Number(month),
      },
      include: { category: true, expenses: true },
    });

    const categoryBreakdown = budgets.map((budget) => {
      const percentage = budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;
      return {
        category: budget.category.name,
        icon: budget.category.icon,
        budgeted: budget.amount,
        spent: budget.spent,
        remaining: budget.amount - budget.spent,
        percentage: Math.round(percentage),
        expenses: budget.expenses.length,
      };
    });

    res.status(200).json({
      success: true,
      data: { categoryBreakdown },
    });
  })
);

// Get yearly summary
router.get(
  '/yearly/:year',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { year } = req.params;

    const monthlySummary = [];

    for (let month = 1; month <= 12; month++) {
      const budgets = await prisma.budget.findMany({
        where: {
          userId: req.userId,
          year: Number(year),
          month,
        },
      });

      const startDate = new Date(Number(year), month - 1, 1);
      const endDate = new Date(Number(year), month, 0);

      const income = await prisma.income.findMany({
        where: {
          userId: req.userId,
          date: { gte: startDate, lte: endDate },
        },
      });

      const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
      const totalBudgeted = budgets.reduce((sum, b) => sum + b.amount, 0);
      const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

      monthlySummary.push({
        month,
        income: totalIncome,
        budgeted: totalBudgeted,
        spent: totalSpent,
        remaining: totalBudgeted - totalSpent,
      });
    }

    res.status(200).json({
      success: true,
      data: { year, monthlySummary },
    });
  })
);

// Get expense trends
router.get(
  '/trends/:months',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { months } = req.params;
    const numMonths = parseInt(months) || 6;

    const trends = [];
    const now = new Date();

    for (let i = numMonths - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const expenses = await prisma.expense.findMany({
        where: {
          userId: req.userId,
          date: {
            gte: new Date(year, month - 1, 1),
            lte: new Date(year, month, 0),
          },
        },
      });

      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      trends.push({
        month: `${year}-${month.toString().padStart(2, '0')}`,
        total,
        count: expenses.length,
      });
    }

    res.status(200).json({
      success: true,
      data: { trends },
    });
  })
);

// Get top categories
router.get(
  '/top-categories/:limit',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { limit } = req.params;
    const limitNum = parseInt(limit) || 5;

    const expenses = await prisma.expense.findMany({
      where: { userId: req.userId },
      include: { category: true },
    });

    const categoryTotals = expenses.reduce((acc: any, expense) => {
      const existing = acc.find((item: any) => item.categoryId === expense.categoryId);
      if (existing) {
        existing.total += expense.amount;
        existing.count += 1;
      } else {
        acc.push({
          categoryId: expense.categoryId,
          category: expense.category.name,
          icon: expense.category.icon,
          total: expense.amount,
          count: 1,
        });
      }
      return acc;
    }, []);

    const topCategories = categoryTotals
      .sort((a: any, b: any) => b.total - a.total)
      .slice(0, limitNum);

    res.status(200).json({
      success: true,
      data: { topCategories },
    });
  })
);

export default router;
