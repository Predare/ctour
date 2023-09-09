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

    async function findFilms() {
        return await prisma.film.count({
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
        });
    }

    var result: any;
    await findFilms().then(async response => {
        var elementsInPage = 2;
        result = response / elementsInPage;
        await prisma.$disconnect();
    }).catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    });
    return result;
})