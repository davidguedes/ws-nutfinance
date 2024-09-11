"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const client_1 = require("@prisma/client");
const cryptoUtils_1 = require("./utils/cryptoUtils");
const prisma = new client_1.PrismaClient();
async function processFixedEntries() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fixedEntries = await prisma.fixed.findMany({
        where: {
            day_inclusion: today.getDay(),
        },
    });
    for (const entry of fixedEntries) {
        console.log('Entry: ', entry);
        await prisma.transaction.create({
            data: {
                value: (0, cryptoUtils_1.encrypt)(entry.value.toString()),
                type: entry.type,
                isInstallment: false,
                date_transaction: today,
                description: entry.description,
                tags: entry.tags,
                user_id: entry.user_id,
                fixed_id: entry.id
            }
        });
    }
}
// Cron job para rodar todos os dias à 00:01
node_cron_1.default.schedule('1 0 * * *', async () => {
    console.log('Running daily cron job at 00:01');
    await processFixedEntries();
});
//# sourceMappingURL=FixedCron.js.map