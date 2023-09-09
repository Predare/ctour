/*
  Warnings:

  - A unique constraint covering the columns `[filmId,authorId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_filmId_authorId_key" ON "Review"("filmId", "authorId");
