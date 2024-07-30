import { Request, Response } from 'express';
import { Category } from '../models/Category';

export class CategoryController {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            let { user_id, first, rows, name } = req.query;

            if(!user_id) {
                throw new Error('Operação inválida! Sem dados de usuário.');
            }

            let value_user_id = user_id.toString();
            let valueFirst: number = first ? Number(first) : 0;
            let valueRows: number = rows ? Number(rows) : 0;
            let value_name: string | null = name ? name as string : null;

            const data = await Category.findAll(value_user_id, valueFirst, valueRows, value_name);
            res.json({totalRecords: data.totalRecords, records: data.records});
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async getByUser(req: Request, res: Response): Promise<void> {
        try {
            let { user_id } = req.query;

            if(!user_id) {
                throw new Error('Operação inválida! Sem dados de usuário.');
            }

            let value_user_id = user_id.toString();

            const data = await Category.findByUser(value_user_id);
            res.json(data.records);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        const transactionId = req.params.id;
        try {
            const transaction = await Category.findById(transactionId);
            res.json(transaction);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    public async create(req: Request, res: Response): Promise<void> {
        try {
            console.log('[00]', req.body);
            const { name, description, user_id } = req.body.data;

            // Criar a transação utilizando o método estático create do modelo
            const newCategory = await Category.create({
                name,
                description,
                user_id: user_id
            });

            res.status(201).json(newCategory);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao criar categoria:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const user_id = req.params.id;
        try {
            const { id, name, description, tags, user_id } = req.body.data;

            // Criar a transação utilizando o método estático create do modelo
            const updatedCategory = await Category.update({
                id,
                name,
                description,
                user_id: user_id
            });

            // Retornar a transação criada como resposta
            res.status(200).json(updatedCategory);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao atualizar categoria:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            console.log('[00]', req.params);
            const { id } = req.params;

            // Criar a transação utilizando o método estático create do modelo
            await Category.delete({
                id
            });

            //console.log('deletedTransaction: ', deletedTransaction);
            // Retornar a transação criada como resposta
            res.status(200).json(true);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao deletar categoria:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}

export default new CategoryController();