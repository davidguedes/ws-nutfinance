"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const prisma_1 = require("../lib/prisma");
class Transaction {
    static async findAll(user_id, first, initial_date_transaction, final_date_transaction, tags, type, sort) {
        console.log('O first: ', first, ' initial_date_transaction: ', initial_date_transaction, ' final_date_transaction: ', final_date_transaction, ' tags: ', tags, ' type: ', type, ' sort: ', sort);
        let filter = {};
        filter.user_id = {
            equals: user_id
        };
        if (initial_date_transaction && final_date_transaction) {
            filter.date_transaction = {
                gte: initial_date_transaction,
                lte: final_date_transaction
            };
        }
        else if (initial_date_transaction) {
            filter.date_transaction = {
                gte: initial_date_transaction
            };
        }
        else if (final_date_transaction) {
            filter.date_transaction = {
                lte: final_date_transaction
            };
        }
        if (tags && tags.length > 0) {
            filter.tags = {
                hasSome: tags
            };
        }
        if (type) {
            filter.type = {
                equals: type
            };
        }
        console.log('filter: ', filter);
        try {
            const transactions = await prisma_1.prisma.transaction.findMany({
                skip: first,
                take: 10,
                orderBy: {
                    date_transaction: sort ? 'desc' : 'asc'
                },
                where: filter
            });
            return transactions;
        }
        catch (err) {
            console.error('Erro ao buscar transações: ', err);
            return [];
        }
    }
    static async findById(id) {
        try {
            const transaction = await prisma_1.prisma.transaction.findUnique({ where: { id } });
            if (!transaction)
                return null;
            return new Transaction(transaction);
        }
        catch (err) {
            console.error('Erro ao buscar transação por ID: ', err);
            return null;
        }
    }
    static async create(data) {
        try {
            const newTransaction = await prisma_1.prisma.transaction.create({
                data: {
                    value: data.value,
                    type: data.type,
                    recurrence: data.recurrence,
                    number_recurrence: data.number_recurrence,
                    date_transaction: data.date_transaction,
                    description: data.description,
                    tags: data.tags,
                    user_id: data.user_id,
                }
            });
            return new Transaction(newTransaction);
        }
        catch (error) {
            console.error('Failed to create transaction: ', error);
            throw new Error(`Failed to create transaction: ${error}`);
        }
    }
    static async update(data) {
        try {
            console.log('update ', data);
            const updatedTransaction = await prisma_1.prisma.transaction.update({
                where: { id: data.id },
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
                }
            });
            return new Transaction(updatedTransaction);
        }
        catch (error) {
            console.error('Failed to update transaction: ', error);
            throw new Error(`Failed to update transaction: ${error}`);
        }
    }
    static async delete(data) {
        try {
            await prisma_1.prisma.transaction.delete({
                where: { id: data.id }
            });
            return true;
        }
        catch (error) {
            console.error('Failed to delete transaction: ', error);
            throw new Error(`Failed to delete transaction: ${error}`);
        }
    }
    // Atributos do modelo
    id;
    createdAt;
    updatedAt;
    value;
    type;
    recurrence;
    number_recurrence;
    date_transaction;
    description;
    tags;
    user_id;
    closing_id;
    constructor(prismaTransaction) {
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
        this.closing_id = prismaTransaction.closing_id;
    }
}
exports.Transaction = Transaction;
