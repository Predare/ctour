/*
  Warnings:

  - You are about to drop the column `genres` on the `Film` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FilmType" AS ENUM ('FILM', 'SERIAL');

-- AlterTable
ALTER TABLE "Film" DROP COLUMN "genres",
ADD COLUMN     "type" "FilmType" NOT NULL DEFAULT 'FILM',
ALTER COLUMN "yearEnd" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FilmToGenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FilmToGenre_AB_unique" ON "_FilmToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmToGenre_B_index" ON "_FilmToGenre"("B");

-- AddForeignKey
ALTER TABLE "_FilmToGenre" ADD CONSTRAINT "_FilmToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmToGenre" ADD CONSTRAINT "_FilmToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
