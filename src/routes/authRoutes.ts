import express from 'express';
import authController from '../controllers/AuthController';
const router = express.Router();

// Definir rotas para posts
router.post('/login', authController.login);

router.post('/reset', authController.reset);

router.put('/update', authController.update);

export default router;