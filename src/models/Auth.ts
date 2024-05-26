import { User as PrismaUser, User } from '@prisma/client';
import { prisma } from "../lib/prisma"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class Auth {
    // Métodos para manipular usuários

    public static async login(email: string, password: string): Promise<any | null> {
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
        
            const token = jwt.sign({ id: user.id, name: user.name, email: user.email, closing_date: user.closingDate }, 'your_jwt_secret', { expiresIn: '1h' });
        
            return { token, user };
        } catch (error) {
            throw error;
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
