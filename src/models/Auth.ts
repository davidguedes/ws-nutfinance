import { User as PrismaUser } from '@prisma/client';
import { prisma } from "../lib/prisma"
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class Auth {
    // Métodos para manipular usuários

    public static async login(email: string, password: string): Promise<{ token: string, user: PrismaUser }> {
        try {
            const user = await prisma.user.findUnique({ where: { email } });
        
            console.log('O user: ', user);
            if (!user) {
                throw new Error(`Invalid email or password`);
            }
        
            //const isPasswordValid = await bcrypt.compare(password, user.password);
            const isPasswordValid = password == user.password ? true : false;

            if (!isPasswordValid) {
                throw new Error(`Invalid email or password`);
            }
        
            const token = jwt.sign({ id: user.id, name: user.name, email: user.email, closing_date: user.closingDate }, process.env.JWT_SECRET ?? 'yMjkMoMJCmEbzp3tKUNvwPTftLPZf83r', { expiresIn: '1h' });
        
            return { token, user };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public static async getFixed(user_id: string): Promise<number> {
        let filter: Prisma.TransactionWhereInput = {
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
            const fixed = await prisma.transaction.count({
                where: filter
            });

            console.log('fixed: ', fixed);
            return fixed;
        } catch (err) {
            console.error('Error in getFixed: ', err);
            return 0;
        }
    }
 
    public static async getProfit(user_id: string): Promise<number> {
         let filter: Prisma.TransactionWhereInput = {
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
            const profit = await prisma.transaction.groupBy({
                by: ['user_id'],
                _sum: {
                    value: true,
                },
                where: filter
            });

            console.log('profit: ', profit);

            if (!profit || profit.length === 0 || !profit[0]._sum.value) return 0;
            return profit[0]._sum.value;
        } catch (err) {
            console.error('Error in getProfit: ', err);
            return 0;
        }
    }

    public static async getComparative(user_id: string): Promise<any[]> {
        let filter: Prisma.TransactionWhereInput = {
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
            const profit = await prisma.transaction.groupBy({
                by: ['user_id'],
                _sum: {
                    value: true,
                },
                where: filter
            });

            console.log('profit: ', profit);

            if (!profit || profit.length === 0) return [0];
            return profit.map(p => p._sum.value);
        } catch (err) {
            console.error('Error in getComparative: ', err);
            return [0];
        }
    }
    
    // Atributos do modelo
    public id: string;
    public name: string;
    public email: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(prismaUser: PrismaUser) {
        this.id = prismaUser.id;
        this.name = prismaUser.name;
        this.email = prismaUser.email;
        this.createdAt = prismaUser.createdAt;
        this.updatedAt = prismaUser.updatedAt;
    }
}
