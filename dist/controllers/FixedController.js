"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedController = void 0;
const Fixed_1 = require("../models/Fixed");
class FixedController {
    async getAll(req, res) {
        try {
            let { user_id, first, rows, description, day_inclusion, tags, status, type, sort } = req.query;
            if (!user_id) {
                throw new Error('Operação inválida! Sem dados de usuário.');
            }
            let value_user_id = user_id.toString();
            let valueFirst = first ? Number(first) : 0;
            let valueRows = rows ? Number(rows) : 0;
            let value_description = description ? description : null;
            let value_day_inclusion = day_inclusion ? Number(day_inclusion) : null;
            let valueTags = tags ? tags.split(',') : null;
            let valueStatus = status === 'false' ? false : true;
            let valueType = type === 'true' ? 'R' : type === 'false' ? 'D' : null;
            let valueSort = sort === 'false' ? false : true;
            const data = await Fixed_1.Fixed.findAll(value_user_id, valueFirst, valueRows, value_description, value_day_inclusion, valueTags, valueStatus, valueType, valueSort);
            res.json({ totalRecords: data.totalRecords, records: data.records });
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async getById(req, res) {
        const transactionId = req.params.id;
        try {
            const transaction = await Fixed_1.Fixed.findById(transactionId);
            res.json(transaction);
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async create(req, res) {
        try {
            console.log('[00]', req.body);
            const { value, type, day_inclusion, description, tags, user_id, category } = req.body.data;
            // Criar a transação utilizando o método estático create do modelo
            const newFixed = await Fixed_1.Fixed.create({
                value,
                type,
                day_inclusion,
                description,
                tags,
                user_id: user_id,
                category
            });
            res.status(201).json(newFixed);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao criar fixa:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    async update(req, res) {
        const user_id = req.params.id;
        try {
            const { id, value, type, day_inclusion, description, tags, user_id, category } = req.body.data;
            // Criar a transação utilizando o método estático create do modelo
            const updatedFixed = await Fixed_1.Fixed.update({
                id,
                value,
                type,
                day_inclusion,
                description,
                tags,
                user_id: user_id,
                category
            });
            // Retornar a transação criada como resposta
            res.status(200).json(updatedFixed);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao atualizar fixa:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            // Criar a transação utilizando o método estático create do modelo
            await Fixed_1.Fixed.delete({
                id
            });
            //console.log('deletedTransaction: ', deletedTransaction);
            // Retornar a transação criada como resposta
            res.status(200).json(true);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao deletar fixa:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
exports.FixedController = FixedController;
exports.default = new FixedController();
//# sourceMappingURL=FixedController.js.map