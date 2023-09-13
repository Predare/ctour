-- CreateTable
CREATE TABLE "_notNotifiedUsers" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_notNotifiedUsers_AB_unique" ON "_notNotifiedUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_notNotifiedUsers_B_index" ON "_notNotifiedUsers"("B");

-- AddForeignKey
ALTER TABLE "_notNotifiedUsers" ADD CONSTRAINT "_notNotifiedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_notNotifiedUsers" ADD CONSTRAINT "_notNotifiedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
