/*
  Warnings:

  - You are about to drop the column `conditions` on the `Achievement` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AchievementTarget" AS ENUM ('None', 'CommentAmount', 'RatingAmount', 'GivedVotesAmount');

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "conditions",
ADD COLUMN     "target" "AchievementTarget" NOT NULL DEFAULT 'None',
ADD COLUMN     "targetAmount" INTEGER NOT NULL DEFAULT 0;
