/*
  Warnings:

  - Added the required column `completed` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "completed" BOOLEAN NOT NULL;
