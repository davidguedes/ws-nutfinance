/*
  Warnings:

  - You are about to drop the column `number_recurrence` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recurrence` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "number_recurrence",
DROP COLUMN "recurrence",
ADD COLUMN     "installmentNumber" INTEGER,
ADD COLUMN     "isInstallment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parentTransactionId" TEXT,
ADD COLUMN     "totalInstallmentNumber" INTEGER;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_parentTransactionId_fkey" FOREIGN KEY ("parentTransactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
