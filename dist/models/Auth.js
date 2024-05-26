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
    static async getFixed(user_id) {
        let filter = {
            user_id: user_id
        };
        // Obter a data atual
        const today = new Date();
        // Primeiro dia do mês atual
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        // Último dia do mês atual
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        filter.date_transaction = {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth
        };
        console.log('filter: ', filter);
        try {
            const fixed = await prisma_1.prisma.transaction.count({
                where: filter
            });
            console.log('fixed: ', fixed);
            return fixed;
        }
        catch (err) {
            console.error('Error in getFixed: ', err);
            return 0;
        }
    }
    static async getProfit(user_id) {
        let filter = {
            user_id: user_id,
            type: 'R'
        };
        // Obter a data atual
        const today = new Date();
        // Primeiro dia do mês atual
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        // Último dia do mês atual
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        filter.date_transaction = {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth
        };
        console.log('filter: ', filter);
        try {
            const profit = await prisma_1.prisma.transaction.groupBy({
                by: ['user_id'],
                _sum: {
                    value: true,
                },
                where: filter
            });
            console.log('profit: ', profit);
            if (!profit || profit.length === 0 || !profit[0]._sum.value)
                return 0;
            return profit[0]._sum.value;
        }
        catch (err) {
            console.error('Error in getProfit: ', err);
            return 0;
        }
    }
    static async getComparative(user_id) {
        let filter = {
            user_id: user_id
        };
        // Obter a data atual
        const today = new Date();
        // Primeiro dia do mês atual
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        // Último dia do mês atual
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        filter.date_transaction = {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth
        };
        console.log('filter: ', filter);
        try {
            const profit = await prisma_1.prisma.transaction.groupBy({
                by: ['user_id'],
                _sum: {
                    value: true,
                },
                where: filter
            });
            console.log('profit: ', profit);
            if (!profit || profit.length === 0)
                return [0];
            return profit.map(p => p._sum.value);
        }
        catch (err) {
            console.error('Error in getComparative: ', err);
            return [0];
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
