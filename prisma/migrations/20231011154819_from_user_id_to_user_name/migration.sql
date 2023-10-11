/*
  Warnings:

  - You are about to drop the column `user_id` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `views` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `vote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filmLink,author_name]` on the table `review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reviewId,userName]` on the table `views` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reviewId,user_name]` on the table `vote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId,user_name]` on the table `vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_name` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_name` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `views` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_authorId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_authorId_fkey";

-- DropForeignKey
ALTER TABLE "views" DROP CONSTRAINT "views_userId_fkey";

-- DropForeignKey
ALTER TABLE "vote" DROP CONSTRAINT "vote_userId_fkey";

-- DropIndex
DROP INDEX "review_filmLink_authorId_key";

-- DropIndex
DROP INDEX "views_reviewId_userId_key";

-- DropIndex
DROP INDEX "vote_commentId_userId_key";

-- DropIndex
DROP INDEX "vote_reviewId_userId_key";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "user_id",
ADD COLUMN     "user_name" TEXT;

-- AlterTable
ALTER TABLE "report" DROP COLUMN "authorId",
ADD COLUMN     "author_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "review" DROP COLUMN "authorId",
ADD COLUMN     "author_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "views" DROP COLUMN "userId",
ADD COLUMN     "userName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vote" DROP COLUMN "userId",
ADD COLUMN     "user_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "review_filmLink_author_name_key" ON "review"("filmLink", "author_name");

-- CreateIndex
CREATE UNIQUE INDEX "views_reviewId_userName_key" ON "views"("reviewId", "userName");

-- CreateIndex
CREATE UNIQUE INDEX "vote_reviewId_user_name_key" ON "vote"("reviewId", "user_name");

-- CreateIndex
CREATE UNIQUE INDEX "vote_commentId_user_name_key" ON "vote"("commentId", "user_name");

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_author_name_fkey" FOREIGN KEY ("author_name") REFERENCES "users"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_name_fkey" FOREIGN KEY ("user_name") REFERENCES "users"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_user_name_fkey" FOREIGN KEY ("user_name") REFERENCES "users"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_author_name_fkey" FOREIGN KEY ("author_name") REFERENCES "users"("name") ON DELETE CASCADE ON UPDATE CASCADE;
