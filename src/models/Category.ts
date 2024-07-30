import { Prisma, Category as PrismaCategory } from '@prisma/client';
import { prisma } from "../lib/prisma"

export class Category {

    public static async findAll(user_id: string, first: number, rows: number, name: string | null): Promise<{ totalRecords: number, records: Category[] }> {

        let filter: Prisma.CategoryWhereInput =  {};

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
            const [totalRecords, records] = await prisma.$transaction([
                prisma.category.count({
                    where: filter
                }),
                prisma.category.findMany({
                    skip: first, // Pula os registros anteriores ao primeiro registro desejado
                    take: rows, // Quantidade de registros a serem retornados
                    where: filter
                })
            ]);
    
            return { totalRecords, records };
        } catch (err) {
            console.error('Erro ao buscar registros: ', err);
            return { totalRecords: 0, records: [] };
        }
    }

    public static async findByUser(user_id: string): Promise<{ records: Category[] }> {

        let filter: Prisma.CategoryWhereInput =  {};

        filter.user_id = {
            equals: user_id
        };
        
        try {
            // Utilizando uma transação para realizar ambas as consultas
            const [totalRecords, records] = await prisma.$transaction([
                prisma.category.count({
                    where: filter
                }),
                prisma.category.findMany({
                    where: filter
                })
            ]);
    
            return { records };
        } catch (err) {
            console.error('Erro ao buscar registros: ', err);
            return { records: [] };
        }
    }

    public static async findById(id: string): Promise<Category | null> {
        try {
            const category = await prisma.category.findUnique({ where: { id } });
            if (!category) return null;
            return new Category(category);
        } catch (err) {
            console.error('Erro ao buscar registro por ID: ', err);
            return null;
        }
    }

    public static async create(data: {
        name: string;
        description: string;
        user_id: string;
    }): Promise<Category> {
        try {
            const newCategory = await prisma.category.create({
                data: {
                    name: data.name,
                    description: data.description,
                    user_id: data.user_id
                },
            });

            return new Category(newCategory);
        } catch (error) {
            console.error('Failed to create category: ', error);
            throw new Error(`Failed to create category: ${error}`);
        }
    }

    public static async update(data: {
        id: string;
        name: string;
        description: string;
        user_id: string;
    }): Promise<Category> {
        try {
            console.log('update ', data);

            const updatedCategory = await prisma.category.update({
                where: { id: data.id },
                data: {
                    name: data.name,
                    description: data.description,
                    user_id: data.user_id,
                    updatedAt: new Date()
                },
            });

            return new Category(updatedCategory);
        } catch (error) {
            console.error('Failed to update category: ', error);
            throw new Error(`Failed to update category: ${error}`);
        }
    }

    public static async delete(data: {
        id: string;
    }): Promise<boolean> {
        try {
            await prisma.category.delete({
                where: { id: data.id }
            });
            return true;
        } catch (error) {
            console.error('Failed to delete category: ', error);
            throw new Error(`Failed to delete category: ${error}`);
        }
    }
    
    // Atributos do modelo
    public id: string;
    public name: string;
    public description: string | null;
    public user_id: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(prismaCategory: PrismaCategory) {
        this.id = prismaCategory.id;
        this.name = prismaCategory.name;
        this.description = prismaCategory.description;
        this.user_id = prismaCategory.user_id;
        this.createdAt = prismaCategory.createdAt;
        this.updatedAt = prismaCategory.updatedAt;
    }
}
