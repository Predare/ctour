/*
  Warnings:

  - You are about to drop the column `filmId` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filmLink,authorId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filmLink` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_filmId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_filmId_fkey";

-- DropForeignKey
ALTER TABLE "Views" DROP CONSTRAINT "Views_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_reviewId_fkey";

-- DropIndex
DROP INDEX "Review_filmId_authorId_key";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "filmId",
ADD COLUMN     "filmLink" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Review_filmLink_authorId_key" ON "Review"("filmLink", "authorId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_filmLink_fkey" FOREIGN KEY ("filmLink") REFERENCES "Film"("link") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
