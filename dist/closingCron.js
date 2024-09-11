"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const client_1 = require("@prisma/client");
const cryptoUtils_1 = require("./utils/cryptoUtils");
const prisma = new client_1.PrismaClient();
async function processClosings() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const today = now.getDate();
    // Buscar usuários com closingDate correspondente ao dia atual
    const users = await prisma.user.findMany({
        where: {
            closingDate: today,
        },
    });
    console.log('users ', users);
    for (const user of users) {
        const transactions = await prisma.transaction.findMany({
            where: {
                user_id: user.id,
                date_transaction: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
        });
        console.log('transactions for user ', user.id, transactions);
        const balance = transactions
            .filter(tx => tx.type === 'R')
            .reduce((acc, tx) => acc + parseFloat((0, cryptoUtils_1.decrypt)(tx.value)), 0);
        const spending = transactions
            .filter(tx => tx.type === 'D')
            .reduce((acc, tx) => acc + parseFloat((0, cryptoUtils_1.decrypt)(tx.value)), 0);
        const closing = await prisma.closing.create({
            data: {
                balance,
                spending,
                initialDate: startOfMonth,
                finalDate: endOfMonth,
                user_id: user.id,
            },
        });
        await prisma.transaction.updateMany({
            where: {
                user_id: user.id,
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
    /*const transactions = await prisma.transaction.findMany({
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
    } */
}
// Cron job para rodar diariamente às 00:01 do dia 1 ao dia 28
node_cron_1.default.schedule('1 0 1-28 * *', async () => {
    console.log('Running restricted cron job at 00:01 between the 1st and 28th of the month');
    await processClosings();
});
//# sourceMappingURL=closingCron.js.map