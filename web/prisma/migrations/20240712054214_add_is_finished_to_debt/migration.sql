/*
  Warnings:

  - Added the required column `debtId` to the `DebtManager` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Debt_userId_key";

-- AlterTable
ALTER TABLE "Debt" ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "DebtManager" ADD COLUMN     "debtId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DebtManager" ADD CONSTRAINT "DebtManager_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "Debt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
