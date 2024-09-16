import { User as PrismaUser } from '@prisma/client';
import { prisma } from "../lib/prisma"
import { Prisma } from '@prisma/client';
import jwt from "jsonwebtoken";

export class Auth {
    // Métodos para manipular usuários

    public static async login(email: string, password: string): Promise<{ token: string, refreshToken: string, user: PrismaUser }> {
        try {
            const user = await prisma.user.findUnique({ where: { email } });
        
            if (!user) {
                throw new Error(`Invalid email or password`);
            }
        
            //const isPasswordValid = await bcrypt.compare(password, user.password);
            const isPasswordValid = password == user.password ? true : false;

            if (!isPasswordValid) {
                throw new Error(`Invalid email or password`);
            }
        
            const token = jwt.sign({ id: user.id, name: user.name, email: user.email, closing_date: user.closingDate }, process.env.JWT_SECRET ?? 'yMjkMoMJCmEbzp3tKUNvwPTftLPZf83r', { expiresIn: '15m' });

            const refreshToken = await Auth.createRefreshToken({ id: user.id, name: user.name, email: user.email, closing_date: user.closingDate });
        
            return { token, refreshToken, user };
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    public static async createRefreshToken(objectUser: any): Promise<string> {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // Expira em 7 dias
      
        const refreshToken = await prisma.refreshToken.create({
          data: {
            token: jwt.sign(objectUser, process.env.JWT_REFRESH_SECRET ?? '7db56535dd71a55ddece99828a2e184c', { expiresIn: '7d' }), // Função para gerar o token
            userId: objectUser.id,
            expiresAt: expiresAt,
          },
        });
      
        return refreshToken.token;
    }

    public static async reset(user_id: string): Promise<boolean> {
        try {
            await prisma.closing.deleteMany({ where: { user_id } });
            await prisma.transaction.deleteMany({ where: { user_id } });
            await prisma.fixed.deleteMany({ where: { user_id } });
            await prisma.budgetCategory.deleteMany({ where: { user_id } });
            await prisma.budget.deleteMany({ where: { user_id } });

            return true;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await prisma.$disconnect();
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
  
         try {
            const fixed = await prisma.transaction.count({
                where: filter
            });

            return fixed;
        } catch (err) {
            console.error('Error in getFixed: ', err);
            return 0;
        } finally {
            await prisma.$disconnect();
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
  
        try {
            /*const profit = await prisma.transaction.groupBy({
                by: ['user_id'],
                _sum: {
                    value: true,
                },
                where: filter
            });

            console.log('profit: ', profit);

            if (!profit || profit.length === 0 || !profit[0]._sum.value) return 0;
            return profit[0]._sum.value;*/
            return 0;
        } catch (err) {
            console.error('Error in getProfit: ', err);
            return 0;
        } finally {
            await prisma.$disconnect();
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
 
        try {
            /*const profit = await prisma.transaction.groupBy({
                by: ['user_id'],
                _sum: {
                    value: true,
                },
                where: filter
            });

            console.log('profit: ', profit);

            if (!profit || profit.length === 0) return [0];
            return profit.map(p => p._sum.value);*/
            return [0, 0 ,0];
        } catch (err) {
            console.error('Error in getComparative: ', err);
            return [0];
        } finally {
            await prisma.$disconnect();
        }
    }

    public static async verifyRefreshToken(refreshToken: string): Promise<any> {
        try {
             // Verifica se o refresh token está salvo no banco e se é válido
            const storedToken = await prisma.refreshToken.findUnique({
                where: { token: refreshToken },
            });

            if(!storedToken)
                return {}

            return storedToken;
        } catch (err) {
            console.error('Error in verifyRefreshToken: ', err);
            return {};
        } finally {
            await prisma.$disconnect();
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

// Função para gerar o access token (expira em 15 minutos)
export function generateAccessToken(userId: number): string {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
}
  
// Função para gerar o refresh token (geralmente dura vários dias)
export function generateRefreshToken(userId: number): string {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!);
}
