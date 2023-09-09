/*
  Warnings:

  - You are about to drop the column `selections` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `VoiceStudio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Film" DROP COLUMN "selections";

-- AlterTable
ALTER TABLE "VoiceStudio" DROP COLUMN "views";

-- CreateTable
CREATE TABLE "Selection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Selection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FilmToSelection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FilmToSelection_AB_unique" ON "_FilmToSelection"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmToSelection_B_index" ON "_FilmToSelection"("B");

-- AddForeignKey
ALTER TABLE "_FilmToSelection" ADD CONSTRAINT "_FilmToSelection_A_fkey" FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmToSelection" ADD CONSTRAINT "_FilmToSelection_B_fkey" FOREIGN KEY ("B") REFERENCES "Selection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
