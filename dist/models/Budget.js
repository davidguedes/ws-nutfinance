"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
const prisma_1 = require("../lib/prisma");
class Budget {
    static async update(data) {
        try {
            let budget = null;
            // Verifica se o budget existe
            if (data.id) {
                budget = await prisma_1.prisma.budget.findUnique({ where: { id: data.id } });
            }
            else {
                budget = await prisma_1.prisma.budget.findFirst({ where: { user_id: data.user_id } });
            }
            // Se não existir, cria um novo budget
            if (budget == null) {
                budget = await prisma_1.prisma.budget.create({
                    data: {
                        user_id: data.user_id,
                        totalExpense: data.totalExpense,
                        totalIncome: data.totalIncome
                    },
                });
            }
            else {
                // Atualiza o budget existente
                budget = await prisma_1.prisma.budget.update({
                    where: { id: budget.id },
                    data: {
                        totalExpense: data.totalExpense,
                        totalIncome: data.totalIncome,
                        user_id: data.user_id,
                        updatedAt: new Date(),
                    }
                });
            }
            // Atualizar ou inserir incomeCategories
            const incomeCategoryIds = data.incomeCategories.map(cat => cat.id).filter(id => id !== null);
            // Exclui categorias de renda que não estão no array de atualização
            await prisma_1.prisma.budgetCategory.deleteMany({
                where: {
                    budget_id: budget.id,
                    type: 'income',
                    NOT: { id: { in: incomeCategoryIds } }
                }
            });
            for (const cat of data.incomeCategories) {
                if (cat.id) {
                    // Atualiza categoria existente
                    await prisma_1.prisma.budgetCategory.update({
                        where: { id: cat.id },
                        data: {
                            category: cat.name,
                            amount: cat.amount,
                            color: cat.color
                        }
                    });
                }
                else {
                    // Cria nova categoria
                    await prisma_1.prisma.budgetCategory.create({
                        data: {
                            budget_id: budget.id,
                            type: cat.type,
                            category: cat.name,
                            amount: cat.amount,
                            color: cat.color
                        }
                    });
                }
            }
            // Atualizar ou inserir expenseCategories
            const expenseCategoryIds = data.expenseCategories.map(cat => cat.id).filter(id => id !== null);
            // Exclui categorias de despesas que não estão no array de atualização
            await prisma_1.prisma.budgetCategory.deleteMany({
                where: {
                    budget_id: budget.id,
                    type: 'expense',
                    NOT: { id: { in: expenseCategoryIds } }
                }
            });
            for (const cat of data.expenseCategories) {
                if (cat.id) {
                    // Atualiza categoria existente
                    await prisma_1.prisma.budgetCategory.update({
                        where: { id: cat.id },
                        data: {
                            category: cat.name,
                            amount: cat.amount,
                            color: cat.color
                        }
                    });
                }
                else {
                    // Cria nova categoria
                    await prisma_1.prisma.budgetCategory.create({
                        data: {
                            budget_id: budget.id,
                            type: cat.type,
                            category: cat.name,
                            amount: cat.amount,
                            color: cat.color
                        }
                    });
                }
            }
            return budget;
        }
        catch (error) {
            console.error('Failed to update budget: ', error);
            throw new Error(`Failed to update budget: ${error}`);
        }
    }
    static async getAll(user_id) {
        try {
            let budget = await prisma_1.prisma.budget.findFirst({
                where: { user_id },
                include: {
                    categories: true // Inclui os registros associados de 'budgetCategory'
                }
            });
            if (!budget)
                budget = await Budget.createBase(user_id);
            return budget;
        }
        catch (error) {
            console.error('Failed to update budget: ', error);
            throw new Error(`Failed to update budget: ${error}`);
        }
    }
    static async createBase(user_id) {
        try {
            let budget = await prisma_1.prisma.budget.create({
                data: {
                    user_id: user_id,
                    totalExpense: 100,
                    totalIncome: 100
                },
            });
            await prisma_1.prisma.budgetCategory.create({
                data: {
                    budget_id: budget.id,
                    type: 'expense',
                    category: 'Gasto básico',
                    amount: 100,
                    color: '00FF00'
                }
            });
            await prisma_1.prisma.budgetCategory.create({
                data: {
                    budget_id: budget.id,
                    type: 'income',
                    category: 'Ganho básico',
                    amount: 100,
                    color: 'FF0000'
                }
            });
            budget = await prisma_1.prisma.budget.findFirst({
                where: { user_id },
                include: {
                    categories: true // Inclui os registros associados de 'budgetCategory'
                }
            });
            return budget;
        }
        catch (error) {
            console.error('Failed to create base budget: ', error);
            throw new Error(`Failed to create base budget: ${error}`);
        }
    }
    static async getCategory(user_id) {
        try {
            let budget = await prisma_1.prisma.budget.findFirst({ where: { user_id } });
            let category = [];
            if (budget) {
                category = await prisma_1.prisma.budgetCategory.findMany({
                    where: { budget_id: budget.id }
                });
            }
            return category;
        }
        catch (error) {
            console.error('Failed to update budget: ', error);
            throw new Error(`Failed to update budget: ${error}`);
        }
    }
    // Atributos do modelo
    id;
    //public name: string;
    //public description: string | null;
    user_id;
    createdAt;
    updatedAt;
    constructor(prismaBudget) {
        this.id = prismaBudget.id;
        //this.name = prismaBudget.name;
        //this.description = prismaBudget.description;
        this.user_id = prismaBudget.user_id;
        this.createdAt = prismaBudget.createdAt;
        this.updatedAt = prismaBudget.updatedAt;
    }
}
exports.Budget = Budget;
