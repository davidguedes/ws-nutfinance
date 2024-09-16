import express from 'express';
import authController from '../controllers/AuthController';
import { verifyToken } from '../utils/auth.middleware';
const router = express.Router();

// Definir rotas para posts
router.post('/login', authController.login);

router.post('/reset', verifyToken, authController.reset);

router.put('/update', verifyToken, authController.update);

router.post('/refresh-token', authController.refreshToken);

export default router;