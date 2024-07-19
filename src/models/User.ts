import { User as PrismaUser } from '@prisma/client';
import { prisma } from "../lib/prisma"

export class User {
    // Métodos para manipular usuários

    public static async findAll(): Promise<User[] | []> {
        try {
            const users = await prisma.user.findMany();
            return users.map(user => new User(user));
        } catch (error) {
            console.error('Failed to find all users: ', error);
            return [];
        }
    }

    public static async findById(id: string): Promise<User | null> {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) return null;
            return new User(user);
        } catch (error) {
            console.error('Failed to find user by ID: ', error);
            return null;
        }
    }

    public static async create(data: {
        name: string;
        email: string;
        password: string;
        closing_date: number;
    }): Promise<User> {
        try {
            const newUser = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    closingDate: data.closing_date
                },
            });

            return new User(newUser);
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.target.includes('email')) {
                throw new Error('Email already in use');
            }
            console.error('Failed to create user: ', error);
            throw new Error(`Failed to create user: ${error.message}`);
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
