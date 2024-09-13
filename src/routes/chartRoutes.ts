import express from 'express';
import chartController from '../controllers/ChartnutController';
const router = express.Router();

router.get('/fixed', chartController.getFixed);

router.get('/profit', chartController.getProfit);

router.get('/expense', chartController.getExpense);

router.get('/comparative', chartController.getComparative);

router.get('/spendingCategory', chartController.getSpendingCategory);

router.get('/progressOfMonth', chartController.getProgressOfMonth);

export default router;