import { Transaction as PrismaTransaction } from '@prisma/client';
import { prisma } from "../lib/prisma"

export class Transaction {

    public static async findAll(): Promise<Transaction[] | []> {
        const transactions = await prisma.transaction.findMany().catch(err => err.message);
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
        date_transaction: Date;
        description: string;
        tags: string[];
        user_id: string;
    }): Promise<Transaction> {
        try {
            console.log('create ', data);
            let newTransaction: Transaction = {} as Transaction;
            
            await prisma.transaction.create({
                data: {
                    value: data.value,
                    type: data.type,
                    recurrence: data.recurrence,
                    number_recurrence: data.number_recurrence,
                    date_transaction: data.date_transaction,
                    description: data.description,
                    tags: { set: data.tags }, // Assuming tags is an array of strings
                    user_id: data.user_id,
                },
            }).then((resp: Transaction) => {
                newTransaction = resp;
            })
            .catch(err => {
                throw new Error(err);
            });
    
            return newTransaction;
        } catch (error) {
            // Handle error appropriately
            throw new Error(`Failed to create transaction: ${error}`);
        }
    }

    public static async update(data: {
        id: string;
        value: number;
        type: string;
        recurrence: boolean;
        number_recurrence: number;
        date_transaction: Date;
        description: string;
        tags: string[];
        user_id: string;
    }): Promise<Transaction> {
        try {
            console.log('update ', data);

            let updatedTransaction: Transaction = {} as Transaction;
            
            await prisma.transaction.update({
                where: {
                    id: data.id,
                },
                data: {
                    value: data.value,
                    type: data.type,
                    recurrence: data.recurrence,
                    number_recurrence: data.number_recurrence,
                    date_transaction: data.date_transaction,
                    description: data.description,
                    tags: { set: data.tags },
                    user_id: data.user_id,
                    updatedAt: new Date()
                },
            }).then((resp: Transaction) => {
                updatedTransaction = resp;
            })
            .catch(err => {
                throw new Error(err);
            });
    
            return updatedTransaction;
        } catch (error) {
            // Handle error appropriately
            throw new Error(`Failed to update transaction: ${error}`);
        }
    }

    public static async delete(data: {
        id: string;
    }): Promise<boolean> {
        try {
            await prisma.transaction.delete({
                where: {
                    id: data.id
                },
            }).catch(err => {
                throw new Error(err);
            });

            //console.log('delete: ', deletedTransaction);
    
            return true;
        } catch (error) {
            // Handle error appropriately
            throw new Error(`Failed to delete transaction: ${error}`);
        }
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
