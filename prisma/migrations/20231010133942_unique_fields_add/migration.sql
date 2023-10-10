/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `selection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,yearBorn]` on the table `stuff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `voicestudio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "selection_name_key" ON "selection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "stuff_name_yearBorn_key" ON "stuff"("name", "yearBorn");

-- CreateIndex
CREATE UNIQUE INDEX "voicestudio_name_key" ON "voicestudio"("name");
