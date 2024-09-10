/*
  Warnings:

  - You are about to drop the column `month` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `BudgetCategory` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[budget_id,category]` on the table `BudgetCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `totalExpense` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalIncome` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `BudgetCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budgetCategory_id` to the `Fixed` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BudgetCategory" DROP CONSTRAINT "BudgetCategory_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_category_id_fkey";

-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "month",
DROP COLUMN "total",
DROP COLUMN "year",
ADD COLUMN     "totalExpense" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalIncome" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "BudgetCategory" DROP COLUMN "category_id",
ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Fixed" ADD COLUMN     "budgetCategory_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "category_id",
ADD COLUMN     "budgetCategory_id" TEXT;

-- DropTable
DROP TABLE "Category";

-- CreateIndex
CREATE UNIQUE INDEX "BudgetCategory_budget_id_category_key" ON "BudgetCategory"("budget_id", "category");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_budgetCategory_id_fkey" FOREIGN KEY ("budgetCategory_id") REFERENCES "BudgetCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixed" ADD CONSTRAINT "Fixed_budgetCategory_id_fkey" FOREIGN KEY ("budgetCategory_id") REFERENCES "BudgetCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
