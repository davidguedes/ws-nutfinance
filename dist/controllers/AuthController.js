"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const Auth_1 = require("../models/Auth");
const Chartnut_1 = require("../models/Chartnut");
const User_1 = require("../models/User");
class AuthController {
    // GET /api/users
    async login(req, res) {
        const { email, password } = req.body;
        try {
            let { token, user } = await Auth_1.Auth.login(email, password);
            const fixed = await Chartnut_1.Chartnut.getFixed('null');
            res.json({ user, token });
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async reset(req, res) {
        const { user_id } = req.body;
        try {
            let status = await Auth_1.Auth.reset(user_id);
            res.json({ 'status': status });
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async update(req, res) {
        try {
            const { user_id, name } = req.body.data;
            const closing_date = req.body.data.closing_date ?? undefined;
            // Atualiza o user utilizando o método estático create do modelo
            const updatedUser = await User_1.User.update({
                user_id,
                name,
                closing_date
            });
            // Retornar o user criado como resposta
            res.status(200).json(updatedUser);
        }
        catch (error) {
            // Se houver um erro, retornar uma resposta de erro
            console.error('Erro ao atualizar transação:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController();
//# sourceMappingURL=AuthController.js.map