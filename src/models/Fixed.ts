import { Prisma, Fixed as PrismaFixed } from '@prisma/client';
import { prisma } from "../lib/prisma"

export class Fixed {

    public static async findAll(first: number, rows: number, description: string | null, day_inclusion: number | null, tags: string[] | null, status: boolean, type: string | null, sort: boolean): Promise<{ totalRecords: number, records: Fixed[] }> {
        console.log('O first: ', first, ' description: ', description, ' initial_date_transaction: ', day_inclusion, ' tags: ', tags, ' type: ', type, ' sort: ', sort);

        let filter: Prisma.FixedWhereInput = {} as Prisma.FixedWhereInput;

        filter.status = {
            equals: status
        };

        if (description) {
            filter.description = {
                contains: description
            };
        }

        if (day_inclusion) {
            filter.day_inclusion = {
                equals: day_inclusion
            };
        }

        if (tags && tags.length > 0) {
            filter.tags = {
                hasSome: tags
            }
        }

        if (type) {
            filter.type = {
                equals: type
            };
        }

        console.log('filter: ', filter);

        try {
            // Utilizando uma transação para realizar ambas as consultas
            const [totalRecords, records] = await prisma.$transaction([
                prisma.fixed.count({
                    where: filter
                }),
                prisma.fixed.findMany({
                    skip: first, // Pula os registros anteriores ao primeiro registro desejado
                    take: rows, // Quantidade de registros a serem retornados
                    orderBy: {
                        day_inclusion: sort ? 'desc' : 'asc', // 'asc' para ordenação ascendente, 'desc' para ordenação descendente
                    },
                    where: filter
                })
            ]);
    
            // Retorna um objeto contendo a contagem total e os registros
            return {
                totalRecords,
                records
            };
        } catch (err) {
            console.error('Erro ao buscar registros: ', err);
            // Retorna 0 e uma lista vazia em caso de erro
            return {
                totalRecords: 0,
                records: []
            };
        }
    }

    public static async findById(id: string): Promise<Fixed | null> {
        const fixed = await prisma.fixed.findUnique({ where: { id } });
        if (!fixed) return null;
        return new Fixed(fixed);
    }

    public static async create(data: {
        value: number;
        type: string;
        day_inclusion: number;
        description: string;
        tags: string[];
        user_id: string;
    }): Promise<Fixed> {
        try {
            console.log('create ', data);
            let newFixed: Fixed = {} as Fixed;
            
            await prisma.fixed.create({
                data: {
                    value: data.value,
                    type: data.type,
                    day_inclusion: data.day_inclusion,
                    description: data.description,
                    tags: data.tags, // Assuming tags is an array of strings
                    user_id: data.user_id,
                },
            }).then((resp: Fixed) => {
                newFixed = resp;
            })
            .catch(err => {
                throw new Error(err);
            });
    
            return newFixed;
        } catch (error) {
            // Handle error appropriately
            throw new Error(`Failed to create transaction: ${error}`);
        }
    }

    public static async update(data: {
        id: string;
        value: number;
        type: string;
        day_inclusion: number;
        description: string;
        tags: string[];
        user_id: string;
    }): Promise<Fixed> {
        try {
            console.log('update ', data);

            let updatedFixed: Fixed = {} as Fixed;
            
            await prisma.fixed.update({
                where: {
                    id: data.id,
                },
                data: {
                    value: data.value,
                    type: data.type,
                    day_inclusion: data.day_inclusion,
                    description: data.description,
                    tags: { set: data.tags },
                    user_id: data.user_id,
                    updatedAt: new Date()
                },
            }).then((resp: Fixed) => {
                updatedFixed = resp;
            })
            .catch(err => {
                throw new Error(err);
            });
    
            return updatedFixed;
        } catch (error) {
            // Handle error appropriately
            throw new Error(`Failed to update fixed: ${error}`);
        }
    }

    public static async delete(data: {
        id: string;
    }): Promise<boolean> {
        try {
            await prisma.fixed.delete({
                where: {
                    id: data.id
                },
            }).catch(err => {
                throw new Error(err);
            });

            //console.log('delete: ', deletedTransaction);
    
            return true;
        } catch (error) {
            // Handle error appropriately
            throw new Error(`Failed to delete transaction: ${error}`);
        }
    }
    
    // Atributos do modelo
    public id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public value: number;
    public type: string;
    public day_inclusion: number;
    public description: string;
    public tags: string[];
    public user_id: string;

    constructor(prismaFixed: PrismaFixed) {
        this.id = prismaFixed.id;
        this.createdAt = prismaFixed.createdAt;
        this.updatedAt = prismaFixed.updatedAt;
        this.value = prismaFixed.value;
        this.type = prismaFixed.type;
        this.day_inclusion = prismaFixed.day_inclusion;
        this.description = prismaFixed.description;
        this.tags = prismaFixed.tags;
        this.user_id = prismaFixed.user_id;
    }
}
