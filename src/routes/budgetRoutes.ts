import express from 'express';
import budgetController from '../controllers/BudgetController';
import { verifyToken } from '../utils/auth.middleware';
const router = express.Router();

// Definir rotas para posts
router.put('/', verifyToken, budgetController.update);

router.get('/:user_id', verifyToken, budgetController.getAll);

router.get('/getCategory/:user_id', verifyToken, budgetController.getCategory);

export default router;