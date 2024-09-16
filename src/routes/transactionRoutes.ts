import express from 'express';
import transactionController from '../controllers/TransactionController';
import { verifyToken } from '../utils/auth.middleware';
const router = express.Router();

// Definir rotas para posts
router.get('/', verifyToken, transactionController.getAll);

router.post('/', verifyToken, transactionController.create);

router.put('/', verifyToken, transactionController.update);

router.delete('/:id', verifyToken, transactionController.delete);

export default router;