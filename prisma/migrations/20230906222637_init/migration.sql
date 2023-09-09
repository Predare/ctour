/*
  Warnings:

  - You are about to drop the column `commentNegativeId` on the `CommentVote` table. All the data in the column will be lost.
  - You are about to drop the column `commentPositiveId` on the `CommentVote` table. All the data in the column will be lost.
  - You are about to drop the column `fingerprint` on the `CommentVote` table. All the data in the column will be lost.
  - You are about to drop the column `negativeUserId` on the `CommentVote` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `CommentVote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `CommentVote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommentVote" DROP CONSTRAINT "CommentVote_commentNegativeId_fkey";

-- DropForeignKey
ALTER TABLE "CommentVote" DROP CONSTRAINT "CommentVote_commentPositiveId_fkey";

-- DropForeignKey
ALTER TABLE "CommentVote" DROP CONSTRAINT "CommentVote_negativeUserId_fkey";

-- DropIndex
DROP INDEX "CommentVote_commentNegativeId_fingerprint_key";

-- DropIndex
DROP INDEX "CommentVote_commentNegativeId_key";

-- DropIndex
DROP INDEX "CommentVote_commentPositiveId_fingerprint_key";

-- DropIndex
DROP INDEX "CommentVote_commentPositiveId_key";

-- AlterTable
ALTER TABLE "CommentVote" DROP COLUMN "commentNegativeId",
DROP COLUMN "commentPositiveId",
DROP COLUMN "fingerprint",
DROP COLUMN "negativeUserId",
ADD COLUMN     "commentId" INTEGER NOT NULL,
ADD COLUMN     "status" "Pole" NOT NULL;

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
