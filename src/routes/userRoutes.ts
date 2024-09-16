import express from 'express';
import userController from '../controllers/UserController';
import { verifyToken } from '../utils/auth.middleware';
const router = express.Router();

// Definir rotas para posts
router.get('/', verifyToken, userController.getAll);

router.post('/', userController.create);

router.put('/', verifyToken, userController.update);

router.delete('/', verifyToken, userController.delete);

export default router;