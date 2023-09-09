/*
  Warnings:

  - You are about to drop the column `voice` on the `Film` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Film" DROP COLUMN "voice";

-- CreateTable
CREATE TABLE "VoiceStudio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "views" INTEGER NOT NULL,

    CONSTRAINT "VoiceStudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FilmToVoiceStudio" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FilmToVoiceStudio_AB_unique" ON "_FilmToVoiceStudio"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmToVoiceStudio_B_index" ON "_FilmToVoiceStudio"("B");

-- AddForeignKey
ALTER TABLE "_FilmToVoiceStudio" ADD CONSTRAINT "_FilmToVoiceStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmToVoiceStudio" ADD CONSTRAINT "_FilmToVoiceStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "VoiceStudio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
