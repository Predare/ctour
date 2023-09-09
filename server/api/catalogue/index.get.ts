import { PrismaClient } from "@prisma/client";
import { FilmType } from "@prisma/client";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const filter = {
        'type': query.type,
        'genre': query.genre,
        'voice': query.voice,
        'selection': query.selection,
        'yearFrom': query.yearFrom,
        'yearTo': query.yearTo,
        'country': query.country,
        'actor': query.actor,
        'director': query.director,
        'sort': query.sort,
        'page': query.page,
    };
    const prisma = new PrismaClient();

    var elementsInPage = 2;

    async function findFilms() {
        const query = getQuery(event);
        var cursor : number | undefined = Number(query.cursor);
        var page : number = Number(query.page);
        return await prisma.film.findMany({
            where: {
                type: filter.type === 'FILM' ? FilmType.FILM : FilmType.SERIAL,
                ...(filter.voice ? {
                    voice: {
                        some: {
                            name: filter.voice ? filter.voice + '' : undefined,
                        }
                    }
                } : {}),
                ...(filter.selection ? {
                    selections: {
                        some: {
                            name: filter.selection + '',
                        }
                    },
                } : {}),
                ...(filter.genre ? {
                    genres: {
                        some: {
                            name: filter.genre + '',
                        }
                    },
                } : {}),
                AND: [
                    {
                        yearEnd: {
                            gte: filter.yearFrom ? Number(filter.yearFrom) : undefined,
                        },
                    },
                    {
                        yearStart: {
                            lte: filter.yearTo ? Number(filter.yearTo) : undefined,
                        },
                    }

                ],
                ...(filter.country ? {
                    country: {
                        some: {
                            name: filter.country + '',
                        }
                    },
                } : {}),
                ...(filter.actor ? {
                    actors: {
                        some: {
                            name: filter.actor + '',
                        }
                    },
                } : {}),
                ...(filter.director ? {
                    directors: {
                        some: {
                            name: filter.director + '',
                        }
                    },
                } : {}),
            },
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
            orderBy: filter.sort === 'popularLatest' ? [
                {
                    views: 'asc',
                },
                {
                    yearStart: 'desc',
                }] : filter.sort === 'latest' ? [{
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

    return { films: result, cursor: newCursor };
})