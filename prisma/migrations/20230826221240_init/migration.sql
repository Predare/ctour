/*
  Warnings:

  - You are about to drop the column `status` on the `CommentVote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CommentVote" DROP COLUMN "status";

-- DropEnum
DROP TYPE "VoteStatus";
