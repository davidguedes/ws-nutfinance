import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';
import { Transaction as PrismaTransaction } from '@prisma/client';

export class TransactionController {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            let { first, initial_date_transaction, final_date_transaction, tags, type } = req.query;

            console.log('req.query: ', req.query);
            let valueFirst: number = first ? Number(first) : 0;
            let value_initial_date_transaction: Date | null = initial_date_transaction ? new Date(initial_date_transaction as string) : null;
            let value_final_date_transaction: Date | null = final_date_transaction ? new Date(final_date_transaction as string) : null;
            let valueTags: string[] | null = tags ? (tags as string).split(',') : null;
            let valueType: string | null = type ? type as string : null;

            const transactions: PrismaTransaction[] = await Transaction.findAll(valueFirst, value_initial_date_transaction, value_final_date_transaction, valueTags, valueType);
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        const transactionId = req.params.id;
        try {
            const transaction = await Transaction.findById(transactionId);
            res.json(transaction);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    public async create(req: Request, res: Response): Promise<void> {
        try {
            console.log('[00]', req.body);
            const { value, type, recurrence, number_recurrence, date_transaction, description, tags, user_id } = req.body.data;

            // Criar a transação utilizando o método estático create do modelo
            const newTransaction = await Transaction.create({
                value,
                type,
                recurrence,
                number_recurrence,
                date_transaction,
                description,
                tags,
                user_id: "72bb4a6f-2633-4204-8115-38d3437d45e9"//user_id,
            });

            // Retornar a transação criada como resposta
            res.status(201).json(newTransaction);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao criar transação:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        try {
            const { id, value, type, recurrence, number_recurrence, date_transaction, description, tags, user_id } = req.body.data;

            // Criar a transação utilizando o método estático create do modelo
            const updatedTransaction = await Transaction.update({
                id,
                value,
                type,
                recurrence,
                number_recurrence,
                date_transaction,
                description,
                tags,
                user_id: "72bb4a6f-2633-4204-8115-38d3437d45e9"//user_id,
            });

            // Retornar a transação criada como resposta
            res.status(200).json(updatedTransaction);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao atualizar transação:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            console.log('[00]', req.params);
            const { id } = req.params;

            // Criar a transação utilizando o método estático create do modelo
            await Transaction.delete({
                id
            });

            //console.log('deletedTransaction: ', deletedTransaction);
            // Retornar a transação criada como resposta
            res.status(200).json(true);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao deletar transação:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default new TransactionController();