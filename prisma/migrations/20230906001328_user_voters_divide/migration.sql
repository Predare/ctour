-- AlterTable
ALTER TABLE "CommentVote" ADD COLUMN     "negativeUserId" TEXT;

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_negativeUserId_fkey" FOREIGN KEY ("negativeUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
