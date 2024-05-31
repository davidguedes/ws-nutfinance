"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function processClosings() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const transactions = await prisma.transaction.findMany({
        where: {
            date_transaction: {
                gte: startOfMonth,
                lte: endOfMonth,
            },
        },
        include: {
            user: true,
        },
    });
    console.log('transactions ', transactions);
    const users = [...new Set(transactions.map(tx => tx.user_id))];
    console.log('users ', users);
    for (const userId of users) {
        const userTransactions = transactions.filter(tx => tx.user_id === userId);
        const balance = userTransactions
            .filter(tx => tx.type === 'R')
            .reduce((acc, tx) => acc + tx.value, 0);
        const spending = userTransactions
            .filter(tx => tx.type === 'D')
            .reduce((acc, tx) => acc + tx.value, 0);
        const closing = await prisma.closing.create({
            data: {
                balance,
                spending,
                initialDate: startOfMonth,
                finalDate: endOfMonth,
                user_id: userId,
            },
        });
        await prisma.transaction.updateMany({
            where: {
                user_id: userId,
                date_transaction: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
            data: {
                closing_id: closing.id,
            },
        });
    }
}
//cron.schedule('1 0 1 * *', async () => {
node_cron_1.default.schedule('1 * * * * *', async () => {
    console.log('Running closing cron job at 00:01 on the first day of the month');
    await processClosings();
});
