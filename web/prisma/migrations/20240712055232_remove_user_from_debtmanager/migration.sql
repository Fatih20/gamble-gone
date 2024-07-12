-- DropForeignKey
ALTER TABLE "DebtManager" DROP CONSTRAINT "DebtManager_userId_fkey";

-- AlterTable
ALTER TABLE "DebtManager" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DebtManager" ADD CONSTRAINT "DebtManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
