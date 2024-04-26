"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const prisma_1 = require("../lib/prisma");
class Transaction {
    static async findAll() {
        const transactions = await prisma_1.prisma.transaction.findMany().catch(err => err.message);
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
                    tags: { set: data.tags }, // Assuming tags is an array of strings
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
