import { Request, Response } from 'express';
import { Auth } from '../models/Auth';
import { Chartnut } from '../models/Chartnut';
import { User } from '../models/User';
import jwt from "jsonwebtoken";
const refreshSecret = process.env.JWT_REFRESH_SECRET || '7db56535dd71a55ddece99828a2e184c';

export class AuthController {
    // GET /api/users
    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            let { token, refreshToken, user} = await Auth.login(email, password);
            
            const fixed = await Chartnut.getFixed('null');

            res.json({user, refreshToken, token});
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async reset(req: Request, res: Response): Promise<void> {
        const { user_id } = req.body;

        try {
            let status = await Auth.reset(user_id);
            
            res.json({'status': status});
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { user_id, name } = req.body.data;

            const closing_date = req.body.data.closing_date ?? undefined;
            
            // Atualiza o user utilizando o método estático create do modelo
            const updatedUser = await User.update({
                user_id,
                name,
                closing_date
            });

            // Retornar o user criado como resposta
            res.status(200).json(updatedUser);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao atualizar transação:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    public async refreshToken(req: Request, res: Response): Promise<void> {
      const { refreshToken } = req.body;
    
      if (!refreshToken) {
        res.status(403).json({ message: 'Refresh token não fornecido' });
      }
    
      try {
        // Verifica se o refresh token é válido
        const decoded = jwt.verify(refreshToken, refreshSecret) as any;
    
        // Verifica se o refresh token está salvo no banco e se é válido
        const storedToken = await Auth.verifyRefreshToken(refreshToken);
    
        if (!storedToken || new Date(storedToken.expiresAt) < new Date()) {
            res.status(403).json({ message: 'Refresh token inválido ou expirado' });
        }

        console.log('storedToken: ', storedToken);
    
        // Gera um novo access token
        const newAccessToken = jwt.sign(
          { id: decoded.id, name: decoded.name, email: decoded.email, closing_date: decoded.closing_date },
          process.env.JWT_SECRET ?? 'yMjkMoMJCmEbzp3tKUNvwPTftLPZf83r',
          { expiresIn: '15m' }
        );
    
        res.json({ accessToken: newAccessToken });
      } catch (err) {
        res.status(401).json({ message: 'Refresh token inválido ou expirado' });
      }
    };
}

export default new AuthController();