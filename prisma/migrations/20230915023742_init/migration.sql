/*
  Warnings:

  - A unique constraint covering the columns `[target,targetAmount]` on the table `Achievement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Achievement_target_targetAmount_key" ON "Achievement"("target", "targetAmount");
