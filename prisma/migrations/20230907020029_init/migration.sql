/*
  Warnings:

  - You are about to drop the column `avatar` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "avatar",
DROP COLUMN "color",
DROP COLUMN "email",
DROP COLUMN "name";
