-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_filmId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "reviewId" INTEGER,
ALTER COLUMN "filmId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;
