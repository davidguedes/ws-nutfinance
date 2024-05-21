"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
class UserController {
    // GET /api/users
    async getAll(req, res) {
        try {
            // Chamando o método estático do modelo para buscar todos os usuários
            const users = await User_1.User.findAll();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // GET /api/users/:id
    async getById(req, res) {
        const userId = req.params.id;
        // Lógica para buscar um usuário específico por ID
        try {
            // Chamando o método estático do modelo para buscar todos os usuários
            const user = await User_1.User.findById(userId);
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // POST /api/users
    async create(req, res) {
        try {
            const { name, email, password } = req.body;
            // Validar os dados recebidos da requisição (opcional)
            // Criar a transação utilizando o método estático create do modelo
            const newUser = await User_1.User.create({
                name,
                email,
                password
            });
            // Retornar o usuário criada como resposta
            res.status(201).json(newUser);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao criar usuário:', error);
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
exports.UserController = UserController;
exports.default = new UserController();
