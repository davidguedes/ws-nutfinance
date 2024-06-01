import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { encrypt } from './utils/cryptoUtils';

const prisma = new PrismaClient();

async function processFixedEntries() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const fixedEntries = await prisma.fixed.findMany({
    where: {
      day_inclusion: today.getDay(),
    },
  });

  for (const entry of fixedEntries) {
    console.log('Entry: ', entry)
    await prisma.transaction.create({
        data: {
          value: encrypt(entry.value.toString()),
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
cron.schedule('1 0 * * *', async () => {
  console.log('Running daily cron job at 00:01');
  await processFixedEntries();
});