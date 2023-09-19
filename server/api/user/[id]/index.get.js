import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
    var result;
    async function findFirst() {
        return await db.user.findFirst({
            where: {
                id: event.context.params?.id
            },
            select: {
                id: true,
                avatar: true,
                color: true,
                name: true,
                rank: {
                    select: {
                        name: true,
                        color: true,
                    },
                },
            }
        })
    }

    await findFirst().then(async response => {
        result = response;
    });

    return result;
})