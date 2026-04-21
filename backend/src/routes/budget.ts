import { Router } from 'express';
import { prisma } from '../index.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { validateAmount } from '../utils/validation.js';

const router = Router();

// Create budget category
router.post(
  '/categories',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { name, icon, color } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: { message: 'Category name is required' },
      });
    }

    const category = await prisma.budgetCategory.create({
      data: {
        name,
        icon: icon || '📊',
        color: color || '#000000',
        userId: req.userId!,
      },
    });

    res.status(201).json({
      success: true,
      data: { category },
    });
  })
);

// Get all budget categories
router.get(
  '/categories',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const categories = await prisma.budgetCategory.findMany({
      where: { userId: req.userId },
    });

    res.status(200).json({
      success: true,
      data: { categories },
    });
  })
);

// Update budget category
router.put(
  '/categories/:categoryId',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { categoryId } = req.params;
    const { name, icon, color } = req.body;

    const category = await prisma.budgetCategory.update({
      where: { id: categoryId },
      data: {
        ...(name && { name }),
        ...(icon && { icon }),
        ...(color && { color }),
      },
    });

    res.status(200).json({
      success: true,
      data: { category },
    });
  })
);

// Delete budget category
router.delete(
  '/categories/:categoryId',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { categoryId } = req.params;

    await prisma.budgetCategory.delete({
      where: { id: categoryId },
    });

    res.status(200).json({
      success: true,
      message: 'Category deleted',
    });
  })
);

// Create budget
router.post(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { categoryId, amount, month, year, description } = req.body;

    if (!categoryId || !amount || !month || !year) {
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

    const budget = await prisma.budget.create({
      data: {
        categoryId,
        userId: req.userId!,
        amount: parseFloat(amount),
        month: parseInt(month),
        year: parseInt(year),
        description,
      },
      include: { category: true },
    });

    res.status(201).json({
      success: true,
      data: { budget },
    });
  })
);

// Get budgets for specific month
router.get(
  '/:year/:month',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { year, month } = req.params;

    const budgets = await prisma.budget.findMany({
      where: {
        userId: req.userId,
        year: parseInt(year),
        month: parseInt(month),
      },
      include: {
        category: true,
        expenses: true,
      },
    });

    const totalBudgeted = budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

    res.status(200).json({
      success: true,
      data: {
        budgets,
        summary: {
          totalBudgeted,
          totalSpent,
          remaining: totalBudgeted - totalSpent,
        },
      },
    });
  })
);

// Get all budgets
router.get(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const budgets = await prisma.budget.findMany({
      where: { userId: req.userId },
      include: { category: true, expenses: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: { budgets },
    });
  })
);

// Update budget
router.put(
  '/:budgetId',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { budgetId } = req.params;
    const { amount, description } = req.body;

    if (amount && !validateAmount(amount)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid amount' },
      });
    }

    const budget = await prisma.budget.update({
      where: { id: budgetId },
      data: {
        ...(amount && { amount: parseFloat(amount) }),
        ...(description !== undefined && { description }),
      },
      include: { category: true },
    });

    res.status(200).json({
      success: true,
      data: { budget },
    });
  })
);

// Delete budget
router.delete(
  '/:budgetId',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { budgetId } = req.params;

    await prisma.budget.delete({
      where: { id: budgetId },
    });

    res.status(200).json({
      success: true,
      message: 'Budget deleted',
    });
  })
);

export default router;
