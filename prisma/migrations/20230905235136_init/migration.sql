-- AlterTable
ALTER TABLE "users" ADD COLUMN     "expirence" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rankId" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Rank" (
    "id" SERIAL NOT NULL,
    "requiredExpirence" INTEGER NOT NULL,

    CONSTRAINT "Rank_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "Rank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
