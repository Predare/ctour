/*
  Warnings:

  - You are about to drop the column `filmId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_filmId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "filmId",
ADD COLUMN     "filmLink" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_filmLink_fkey" FOREIGN KEY ("filmLink") REFERENCES "Film"("link") ON DELETE CASCADE ON UPDATE CASCADE;
