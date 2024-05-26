import express from 'express';
import authController from '../controllers/AuthController';
const router = express.Router();

// Definir rotas para posts
router.post('/login', authController.login);

export default router;