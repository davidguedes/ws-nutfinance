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
        finally {
            await prisma_1.prisma.$disconnect();
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
        finally {
            await prisma_1.prisma.$disconnect();
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
        finally {
            await prisma_1.prisma.$disconnect();
        }
    }
    static async update(data) {
        try {
            let dataUpdate = {
                name: data.name,
            };
            if (data.closing_date)
                dataUpdate.closingDate = data.closing_date;
            const updatedUser = await prisma_1.prisma.user.update({
                where: { id: data.user_id },
                data: dataUpdate
            });
            return new User(updatedUser);
        }
        catch (error) {
            console.error('Failed to update user: ', error);
            throw new Error(`Failed to update user: ${error}`);
        }
        finally {
            await prisma_1.prisma.$disconnect();
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