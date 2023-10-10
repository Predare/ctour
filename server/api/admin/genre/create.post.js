import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    var result = await db.genre.create({
        data: {
            name: body.name,
            emoji: body.emoji,
        }
    })
    return result;
})