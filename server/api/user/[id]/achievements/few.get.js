import { db } from '~/utils/db.server';

export default defineEventHandler(async (event) => {
    var result;
    async function findMany() {
        return await db.achievement.findMany({
            where: {
                completedUsers: {
                    none: {
                        id: event.context.params?.id
                    }
                }
            },
            select: {
                id: true,
                icon: true,
                name: true,
                description: true,
                reward: true,
            }
        })
    }

    await findMany().then(async response => {
        result = response;
    });

    return result;
})