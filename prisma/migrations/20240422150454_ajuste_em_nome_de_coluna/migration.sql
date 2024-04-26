/*
  Warnings:

  - You are about to drop the column `date_transacation` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `date_transaction` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "date_transacation",
ADD COLUMN     "date_transaction" TIMESTAMP(3) NOT NULL;
