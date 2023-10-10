import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {

    async function countryFilters() {
        return await db.country.findMany({});
    }

    async function genreFilters() {
        return await db.genre.findMany({});
    }

    async function selectionFilters() {
        return await db.selection.findMany({});
    }

    async function voiceFilters() {
        return await db.voiceStudio.findMany({});
    }

    return { countries: await countryFilters(), genres: await genreFilters(), 
        selections: await selectionFilters(), voices: await voiceFilters(), };
})