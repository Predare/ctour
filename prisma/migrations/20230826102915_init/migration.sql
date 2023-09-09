/*
  Warnings:

  - You are about to drop the column `rating` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "rating",
ADD COLUMN     "ratingNegative" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ratingPositive" INTEGER NOT NULL DEFAULT 0;
