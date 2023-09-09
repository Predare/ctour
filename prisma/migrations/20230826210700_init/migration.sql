-- DropForeignKey
ALTER TABLE "CommentVote" DROP CONSTRAINT "CommentVote_commentNegativeId_fkey";

-- DropForeignKey
ALTER TABLE "CommentVote" DROP CONSTRAINT "CommentVote_commentPositiveId_fkey";

-- AlterTable
ALTER TABLE "CommentVote" ALTER COLUMN "commentNegativeId" DROP NOT NULL,
ALTER COLUMN "commentPositiveId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_commentPositiveId_fkey" FOREIGN KEY ("commentPositiveId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_commentNegativeId_fkey" FOREIGN KEY ("commentNegativeId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
