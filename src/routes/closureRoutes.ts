import express from 'express';
import closureController from '../controllers/ClosureController';
import { verifyToken } from '../utils/auth.middleware';
const router = express.Router();

// Definir rotas para posts
router.get('/', verifyToken, closureController.getAll);

export default router;