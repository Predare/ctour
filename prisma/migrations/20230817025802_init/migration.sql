-- CreateEnum
CREATE TYPE "Emoji" AS ENUM ('CLOWN', 'GHOST', 'ALIEN', 'CRAB', 'ROBOT', 'PUMPKIN', 'CAT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Film" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genres" TEXT[],
    "selections" TEXT[],
    "screenshots" TEXT[],
    "yearStart" INTEGER[],
    "yearEnd" INTEGER[],
    "season" INTEGER[],
    "ageRestriction" INTEGER,
    "expectedPopularity" DOUBLE PRECISION NOT NULL,
    "link" TEXT NOT NULL,
    "voice" TEXT[],
    "quality" TEXT NOT NULL,
    "kinopoiskRating" DOUBLE PRECISION NOT NULL,
    "imdbRating" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "ratingEmoji" INTEGER[],
    "posterLink" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "avatar" "Emoji" NOT NULL DEFAULT 'ALIEN',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "filmId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stuff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photoLink" TEXT NOT NULL,
    "yearBorn" INTEGER NOT NULL,
    "yearDead" INTEGER,

    CONSTRAINT "Stuff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_directors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_actors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_directors_AB_unique" ON "_directors"("A", "B");

-- CreateIndex
CREATE INDEX "_directors_B_index" ON "_directors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_actors_AB_unique" ON "_actors"("A", "B");

-- CreateIndex
CREATE INDEX "_actors_B_index" ON "_actors"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_directors" ADD CONSTRAINT "_directors_A_fkey" FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_directors" ADD CONSTRAINT "_directors_B_fkey" FOREIGN KEY ("B") REFERENCES "Stuff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_actors" ADD CONSTRAINT "_actors_A_fkey" FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_actors" ADD CONSTRAINT "_actors_B_fkey" FOREIGN KEY ("B") REFERENCES "Stuff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
