import { Prisma, Transaction as PrismaTransaction } from '@prisma/client';
import { prisma } from "../lib/prisma"

export class Chart {
    public static async getFixed(userId: string): Promise<number> {
       let filter: Prisma.TransactionWhereInput = {} as Prisma.TransactionWhereInput;

        filter.user_id = {
            equals: "3595e997-28f4-45b7-9f4b-768ee1352110"
        };

       // Obter a data atual
        const today = new Date();

        // Primeiro dia do mês atual
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Último dia do mês atual
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        if (firstDayOfMonth && lastDayOfMonth) {
            filter.date_transaction = {
                in: [firstDayOfMonth, lastDayOfMonth]
            };
        }

        console.log('filter: ', filter);

        const fixed = await prisma.transaction.count({
            //where: filter
        }).catch(err => err.message);

        console.log('fixed:? ', fixed)
        if (!fixed) return 0;
        return fixed;
    }

    public static async getProfit(userId: string): Promise<number> {
        let filter: Prisma.TransactionWhereInput = {} as Prisma.TransactionWhereInput;

        filter.user_id = {
            equals: "3595e997-28f4-45b7-9f4b-768ee1352110"
        };

        filter.type = {
            equals: 'R'
        };

       // Obter a data atual
        const today = new Date();

        // Primeiro dia do mês atual
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Último dia do mês atual
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        if (firstDayOfMonth && lastDayOfMonth) {
            filter.date_transaction = {
                in: [firstDayOfMonth, lastDayOfMonth]
            };
        }

        console.log('filter: ', filter);

        const profit = await prisma.transaction.groupBy({
            by: ['user_id'],
            _sum: {
                value: true,
            },
            //where: filter
        }).catch(err => err.message);

        console.log('profit: ', profit);

        //console.log('transactions:? ', transactions)
        if (!profit) return 0;
        return profit[0]._sum.value;
    }
    
    // Atributos do modelo
    public id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public value: number;
    public type: string;
    public recurrence: boolean;
    public number_recurrence: number;
    public date_transaction: Date;
    public description: string;
    public tags: string[];
    public user_id: string;

    constructor(prismaTransaction: PrismaTransaction) {
        this.id = prismaTransaction.id;
        this.createdAt = prismaTransaction.createdAt;
        this.updatedAt = prismaTransaction.updatedAt;
        this.value = prismaTransaction.value;
        this.type = prismaTransaction.type;
        this.recurrence = prismaTransaction.recurrence;
        this.number_recurrence = prismaTransaction.number_recurrence;
        this.date_transaction = prismaTransaction.date_transaction;
        this.description = prismaTransaction.description;
        this.tags = prismaTransaction.tags;
        this.user_id = prismaTransaction.user_id;
    }
}
