import { Prisma, Closing as PrismaClosing } from '@prisma/client';
import { prisma } from "../lib/prisma"

export class Closure {

    public static async findAll(user_id: string, first: number, rows: number, initial_date: Date | null, final_date: Date | null): Promise<{ totalRecords: number, records: PrismaClosing[] }> {

        let filter: Prisma.ClosingWhereInput =  {};

        filter.user_id = {
            equals: user_id
        };
        
        if (initial_date && final_date) {
            filter.initialDate = {
                gte: initial_date,                
            };
            filter.finalDate = {
                lte: final_date,
            }
        } else if (initial_date) {
            filter.initialDate = {
                gte: initial_date
            };
        } else if (final_date) {
            filter.finalDate = {
                lte: final_date
            };
        }

        try {
            // Utilizando uma transação para realizar ambas as consultas
            const [totalRecords, records] = await prisma.$transaction([
                prisma.closing.count({
                    where: filter
                }),
                prisma.closing.findMany({
                    skip: first, // Pula os registros anteriores ao primeiro registro desejado
                    take: rows, // Quantidade de registros a serem retornados
                    orderBy: {
                        createdAt: 'desc',
                    },
                    where: filter
                })
            ]);
    
            return { totalRecords, records };
        } catch (err) {
            console.error('Erro ao buscar registros: ', err);
            return { totalRecords: 0, records: [] };
        } finally {
            await prisma.$disconnect();
        }
    }
    
    // Atributos do modelo
    public id: string;
    public balance: number;
    public spending: number;
    public initialDate: Date;
    public finalDate: Date;
    public user_id: string;

    constructor(prismaClosing: PrismaClosing) {
        this.id = prismaClosing.id;
        this.balance = prismaClosing.balance;
        this.spending = prismaClosing.spending;
        this.initialDate = prismaClosing.createdAt;
        this.finalDate = prismaClosing.finalDate;
        this.user_id = prismaClosing.user_id;
    }
}
