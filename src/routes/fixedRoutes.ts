import express from 'express';
import fixedController from '../controllers/FixedController';
const router = express.Router();

// Definir rotas para posts
router.get('/', fixedController.getAll);

router.post('/', fixedController.create);

router.put('/', fixedController.update);

router.delete('/:id', fixedController.delete);

export default router;