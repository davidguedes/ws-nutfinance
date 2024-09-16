"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'yMjkMoMJCmEbzp3tKUNvwPTftLPZf83r';
const refreshSecret = process.env.JWT_REFRESH_SECRET || '7db56535dd71a55ddece99828a2e184c';
// Middleware para verificar o token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Normalmente o token vem no formato 'Bearer TOKEN'
    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.body.userId = decoded.id; // Armazena o ID do usuário na requisição
        next(); // Continua para a próxima middleware/rota
    }
    catch (err) {
        // Caso o token tenha expirado
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado' });
        }
        return res.status(401).json({ message: 'Token inválido' });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.middleware.js.map