/*
  Warnings:

  - You are about to drop the `_notNotifiedUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_notNotifiedUsers" DROP CONSTRAINT "_notNotifiedUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_notNotifiedUsers" DROP CONSTRAINT "_notNotifiedUsers_B_fkey";

-- DropTable
DROP TABLE "_notNotifiedUsers";
