
import { Prisma, Transaction as PrismaTransaction } from '@prisma/client';
import { prisma } from "../lib/prisma";
import { encrypt, decrypt } from '../utils/cryptoUtils'; // Importa as funções de criptografia

export class Transaction {

    public static async findAll(user_id: string, first: number, initial_date_transaction: Date | null, final_date_transaction: Date | null, tags: string[] | null, type: string | null, sort: boolean): Promise<PrismaTransaction[] | []> {
        console.log('O first: ', first, ' initial_date_transaction: ', initial_date_transaction, ' final_date_transaction: ', final_date_transaction, ' tags: ', tags, ' type: ', type, ' sort: ', sort);

        let filter: Prisma.TransactionWhereInput = {};

        filter.user_id = {
            equals: user_id
        };

        if (initial_date_transaction && final_date_transaction) {
            filter.date_transaction = {
                gte: initial_date_transaction,
                lte: final_date_transaction
            };
        } else if (initial_date_transaction) {
            filter.date_transaction = {
                gte: initial_date_transaction
            };
        } else if (final_date_transaction) {
            filter.date_transaction = {
                lte: final_date_transaction
            };
        }

        if (tags && tags.length > 0) {
            filter.tags = {
                hasSome: tags
            }
        }

        if (type) {
            filter.type = {
                equals: type
            };
        }

        console.log('filter: ', filter);

        try {
            const transactions = await prisma.transaction.findMany({
                skip: first,
                take: 10,
                orderBy: {
                    date_transaction: sort ? 'desc' : 'asc'
                },
                where: filter
            });

            return transactions.map(tx => ({
                ...tx,
                value: decrypt(tx.value)// Descriptografa o valor
            }));
        } catch (err) {
            console.error('Erro ao buscar transações: ', err);
            return [];
        }
    }

    public static async findById(id: string): Promise<Transaction | null> {
        try {
            const transaction = await prisma.transaction.findUnique({ where: { id } });
            if (!transaction) return null;

            transaction.value = decrypt(transaction.value); // Descriptografa o valor
            return new Transaction(transaction);
        } catch (err) {
            console.error('Erro ao buscar transação por ID: ', err);
            return null;
        }
    }

    public static async create(data: {
        value: number;
        type: string;
        isInstallment: boolean;
        totalInstallmentNumber: number;
        installmentNumber: number | null;
        date_transaction: Date;
        description: string;
        tags: string[];
        user_id: string;
        parentTransactionId?: string | null;
    }): Promise<Transaction> {
        try {
            const encryptedValue = encrypt(data.value.toString());

            const newTransaction = await prisma.transaction.create({
                data: {
                    value: encryptedValue, // Salva o valor encriptado
                    type: data.type,
                    isInstallment: data.isInstallment,
                    totalInstallmentNumber: data.totalInstallmentNumber,
                    installmentNumber: data.installmentNumber,
                    date_transaction: data.date_transaction,
                    description: data.description,
                    tags: data.tags,
                    user_id: data.user_id,
                    parentTransactionId: data.parentTransactionId
                }
            });

            return new Transaction(newTransaction);
        } catch (error) {
            console.error('Failed to create transaction: ', error);
            throw new Error(`Failed to create transaction: ${error}`);
        }
    }

    public static async update(data: {
        id: string;
        value: number;
        type: string;
        isInstallment: boolean;
        totalInstallmentNumber: number;
        date_transaction: Date;
        description: string;
        tags: string[];
        user_id: string;
    }): Promise<Transaction> {
        try {
            console.log('update ', data);

            const encryptedValue = encrypt(data.value.toString());

            const updatedTransaction = await prisma.transaction.update({
                where: { id: data.id },
                data: {
                    value: encryptedValue, // Salva o valor encriptado
                    type: data.type,
                    isInstallment: data.isInstallment,
                    totalInstallmentNumber: data.totalInstallmentNumber,
                    date_transaction: data.date_transaction,
                    description: data.description,
                    tags: { set: data.tags },
                    user_id: data.user_id,
                    updatedAt: new Date()
                }
            });

            return new Transaction(updatedTransaction);
        } catch (error) {
            console.error('Failed to update transaction: ', error);
            throw new Error(`Failed to update transaction: ${error}`);
        }
    }

    public static async delete(data: {
        id: string;
    }): Promise<boolean> {
        try {
            await prisma.transaction.delete({
                where: { id: data.id }
            });
            return true;
        } catch (error) {
            console.error('Failed to delete transaction: ', error);
            throw new Error(`Failed to delete transaction: ${error}`);
        }
    }

    // Atributos do modelo
    public id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public value: number;
    public type: string;
    public isInstallment: boolean;
    public totalInstallmentNumber?: number | null;
    public date_transaction: Date;
    public description: string;
    public tags: string[];
    public user_id: string;
    public closing_id?: string | null;

    constructor(prismaTransaction: PrismaTransaction) {
        this.id = prismaTransaction.id;
        this.createdAt = prismaTransaction.createdAt;
        this.updatedAt = prismaTransaction.updatedAt;
        this.value = parseFloat(decrypt(prismaTransaction.value)); // Descriptografa o valor
        this.type = prismaTransaction.type;
        this.isInstallment = prismaTransaction.isInstallment;
        this.totalInstallmentNumber = prismaTransaction.totalInstallmentNumber;
        this.date_transaction = prismaTransaction.date_transaction;
        this.description = prismaTransaction.description;
        this.tags = prismaTransaction.tags;
        this.user_id = prismaTransaction.user_id;
        this.closing_id = prismaTransaction.closing_id;
    }
}
