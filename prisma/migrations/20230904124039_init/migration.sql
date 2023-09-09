-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "color" SET DEFAULT '#FFFFFF';

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
