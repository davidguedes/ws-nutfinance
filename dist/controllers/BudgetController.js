"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetController = void 0;
const Budget_1 = require("../models/Budget");
class BudgetController {
    async update(req, res) {
        try {
            const { id, totalExpense, totalIncome, incomeCategories, expenseCategories, user_id } = req.body.data;
            // Criar o orçamento utilizando o método estático create do modelo
            const updatedBudget = await Budget_1.Budget.update({
                id,
                totalExpense,
                totalIncome,
                incomeCategories,
                expenseCategories,
                user_id: user_id
            });
            // Retornar o orçamento atualizado como resposta
            res.status(200).json(updatedBudget);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao atualizar orçamento:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    async getAll(req, res) {
        try {
            const { user_id } = req.params;
            // Criar o orçamento utilizando o método estático create do modelo
            const budget = await Budget_1.Budget.getAll(user_id);
            // Retornar o orçamento
            res.status(200).json(budget);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao carregar orçamento:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    async getCategory(req, res) {
        try {
            const { user_id } = req.params;
            const category = await Budget_1.Budget.getCategory(user_id);
            // Retornar as categorias
            res.status(200).json(category);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao carregar orçamento:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
exports.BudgetController = BudgetController;
exports.default = new BudgetController();
//# sourceMappingURL=BudgetController.js.map