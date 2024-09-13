import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { encrypt } from '../utils/cryptoUtils';
import winston from 'winston';

const prisma = new PrismaClient();

// Configuração do logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'combined.log' }),
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
            value: encrypt(entry.value.toString()),
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
  } catch (error) {
    logger.error('Error processing fixed entries: ', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Cron job para rodar todos os dias à 00:01
//const job = module.exports = cron.schedule('*/1 * * * *', processFixedEntries, {
const job = module.exports = cron.schedule('1 0 * * *', processFixedEntries, {
  scheduled: false,
  timezone: 'America/Sao_Paulo'
});

export default job;