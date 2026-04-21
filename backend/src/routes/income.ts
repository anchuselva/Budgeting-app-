import { Router } from 'express';
import { prisma } from '../index.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { validateAmount } from '../utils/validation.js';

const router = Router();

// Create income
router.post(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { source, amount, frequency, date, description } = req.body;

    if (!source || !amount) {
      return res.status(400).json({
        success: false,
        error: { message: 'Source and amount are required' },
      });
    }

    if (!validateAmount(amount)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid amount' },
      });
    }

    const income = await prisma.income.create({
      data: {
        userId: req.userId!,
        source,
        amount: parseFloat(amount),
        frequency: frequency || 'monthly',
        date: date ? new Date(date) : new Date(),
        description,
      },
    });

    res.status(201).json({
      success: true,
      data: { income },
    });
  })
);

// Get all income for user
router.get(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { frequency, month, year } = req.query;

    let where: any = { userId: req.userId };

    if (frequency) {
      where.frequency = frequency;
    }

    if (month && year) {
      const startDate = new Date(Number(year), Number(month) - 1, 1);
      const endDate = new Date(Number(year), Number(month), 0);
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    const income = await prisma.income.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    const total = income.reduce((sum, i) => sum + i.amount, 0);

    res.status(200).json({
      success: true,
      data: { income, total },
    });
  })
);

// Get income summary
router.get(
  '/summary/:month/:year',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { month, year } = req.params;

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0);

    const income = await prisma.income.findMany({
      where: {
        userId: req.userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const total = income.reduce((sum, i) => sum + i.amount, 0);
    const bySource = income.reduce((acc, i) => {
      const existing = acc.find((item: any) => item.source === i.source);
      if (existing) {
        existing.amount += i.amount;
        existing.count += 1;
      } else {
        acc.push({ source: i.source, amount: i.amount, count: 1 });
      }
      return acc;
    }, []);

    res.status(200).json({
      success: true,
      data: { total, bySource, count: income.length },
    });
  })
);

// Update income
router.put(
  '/:incomeId',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { incomeId } = req.params;
    const { source, amount, frequency, date, description } = req.body;

    if (amount && !validateAmount(amount)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid amount' },
      });
    }

    const income = await prisma.income.update({
      where: { id: incomeId },
      data: {
        ...(source && { source }),
        ...(amount && { amount: parseFloat(amount) }),
        ...(frequency && { frequency }),
        ...(date && { date: new Date(date) }),
        ...(description !== undefined && { description }),
      },
    });

    res.status(200).json({
      success: true,
      data: { income },
    });
  })
);

// Delete income
router.delete(
  '/:incomeId',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: any) => {
    const { incomeId } = req.params;

    await prisma.income.delete({
      where: { id: incomeId },
    });

    res.status(200).json({
      success: true,
      message: 'Income deleted',
    });
  })
);

export default router;
