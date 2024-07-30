import express from 'express';
import categoryController from '../controllers/CategoryController';
const router = express.Router();

// Definir rotas para posts
router.get('/', categoryController.getAll);

router.get('/byUser', categoryController.getByUser);

router.post('/', categoryController.create);

router.put('/', categoryController.update);

router.delete('/:id', categoryController.delete);

export default router;