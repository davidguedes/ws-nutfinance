"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const prisma_1 = require("../lib/prisma");
class User {
    // Métodos para manipular usuários
    static async findAll() {
        try {
            const users = await prisma_1.prisma.user.findMany();
            return users.map(user => new User(user));
        }
        catch (error) {
            console.error('Failed to find all users: ', error);
            return [];
        }
    }
    static async findById(id) {
        try {
            const user = await prisma_1.prisma.user.findUnique({ where: { id } });
            if (!user)
                return null;
            return new User(user);
        }
        catch (error) {
            console.error('Failed to find user by ID: ', error);
            return null;
        }
    }
    static async create(data) {
        try {
            const newUser = await prisma_1.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    closingDate: data.closing_date
                },
            });
            return new User(newUser);
        }
        catch (error) {
            if (error.code === 'P2002' && error.meta?.target.includes('email')) {
                throw new Error('Email already in use');
            }
            console.error('Failed to create user: ', error);
            throw new Error(`Failed to create user: ${error.message}`);
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
exports.User = User;
//# sourceMappingURL=User.js.map