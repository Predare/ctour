-- AlterTable
ALTER TABLE "CommentVote" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "fingerprint" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CommentVote" ADD CONSTRAINT "CommentVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
