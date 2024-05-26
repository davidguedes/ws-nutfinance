"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const prisma_1 = require("../lib/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    // Métodos para manipular usuários
    static async login(email, password) {
        try {
            const user = await prisma_1.prisma.user.findUnique({ where: { email } });
            console.log('O user: ', user);
            if (!user) {
                throw new Error(`Invalid email or password`);
            }
            //const isPasswordValid = await bcrypt.compare(password, user.password);
            const isPasswordValid = password == user.password ? true : false;
            if (!isPasswordValid) {
                throw new Error(`Invalid email or password`);
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email, closing_date: user.closingDate }, process.env.JWT_SECRET ?? 'yMjkMoMJCmEbzp3tKUNvwPTftLPZf83r', { expiresIn: '1h' });
            return { token, user };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    // Atributos do modelo
    id;
    name;
    email;
    createdAt;
    updatedAt;
    constructor(prismaUser) {
        this.id = prismaUser.id;
        this.name = prismaUser.name;
        this.email = prismaUser.email;
        this.createdAt = prismaUser.createdAt;
        this.updatedAt = prismaUser.updatedAt;
    }
}
exports.Auth = Auth;
