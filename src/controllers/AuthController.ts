import { Request, Response } from 'express';
import { Auth } from '../models/Auth';
import { Chartnut } from '../models/Chartnut';
import { User } from '../models/User';

export class AuthController {
    // GET /api/users
    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            let { token, user} = await Auth.login(email, password);
            
            const fixed = await Chartnut.getFixed('null');

            res.json({user, token});
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
}

export default new AuthController();