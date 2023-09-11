import { PrismaClient } from "@prisma/client";
import { FilmType } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    var cursor: number | undefined = Number(query.cursor);
    var page: number = Number(query.page);

    const prisma = new PrismaClient();

    var elementsInPage = 2;
    
    const filtersWhere = {
        type: query.type === 'FILM' ? FilmType.FILM : FilmType.SERIAL,
        ...(query.voice ? {
            voice: {
                some: {
                    name: String(query.voice),
                }
            }
        } : undefined),
        ...(query.selection ? {
            selections: {
                some: {
                    name: String(query.selection),
                }
            },
        } : undefined),
        ...(query.genre ? {
            genres: {
                some: {
                    name: String(query.genre),
                }
            },
        } : undefined),
        ...(query.yearFrom ? {
            yearStart: {
                gte: Number(query.yearFrom) ?? undefined,
            },
        } : undefined),
        ...(query.yearTo ? {
            yearStart: {
                lte: Number(query.yearTo) ?? undefined,
            },
        } : undefined),
        ...(query.country ? {
            country: {
                some: {
                    name: String(query.country),
                }
            },
        } : undefined),
        ...(query.actor ? {
            actors: {
                some: {
                    name: String(query.actor),
                }
            },
        } : undefined),
        ...(query.director ? {
            directors: {
                some: {
                    name: String(query.director),
                }
            },
        } : undefined),
    }

    async function filmsCount() {
        return await prisma.film.count({
            where: filtersWhere,
        });
    }

    async function findFilms() {
        return await prisma.film.findMany({
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

    var result: any;
    await findFilms().then(async response => {
        result = response;
        await prisma.$disconnect();
    }).catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    })
    var newCursor = result.length === elementsInPage + 1 ? result[result.length - 2].id : -1;
    if (newCursor != -1) result.pop();

    return { films: result, cursor: newCursor, count: Math.ceil(await filmsCount() / elementsInPage) };
})