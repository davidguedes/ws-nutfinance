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
async function processFixedEntries() {
    //console.log('Running daily cron job at 00:01');
    logger.info('Running daily cron job at 00:01');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
        const fixedEntries = await prisma.fixed.findMany({
            where: {
                day_inclusion: today.getDate(),
            },
        });
        for (const entry of fixedEntries) {
            //console.log('Entry: ', entry)
            logger.info('Processing entry: ', entry);
            await prisma.transaction.create({
                data: {
                    value: (0, cryptoUtils_1.encrypt)(entry.value.toString()),
                    type: entry.type,
                    isInstallment: false,
                    date_transaction: today,
                    description: entry.description,
                    tags: entry.tags,
                    user_id: entry.user_id,
                    fixed_id: entry.id,
                    budgetCategory_id: entry.budgetCategory_id
                }
            });
        }
    }
    catch (error) {
        logger.error('Error processing fixed entries: ', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
// Cron job para rodar todos os dias à 00:01
//const job = module.exports = cron.schedule('*/1 * * * *', processFixedEntries, {
//const job = module.exports = cron.schedule('1 0 * * *', processFixedEntries, {
const job = module.exports = node_cron_1.default.schedule('35 12 * * *', processFixedEntries, {
    scheduled: false,
    timezone: 'America/Sao_Paulo'
});
exports.default = job;
//# sourceMappingURL=FixedCron.js.map