"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const Transaction_1 = require("../models/Transaction");
class TransactionController {
    // GET /api/users
    async getAll(req, res) {
        try {
            // Chamando o método estático do modelo para buscar todos os usuários
            const transactions = await Transaction_1.Transaction.findAll();
            res.json(transactions);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // GET /api/users/:id
    async getById(req, res) {
        const transactionId = req.params.id;
        // Lógica para buscar um usuário específico por ID
        try {
            // Chamando o método estático do modelo para buscar todos as transações
            const transaction = await Transaction_1.Transaction.findById(transactionId);
            res.json(transaction);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // POST /api/users
    async create(req, res) {
        try {
            const { value, type, recurrence, number_recurrence, date_transacation, description, tags, user_id } = req.body;
            // Validar os dados recebidos da requisição (opcional)
            // Criar a transação utilizando o método estático create do modelo
            const newTransaction = await Transaction_1.Transaction.create({
                value,
                type,
                recurrence,
                number_recurrence,
                date_transacation,
                description,
                tags,
                user_id,
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
    // PUT /api/users/:id
    update(req, res) {
        const userId = req.params.id;
        // Lógica para atualizar um usuário existente por ID
    }
    // DELETE /api/users/:id
    delete(req, res) {
        const userId = req.params.id;
        // Lógica para excluir um usuário por ID
    }
}
exports.TransactionController = TransactionController;
exports.default = new TransactionController();
