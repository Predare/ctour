-- AlterTable
ALTER TABLE "users" ADD COLUMN     "nextRankId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_nextRankId_fkey" FOREIGN KEY ("nextRankId") REFERENCES "Rank"("id") ON DELETE SET NULL ON UPDATE CASCADE;
