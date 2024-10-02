"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const client_1 = require("@prisma/client");
const cryptoUtils_1 = require("../utils/cryptoUtils");
const winston_1 = __importDefault(require("winston"));
const prisma = new client_1.PrismaClient();
// Configuração do logger
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.File({ filename: 'combined.log' }),
    ],
});
async function processClosings() {
    logger.info('Running restricted cron job at 00:01 between the 1st and 28th of the month');
    //console.log('Running restricted cron job at 00:01 between the 1st and 28th of the month');
    const now = new Date();
    const today = now.getDate();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, today + 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth(), today);
    try {
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
    }
    catch (error) {
        logger.error('Error processing fixed entries: ', error);
    }
    finally {
        await prisma.$disconnect();
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
//const job = cron.schedule('*/1 * * * *', processClosings, {
const job = node_cron_1.default.schedule('1 0 1-28 * *', processClosings, {
    scheduled: false,
    timezone: 'America/Sao_Paulo'
});
exports.default = job;
//# sourceMappingURL=ClosingCron.js.map