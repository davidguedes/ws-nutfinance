/*
  Warnings:

  - Added the required column `color` to the `BudgetCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BudgetCategory" ADD COLUMN     "color" TEXT NOT NULL;
