import { User as PrismaUser } from '@prisma/client';
import { prisma } from "../lib/prisma"

export class User {
    // Métodos para manipular usuários

    public static async findAll(): Promise<User[] | []> {
        const users = await prisma.user.findMany();
        if (!users) return [];
        return users;
    }

    public static async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return null;
        return new User(user);
    }

    public static async create(data: {
        name: string;
        email: string;
    }): Promise<User> {
        try {
            const newUser = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email
                },
            });
    
            return new User(newUser);
        } catch (error) {
            // Handle error appropriately
            throw new Error('Failed to create user');
        }
    }

    // Outros métodos de manipulação de usuários...
    
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
