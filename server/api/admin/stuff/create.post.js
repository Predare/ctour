import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    var result = await db.stuff.create({
        data: {
            name: body.name,
            yearBorn: body.yearBorn,
            yearDied: body.yearDied,
            photoLink: body.photoLink,
        }
    })
    return result;
})