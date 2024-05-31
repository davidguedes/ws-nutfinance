"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const client_1 = require("@prisma/client");
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
                value: entry.value,
                type: entry.type,
                recurrence: false,
                number_recurrence: 0,
                date_transaction: today,
                description: entry.description,
                tags: entry.tags,
                user_id: entry.user_id,
                fixed_id: entry.id
            }
        });
    }
}
node_cron_1.default.schedule('1 0 * * *', async () => {
    console.log('Running cron job at 00:01');
    await processFixedEntries();
});
