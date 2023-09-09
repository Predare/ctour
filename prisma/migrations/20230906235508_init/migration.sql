/*
  Warnings:

  - You are about to drop the column `ratingNegative` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `ratingPositive` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "ratingNegative",
DROP COLUMN "ratingPositive";
