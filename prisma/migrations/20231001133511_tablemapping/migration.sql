/*
  Warnings:

  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Film` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Selection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stuff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Views` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VoiceStudio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_filmLink_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_replyCommentId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_filmLink_fkey";

-- DropForeignKey
ALTER TABLE "Views" DROP CONSTRAINT "Views_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Views" DROP CONSTRAINT "Views_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AchievementToUser" DROP CONSTRAINT "_AchievementToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CountryToFilm" DROP CONSTRAINT "_CountryToFilm_A_fkey";

-- DropForeignKey
ALTER TABLE "_CountryToFilm" DROP CONSTRAINT "_CountryToFilm_B_fkey";

-- DropForeignKey
ALTER TABLE "_FilmToGenre" DROP CONSTRAINT "_FilmToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_FilmToGenre" DROP CONSTRAINT "_FilmToGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "_FilmToSelection" DROP CONSTRAINT "_FilmToSelection_A_fkey";

-- DropForeignKey
ALTER TABLE "_FilmToSelection" DROP CONSTRAINT "_FilmToSelection_B_fkey";

-- DropForeignKey
ALTER TABLE "_FilmToVoiceStudio" DROP CONSTRAINT "_FilmToVoiceStudio_A_fkey";

-- DropForeignKey
ALTER TABLE "_FilmToVoiceStudio" DROP CONSTRAINT "_FilmToVoiceStudio_B_fkey";

-- DropForeignKey
ALTER TABLE "_actors" DROP CONSTRAINT "_actors_A_fkey";

-- DropForeignKey
ALTER TABLE "_actors" DROP CONSTRAINT "_actors_B_fkey";

-- DropForeignKey
ALTER TABLE "_directors" DROP CONSTRAINT "_directors_A_fkey";

-- DropForeignKey
ALTER TABLE "_directors" DROP CONSTRAINT "_directors_B_fkey";

-- DropForeignKey
ALTER TABLE "_favoriteFilms" DROP CONSTRAINT "_favoriteFilms_A_fkey";

-- DropForeignKey
ALTER TABLE "_viewedFilms" DROP CONSTRAINT "_viewedFilms_A_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_nextRankId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_rankId_fkey";

-- DropTable
DROP TABLE "Achievement";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "Film";

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "Rank";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Selection";

-- DropTable
DROP TABLE "Stuff";

-- DropTable
DROP TABLE "Views";

-- DropTable
DROP TABLE "VoiceStudio";

-- DropTable
DROP TABLE "Vote";

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "filmLink" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "views" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewId" INTEGER NOT NULL,

    CONSTRAINT "views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "requiredExpirence" INTEGER NOT NULL,

    CONSTRAINT "rank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "film" (
    "id" SERIAL NOT NULL,
    "type" "FilmType" NOT NULL DEFAULT 'FILM',
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "screenshots" TEXT[],
    "yearStart" INTEGER NOT NULL,
    "yearEnd" INTEGER,
    "season" INTEGER[],
    "ageRestriction" INTEGER,
    "expectedPopularity" DOUBLE PRECISION,
    "link" TEXT NOT NULL,
    "quality" TEXT,
    "kinopoiskRating" DOUBLE PRECISION,
    "imdbRating" DOUBLE PRECISION,
    "rating" DOUBLE PRECISION,
    "ratingEmoji" INTEGER[],
    "posterLink" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "popularity" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "film_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "filmLink" TEXT,
    "reviewId" INTEGER,
    "replyCommentId" INTEGER,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER,
    "userId" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewId" INTEGER,

    CONSTRAINT "vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stuff" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "photoLink" TEXT NOT NULL,
    "yearBorn" INTEGER NOT NULL,
    "yearDead" INTEGER,

    CONSTRAINT "stuff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '😎',

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voicestudio" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "voicestudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "selection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "selection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '😎',

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "reviewId" INTEGER,
    "commentId" INTEGER,
    "text" TEXT,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievement" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reward" INTEGER NOT NULL,
    "target" "AchievementTarget" NOT NULL DEFAULT 'None',
    "targetAmount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "achievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "review_filmLink_authorId_key" ON "review"("filmLink", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "views_reviewId_userId_key" ON "views"("reviewId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "film_link_key" ON "film"("link");

-- CreateIndex
CREATE UNIQUE INDEX "film_name_yearStart_key" ON "film"("name", "yearStart");

-- CreateIndex
CREATE UNIQUE INDEX "vote_reviewId_userId_key" ON "vote"("reviewId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "vote_commentId_userId_key" ON "vote"("commentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "genre_name_key" ON "genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "achievement_target_targetAmount_key" ON "achievement"("target", "targetAmount");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "rank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_nextRankId_fkey" FOREIGN KEY ("nextRankId") REFERENCES "rank"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_filmLink_fkey" FOREIGN KEY ("filmLink") REFERENCES "film"("link") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_filmLink_fkey" FOREIGN KEY ("filmLink") REFERENCES "film"("link") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_replyCommentId_fkey" FOREIGN KEY ("replyCommentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote" ADD CONSTRAINT "vote_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmToGenre" ADD CONSTRAINT "_FilmToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmToGenre" ADD CONSTRAINT "_FilmToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_directors" ADD CONSTRAINT "_directors_A_fkey" FOREIGN KEY ("A") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_directors" ADD CONSTRAINT "_directors_B_fkey" FOREIGN KEY ("B") REFERENCES "stuff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_actors" ADD CONSTRAINT "_actors_A_fkey" FOREIGN KEY ("A") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_actors" ADD CONSTRAINT "_actors_B_fkey" FOREIGN KEY ("B") REFERENCES "stuff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmToSelection" ADD CONSTRAINT "_FilmToSelection_A_fkey" FOREIGN KEY ("A") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmToSelection" ADD CONSTRAINT "_FilmToSelection_B_fkey" FOREIGN KEY ("B") REFERENCES "selection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmToVoiceStudio" ADD CONSTRAINT "_FilmToVoiceStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmToVoiceStudio" ADD CONSTRAINT "_FilmToVoiceStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "voicestudio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoriteFilms" ADD CONSTRAINT "_favoriteFilms_A_fkey" FOREIGN KEY ("A") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_viewedFilms" ADD CONSTRAINT "_viewedFilms_A_fkey" FOREIGN KEY ("A") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToFilm" ADD CONSTRAINT "_CountryToFilm_A_fkey" FOREIGN KEY ("A") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToFilm" ADD CONSTRAINT "_CountryToFilm_B_fkey" FOREIGN KEY ("B") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToUser" ADD CONSTRAINT "_AchievementToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
