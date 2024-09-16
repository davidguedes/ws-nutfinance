"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const Auth_1 = require("../models/Auth");
const Chartnut_1 = require("../models/Chartnut");
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshSecret = process.env.JWT_REFRESH_SECRET || '7db56535dd71a55ddece99828a2e184c';
class AuthController {
    // GET /api/users
    async login(req, res) {
        const { email, password } = req.body;
        try {
            let { token, refreshToken, user } = await Auth_1.Auth.login(email, password);
            const fixed = await Chartnut_1.Chartnut.getFixed('null');
            res.json({ user, refreshToken, token });
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
    async refreshToken(req, res) {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(403).json({ message: 'Refresh token não fornecido' });
        }
        try {
            // Verifica se o refresh token é válido
            const decoded = jsonwebtoken_1.default.verify(refreshToken, refreshSecret);
            // Verifica se o refresh token está salvo no banco e se é válido
            const storedToken = await Auth_1.Auth.verifyRefreshToken(refreshToken);
            if (!storedToken || new Date(storedToken.expiresAt) < new Date()) {
                res.status(403).json({ message: 'Refresh token inválido ou expirado' });
            }
            console.log('storedToken: ', storedToken);
            // Gera um novo access token
            const newAccessToken = jsonwebtoken_1.default.sign({ id: decoded.id, name: decoded.name, email: decoded.email, closing_date: decoded.closing_date }, process.env.JWT_SECRET ?? 'yMjkMoMJCmEbzp3tKUNvwPTftLPZf83r', { expiresIn: '15m' });
            res.json({ accessToken: newAccessToken });
        }
        catch (err) {
            res.status(401).json({ message: 'Refresh token inválido ou expirado' });
        }
    }
    ;
}
exports.AuthController = AuthController;
exports.default = new AuthController();
//# sourceMappingURL=AuthController.js.map