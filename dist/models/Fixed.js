"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fixed = void 0;
const prisma_1 = require("../lib/prisma");
class Fixed {
    static async findAll(first, rows, description, day_inclusion, tags, status, type, sort) {
        console.log('O first: ', first, ' description: ', description, ' initial_date_transaction: ', day_inclusion, ' tags: ', tags, ' type: ', type, ' sort: ', sort);
        let filter = {};
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
            };
        }
        if (type) {
            filter.type = {
                equals: type
            };
        }
        console.log('filter: ', filter);
        try {
            // Utilizando uma transação para realizar ambas as consultas
            const [totalRecords, records] = await prisma_1.prisma.$transaction([
                prisma_1.prisma.fixed.count({
                    where: filter
                }),
                prisma_1.prisma.fixed.findMany({
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
        }
        catch (err) {
            console.error('Erro ao buscar registros: ', err);
            // Retorna 0 e uma lista vazia em caso de erro
            return {
                totalRecords: 0,
                records: []
            };
        }
    }
    static async findById(id) {
        const fixed = await prisma_1.prisma.fixed.findUnique({ where: { id } });
        if (!fixed)
            return null;
        return new Fixed(fixed);
    }
    static async create(data) {
        try {
            console.log('create ', data);
            let newFixed = {};
            await prisma_1.prisma.fixed.create({
                data: {
                    value: data.value,
                    type: data.type,
                    day_inclusion: data.day_inclusion,
                    description: data.description,
                    tags: data.tags, // Assuming tags is an array of strings
                    user_id: data.user_id,
                },
            }).then((resp) => {
                newFixed = resp;
            })
                .catch(err => {
                throw new Error(err);
            });
            return newFixed;
        }
        catch (error) {
            // Handle error appropriately
            throw new Error(`Failed to create transaction: ${error}`);
        }
    }
    static async update(data) {
        try {
            console.log('update ', data);
            let updatedFixed = {};
            await prisma_1.prisma.fixed.update({
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
            }).then((resp) => {
                updatedFixed = resp;
            })
                .catch(err => {
                throw new Error(err);
            });
            return updatedFixed;
        }
        catch (error) {
            // Handle error appropriately
            throw new Error(`Failed to update fixed: ${error}`);
        }
    }
    static async delete(data) {
        try {
            await prisma_1.prisma.fixed.delete({
                where: {
                    id: data.id
                },
            }).catch(err => {
                throw new Error(err);
            });
            //console.log('delete: ', deletedTransaction);
            return true;
        }
        catch (error) {
            // Handle error appropriately
            throw new Error(`Failed to delete transaction: ${error}`);
        }
    }
    // Atributos do modelo
    id;
    createdAt;
    updatedAt;
    value;
    type;
    day_inclusion;
    description;
    tags;
    user_id;
    constructor(prismaFixed) {
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
exports.Fixed = Fixed;
