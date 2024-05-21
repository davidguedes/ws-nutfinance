import express from 'express';
import chartController from '../controllers/ChartController';
const router = express.Router();

router.get('/fixed', chartController.getFixed);

router.get('/profit', chartController.getProfit);

export default router;