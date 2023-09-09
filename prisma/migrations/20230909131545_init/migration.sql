/*
  Warnings:

  - You are about to drop the column `views` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reviewId,userId]` on the table `Views` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reviewId` to the `Views` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "views",
ADD COLUMN     "viewsCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Views" ADD COLUMN     "reviewId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Views_reviewId_userId_key" ON "Views"("reviewId", "userId");

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
