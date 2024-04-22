import express from 'express';
import userController from '../controllers/UserController';
const router = express.Router();

// Definir rotas para posts
router.get('/', userController.getAll);

router.post('/', userController.create);

router.put('/', userController.update);

router.delete('/', userController.delete);

export default router;