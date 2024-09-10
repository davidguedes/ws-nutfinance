import { BudgetCategory, Budget as PrismaBudget } from '@prisma/client';
import { prisma } from "../lib/prisma"

export class Budget {

    public static async update(data: {
        id: string;
        totalExpense: number,
        totalIncome: number,
        incomeCategories: any[],
        expenseCategories: any[],
        user_id: string
    }): Promise<Budget> {
        try {
            let budget: Budget | null = null;

             // Verifica se o budget existe
            if(data.id) {
                budget = await prisma.budget.findUnique({ where: { id: data.id } });
            } else {
                budget = await prisma.budget.findFirst({ where: { user_id: data.user_id } });
            }

            // Se não existir, cria um novo budget
            if(budget == null) {
                budget = await prisma.budget.create({
                    data: {
                        user_id: data.user_id,
                        totalExpense: data.totalExpense,
                        totalIncome: data.totalIncome
                    },
                });
            } else {
                // Atualiza o budget existente
                budget = await prisma.budget.update({
                    where: { id: budget.id },
                    data: {
                        totalExpense: data.totalExpense,
                        totalIncome: data.totalIncome,
                        user_id: data.user_id,
                        updatedAt: new Date(),
                    }
                })
            }

             // Atualizar ou inserir incomeCategories
        const incomeCategoryIds = data.incomeCategories.map(cat => cat.id).filter(id => id !== null);

        // Exclui categorias de renda que não estão no array de atualização
        await prisma.budgetCategory.deleteMany({
            where: {
                budget_id: budget.id,
                type: 'income',
                NOT: { id: { in: incomeCategoryIds } }
            }
        });

        for (const cat of data.incomeCategories) {
            if (cat.id) {
                // Atualiza categoria existente
                await prisma.budgetCategory.update({
                    where: { id: cat.id },
                    data: {
                        category: cat.name,
                        amount: cat.amount,
                        color: cat.color
                    }
                });
            } else {
                // Cria nova categoria
                await prisma.budgetCategory.create({
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
        await prisma.budgetCategory.deleteMany({
            where: {
                budget_id: budget.id,
                type: 'expense',
                NOT: { id: { in: expenseCategoryIds } }
            }
        });

        for (const cat of data.expenseCategories) {
            if (cat.id) {
                // Atualiza categoria existente
                await prisma.budgetCategory.update({
                    where: { id: cat.id },
                    data: {
                        category: cat.name,
                        amount: cat.amount,
                        color: cat.color
                    }
                });
            } else {
                // Cria nova categoria
                await prisma.budgetCategory.create({
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
        } catch (error) {
            console.error('Failed to update budget: ', error);
            throw new Error(`Failed to update budget: ${error}`);
        }
    }

    public static async getAll(user_id: string): Promise<Budget | null> {
        try {
            let budget: Budget | null = await prisma.budget.findFirst({
                where: { user_id },
                include: {
                    categories: true // Inclui os registros associados de 'budgetCategory'
                }
            });

            if(!budget)
                budget = await Budget.createBase(user_id);

            return budget;
        } catch (error) {
            console.error('Failed to update budget: ', error);
            throw new Error(`Failed to update budget: ${error}`);
        }
    }

    public static async createBase(user_id: string): Promise<Budget | null> {
        try {

            let budget: Budget | null = await prisma.budget.create({
                data: {
                    user_id: user_id,
                    totalExpense: 100,
                    totalIncome: 100
                },
            });
            
            await prisma.budgetCategory.create({
                data: {
                    budget_id: budget.id,
                    type: 'expense',
                    category: 'Gasto básico',
                    amount: 100,
                    color: '00FF00'
                }
            });

            await prisma.budgetCategory.create({
                data: {
                    budget_id: budget.id,
                    type: 'income',
                    category: 'Ganho básico',
                    amount: 100,
                    color: 'FF0000'
                }
            });

            budget = await prisma.budget.findFirst({
                where: { user_id },
                include: {
                    categories: true // Inclui os registros associados de 'budgetCategory'
                }
            });

            return budget;
        } catch (error) {
            console.error('Failed to create base budget: ', error);
            throw new Error(`Failed to create base budget: ${error}`);
        }
    }

    public static async getCategory(user_id: string): Promise<BudgetCategory[]> {
        try {
            let budget = await prisma.budget.findFirst({ where: { user_id } });

            let category: BudgetCategory[] = [];

            if(budget) {
                category = await prisma.budgetCategory.findMany({
                    where: { budget_id: budget.id }
                });
            }

            return category;
        } catch (error) {
            console.error('Failed to update budget: ', error);
            throw new Error(`Failed to update budget: ${error}`);
        }
    }
    
    // Atributos do modelo
    public id: string;
    //public name: string;
    //public description: string | null;
    public user_id: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(prismaBudget: PrismaBudget) {
        this.id = prismaBudget.id;
        //this.name = prismaBudget.name;
        //this.description = prismaBudget.description;
        this.user_id = prismaBudget.user_id;
        this.createdAt = prismaBudget.createdAt;
        this.updatedAt = prismaBudget.updatedAt;
    }

    /*constructor(prismBudgetCategory: PrismaBudgetCategory) {

    }*/
}
