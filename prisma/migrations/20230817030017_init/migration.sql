/*
  Warnings:

  - Changed the type of `yearStart` on the `Film` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `yearEnd` on the `Film` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Film" DROP COLUMN "yearStart",
ADD COLUMN     "yearStart" INTEGER NOT NULL,
DROP COLUMN "yearEnd",
ADD COLUMN     "yearEnd" INTEGER NOT NULL;
