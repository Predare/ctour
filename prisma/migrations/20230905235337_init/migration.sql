-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_rankId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "rankId" DROP NOT NULL,
ALTER COLUMN "rankId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank"("id") ON DELETE SET NULL ON UPDATE CASCADE;
