/*
  Warnings:

  - A unique constraint covering the columns `[commentId]` on the table `CommentVote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId,fingerprint]` on the table `CommentVote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CommentVote_commentId_key" ON "CommentVote"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentVote_commentId_fingerprint_key" ON "CommentVote"("commentId", "fingerprint");
