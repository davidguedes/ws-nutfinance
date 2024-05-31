"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const Transaction_1 = require("../models/Transaction");
class TransactionController {
    async getAll(req, res) {
        try {
            let { user_id, first, initial_date_transaction, final_date_transaction, tags, type, sort } = req.query;
            console.log('req.query: ', req.query);
            if (!user_id) {
                throw new Error('Operação inválida! Sem dados de usuário.');
            }
            let value_user_id = user_id.toString();
            let valueFirst = first ? Number(first) : 0;
            let value_initial_date_transaction = initial_date_transaction ? new Date(initial_date_transaction) : null;
            let value_final_date_transaction = final_date_transaction ? new Date(final_date_transaction) : null;
            let valueTags = tags ? tags.split(',') : null;
            let valueType = type === 'true' ? 'R' : type === 'false' ? 'D' : null;
            let valueSort = sort === 'false' ? false : true;
            const transactions = await Transaction_1.Transaction.findAll(value_user_id, valueFirst, value_initial_date_transaction, value_final_date_transaction, valueTags, valueType, valueSort);
            res.json(transactions);
        }
        catch (error) {
            res.status(500).json({ error: `Internal Server Error: ${error}` });
        }
    }
    async getById(req, res) {
        const transactionId = req.params.id;
        try {
            const transaction = await Transaction_1.Transaction.findById(transactionId);
            res.json(transaction);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async create(req, res) {
        try {
            console.log('[00]', req.body);
            const { value, type, recurrence, number_recurrence, date_transaction, description, tags, user_id } = req.body.data;
            // Criar a transação utilizando o método estático create do modelo
            const newTransaction = await Transaction_1.Transaction.create({
                value,
                type,
                recurrence,
                number_recurrence,
                date_transaction,
                description,
                tags,
                user_id: user_id
            });
            // Retornar a transação criada como resposta
            res.status(201).json(newTransaction);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao criar transação:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    async update(req, res) {
        const user_id = req.params.id;
        try {
            const { id, value, type, recurrence, number_recurrence, date_transaction, description, tags, user_id } = req.body.data;
            // Criar a transação utilizando o método estático create do modelo
            const updatedTransaction = await Transaction_1.Transaction.update({
                id,
                value,
                type,
                recurrence,
                number_recurrence,
                date_transaction,
                description,
                tags,
                user_id: user_id
            });
            // Retornar a transação criada como resposta
            res.status(200).json(updatedTransaction);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao atualizar transação:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    async delete(req, res) {
        try {
            console.log('[00]', req.params);
            const { id } = req.params;
            // Criar a transação utilizando o método estático create do modelo
            await Transaction_1.Transaction.delete({
                id
            });
            //console.log('deletedTransaction: ', deletedTransaction);
            // Retornar a transação criada como resposta
            res.status(200).json(true);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao deletar transação:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}
exports.TransactionController = TransactionController;
exports.default = new TransactionController();
