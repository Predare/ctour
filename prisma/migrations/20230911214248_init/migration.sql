/*
  Warnings:

  - You are about to drop the `_watchedFilms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_watchedFilms" DROP CONSTRAINT "_watchedFilms_A_fkey";

-- DropForeignKey
ALTER TABLE "_watchedFilms" DROP CONSTRAINT "_watchedFilms_B_fkey";

-- DropTable
DROP TABLE "_watchedFilms";

-- CreateTable
CREATE TABLE "_viewedFilms" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_viewedFilms_AB_unique" ON "_viewedFilms"("A", "B");

-- CreateIndex
CREATE INDEX "_viewedFilms_B_index" ON "_viewedFilms"("B");

-- AddForeignKey
ALTER TABLE "_viewedFilms" ADD CONSTRAINT "_viewedFilms_A_fkey" FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_viewedFilms" ADD CONSTRAINT "_viewedFilms_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
