import express from 'express';
import fixedRouter from './fixedRoutes';
import chartRouter from './chartRoutes';
import transactionRouter from './transactionRoutes';
import userRouter from './userRoutes';
const router = express.Router();

router.use('/chart', chartRouter);
router.use('/fixed', fixedRouter);
router.use('/transaction', transactionRouter);
router.use('/user', userRouter);

export default router;