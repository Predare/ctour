/*
  Warnings:

  - You are about to drop the column `commentId` on the `CommentVote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[commentPositiveId]` on the table `CommentVote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentNegativeId]` on the table `CommentVote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentPositiveId,fingerprint]` on the table `CommentVote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentNegativeId,fingerprint]` on the table `CommentVote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CommentVote" DROP CONSTRAINT "CommentVote_commentId_fkey";

-- DropIndex
DROP INDEX "CommentVote_commentId_fingerprint_key";

-- DropIndex
DROP INDEX "CommentVote_commentId_key";

-- AlterTable
ALTER TABLE "CommentVote" DROP COLUMN "commentId",
ADD COLUMN     "commentNegativeId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "commentPositiveId" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "CommentVote_commentPositiveId_key" ON "CommentVote"("commentPositiveId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentVote_commentNegativeId_key" ON "CommentVote"("commentNegativeId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentVote_commentPositiveId_fingerprint_key" ON "CommentVote"("commentPositiveId", "fingerprint");

-- CreateIndex
CREATE UNIQUE INDEX "CommentVote_commentNegativeId_fingerprint_key" ON "CommentVote"("commentNegativeId", "fingerprint");

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_commentPositiveId_fkey" FOREIGN KEY ("commentPositiveId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_commentNegativeId_fkey" FOREIGN KEY ("commentNegativeId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
