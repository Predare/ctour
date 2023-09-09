/*
  Warnings:

  - A unique constraint covering the columns `[reviewId,userId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vote_reviewId_userId_key" ON "Vote"("reviewId", "userId");
