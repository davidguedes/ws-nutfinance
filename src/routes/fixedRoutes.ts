import express from 'express';
import fixedController from '../controllers/FixedController';
import { verifyToken } from '../utils/auth.middleware';
const router = express.Router();

// Definir rotas para posts
router.get('/', verifyToken, fixedController.getAll);

router.post('/', verifyToken, fixedController.create);

router.put('/', verifyToken, fixedController.update);

router.delete('/:id', verifyToken, fixedController.delete);

export default router;