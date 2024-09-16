import express from 'express';
import chartController from '../controllers/ChartnutController';
import { verifyToken } from '../utils/auth.middleware';
const router = express.Router();

router.get('/fixed', verifyToken, chartController.getFixed);

router.get('/profit', verifyToken, chartController.getProfit);

router.get('/expense', verifyToken, chartController.getExpense);

router.get('/comparative', verifyToken, chartController.getComparative);

router.get('/spendingCategory', verifyToken, chartController.getSpendingCategory);

router.get('/progressOfMonth', verifyToken, chartController.getProgressOfMonth);

export default router;