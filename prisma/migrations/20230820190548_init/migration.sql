/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Film` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Film_link_key" ON "Film"("link");
