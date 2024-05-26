"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chartnut = void 0;
const prisma_1 = require("../lib/prisma");
class Chartnut {
    static async getFixed(userId) {
        let filter = {};
        filter.user_id = {
            equals: "3595e997-28f4-45b7-9f4b-768ee1352110"
        };
        // Obter a data atual
        const today = new Date();
        // Primeiro dia do mês atual
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        // Último dia do mês atual
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        if (firstDayOfMonth && lastDayOfMonth) {
            filter.date_transaction = {
                in: [firstDayOfMonth, lastDayOfMonth]
            };
        }
        console.log('filter: ', filter);
        const fixed = await prisma_1.prisma.transaction.count({
        //where: filter
        }).catch(err => err.message);
        console.log('fixed:? ', fixed);
        if (!fixed)
            return 0;
        return fixed;
    }
    static async getProfit(userId) {
        let filter = {};
        filter.user_id = {
            equals: "3595e997-28f4-45b7-9f4b-768ee1352110"
        };
        filter.type = {
            equals: 'R'
        };
        // Obter a data atual
        const today = new Date();
        // Primeiro dia do mês atual
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        // Último dia do mês atual
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        if (firstDayOfMonth && lastDayOfMonth) {
            filter.date_transaction = {
                in: [firstDayOfMonth, lastDayOfMonth]
            };
        }
        console.log('filter: ', filter);
        const profit = await prisma_1.prisma.transaction.groupBy({
            by: ['user_id'],
            _sum: {
                value: true,
            },
            //where: filter
        }).catch(err => err.message);
        console.log('profit: ', profit);
        //console.log('transactions:? ', transactions)
        if (!profit)
            return 0;
        return profit[0]._sum.value;
    }
    static async getComparative(userId) {
        let filter = {};
        filter.user_id = {
            equals: "3595e997-28f4-45b7-9f4b-768ee1352110"
        };
        // Obter a data atual
        const today = new Date();
        // Primeiro dia do mês atual
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        // Último dia do mês atual
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        if (firstDayOfMonth && lastDayOfMonth) {
            filter.date_transaction = {
                in: [firstDayOfMonth, lastDayOfMonth]
            };
        }
        console.log('filter: ', filter);
        const profit = await prisma_1.prisma.transaction.groupBy({
            by: ['user_id'],
            _sum: {
                value: true,
            },
            //where: filter
        }).catch(err => err.message);
        console.log('profit: ', profit);
        //console.log('transactions:? ', transactions)
        if (!profit)
            return [0];
        return profit[0]._sum.value;
    }
}
exports.Chartnut = Chartnut;
