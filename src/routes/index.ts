import express from 'express';
import fixedRouter from './fixedRoutes';
import chartRouter from './chartRoutes';
import transactionRouter from './transactionRoutes';
import userRouter from './userRoutes';
import authRouter from './authRoutes';
import budgetRouter from './budgetRoutes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/budget', budgetRouter);
router.use('/chart', chartRouter);
router.use('/fixed', fixedRouter);
router.use('/transaction', transactionRouter);
router.use('/user', userRouter);

export default router;