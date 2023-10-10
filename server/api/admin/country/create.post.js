import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    var result = await db.country.create({
        data: {
            name: body.name,
            emoji: body.emoji,
        }
    })
     result;
})