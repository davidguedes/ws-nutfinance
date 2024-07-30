"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const Category_1 = require("../models/Category");
class CategoryController {
    async getAll(req, res) {
        try {
            let { user_id, first, rows, name } = req.query;
            if (!user_id) {
                throw new Error('Operação inválida! Sem dados de usuário.');
            }
            let value_user_id = user_id.toString();
            let valueFirst = first ? Number(first) : 0;
            let valueRows = rows ? Number(rows) : 0;
            let value_name = name ? name : null;
            const data = await Category_1.Category.findAll(value_user_id, valueFirst, valueRows, value_name);
            res.json({ totalRecords: data.totalRecords, records: data.records });
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async getByUser(req, res) {
        try {
            let { user_id } = req.query;
            if (!user_id) {
                throw new Error('Operação inválida! Sem dados de usuário.');
            }
            let value_user_id = user_id.toString();
            const data = await Category_1.Category.findByUser(value_user_id);
            res.json(data.records);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async getById(req, res) {
        const transactionId = req.params.id;
        try {
            const transaction = await Category_1.Category.findById(transactionId);
            res.json(transaction);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async create(req, res) {
        try {
            console.log('[00]', req.body);
            const { name, description, user_id } = req.body.data;
            // Criar a transação utilizando o método estático create do modelo
            const newCategory = await Category_1.Category.create({
                name,
                description,
                user_id: user_id
            });
            res.status(201).json(newCategory);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao criar categoria:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    async update(req, res) {
        const user_id = req.params.id;
        try {
            const { id, name, description, tags, user_id } = req.body.data;
            // Criar a transação utilizando o método estático create do modelo
            const updatedCategory = await Category_1.Category.update({
                id,
                name,
                description,
                user_id: user_id
            });
            // Retornar a transação criada como resposta
            res.status(200).json(updatedCategory);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao atualizar categoria:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    async delete(req, res) {
        try {
            console.log('[00]', req.params);
            const { id } = req.params;
            // Criar a transação utilizando o método estático create do modelo
            await Category_1.Category.delete({
                id
            });
            //console.log('deletedTransaction: ', deletedTransaction);
            // Retornar a transação criada como resposta
            res.status(200).json(true);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao deletar categoria:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
exports.CategoryController = CategoryController;
exports.default = new CategoryController();
