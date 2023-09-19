import { db } from '~/utils/db.server';
import { FilmType } from "@prisma/client";
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    const query = getQuery(event);
    var cursor = Number(query.cursor);
    var page = Number(query.page);
    var elementsInPage = 2;

    const filtersWhere = {
        type: query.type === 'FILM' ? FilmType.FILM : FilmType.SERIAL,
        voice: query.voice ? { some: { name: String(query.voice), } } : undefined,
        selections: query.selection ? { some: { name: String(query.selection), } } : undefined,
        genres: query.genre ? { some: { name: String(query.genre), } } : undefined,
        yearStart: query.yearFrom ? {
            gte: Number(query.yearFrom) ?? undefined,
            lte: Number(query.yearTo) ?? undefined,
        } : undefined,
        country: query.country ? { some: { name: String(query.country), } } : undefined,
        actors: query.actor ? { some: { name: String(query.actor), } } : undefined,
        directors: query.director ? { some: { name: String(query.director), } } : undefined,
        favoritedByUsers: query.favorite ? { some: { id: String(session?.user?.id) } } : undefined,
        viewedByUsers: query.viewed ? { some: { id: String(session?.user?.id) } } : undefined,
    }

    async function filmsCount() {
        return await db.film.count({
            where: filtersWhere,
        });
    }

    async function findFilms() {
        return await db.film.findMany({
            where: filtersWhere,
            select: {
                id: true,
                name: true,
                kinopoiskRating: true,
                imdbRating: true,
                posterLink: true,
                yearStart: true,
                yearEnd: true,
                genres: true,
                link: true,
            },
            orderBy: query.sort === 'popularLatest' ? [
                {
                    views: 'asc',
                },
                {
                    yearStart: 'desc',
                }] : query.sort === 'latest' ? [{
                    yearStart: 'desc',
                }] : [{
                    views: 'desc',
                }],
            take: elementsInPage + 1,
            skip: cursor ? 1 : page * elementsInPage - elementsInPage,
            cursor: cursor ? {
                id: cursor
            } : undefined,
        });
    }

    var result;
    await findFilms().then(async response => {
        result = response;
        await db.$disconnect();
    }).catch(async (e) => {
        console.error(e);
        await db.$disconnect();
    })
    var newCursor = result.length === elementsInPage + 1 ? result[result.length - 2].id : -1;
    if (newCursor != -1) result.pop();

    return { films: result, cursor: newCursor, count: Math.ceil(await filmsCount() / elementsInPage) };
})