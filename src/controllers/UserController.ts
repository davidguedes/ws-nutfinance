import { Request, Response } from 'express';
import { User } from '../models/User';

export class UserController {
    // GET /api/users
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            // Chamando o método estático do modelo para buscar todos os usuários
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // GET /api/users/:id
    public async getById(req: Request, res: Response): Promise<void> {
        const user_id = req.params.id;
        // Lógica para buscar um usuário específico por ID
        try {
            // Chamando o método estático do modelo para buscar todos os usuários
            const user = await User.findById(user_id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // POST /api/users
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, closing_date} = req.body;

            // Validar os dados recebidos da requisição (opcional)

            // Criar a transação utilizando o método estático create do modelo
            const newUser = await User.create({
                name,
                email,
                password,
                closing_date
            });

            // Retornar o usuário criada como resposta
            res.status(201).json(newUser);
        } catch (error: any) {
            if (error.message === 'Email already in use') {
                res.status(400).json({ message: 'Email já está em uso' });
            } else {
                // Se houver um erro, retornar uma resposta de erro
                console.error('Erro ao criar usuário:', error);
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    // PUT /api/users/:id
    public update(req: Request, res: Response): void {
        const user_id = req.params.id;
        // Lógica para atualizar um usuário existente por ID
    }

    // DELETE /api/users/:id
    public delete(req: Request, res: Response): void {
        const user_id = req.params.id;
        // Lógica para excluir um usuário por ID
    }
}

export default new UserController();