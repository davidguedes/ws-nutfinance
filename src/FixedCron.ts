import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

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

//cron.schedule('1 0 * * *', async () => {
cron.schedule('1 * * * * *', async () => {
  console.log('Running cron job at 00:01');
  await processFixedEntries();
});
