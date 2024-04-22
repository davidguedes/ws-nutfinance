import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';

export class TransactionController {
    // GET /api/users
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            // Chamando o método estático do modelo para buscar todos os usuários
            const transactions = await Transaction.findAll();
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // GET /api/users/:id
    public async getById(req: Request, res: Response): Promise<void> {
        const transactionId = req.params.id;
        // Lógica para buscar um usuário específico por ID
        try {
            // Chamando o método estático do modelo para buscar todos as transações
            const transaction = await Transaction.findById(transactionId);
            res.json(transaction);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // POST /api/users
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { value, type, recurrence, number_recurrence, date_transacation, description, tags, user_id } = req.body;

            // Validar os dados recebidos da requisição (opcional)

            // Criar a transação utilizando o método estático create do modelo
            const newTransaction = await Transaction.create({
                value,
                type,
                recurrence,
                number_recurrence,
                date_transacation,
                description,
                tags,
                user_id,
            });

            // Retornar a transação criada como resposta
            res.status(201).json(newTransaction);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao criar transação:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    // PUT /api/users/:id
    public update(req: Request, res: Response): void {
        const userId = req.params.id;
        // Lógica para atualizar um usuário existente por ID
    }

    // DELETE /api/users/:id
    public delete(req: Request, res: Response): void {
        const userId = req.params.id;
        // Lógica para excluir um usuário por ID
    }
}

export default new TransactionController();