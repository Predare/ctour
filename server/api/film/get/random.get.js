import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
    var result;

    async function getRandomFilm() {
        return await db.$queryRaw`SELECT * FROM "film" ORDER BY RANDOM() LIMIT 1;`;
    }

    await getRandomFilm().then(async response => {
        result = response;
    });
    
    return result[0].link;
})