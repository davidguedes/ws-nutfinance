/*
  Warnings:

  - You are about to drop the column `date_inclusion` on the `Fixed` table. All the data in the column will be lost.
  - Added the required column `day_inclusion` to the `Fixed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fixed" DROP COLUMN "date_inclusion",
ADD COLUMN     "day_inclusion" INTEGER NOT NULL;
