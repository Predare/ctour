/*
  Warnings:

  - Added the required column `name` to the `Rank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rank" ADD COLUMN     "name" TEXT NOT NULL;
