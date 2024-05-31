-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fixed_id" TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fixed_id_fkey" FOREIGN KEY ("fixed_id") REFERENCES "Fixed"("id") ON DELETE SET NULL ON UPDATE CASCADE;
