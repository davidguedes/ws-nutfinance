import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';
import { Transaction as PrismaTransaction } from '@prisma/client';

export class TransactionController {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            let { user_id, first, initial_date_transaction, final_date_transaction, tags, type, sort } = req.query;
            const now = new Date();
            const endOfMonth =  new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
            console.log('req.query: ', req.query);
            if(!user_id) {
                throw new Error('Operação inválida! Sem dados de usuário.');
            }

            let value_user_id = user_id.toString();
            let valueFirst: number = first ? Number(first) : 0;
            let value_initial_date_transaction: Date | null = initial_date_transaction ? new Date(initial_date_transaction as string) : null;
            let value_final_date_transaction: Date | null = final_date_transaction ? new Date(final_date_transaction as string) : endOfMonth;
            let valueTags: string[] | null = tags ? (tags as string).split(',') : null;
            let valueType = type === 'true' ? 'R' : type === 'false' ? 'D' : null;
            let valueSort = sort === 'false' ? false : true;

            const transactions: PrismaTransaction[] = await Transaction.findAll(value_user_id, valueFirst, value_initial_date_transaction, value_final_date_transaction, valueTags, valueType, valueSort);
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        const transactionId = req.params.id;
        try {
            const transaction = await Transaction.findById(transactionId);
            res.json(transaction);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    public async create(req: Request, res: Response): Promise<void> {
        try {
            console.log('[00]', req.body);
            const { value, type, isInstallment, totalInstallmentNumber, date_transaction, description, tags, user_id, category } = req.body.data;

            // Criar a transação utilizando o método estático create do modelo
            const newTransaction = await Transaction.create({
                value,
                type,
                isInstallment,
                totalInstallmentNumber,
                installmentNumber: isInstallment ? 1 : null,
                date_transaction: new Date(date_transaction),
                description,
                tags,
                user_id: user_id,
                category
            });

            if (isInstallment && totalInstallmentNumber && totalInstallmentNumber > 1) {
                for (let i = 1; i < totalInstallmentNumber; i++) {
                    // Calcula a data da próxima parcela
                    const installmentDate = new Date(date_transaction);
                    installmentDate.setMonth(installmentDate.getMonth() + i);
    
                    await Transaction.create({
                        value,
                        type,
                        isInstallment,
                        totalInstallmentNumber,
                        installmentNumber: i + 1,
                        date_transaction: installmentDate,
                        description,
                        tags,
                        user_id: user_id,
                        parentTransactionId: newTransaction.id,
                        category
                    });
                }
            }

            // Retornar a transação criada como resposta
            res.status(201).json(newTransaction);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao criar transação:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id, value, type, isInstallment, totalInstallmentNumber, date_transaction, description, tags, user_id, category } = req.body.data;

            // Criar a transação utilizando o método estático create do modelo
            const updatedTransaction = await Transaction.update({
                id,
                value,
                type,
                isInstallment,
                totalInstallmentNumber,
                date_transaction,
                description,
                tags,
                user_id: user_id,
                category
            });

            // Retornar a transação criada como resposta
            res.status(200).json(updatedTransaction);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao atualizar transação:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
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
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}

export default new TransactionController();
