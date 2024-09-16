import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'yMjkMoMJCmEbzp3tKUNvwPTftLPZf83r';
const refreshSecret = process.env.JWT_REFRESH_SECRET || '7db56535dd71a55ddece99828a2e184c';

// Middleware para verificar o token
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Normalmente o token vem no formato 'Bearer TOKEN'

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.body.userId = (decoded as any).id; // Armazena o ID do usuário na requisição
    next(); // Continua para a próxima middleware/rota
  } catch (err: any) {
    // Caso o token tenha expirado
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }

    return res.status(401).json({ message: 'Token inválido' });
  }
};