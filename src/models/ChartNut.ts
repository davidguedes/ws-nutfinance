import { Prisma } from '@prisma/client';
import { prisma } from "../lib/prisma";
import { encrypt, decrypt } from '../utils/cryptoUtils'; // Importa as funções de criptografia

export class Chartnut {

    public static async getFixed(user_id: string): Promise<number> {
        let filter: Prisma.TransactionWhereInput = {
            user_id: user_id
        };
 
        // Obter a data atual
         const today = new Date();
 
         // Primeiro dia do mês atual
         const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
 
         // Último dia do mês atual
         const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
 
         filter.date_transaction = {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth
        };
 
         console.log('filter: ', filter);
 
         try {
            const fixed = await prisma.transaction.count({
                where: filter
            });

            console.log('fixed: ', fixed);
            return fixed;
        } catch (err) {
            console.error('Error in getFixed: ', err);
            return 0;
        }
    }
 
    public static async getProfit(user_id: string): Promise<number> {
         let filter: Prisma.TransactionWhereInput = {
            user_id: user_id,
            type: 'R'
        };

        // Obter a data atual
         const today = new Date();
 
         // Primeiro dia do mês atual
         const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
 
         // Último dia do mês atual
         const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
 
        filter.date_transaction = {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth
        };
 
        console.log('filter: ', filter);
 
        try {
            const transactions = await prisma.transaction.findMany({
                where: filter,
                select: {
                    value: true
                }
            });
    
            console.log('transactions: ', transactions);
    
            // Desencriptar e converter valores para número
            const profit = transactions.reduce((sum, transaction) => {
                const decryptedValue = decrypt(transaction.value); // Assumindo que você tem uma função desencriptar
                const numericValue = parseFloat(decryptedValue);
                return sum + numericValue;
            }, 0);
    
            return profit;
        } catch (err) {
            console.error('Error in getProfit: ', err);
            return 0;
        }
    }

    public static async getComparative(user_id: string): Promise<any[]> {
        let filter: Prisma.TransactionWhereInput = {
            user_id: user_id
        };
 
        // Obter a data atual
        const today = new Date();
 
        // Primeiro dia do mês atual
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
 
        // Último dia do mês atual
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
 
        filter.date_transaction = {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth
        };
 
         console.log('filter: ', filter);
 
        try {
            const transactions = await prisma.transaction.findMany({
                where: filter,
                select: {
                    value: true
                }
            });
    
            console.log('transactions: ', transactions);
    
            // Desencriptar e converter valores para número
            const comparative = transactions.map(transaction => {
                const decryptedValue = decrypt(transaction.value); // Assumindo que você tem uma função desencriptar
                const numericValue = parseFloat(decryptedValue);
                return numericValue;
            });
    
            return comparative;
        } catch (err) {
            console.error('Error in getComparative: ', err);
            return [0];
        }
    }
}
