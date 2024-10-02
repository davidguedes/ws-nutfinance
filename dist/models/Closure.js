"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Closure = void 0;
const prisma_1 = require("../lib/prisma");
class Closure {
    static async findAll(user_id, first, rows, initial_date, final_date) {
        let filter = {};
        filter.user_id = {
            equals: user_id
        };
        if (initial_date && final_date) {
            filter.initialDate = {
                gte: initial_date,
            };
            filter.finalDate = {
                lte: final_date,
            };
        }
        else if (initial_date) {
            filter.initialDate = {
                gte: initial_date
            };
        }
        else if (final_date) {
            filter.finalDate = {
                lte: final_date
            };
        }
        try {
            // Utilizando uma transação para realizar ambas as consultas
            const [totalRecords, records] = await prisma_1.prisma.$transaction([
                prisma_1.prisma.closing.count({
                    where: filter
                }),
                prisma_1.prisma.closing.findMany({
                    skip: first, // Pula os registros anteriores ao primeiro registro desejado
                    take: rows, // Quantidade de registros a serem retornados
                    orderBy: {
                        createdAt: 'desc',
                    },
                    where: filter
                })
            ]);
            return { totalRecords, records };
        }
        catch (err) {
            console.error('Erro ao buscar registros: ', err);
            return { totalRecords: 0, records: [] };
        }
        finally {
            await prisma_1.prisma.$disconnect();
        }
    }
    // Atributos do modelo
    id;
    balance;
    spending;
    initialDate;
    finalDate;
    user_id;
    constructor(prismaClosing) {
        this.id = prismaClosing.id;
        this.balance = prismaClosing.balance;
        this.spending = prismaClosing.spending;
        this.initialDate = prismaClosing.createdAt;
        this.finalDate = prismaClosing.finalDate;
        this.user_id = prismaClosing.user_id;
    }
}
exports.Closure = Closure;
//# sourceMappingURL=Closure.js.map