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
        } finally {
            await prisma.$disconnect();
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
        } finally {
            await prisma.$disconnect();
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
        } finally {
            await prisma.$disconnect();
        }
    }

    public static async update(data: {
        user_id: string,
        name: string;
        closing_date: number | undefined;
    }): Promise<User> {
        try {

            let dataUpdate: any = {
                name: data.name,
            }
            if(data.closing_date)
                dataUpdate.closingDate = data.closing_date

            const updatedUser = await prisma.user.update({
                where: { id: data.user_id },
                data: dataUpdate
            });

            return new User(updatedUser);
        } catch (error) {
            console.error('Failed to update user: ', error);
            throw new Error(`Failed to update user: ${error}`);
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
