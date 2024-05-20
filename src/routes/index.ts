import express from 'express';
import fixedRouter from './fixedRoutes';
import transactionRouter from './transactionRoutes';
import userRouter from './userRoutes';
const router = express.Router();

router.use('/fixed', fixedRouter);
router.use('/transaction', transactionRouter);
router.use('/user', userRouter);

export default router;