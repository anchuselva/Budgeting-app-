import { Router } from 'express';
import { prisma } from '../index.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { validateAmount } from '../utils/validation.js';

const router = Router();

// Create expense
router.post(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { budgetId, categoryId, amount, description, date, receipt } = req.body;

    if (!budgetId || !categoryId || !amount) {
      return res.status(400).json({
        success: false,
        error: { message: 'All fields are required' },
      });
    }

    if (!validateAmount(amount)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid amount' },
      });
    }

    // Create expense
    const expense = await prisma.expense.create({
      data: {
        budgetId,
        categoryId,
        userId: req.userId!,
        amount: parseFloat(amount),
        description,
        date: date ? new Date(date) : new Date(),
        receipt,
      },
      include: { category: true, budget: true },
    });

    // Update budget spent amount
    const budget = await prisma.budget.findUnique({
      where: { id: budgetId },
      include: { expenses: true },
    });

    if (budget) {
      const totalSpent = budget.expenses.reduce((sum, e) => sum + e.amount, 0);
      await prisma.budget.update({
        where: { id: budgetId },
        data: { spent: totalSpent },
      });
    }

    res.status(201).json({
      success: true,
      data: { expense },
    });
  })
);

// Get expenses for specific budget
router.get(
  '/budget/:budgetId',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { budgetId } = req.params;

    const expenses = await prisma.expense.findMany({
      where: {
        budgetId,
        userId: req.userId,
      },
      include: { category: true },
      orderBy: { date: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: { expenses },
    });
  })
);

// Get all expenses for user
router.get(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { categoryId, month, year } = req.query;

    let where: any = { userId: req.userId };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (month && year) {
      const startDate = new Date(Number(year), Number(month) - 1, 1);
      const endDate = new Date(Number(year), Number(month), 0);
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    const expenses = await prisma.expense.findMany({
      where,
      include: { category: true, budget: true },
      orderBy: { date: 'desc' },
    });

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    res.status(200).json({
      success: true,
      data: { expenses, total },
    });
  })
);

// Update expense
router.put(
  '/:expenseId',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { expenseId } = req.params;
    const { amount, description, date, receipt } = req.body;

    if (amount && !validateAmount(amount)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid amount' },
      });
    }

    const expense = await prisma.expense.update({
      where: { id: expenseId },
      data: {
        ...(amount && { amount: parseFloat(amount) }),
        ...(description !== undefined && { description }),
        ...(date && { date: new Date(date) }),
        ...(receipt && { receipt }),
      },
      include: { category: true, budget: true },
    });

    // Recalculate budget spent
    const budget = await prisma.budget.findUnique({
      where: { id: expense.budgetId },
      include: { expenses: true },
    });

    if (budget) {
      const totalSpent = budget.expenses.reduce((sum, e) => sum + e.amount, 0);
      await prisma.budget.update({
        where: { id: expense.budgetId },
        data: { spent: totalSpent },
      });
    }

    res.status(200).json({
      success: true,
      data: { expense },
    });
  })
);

// Delete expense
router.delete(
  '/:expenseId',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { expenseId } = req.params;

    const expense = await prisma.expense.findUnique({
      where: { id: expenseId },
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: { message: 'Expense not found' },
      });
    }

    await prisma.expense.delete({
      where: { id: expenseId },
    });

    // Recalculate budget spent
    const budget = await prisma.budget.findUnique({
      where: { id: expense.budgetId },
      include: { expenses: true },
    });

    if (budget) {
      const totalSpent = budget.expenses.reduce((sum, e) => sum + e.amount, 0);
      await prisma.budget.update({
        where: { id: expense.budgetId },
        data: { spent: totalSpent },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted',
    });
  })
);

export default router;
