/*
  Warnings:

  - Added the required column `default` to the `BudgetCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BudgetCategory" ADD COLUMN     "default" BOOLEAN NOT NULL;
