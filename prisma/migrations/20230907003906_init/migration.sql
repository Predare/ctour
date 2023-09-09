/*
  Warnings:

  - A unique constraint covering the columns `[commentId,userId]` on the table `CommentVote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CommentVote_commentId_userId_key" ON "CommentVote"("commentId", "userId");
