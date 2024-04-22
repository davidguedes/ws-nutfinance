import express from 'express';
import transactionRouter from './transactionRoutes';
import userRouter from './userRoutes';
const router = express.Router();

router.use('/transaction', transactionRouter);
router.use('/user', userRouter);

export default router;