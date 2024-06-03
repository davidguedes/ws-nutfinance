"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chartnut = void 0;
const prisma_1 = require("../lib/prisma");
const cryptoUtils_1 = require("../utils/cryptoUtils"); // Importa as funções de criptografia
class Chartnut {
    static async getFixed(user_id) {
        let filter = {
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
            const fixed = await prisma_1.prisma.transaction.count({
                where: filter
            });
            console.log('fixed: ', fixed);
            return fixed;
        }
        catch (err) {
            console.error('Error in getFixed: ', err);
            return 0;
        }
    }
    static async getProfit(user_id) {
        let filter = {
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
            const transactions = await prisma_1.prisma.transaction.findMany({
                where: filter,
                select: {
                    value: true
                }
            });
            console.log('transactions: ', transactions);
            // Desencriptar e converter valores para número
            const profit = transactions.reduce((sum, transaction) => {
                const decryptedValue = (0, cryptoUtils_1.decrypt)(transaction.value); // Assumindo que você tem uma função desencriptar
                const numericValue = parseFloat(decryptedValue);
                return sum + numericValue;
            }, 0);
            return profit;
        }
        catch (err) {
            console.error('Error in getProfit: ', err);
            return 0;
        }
    }
    static async getComparative(user_id) {
        let filter = {
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
            const transactions = await prisma_1.prisma.transaction.findMany({
                where: filter,
                select: {
                    value: true
                }
            });
            console.log('transactions: ', transactions);
            // Desencriptar e converter valores para número
            const comparative = transactions.map(transaction => {
                const decryptedValue = (0, cryptoUtils_1.decrypt)(transaction.value); // Assumindo que você tem uma função desencriptar
                const numericValue = parseFloat(decryptedValue);
                return numericValue;
            });
            return comparative;
        }
        catch (err) {
            console.error('Error in getComparative: ', err);
            return [0];
        }
    }
}
exports.Chartnut = Chartnut;
