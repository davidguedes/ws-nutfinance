"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const prisma_1 = require("../lib/prisma");
class Transaction {
    static async findAll(first, initial_date_transaction, final_date_transaction, tags, type) {
        console.log('O first: ', first, ' initial_date_transaction: ', initial_date_transaction, ' final_date_transaction: ', final_date_transaction, ' tags: ', tags, ' type: ', type);
        let filter = {};
        if (initial_date_transaction && final_date_transaction) {
            filter.date_transaction = {
                in: [initial_date_transaction, final_date_transaction]
            };
        }
        else if (initial_date_transaction && !final_date_transaction) {
            filter.date_transaction = {
                lt: initial_date_transaction
            };
        }
        else if (!initial_date_transaction && final_date_transaction) {
            filter.date_transaction = {
                gt: final_date_transaction
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
        const transactions = await prisma_1.prisma.transaction.findMany({
            skip: first, // Pula os registros anteriores ao primeiro registro desejado - Index do ponto onde preciso que parta esses registros
            take: 10, // Quantidade de registros a serem retornados - Exmeplo: Quero sempre que retorne 5 registros
            orderBy: {
                date_transaction: 'desc', // 'asc' para ordenação ascendente, 'desc' para ordenação descendente
            },
            where: filter
        }).catch(err => err.message);
        console.log('transactions:? ', transactions);
        if (!transactions)
            return [];
        return transactions;
    }
    static async findById(id) {
        const transaction = await prisma_1.prisma.transaction.findUnique({ where: { id } });
        if (!transaction)
            return null;
        return new Transaction(transaction);
    }
    static async create(data) {
        try {
            console.log('create ', data);
            let newTransaction = {};
            await prisma_1.prisma.transaction.create({
                data: {
                    value: data.value,
                    type: data.type,
                    recurrence: data.recurrence,
                    number_recurrence: data.number_recurrence,
                    date_transaction: data.date_transaction,
                    description: data.description,
                    tags: data.tags, // Assuming tags is an array of strings
                    user_id: data.user_id,
                },
            }).then((resp) => {
                newTransaction = resp;
            })
                .catch(err => {
                throw new Error(err);
            });
            return newTransaction;
        }
        catch (error) {
            // Handle error appropriately
            throw new Error(`Failed to create transaction: ${error}`);
        }
    }
    static async update(data) {
        try {
            console.log('update ', data);
            let updatedTransaction = {};
            await prisma_1.prisma.transaction.update({
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
            }).then((resp) => {
                updatedTransaction = resp;
            })
                .catch(err => {
                throw new Error(err);
            });
            return updatedTransaction;
        }
        catch (error) {
            // Handle error appropriately
            throw new Error(`Failed to update transaction: ${error}`);
        }
    }
    static async delete(data) {
        try {
            await prisma_1.prisma.transaction.delete({
                where: {
                    id: data.id
                },
            }).catch(err => {
                throw new Error(err);
            });
            //console.log('delete: ', deletedTransaction);
            return true;
        }
        catch (error) {
            // Handle error appropriately
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
    }
}
exports.Transaction = Transaction;
