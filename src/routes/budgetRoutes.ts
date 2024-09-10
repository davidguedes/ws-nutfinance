import express from 'express';
import budgetController from '../controllers/BudgetController';
const router = express.Router();

// Definir rotas para posts
router.put('/', budgetController.update);

router.get('/:user_id', budgetController.getAll);

router.get('/getCategory/:user_id', budgetController.getCategory);

export default router;