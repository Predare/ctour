-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "replyCommentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_replyCommentId_fkey" FOREIGN KEY ("replyCommentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
