/*
  Warnings:

  - Added the required column `color` to the `Rank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rank" ADD COLUMN     "color" TEXT NOT NULL;
