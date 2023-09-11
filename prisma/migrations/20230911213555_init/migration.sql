-- CreateTable
CREATE TABLE "_favoriteFilms" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_watchedFilms" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favoriteFilms_AB_unique" ON "_favoriteFilms"("A", "B");

-- CreateIndex
CREATE INDEX "_favoriteFilms_B_index" ON "_favoriteFilms"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_watchedFilms_AB_unique" ON "_watchedFilms"("A", "B");

-- CreateIndex
CREATE INDEX "_watchedFilms_B_index" ON "_watchedFilms"("B");

-- AddForeignKey
ALTER TABLE "_favoriteFilms" ADD CONSTRAINT "_favoriteFilms_A_fkey" FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoriteFilms" ADD CONSTRAINT "_favoriteFilms_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_watchedFilms" ADD CONSTRAINT "_watchedFilms_A_fkey" FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_watchedFilms" ADD CONSTRAINT "_watchedFilms_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
