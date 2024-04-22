import express from 'express';
import transactionController from '../controllers/TransactionController';
const router = express.Router();

// Definir rotas para posts
router.get('/', transactionController.getAll);

router.post('/', transactionController.create);

router.put('/', transactionController.update);

router.delete('/', transactionController.delete);

export default router;