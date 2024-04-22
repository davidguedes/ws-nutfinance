import { Transaction as PrismaTransaction } from '@prisma/client';
import { prisma } from "../lib/prisma"

export class Transaction {
    // Métodos para manipular transações3

    public static async findAll(): Promise<Transaction[] | []> {
        const transactions = await prisma.transaction.findMany();
        if (!transactions) return [];
        return transactions;
    }

    public static async findById(id: string): Promise<Transaction | null> {
        const transaction = await prisma.transaction.findUnique({ where: { id } });
        if (!transaction) return null;
        return new Transaction(transaction);
    }

    public static async create(data: {
        value: number;
        type: string;
        recurrence: boolean;
        number_recurrence: number;
        date_transacation: Date;
        description: string;
        tags: string[];
        user_id: string;
    }): Promise<Transaction> {
        try {
            const newTransaction = await prisma.transaction.create({
                data: {
                    value: data.value,
                    type: data.type,
                    recurrence: data.recurrence,
                    number_recurrence: data.number_recurrence,
                    date_transacation: data.date_transacation,
                    description: data.description,
                    tags: { set: data.tags }, // Assuming tags is an array of strings
                    user_id: data.user_id,
                },
            });
    
            return new Transaction(newTransaction);
        } catch (error) {
            // Handle error appropriately
            throw new Error('Failed to create transaction');
        }
    }

    // Outros métodos de manipulação de usuários...
    
    // Atributos do modelo
    public id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public value: number;
    public type: string;
    public recurrence: boolean;
    public number_recurrence: number;
    public date_transacation: Date;
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
        this.date_transacation = prismaTransaction.date_transacation;
        this.description = prismaTransaction.description;
        this.tags = prismaTransaction.tags;
        this.user_id = prismaTransaction.user_id;
    }
}
