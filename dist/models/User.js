"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const prisma_1 = require("../lib/prisma");
class User {
    // Métodos para manipular usuários
    static async findAll() {
        const users = await prisma_1.prisma.user.findMany();
        if (!users)
            return [];
        return users;
    }
    static async findById(id) {
        const user = await prisma_1.prisma.user.findUnique({ where: { id } });
        if (!user)
            return null;
        return new User(user);
    }
    static async create(data) {
        try {
            const newUser = await prisma_1.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email
                },
            });
            return new User(newUser);
        }
        catch (error) {
            // Handle error appropriately
            throw new Error('Failed to create user');
        }
    }
    // Outros métodos de manipulação de usuários...
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
exports.User = User;
