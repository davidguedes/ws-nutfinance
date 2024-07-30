"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const prisma_1 = require("../lib/prisma");
class Category {
    static async findAll(user_id, first, rows, name) {
        let filter = {};
        filter.user_id = {
            equals: user_id
        };
        if (name) {
            filter.name = {
                contains: name
            };
        }
        console.log('filter: ', filter);
        try {
            // Utilizando uma transação para realizar ambas as consultas
            const [totalRecords, records] = await prisma_1.prisma.$transaction([
                prisma_1.prisma.category.count({
                    where: filter
                }),
                prisma_1.prisma.category.findMany({
                    skip: first, // Pula os registros anteriores ao primeiro registro desejado
                    take: rows, // Quantidade de registros a serem retornados
                    where: filter
                })
            ]);
            return { totalRecords, records };
        }
        catch (err) {
            console.error('Erro ao buscar registros: ', err);
            return { totalRecords: 0, records: [] };
        }
    }
    static async findByUser(user_id) {
        let filter = {};
        filter.user_id = {
            equals: user_id
        };
        try {
            // Utilizando uma transação para realizar ambas as consultas
            const [totalRecords, records] = await prisma_1.prisma.$transaction([
                prisma_1.prisma.category.count({
                    where: filter
                }),
                prisma_1.prisma.category.findMany({
                    where: filter
                })
            ]);
            return { records };
        }
        catch (err) {
            console.error('Erro ao buscar registros: ', err);
            return { records: [] };
        }
    }
    static async findById(id) {
        try {
            const category = await prisma_1.prisma.category.findUnique({ where: { id } });
            if (!category)
                return null;
            return new Category(category);
        }
        catch (err) {
            console.error('Erro ao buscar registro por ID: ', err);
            return null;
        }
    }
    static async create(data) {
        try {
            const newCategory = await prisma_1.prisma.category.create({
                data: {
                    name: data.name,
                    description: data.description,
                    user_id: data.user_id
                },
            });
            return new Category(newCategory);
        }
        catch (error) {
            console.error('Failed to create category: ', error);
            throw new Error(`Failed to create category: ${error}`);
        }
    }
    static async update(data) {
        try {
            console.log('update ', data);
            const updatedCategory = await prisma_1.prisma.category.update({
                where: { id: data.id },
                data: {
                    name: data.name,
                    description: data.description,
                    user_id: data.user_id,
                    updatedAt: new Date()
                },
            });
            return new Category(updatedCategory);
        }
        catch (error) {
            console.error('Failed to update category: ', error);
            throw new Error(`Failed to update category: ${error}`);
        }
    }
    static async delete(data) {
        try {
            await prisma_1.prisma.category.delete({
                where: { id: data.id }
            });
            return true;
        }
        catch (error) {
            console.error('Failed to delete category: ', error);
            throw new Error(`Failed to delete category: ${error}`);
        }
    }
    // Atributos do modelo
    id;
    name;
    description;
    user_id;
    createdAt;
    updatedAt;
    constructor(prismaCategory) {
        this.id = prismaCategory.id;
        this.name = prismaCategory.name;
        this.description = prismaCategory.description;
        this.user_id = prismaCategory.user_id;
        this.createdAt = prismaCategory.createdAt;
        this.updatedAt = prismaCategory.updatedAt;
    }
}
exports.Category = Category;
