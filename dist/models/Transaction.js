"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const prisma_1 = require("../lib/prisma");
const cryptoUtils_1 = require("../utils/cryptoUtils"); // Importa as funções de criptografia
class Transaction {
    static async findAll(user_id, first, initial_date_transaction, final_date_transaction, tags, type, sort) {
        //console.log('O first: ', first, ' initial_date_transaction: ', initial_date_transaction, ' final_date_transaction: ', final_date_transaction, ' tags: ', tags, ' type: ', type, ' sort: ', sort);
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
        try {
            const transactions = await prisma_1.prisma.transaction.findMany({
                skip: first,
                take: 10,
                orderBy: {
                    date_transaction: sort ? 'desc' : 'asc'
                },
                where: filter
            });
            return transactions.map(tx => ({
                ...tx,
                value: (0, cryptoUtils_1.decrypt)(tx.value) // Descriptografa o valor
            }));
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
            transaction.value = (0, cryptoUtils_1.decrypt)(transaction.value); // Descriptografa o valor
            return new Transaction(transaction);
        }
        catch (err) {
            console.error('Erro ao buscar transação por ID: ', err);
            return null;
        }
    }
    static async create(data) {
        try {
            const encryptedValue = (0, cryptoUtils_1.encrypt)(data.value.toString());
            const newTransaction = await prisma_1.prisma.transaction.create({
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
                    parentTransactionId: data.parentTransactionId,
                    budgetCategory_id: data.category
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
            const encryptedValue = (0, cryptoUtils_1.encrypt)(data.value.toString());
            const updatedTransaction = await prisma_1.prisma.transaction.update({
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
                    updatedAt: new Date(),
                    budgetCategory_id: data.category
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
    isInstallment;
    totalInstallmentNumber;
    date_transaction;
    description;
    tags;
    user_id;
    closing_id;
    constructor(prismaTransaction) {
        this.id = prismaTransaction.id;
        this.createdAt = prismaTransaction.createdAt;
        this.updatedAt = prismaTransaction.updatedAt;
        this.value = parseFloat((0, cryptoUtils_1.decrypt)(prismaTransaction.value)); // Descriptografa o valor
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
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map