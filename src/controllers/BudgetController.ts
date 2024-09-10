import { Request, Response } from 'express';
import { Budget } from '../models/Budget';

export class BudgetController {

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const { id, totalExpense, totalIncome, incomeCategories, expenseCategories, user_id } = req.body.data;

            // Criar o orçamento utilizando o método estático create do modelo
            const updatedBudget = await Budget.update({
                id,
                totalExpense,
                totalIncome,
                incomeCategories,
                expenseCategories,
                user_id: user_id
            });

            // Retornar o orçamento atualizado como resposta
            res.status(200).json(updatedBudget);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao atualizar orçamento:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { user_id } = req.params;

            // Criar o orçamento utilizando o método estático create do modelo
            const budget = await Budget.getAll(user_id);

            // Retornar o orçamento
            res.status(200).json(budget);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao carregar orçamento:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    public async getCategory(req: Request, res: Response): Promise<void> {
        try {
            const { user_id } = req.params;

            const category = await Budget.getCategory(user_id);

            // Retornar as categorias
            res.status(200).json(category);
        } catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao carregar orçamento:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}

export default new BudgetController();